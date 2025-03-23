import { ResumeType } from "@/context/resume";
import React from "react";

export default function Educational({ resume }: { resume: ResumeType }) {
  return (
    <div className="my-6">
      <h2
        className="text-center text-sm font-bold"
        style={{
          color: resume.themeColor,
        }}
      >
        Education
      </h2>
      <hr
        style={{
          borderColor: resume.themeColor,
        }}
      />

      {resume.education.map((education, index) => (
        <div key={index} className="my-5">
          <h2
            className="font-bold text-sm"
            style={{ color: resume.themeColor }}
          >
            {education.universityName}
          </h2>
          <h2 className="text-xs flex justify-between">
            {(education.degree || education.major) &&
              `${education.degree} in ${education.major}`}

            <span>
              {(education.startDate || education.endDate) &&
                `${education.startDate} - ${education.endDate}`}
            </span>
          </h2>
        </div>
      ))}
    </div>
  );
}
