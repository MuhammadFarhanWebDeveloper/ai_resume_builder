import { ResumeType } from "@/context/resume";
import React from "react";

export default function Skills({ resume }: { resume: ResumeType }) {
  return (
    <div className="my-6">
      <h2
        className="text-center text-sm font-bold"
        style={{
          color: resume.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resume.themeColor,
        }}
      />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resume.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-sm">{skill.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  backgroundColor: resume.themeColor,
                  width: `${skill.rating}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
