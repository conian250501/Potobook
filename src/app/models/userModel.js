import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    albums: [{ type: Schema.Types.ObjectId, ref: "Album", default: [] }],
    photos: [{ type: Schema.Types.ObjectId, ref: "Photo", default: [] }],
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
