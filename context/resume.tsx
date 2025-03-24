"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ResumeType = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summery: string;
  experience: {
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummery: string;
  }[];
  education: {
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
  }[];
  skills: {
    name: string;
    rating: number;
  }[];
};

interface ResumeContextType {
  resume: ResumeType;
  updateResume: (newData: Partial<ResumeType>) => void;
}


const emptyResume: ResumeType = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "#ff6666",
  summery: "",
  experience: [
    {
      title: "",
      companyName: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      workSummery: "",
    },
  ],
  education: [
    {
      universityName: "",
      startDate: "",
      endDate: "",
      degree: "",
      major: "",
      description: "",
    },
  ],
  skills: [
    {
      name: "",
      rating: 0,
    },
  ],
};
// Create Context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({
  children,
  resumeProp,
}: {
  children: ReactNode;
  resumeProp?: ResumeType;
}) => {
  const [resume, setResume] = useState<ResumeType>(resumeProp || emptyResume);

  const updateResume = (newData: Partial<ResumeType>) => {
    setResume((prev) => ({ ...prev, ...newData }));
  };

  return (
    <ResumeContext.Provider value={{ resume, updateResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use ResumeContext
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
