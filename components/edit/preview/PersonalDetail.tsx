import { ResumeType } from "@/context/resume";
import React from "react";

export default function PersonalDetail({ resume }: { resume: ResumeType }) {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resume.themeColor,
        }}
      >
        {resume.firstName} {resume.lastName}
      </h2>
      <h2 className="font-medium text-sm text-center">{resume.jobTitle}</h2>
      <h2
        className="text-center font-normal text-xs"
        style={{
          color: resume.themeColor,
        }}
      >
        {resume.address}
      </h2>
      <div className="flex justify-between">
        <h2
          className="text-xs font-normal"
          style={{
            color: resume.themeColor,
          }}
        >
          {resume.phone}
        </h2>
        <h2
          className="text-xs font-normal"
          style={{
            color: resume.themeColor,
          }}
        >
          {resume.email}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resume.themeColor,
        }}
      />
    </div>
  );
}
