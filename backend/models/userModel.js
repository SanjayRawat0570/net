import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image:    { type: String, default: "/avatar1.png" },
 searchHistory: [
  {
    id: Number,
    image: String,
    title: String,
    searchType: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
],

  watchHistory:  [{ type: String }],
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

