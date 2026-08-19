import { Router } from "express";
import { changePassword, getMe, loginUser, logoutUser, refreshAccessTokens, registerUser } from "./user.controller.js";
import { authGaurd } from "../../middleware/auth.middleware.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/change-password", authGaurd, changePassword)
router.get("/logout", authGaurd, logoutUser);
router.get('/me',getMe)
router.post("/refresh-token", refreshAccessTokens)

export default router;
