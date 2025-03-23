import { UpdateResumeInfo } from "@/actions/resume_action";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/resume";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";
import { Checkbox } from "@/components/ui/checkbox";

export default function ExperienceForm({
  index,

  handleInput,
}: {
  index: number;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
}) {
  const { resumeId } = useParams();
  const { resume, updateResume } = useResume();
  // const [isPresentChecked, setIsPresentChecked] = useState(false);
  const [isPending, startTransition] = useTransition();
  // const handleInput = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   updateResume({
  //     [name]: value,
  //   });
  // };

  return (
    <form>
      <div className="grid grid-cols-2 mt-5 gap-3">
        <div>
          <label htmlFor="title" className="text-sm">
            Position Title
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            defaultValue={resume.experience[index].title || ""}
            name="title"
            required
            id="title"
          />
        </div>
        <div>
          <label htmlFor="companyName" className="text-sm">
            Company Name
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            name="companyName"
            defaultValue={resume.experience[index].companyName}
            required
            id="companyName"
          />
        </div>
        <div>
          <label htmlFor="city" className="text-sm">
            City
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            defaultValue={resume.experience[index].city}
            name="city"
            required
            id="city"
          />
        </div>
        <div>
          <label htmlFor="state" className="text-sm">
            State
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            name="state"
            defaultValue={resume.experience[index].state}
            required
            id="state"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="text-sm">
            Start Date
          </label>

          <Input
            type="date"
            onChange={(e) => handleInput(e, index)}
            name="startDate"
            defaultValue={resume.experience[index].startDate}
            required
            id="startDate"
          />
        </div>
        <div>
          <div className="my-1 flex items-center justify-between">
            <label htmlFor="endDate" className="text-sm">
              End Date
            </label>
            <div className="flex items-center gap-3">
              <Checkbox
                checked={resume.experience[index].currentlyWorking}
                onCheckedChange={(checked) =>
                  updateResume({
                    experience: resume.experience.map((exp, i) =>
                      i === index
                        ? {
                            ...exp,
                            currentlyWorking:
                              !resume.experience[index].currentlyWorking,
                          }
                        : exp
                    ),
                  })
                }
                id="present"
              />
              <label
                htmlFor="present"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Present
              </label>
            </div>
          </div>
          <Input
            type="date"
            onChange={(e) => handleInput(e, index)}
            name="endDate"
            disabled={resume.experience[index].currentlyWorking}
            required={!resume.experience[index].currentlyWorking}
            defaultValue={resume.experience[index].endDate}
            id="endDate"
          />
        </div>
        <div className="col-span-2">
          <div className="my-3 flex justify-between items-center">
            <label htmlFor="workSummery" className="text-sm">
              Add Summery
            </label>
            <Button variant={"outline"} size={"sm"} className="cursor-pointer">
              Generate from AI
            </Button>
          </div>
          <RichTextEditor
            defaultValue={resume.experience[index].workSummery}
            index={index}
          />
        </div>
      </div>
    </form>
  );
}
