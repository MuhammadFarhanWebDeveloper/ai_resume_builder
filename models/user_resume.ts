import mongoose, { Schema } from "mongoose";

const ExperienceSchema = new Schema({
  title: String,
  companyName: String,
  city: String,
  state: String,
  startDate: String,
  endDate: String,
  currentlyWorking: Boolean,
  workSummery: String,
});

const SkillsSchema = new Schema({
  name: String,
  rating: Number,
});

const EducationSchema = new Schema({
  universityName: String,
  startDate: String,
  endDate: String,
  major: String,
  degree: String,
  description: String,
});
const UserResumeSchema = new Schema({
  title: { type: String, max: 50, required: true },
  userid: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  email: { type: String },
  phone: { type: String },
  jobTitle: { type: String },
  summery: { type: String },
  themeColor: { type: String, default: "#ff6666" },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillsSchema],
});

export const UserResume =
  mongoose.models.user_resume ||
  mongoose.model("user_resume", UserResumeSchema);
