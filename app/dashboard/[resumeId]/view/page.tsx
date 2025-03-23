import PreviewSection from "@/components/edit/PreviewSection";
import PreviewHeader from "@/components/view/PreviewHeader";
import connectToDB from "@/lib/connectToDB";
import { UserResume } from "@/models/user_resume";
import React from "react";

export default async function page({
  params,
}: {
  params: { resumeId: string };
}) {
  const resumeId = await params.resumeId;
  await connectToDB();
  const resume = await UserResume.findById(resumeId);
  const ResumeString = JSON.stringify(resume);
  return (
    <div>
      <div id="no-print">
        <div className="my-3">
          <h1 className="text-center text-3xl font-bold">
            Your Resume is ready!
          </h1>
          <p className="text-center">You can download the resume.</p>
        </div>
        <PreviewHeader />
      </div>
      <div className="md:w-[80%] my-3 w-full mx-auto">
        <PreviewSection resumeProp={ResumeString} />
      </div>
    </div>
  );
}
