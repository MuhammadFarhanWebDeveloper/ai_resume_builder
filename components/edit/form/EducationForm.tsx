import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/resume";
import React from "react";
import { Button } from "react-day-picker";

export default function EducationForm({
  index,
  handleInput,
}: {
  index: number;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
}) {
  const { resume, updateResume } = useResume();

  return (
    <form>
      <div className="grid grid-cols-2 mt-5 gap-3">
        <div className="col-span-2">
          <label htmlFor="universityName" className="text-sm">
            University/College Name
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            defaultValue={resume.education[index].universityName || ""}
            name="universityName"
            required
            id="title"
          />
        </div>
        <div>
          <label htmlFor="degree" className="text-sm">
            Degree
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            name="degree"
            defaultValue={resume.education[index].degree || ""}
            required
            id="degree"
          />
        </div>
        <div>
          <label htmlFor="major" className="text-sm">
            Major
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            defaultValue={resume.education[index].major || ""}
            name="major"
            required
            id="major"
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
            defaultValue={resume.education[index].startDate || ""}
            required
            id="startDate"
          />
        </div>
        <div>
          <div className="my-1 flex items-center justify-between">
            <label htmlFor="startDate" className="text-sm">
              End Date
            </label>
          </div>
          <Input
            type="date"
            name="endDate"
            required
            defaultValue={resume.education[index].endDate || ""}
            id="endDate"
            onChange={(e) => handleInput(e, index)}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <div className="my-3 flex justify-between items-center">
            <Textarea
              name="description"
              defaultValue={resume.education[index].description || ""}
              onChange={(e) => handleInput(e, index)}
              id="description"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
