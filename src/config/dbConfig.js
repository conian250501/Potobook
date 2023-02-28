import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const MONGO_URL = process.env.MONGO_URL;
export const connectMongoDB = mongoose.connect(
  `mongodb+srv://taitm:minhtai3214@potobooknus.rtrrvro.mongodb.net/potobook`
);
