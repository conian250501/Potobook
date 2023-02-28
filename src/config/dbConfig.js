import mongoose from "mongoose";

mongoose.set("strictQuery", false);

console.log(process.env.MONGODB_PASSWORD);
export const connectMongoDB = mongoose.connect(
  `mongodb+srv://taitm:minhtai3214@potobooknus.rtrrvro.mongodb.net/potobook`
);
