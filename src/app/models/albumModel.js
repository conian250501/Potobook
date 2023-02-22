import mongoose from "mongoose";

const { Schema } = mongoose;
const albumSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
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
  },
  { timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema);
