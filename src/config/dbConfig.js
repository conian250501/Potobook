import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectMongoDB = mongoose.connect(
  `mongodb+srv://taitm:${process.env.MONGODB_PASSWORD}@potobooknus.rtrrvro.mongodb.net/potobook`
);
