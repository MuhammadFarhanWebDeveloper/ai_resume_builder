import { ResumeType } from "@/context/resume";
import React from "react";

export default function Summery({ resume }: { resume: ResumeType }) {
  return (
    <div>
      <p className="text-xs ">{resume.summery}</p>
    </div>
  );
}
