import mongoose from "mongoose";

const { Schema } = mongoose;
const albumSchema = new Schema(
  {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    mode: {
      type: String,
    },
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Photo",
        default: [],
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema);
