import mongoose from "mongoose";

const { Schema } = mongoose;
const photoSchema = new Schema(
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
      default: "public",
    },
    image: {
      type: String,
    },
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album",
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

export const Photo = mongoose.model("Photo", photoSchema);
