import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
import React, { useEffect, useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
export default function SkillForm({
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
  const [rating, setRating] = useState(resume.skills[index].rating || 0);

  useEffect(() => {
    updateResume({
      skills: resume.skills.map((skill, i) =>
        i === index ? { ...skill, rating: rating } : skill
      ),
    });
    console.log(rating);
  }, [rating]);

  return (
    <form>
      <div className="grid grid-cols-2 mt-5 gap-3">
        <div className="">
          <label htmlFor="name" className="text-sm">
            Skill Name
          </label>
          <Input
            onChange={(e) => handleInput(e, index)}
            defaultValue={resume.skills[index].name || ""}
            name="name"
            required
            id="name"
          />
        </div>
        <div className="flex items-center h-full justify-center">
          <ReactRating
            style={{ maxWidth: 100 }}
            value={resume.skills[index].rating}
            onChange={setRating}
          />
        </div>
      </div>
    </form>
  );
}
