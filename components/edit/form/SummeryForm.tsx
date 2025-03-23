"use client";
import { UpdateResumeInfo } from "@/actions/resume_action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/resume";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function SummeryForm() {
  const { resumeId } = useParams();
  const { resume, updateResume } = useResume();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    updateResume({
      summery: value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const summery = formData.get("summery") as string;

      if (!summery || !resumeId) {
        toast("The Summery is required!");
        return;
      }

      formData.append("resumeId", resumeId.toString());

      const response = await UpdateResumeInfo(formData);
      toast(response.message);
    });
  };
  useEffect(() => {
    if (!resume.summery) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [resume.summery]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Summery</h2>
      <p>Add summery for your job title</p>
      <form action={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="col-span-2">
            <div className="my-3 flex justify-between items-center">
              <label htmlFor="firstName" className="text-sm">
                Add Summery
              </label>
              <Button
                variant={"outline"}
                size={"sm"}
                className="cursor-pointer"
              >
                Generate from AI
              </Button>
            </div>
            <Textarea
              name="summery"
              onChange={handleInput}
              defaultValue={resume.summery}
            />
          </div>
          <div className="mt-3 col-span-2 flex justify-end">
            <Button
              disabled={isPending || isSaveDisabled}
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
      </form>
    </div>
  );
}
