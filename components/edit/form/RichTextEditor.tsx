"use client";
import { useResume } from "@/context/resume";
import React, { useState } from "react";
import {
  EditorProvider,
  Editor,
  BtnBold,
  BtnItalic,
  Toolbar,
  BtnUndo,
  BtnRedo,
  Separator,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  HtmlButton,
  BtnStyles,
  ContentEditableEvent,
} from "react-simple-wysiwyg";
export default function RichTextEditor({
  index,
  defaultValue,
}: {
  index: number;
  defaultValue: string;
}) {
  const { resume, updateResume } = useResume();
  const [value, setValue] = useState(defaultValue || "");

  const onChange = (e: ContentEditableEvent) => {
    updateResume({
      experience: resume.experience.map((exp, i) =>
        i === index ? { ...exp, workSummery: e.target.value } : exp
      ),
    });
  };
  return (
    <EditorProvider>
      <Editor
        value={resume.experience[index]?.workSummery || ""}
        onChange={onChange}
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
