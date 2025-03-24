import React from "react";
import CreateResume from "./CreateResume";
import { currentUser } from "@clerk/nextjs/server";
import connectToDB from "@/lib/connectToDB";
import { UserResume } from "@/models/user_resume";
import ResumeCard from "./ResumeCard";
export default async function CardsSectionDashboard() {
  const user = await currentUser();
  await connectToDB();
  const resumes = await UserResume.find({ userid: user?.id });
  const formattedResumes = resumes.map((resume) => {
    return { ...resume._doc, _id: resume._id.toString() };
  });
  return (
    <div className="flex gap-3 px-8 flex-wrap">
      <CreateResume />
      {formattedResumes.map((item) => {
        return (
          <ResumeCard
            key={item._id}
            theme={item.themeColor}
            title={item.title}
            id={item._id}
          />
        );
      })}
    </div>
  );
}
