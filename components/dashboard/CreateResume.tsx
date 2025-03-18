"use client";
import { FilePlus2, LoaderCircle, Router } from "lucide-react";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SaveResume } from "@/actions/user_resume";
import { useResume } from "@/context/resume";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CreateResume() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const { userId } = useAuth();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || title.length > 50) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", title.trim());
        if (userId) formData.append("userid", userId);

        const savedRecord = await SaveResume(formData);
        setTitle("");
        console.log(savedRecord);
        if (savedRecord.success) {
          setIsOpen(false);
          const resumeId = savedRecord.resume?.id;
          if (resumeId) router.push(`/dashboard/${resumeId}/edit`);
        }
      } catch (error) {
        console.error("Failed to save resume:", error);
      }
    });
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CreateResumeCard onClick={() => setIsOpen(true)} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Resume</DialogTitle>
          <DialogDescription>Add a title for your resume</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            name="title"
            placeholder="Ex. Software Developer Resume"
            className="col-span-3"
            value={title}
            onChange={changeTitle}
            required
          />
          <div className="flex my-3 justify-end items-center gap-5 col-span-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.length || title.length > 50 || isPending}
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
        </form>
      </DialogContent>
    </Dialog>
  );
}

const CreateResumeCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card-foreground cursor-pointer text-card w-[230px] rounded-lg flex justify-center items-center h-[250px]"
    >
      <FilePlus2 size={30} />
    </div>
  );
};
