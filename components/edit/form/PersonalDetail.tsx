import { UpdateResumeInfo } from "@/actions/resume_action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function PersonalDetail() {
  const { resume, updateResume } = useResume();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { resumeId } = useParams();
  const [isPending, startTransition] = useTransition();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateResume({
      [name]: value,
    });
  };
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const { firstName, lastName, address, jobTitle, email, phone } =
        Object.fromEntries(formData);
      if (!resumeId || typeof resumeId !== "string") {
        return;
      }
      formData.append("resumeId", resumeId);
      if (
        !firstName ||
        !lastName ||
        !address ||
        !jobTitle ||
        !email ||
        !phone
      ) {
        toast("All fields are required");
        return;
      }
      const response = await UpdateResumeInfo(formData);
      response.success
        ? toast("Your personal detail has been saved")
        : toast(response.message);
    });
  };

  useEffect(() => {
    if (
      !resume.firstName ||
      !resume.lastName ||
      !resume.address ||
      !resume.jobTitle ||
      !resume.email ||
      !resume.phone
    ) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [resume]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the personal information</p>

      <form action={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label htmlFor="firstName" className="text-sm">
              First Name
            </label>
            <Input
              onChange={handleInput}
              defaultValue={resume.firstName}
              name="firstName"
              required
              id="firstName"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <Input
              onChange={handleInput}
              name="lastName"
              defaultValue={resume.lastName}
              required
              id="lasttName"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="jobTitle" className="text-sm">
              Job Title
            </label>
            <Input
              onChange={handleInput}
              defaultValue={resume.jobTitle}
              name="jobTitle"
              required
              id="jobTitle"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <Input
              onChange={handleInput}
              name="address"
              required
              defaultValue={resume.address}
              id="address"
            />
          </div>
          <div className="">
            <label htmlFor="phone" className="text-sm">
              Phone
            </label>
            <Input
              onChange={handleInput}
              defaultValue={resume.phone}
              name="phone"
              required
              id="phone"
            />
          </div>
          <div className="">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input
              onChange={handleInput}
              defaultValue={resume.email}
              name="email"
              required
              id="email"
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
