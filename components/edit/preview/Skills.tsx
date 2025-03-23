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
          <div key={index} className="flex items-center justify-center gap-2">
            <h2 className="text-sm">{skill.name}</h2>
            <div className="h-2 skill-rating bg-gray-400 w-[120px] rounded-lg ">
              <div
                className="h-2 rounded-lg"
                style={{
                  backgroundColor: resume.themeColor,
                  width: `${skill.rating * 20}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
