"use client";
import React, { useState } from "react";
import PersonalDetail from "./form/PersonalDetail";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import SummeryForm from "./form/SummeryForm";
import ExperienceForm from "./form/ExperienceForm";
import Experience from "./form/Experience";
import Education from "./form/Education";
import Skills from "./form/Skills";
import ThemeColor from "./ThemeColor";

export default function FormSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div>
      <div className=" my-2 flex items-center justify-between">
        <ThemeColor />
        <div className="flex gap-2">
          {activeIndex > 1 && (
            <Button
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="cursor-pointer"
              size={"sm"}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            onClick={() => setActiveIndex(activeIndex + 1)}
            size={"sm"}
            className="cursor-pointer flex  gap-2"
            disabled={activeIndex === 5}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeIndex === 1 && <PersonalDetail />}

      {activeIndex === 2 && <SummeryForm />}

      {activeIndex === 3 && <Experience />}

      {activeIndex === 4 && <Education />}

      {activeIndex === 5 && <Skills />}
    </div>
  );
}
