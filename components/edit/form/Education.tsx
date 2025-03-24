"use client";
import { ResumeType, useResume } from "@/context/resume";
import React, { useEffect, useState, useTransition } from "react";
import EducationForm from "./EducationForm";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UpdateResumeInfo } from "@/actions/resume_action";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const formFields = {
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  major: "",
  description: "",
};

export default function Education() {
  const [isPending, startTransition] = useTransition();
  const { resumeId } = useParams();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const { resume, updateResume } = useResume();

  const handleAddMoreEducation = () => {
    updateResume({
      education: [...resume.education, { ...formFields }],
    });
  };

  const handleRemoveEducation = () => {
    updateResume({
      education: resume.education.slice(0, -1),
    });
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    updateResume({
      education: resume.education.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      ),
    });
  };

  const handleSubmit = () => {
    startTransition(async () => {
      //   //   const summery = formData.get("summery") as string;

      const requiredFields: (keyof ResumeType["education"][0])[] = [
        "universityName",
        "startDate",
        "endDate",
        "degree",
        "major",
        "description",
      ];

      const isValid = resume.education.every((exp) =>
        requiredFields.every((field) => exp[field]?.toString().trim() !== "")
      );

      if (!isValid) {
        toast.error("Please fill in all the required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("education", JSON.stringify(resume.education));
      formData.append("themeColor", resume.themeColor);

      // Append resumeId if needed
      if (resumeId) {
        formData.append("resumeId", resumeId.toString());
      }
      const response = await UpdateResumeInfo(formData);

      response.success
        ? toast("Your Edcuational detail has been saved")
        : toast(response.message);
    });
  };
  useEffect(() => {
    const requiredFields: (keyof ResumeType["education"][0])[] = [
      "universityName",
      "startDate",
      "endDate",
      "degree",
      "major",
      "description",
    ];
    const isValid = resume.education.every((exp) =>
      requiredFields.every((field) => exp[field]?.toString().trim() !== "")
    );
    if (isValid) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [resume.experience]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>
      {resume.education.map((experience, index) => (
        <div key={index} className="border-1 rounded-lg p-2 my-2">
          <EducationForm handleInput={handleInput} index={index} />
        </div>
      ))}
      <div className="mt-3 col-span-2 flex justify-between">
        <Button variant={"outline"} onClick={handleAddMoreEducation}>
          Add More Experience
        </Button>
        {resume.education.length > 0 && (
          <Button variant={"outline"} onClick={handleRemoveEducation}>
            Remove Experience
          </Button>
        )}
        <Button
          disabled={isPending || isSaveDisabled}
          onClick={handleSubmit}
          type="submit"
          className="cursor-pointer"
        >
          {isPending ? (
            <div className="animate-spin">
              <LoaderCircle />
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}
