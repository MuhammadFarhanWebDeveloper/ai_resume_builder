import { Button } from "@/components/ui/button";
import { ResumeType, useResume } from "@/context/resume";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import SkillForm from "./SkillForm";
import { toast } from "sonner";
import { UpdateResumeInfo } from "@/actions/resume_action";
const formFields = {
  name: "",
  rating: 0,
};
export default function Skills() {
  const [isPending, startTransition] = useTransition();
  const { resumeId } = useParams();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const { resume, updateResume } = useResume();

  const handleAddMoreSKill = () => {
    updateResume({
      skills: [...resume.skills, { ...formFields }],
    });
  };

  const handleRemoveSkill = () => {
    updateResume({
      skills: resume.skills.slice(0, -1),
    });
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    updateResume({
      skills: resume.skills.map((skill, i) =>
        i === index ? { ...skill, [name]: value } : skill
      ),
    });
  };

  const handleSubmit = () => {
    startTransition(async () => {
      //   //   const summery = formData.get("summery") as string;

      const requiredFields: (keyof ResumeType["skills"][0])[] = [
        "name",
        "rating",
      ];

      const isValid = resume.skills.every((skill) =>
        requiredFields.every((field) => skill[field]?.toString().trim() !== "")
      );

      if (!isValid) {
        toast.error("Please fill in all the required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("themeColor", resume.themeColor);

      formData.append("skills", JSON.stringify(resume.skills));

      // Append resumeId if needed
      if (resumeId) {
        formData.append("resumeId", resumeId.toString());
      }
      const response = await UpdateResumeInfo(formData);

      response.success
        ? toast("Your Skills has been saved")
        : toast(response.message);
    });
    
  };
  useEffect(() => {
    const requiredFields: (keyof ResumeType["skills"][0])[] = [
      "name",
      "rating",
    ];

    const isValid = resume.skills.every((skill) =>
      requiredFields.every((field) => skill[field]?.toString().trim() !== "")
    );

    if (isValid) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [resume.experience]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your Skills</p>
      {resume.skills.map((skill, index) => (
        <div key={index} className="border-1 rounded-lg p-2 my-2">
          <SkillForm handleInput={handleInput} index={index} />
        </div>
      ))}
      <div className="mt-3 col-span-2 flex justify-between">
        <Button variant={"outline"} onClick={handleAddMoreSKill}>
          Add More Skill
        </Button>
        {resume.skills.length > 0 && (
          <Button variant={"outline"} onClick={handleRemoveSkill}>
            Remove Skill
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
