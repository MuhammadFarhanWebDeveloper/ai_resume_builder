"use client";
import { ResumeType, useResume } from "@/context/resume";
import React from "react";
import PersonalDetail from "./preview/PersonalDetail";
import Summery from "./preview/Summery";
import ProfessionalExperience from "./preview/ProfessionalExperience";
import Educational from "./preview/Educational";
import Skills from "./preview/Skills";

export default function PreviewSection({
  resumeProp = null,
}: {
  resumeProp?: null | string;
}) {
  const { resume } = useResume();
  console.log(resume);
  const parsedResumeProp: ResumeType =
    typeof resumeProp === "string" ? JSON.parse(resumeProp) : null;

  return (
    <div
      id="print-area"
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: parsedResumeProp
          ? parsedResumeProp.themeColor
          : resume.themeColor,
      }}
    >
      {/* Personal Detail */}
      <PersonalDetail resume={parsedResumeProp || resume} />
      {/* Summery */}
      <Summery resume={parsedResumeProp || resume} />
      {/* Professional Experience */}
      {resume.experience.length > 0 && (
        <ProfessionalExperience resume={parsedResumeProp || resume} />
      )}
      {/* Educational */}
      {resume.education.length > 0 && (
        <Educational resume={parsedResumeProp || resume} />
      )}
      {/* Skills */}
      {resume.skills.length > 0 && (
        <Skills resume={parsedResumeProp || resume} />
      )}
    </div>
  );
}
