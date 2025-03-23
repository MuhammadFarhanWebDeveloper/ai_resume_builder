"use client";

import FormSection from "@/components/edit/FormSection";
import PreviewSection from "@/components/edit/PreviewSection";
import React from "react";

export default function EditPageWrapper() {
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
