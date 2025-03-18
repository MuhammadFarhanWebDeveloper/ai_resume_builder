import { NotebookText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ResumeCard({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="bg-card-foreground cursor-pointer text-card w-[230px] rounded-lg flex justify-center items-center h-[250px]"
    >
      <NotebookText size={30} />
      <p>{title}</p>
    </Link>
  );
}
