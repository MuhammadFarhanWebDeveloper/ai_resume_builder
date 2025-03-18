"use client";
import React from "react";
import PersonalDetail from "./form/PersonalDetail";
import { Button } from "../ui/button";
import { ArrowRight, LayoutGrid } from "lucide-react";

export default function FormSection() {
  return (
    <div>
      <div className=" my-2 flex items-center justify-between">
        <Button variant={"outline"} size={"sm"} className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
        <div>
          <Button size={"sm"} className="flex gap-2">
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      <PersonalDetail />
      {/* Summery */}

      {/* Experience */}

      {/* Education */}

      {/* Skills */}
    </div>
  );
}
