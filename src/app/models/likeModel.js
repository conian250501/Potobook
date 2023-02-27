import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  nameAuthor: {
    type: String,
  },
  likeType: {
    type: String,
    enum: ["PHOTO", "ALBUM", "COMMENT"],
  },
  likeTypeId: {
    type: Schema.Types.ObjectId,
  },
});

export const Like = mongoose.model("Like", likeSchema);
