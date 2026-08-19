import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserModel } from "../modules/user/user.model.js";
import { DecodedToken } from "../modules/user/user.types.js";
export const authGaurd = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized Access");
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken;
  const user = await UserModel.findById(decodedToken._id).select("-password -refreshToken");
  if (!user) throw new ApiError(400, "User not found");
  req.user = user;
  next();
});
