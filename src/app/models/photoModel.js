import mongoose from "mongoose";

const { Schema } = mongoose;
const photoSchema = new Schema(
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
    image: {
      type: String,
    },
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User  ",
    },
  },
  { timestamps: true }
);

export const Photo = mongoose.model("Photo", photoSchema);
