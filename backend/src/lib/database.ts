import mongoose from "mongoose";
export async function connectDb() {
  try {
    const url = process.env.DATABASE_URL!;
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}
