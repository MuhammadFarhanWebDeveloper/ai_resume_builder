import EditPageWrapper from "@/components/edit/EditPageWrapper";
import { ResumeProvider, ResumeType } from "@/context/resume";
import connectToDB from "@/lib/connectToDB";
import { UserResume } from "@/models/user_resume";

export default async function page({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  await connectToDB();

  const getResume = (await UserResume.findById(
    resumeId
  ).lean()) as unknown as ResumeType | null;

  if (!getResume) throw new Error("Resume not found");
  console.log("GET RESUME");
  console.log(getResume);
  const resumeData: ResumeType = {
    firstName: getResume.firstName || "",
    lastName: getResume.lastName || "",
    jobTitle: getResume.jobTitle || "",
    address: getResume.address || "",
    phone: getResume.phone || "",
    email: getResume.email || "",
    themeColor: getResume.themeColor || "#ff6666",
    summery: getResume.summery || "",
    experience: getResume.experience?.map(({ _id, __v, ...exp }) => exp) || [],
    education: getResume.education?.map(({ _id, __v, ...edu }) => edu) || [],
    skills: getResume.skills?.map(({ _id, __v, ...skill }) => skill) || [],
  };

  return (
    <div>
      <ResumeProvider resumeProp={resumeData}>
        <EditPageWrapper />
      </ResumeProvider>
    </div>
  );
}
