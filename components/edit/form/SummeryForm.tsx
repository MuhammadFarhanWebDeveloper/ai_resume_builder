"use client";
import { UpdateResumeInfo } from "@/actions/resume_action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/resume";
import { AIChatSession } from "@/lib/gemini";
import { Brain, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type aiGeneratedSummeryType = {
  experienceLevel: string;
  summary: string;
};

export default function SummeryForm() {
  const { resumeId } = useParams();
  const { resume, updateResume } = useResume();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isAIGenerating, startGenerating] = useTransition();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState<
    aiGeneratedSummeryType[]
  >([]);
  const prompt = `JOB Title: [TITLE], depends on my job title give me a summery for my resume within 4-5 lines in JSON format with experience Level and Summery with experience level for Fresher, Mid-Level, Experienced. I want response like [{experienceLevel:"Fresher", summery:"..."}, {experienceLevel:"Mid-Level", summery:"..."}, {experienceLevel:"Experienced",summery:"..."}]`;
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    updateResume({
      summery: value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const summery = formData.get("summery") as string;
      formData.append("themeColor", resume.themeColor);

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

  const generateSummeryFromAI = () => {
    if (!resume.jobTitle) return;
    startGenerating(async () => {
      const PROMPT = prompt.replace("[TITLE]", resume.jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const textResponse = result.response.text();
      const cleanedResponse = textResponse.replace(/```json|```/g, "").trim();
      setAiGeneratedSummeryList(JSON.parse(cleanedResponse));
    });
  };

  const handleSuggestionClick = (summary: string) => {
    updateResume({ summery: summary });
  };

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
                onClick={generateSummeryFromAI}
                type="button"
                disabled={!resume.jobTitle || isAIGenerating}
                className="cursor-pointer p-2 "
              >
                {isAIGenerating ? (
                  <div className="animate-spin">
                    <LoaderCircle />
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Brain /> Generate from AI
                  </div>
                )}
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
      {aiGeneratedSummeryList.length > 0 && (
        <div className="flex flex-col my-3 p-3 justify-center gap-4">
          <h1 className="font-bold text-3xl text-black">Suggestions</h1>
          {aiGeneratedSummeryList.map((summary, index) => {
            return (
              <div
                key={index}
                onClick={() => handleSuggestionClick(summary.summary)}
                className="shadow-lg text-primary cursor-pointer rounded-lg p-3 "
              >
                <h1 className="font-semibold">
                  Level: {summary.experienceLevel}
                </h1>
                <p className="py-2">{summary.summary}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


