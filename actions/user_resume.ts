"use server";

import connectToDB from "@/lib/connectToDB";
import { UserResume } from "@/models/user_resume";
import { revalidatePath } from "next/cache";

export const SaveResume = async (formData: FormData) => {
  try {
    await connectToDB();
    const title = formData.get("title") as string;
    const userid = formData.get("userid") as string;
    console.log(`UID: ${userid}`);
    const newResume = await UserResume.create({ title, userid });
    revalidatePath("/dashboard");
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
