import mongoose, { Schema } from "mongoose";

const UserResumeSchema = new Schema({
  title: { type: String, max: 50, required: true },
  userid: { type: String, required: true },
});

export const UserResume =
  mongoose.models.user_resume ||
  mongoose.model("user_resume", UserResumeSchema);
