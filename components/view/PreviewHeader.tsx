"use client";
import React from "react";
import { Button } from "../ui/button";

export default function PreviewHeader() {
    const handleDownload = () => {
        window.print();
      };
  return (
    <div className="w-fit mx-auto my-3 px-1 flex items-center justify-between ">
      <Button className="cursor-pointer" onClick={handleDownload}>Download</Button>
    </div>
  );
}
