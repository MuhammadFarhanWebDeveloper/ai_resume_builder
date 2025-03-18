import { useResume } from "@/context/resume";
import React from "react";

export default function PersonalDetail() {
  const { resume, updateResume } = useResume();
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the personal information</p>
    </div>
  );
}
