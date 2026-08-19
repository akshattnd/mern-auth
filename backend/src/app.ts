import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./modules/user/user.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/api/health", (req, res) => {
  res.json(new ApiResponse(200, null, "server is healty"));
});
app.use("/api/v1/users", userRouter);

export default app;
