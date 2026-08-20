import { asyncHandler } from "../../utils/asyncHandler.js";
import { changePasswordSchema, loginUserSchema, registerUserSchema } from "./user.schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { UserModel } from "./user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { DecodedToken } from "./user.types.js";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production",
};
const generateTokens = async (userId: Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  if (!user) return { accessToken: "", refreshToken: "" };
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? ("access-secret-key" as string);
  const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? ("refresh-secret-key" as string);
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry,
    },
  );
  const refreshToken = jwt.sign(
    {
      _id: user._id,
    },
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiry,
    },
  );
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};
export const registerUser = asyncHandler(async (req, res) => {
  // validate input
  const { data, success, error } = registerUserSchema.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, error.message);
  }
  // check existing
  const { username, email } = data;
  const existing = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existing) throw new ApiError(400, "User already exist");
  // save info
  const createdUser = await UserModel.create(data);
  // remove sensitive fields
  const user = await UserModel.findById(createdUser._id).select("-refreshToken -password").lean();
  // return res
  res.status(201).json(new ApiResponse(201, user));
});

export const loginUser = asyncHandler(async (req, res) => {
  // validate
  const { data, success, error } = loginUserSchema.safeParse(req.body);
  if (!success) throw new ApiError(400, error.message);
  //check existing
  const { username, email, password } = data;
  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!existingUser) {
    throw new ApiError(400, "user don't exist");
  }
  //compare password
  const isValid = await bcrypt.compare(password, existingUser.password);
  if (!isValid) {
    throw new ApiError(401, "Password didn't match");
  }
  //generate tokens
  const { accessToken, refreshToken } = await generateTokens(existingUser._id);

  //send cookie and user object
  const user = await UserModel.findOne(existingUser._id).select("-password -refreshToken").lean();
  res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { user, accessToken, refreshToken }, "Successfully login"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  // get user
  // remove refresh token
  const user = await UserModel.findByIdAndUpdate(
    req.user!._id,
    { $set: { refreshToken: undefined } },
    { returnDocument: "after" },
  );

  //clear cookies
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "Logout successfully"));
  //res
});
export const changePassword = asyncHandler(async (req, res) => {
  // 1. get user from db
  // 2. compare password with old one
  // 3. if true update the password return success res;
  const user = await UserModel.findById(req?.user?._id);
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const { data, success, error } = changePasswordSchema.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, error.message);
  }
  const { oldPassword, newPassword } = data;
  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    throw new ApiError(400, "Password did not match");
  }
  user.password = newPassword;
  user.save();
  res.status(200).json(new ApiResponse(200, null, "Password updated"));
});
export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  
  res.status(200).json(new ApiResponse(200, user));
});
export const refreshAccessTokens = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!oldRefreshToken) throw new ApiError(401, "Unauthorized request");
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new ApiError(500, "Env is not set for refresh token");
  const decodedToken = jwt.verify(oldRefreshToken, secret) as DecodedToken;
  const user = await UserModel.findById(decodedToken._id);
  if (!user) throw new ApiError(400, "User doesn't exist");
  if (user.refreshToken != oldRefreshToken) throw new ApiError(400, "Invalid refresh Token");
  const { accessToken, refreshToken } = await generateTokens(user._id);

  res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { accessToken, refreshToken }, "Successfully generated new Tokens"));
});
