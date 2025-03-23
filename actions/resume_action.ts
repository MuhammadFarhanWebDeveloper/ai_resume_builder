"use server";

import connectToDB from "@/lib/connectToDB";
import { UserResume } from "@/models/user_resume";
import { revalidatePath } from "next/cache";

export const SaveResume = async (formData: FormData) => {
  try {
    await connectToDB();
    const title = formData.get("title") as string;
    const userid = formData.get("userid") as string;
    const newResume = await UserResume.create({ title, userid });
    return {
      success: true,
      message: "Title Successfully saved",
      resume: {
        id: newResume._id.toString(),
        title: newResume.title,
        userid: userid,
      },
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
};

export const UpdateResumeInfo = async (formData: FormData) => {
  try {
    await connectToDB();

    const formDataObject = Object.fromEntries(formData);

    // Extract resumeId and experience separately
    const { resumeId, education, skills, experience, ...otherData } =
      formDataObject;

    // Ensure experience is a string before parsing
    const updatedData = {
      ...otherData,
    };

    // experience: typeof experience === "string" ? JSON.parse(experience) : [],
    if (typeof experience === "string" && experience.trim() !== "") {
      try {
        updatedData.experience = JSON.parse(experience);
      } catch (error) {
        console.log("Invalid experience JSON, skipping update.");
      }
    }

    if (typeof education === "string" && education.trim() !== "") {
      try {
        updatedData.education = JSON.parse(education);
      } catch (error) {
        console.log("Invalid education JSON, skipping update.");
      }
    }
    if (typeof skills === "string" && skills.trim() !== "") {
      try {
        updatedData.skills = JSON.parse(skills);
      } catch (error) {
        console.log("Invalid skills JSON, skipping update.");
      }
    }

    // Update in MongoDB
    const resumeInfo = await UserResume.findByIdAndUpdate(
      resumeId,
      updatedData,
      {
        new: true,
      }
    );
    console.log(updatedData);
    console.log(resumeInfo);
    return {
      success: true,
      message: "Your resume information has been updated successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
};

export const deleteResume = async (formData: FormData) => {
  const id = formData.get("id");
  if (!id) {
    return { success: false, message: "Cannot find resume" };
  }
  const resume = await UserResume.findByIdAndDelete(id);

  if (!resume) {
    return { success: false, message: "Cannot find resume" };
  }

  revalidatePath("/dashboard");
};
