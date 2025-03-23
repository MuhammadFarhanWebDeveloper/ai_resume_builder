import React, { useEffect, useState, useTransition } from "react";
import ExperienceForm from "./ExperienceForm";
import { Button } from "@/components/ui/button";
import { ResumeType, useResume } from "@/context/resume";
import { LoaderCircle } from "lucide-react";
import { UpdateResumeInfo } from "@/actions/resume_action";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  workSummery: "",
};

export default function Experience() {
  const [isPending, startTransition] = useTransition();
  const { resumeId } = useParams();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { resume, updateResume } = useResume();

  const handleAddMoreExperience = () => {
    updateResume({
      experience: [...resume.experience, { ...formFields }],
    });
  };

  const handleRemoveExperience = () => {
    updateResume({
      experience: resume.experience.slice(0, -1),
    });
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    updateResume({
      experience: resume.experience.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      ),
    });
  };
  useEffect(() => {
    const requiredFields: (keyof ResumeType["experience"][0])[] = [
      "title",
      "companyName",
      "city",
      "state",
      "startDate",
      "workSummery",
    ];
    const isValid = resume.experience.every((exp) =>
      requiredFields.every((field) => exp[field]?.toString().trim() !== "")
    );
    if (isValid) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [resume.experience]);

  const handleSubmit = () => {
    startTransition(async () => {
      const requiredFields: (keyof ResumeType["experience"][0])[] = [
        "title",
        "companyName",
        "city",
        "state",
        "startDate",
        "workSummery",
      ];

      const isValid = resume.experience.every((exp) =>
        requiredFields.every((field) => exp[field]?.toString().trim() !== "")
      );

      if (!isValid) {
        toast.error("Please fill in all required fields.");
        console.log(resume.experience);
        return;
      }

      const formData = new FormData();
      formData.append("experience", JSON.stringify(resume.experience));

      if (resumeId) {
        formData.append("resumeId", resumeId.toString());
      }

      const response = await UpdateResumeInfo(formData);

      response.success
        ? toast("Your Experience has been saved")
        : toast(response.message);
    });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>
      {resume.experience?.map((experience, index) => (
        <div key={index} className="border-1 rounded-lg p-2 my-2">
          <ExperienceForm index={index} handleInput={handleInput} />
        </div>
      ))}
      <div className="mt-3 col-span-2 flex justify-between">
        <Button variant={"outline"} onClick={handleAddMoreExperience}>
          Add More Experience
        </Button>
        {resume.experience.length > 0 && (
          <Button variant={"outline"} onClick={handleRemoveExperience}>
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
