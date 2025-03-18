"use client";

import FormSection from "@/components/edit/FormSection";
import PreviewSection from "@/components/edit/PreviewSection";
import React, { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = use(params);

  return (
    <div className="flex">
      <div className="w-full p-2 ">
        <FormSection />
      </div>
      <div className="w-full  p-2">
        <PreviewSection />
      </div>
    </div>
  );
}
