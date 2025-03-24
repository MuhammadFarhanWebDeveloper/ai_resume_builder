import { ResumeType } from "@/context/resume";
import React from "react";

export default function ProfessionalExperience({
  resume,
}: {
  resume: ResumeType;
}) {
  return (
    <div className="my-6">
      <h2
        className="text-center text-sm font-bold"
        style={{
          color: resume.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resume.themeColor,
        }}
      />

      {resume.experience.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resume.themeColor }}
          >
            {experience.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience.companyName}, {experience.city}, {experience.state}{" "}
            <span>
              {experience.startDate}
              &nbsp;&nbsp;{"-"}&nbsp;&nbsp;
              {experience.currentlyWorking ? "Present" : experience.endDate}
            </span>
          </h2>
          <div className="text-xs  experience-summary my-2">
            <div dangerouslySetInnerHTML={{ __html: experience.workSummery }} />
          </div>
        </div>
      ))}
    </div>
  );
}
