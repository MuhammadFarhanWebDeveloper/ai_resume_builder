"use client";
import { useResume } from "@/context/resume";
import React from "react";
import PersonalDetail from "./preview/PersonalDetail";
import Summery from "./preview/Summery";
import ProfessionalExperience from "./preview/ProfessionalExperience";
import Educational from "./preview/Educational";
import Skills from "./preview/Skills";

export default function PreviewSection() {
  const { resume } = useResume();

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resume.themeColor,
      }}
    >
      {/* Personal Detail */}
      <PersonalDetail resume={resume} />
      {/* Summery */}
      <Summery resume={resume} />
      {/* Professional Experience */}
      <ProfessionalExperience resume={resume} />
      {/* Educational */}
      <Educational resume={resume} />
      {/* Skills */}
      <Skills resume={resume} />
    </div>
  );
}
