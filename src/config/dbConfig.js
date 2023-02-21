import mongoose from "mongoose";
mongoose.set("strictQuery", false);
export const connectMongoDB = mongoose.connect(
  "mongodb://localhost:27017/potobook"
);
