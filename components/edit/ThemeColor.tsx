"use client";
import React from "react";
import { Button } from "../ui/button";
import { LayoutGrid } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useResume } from "@/context/resume";

export default function ThemeColor() {
  const { resume, updateResume } = useResume();
  const themeColors = [
    "#FF0000", // Red
    "#FF4500", // Orange Red
    "#FF8C00", // Dark Orange
    "#FFD700", // Gold
    "#32CD32", // Lime Green
    "#008000", // Green
    "#006400", // Dark Green
    "#00CED1", // Dark Turquoise
    "#1E90FF", // Dodger Blue
    "#0000CD", // Medium Blue
    "#4B0082", // Indigo
    "#800080", // Purple
    "#8B0000", // Dark Red
    "#DC143C", // Crimson
    "#FF1493", // Deep Pink
    "#8B008B", // Dark Magenta
    "#FF00FF", // Magenta
    "#A52A2A", // Brown
    "#2F4F4F", // Dark Slate Gray
    "#C71585", // Medium Violet Red (instead of Black)
  ];

  const onSelectTheme = (color: string) => {
    updateResume({ themeColor: color });
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="flex gap-2">
            <LayoutGrid />
            Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent className="grid grid-cols-4 gap-2 p-4">
          {themeColors.map((color, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-full border-2 border-transparent hover:border-gray-500 transition-all"
              style={{ backgroundColor: color }}
              onClick={() => onSelectTheme(color)}
            />
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
