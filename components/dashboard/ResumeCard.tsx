"use client";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ConfirmDeleteDialog from "./ConfirmDelete";
import { useTransition } from "react";
import { deleteResume } from "@/actions/resume_action";

export default function ResumeCard({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    const formData = new FormData();
    formData.append("id", id);

    startTransition(async () => {
      const resume = await deleteResume(formData);
    });
  };

  return (
    <div className="border overflow-hidden border-primary rounded-lg">
      <Link
        href={`/dashboard/${id}/view`}
        className=" cursor-pointer text-card min-w-[230px]  flex justify-center items-center h-[250px]"
      >
        <Image width={150} height={150} src={"/resume.png"} alt="Resume" />
      </Link>
      <div className="px-2 gap-5 bg-foreground text-white py-3 flex items-center justify-between">
        <h2 className="">{title}</h2>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-2 cursor-pointer border-white rounded-full w-fit h-fit p-1">
              <EllipsisVertical size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/${id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ConfirmDeleteDialog isPending={isPending} onConfirm={() => onDelete()}>
                  <div className="font-bold px-2 cursor-pointer text-red-700">
                    Delete
                  </div>
                </ConfirmDeleteDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
