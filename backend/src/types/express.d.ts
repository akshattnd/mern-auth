import { User } from "../modules/user/user.model.ts";
import { Type } from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user?: User & { _id: Type.ObjectId };
    }
  }
}

export {};
