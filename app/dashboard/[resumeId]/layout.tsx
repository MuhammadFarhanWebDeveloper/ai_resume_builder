import { UserResume } from "@/models/user_resume";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function layout({
  params,
  children,
}: {
  params: Promise<{ resumeId: string }>;
  children: React.ReactNode;
}) {
  const { resumeId } = await params;
  const { userId } = await auth();
  const resume = await UserResume.findById(resumeId);
  if (resume.userid !== userId) {
    notFound();
  }

  return <div>{children}</div>;
}
