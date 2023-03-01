import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectMongoDB = mongoose.connect(
  `mongodb+srv://taitm:minhtai3214@potobooknus.rtrrvro.mongodb.net/potobook`
);
