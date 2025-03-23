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

const dummyResumeData: ResumeType = {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "full stack developer",
  address: "525 N tryon Street, NC 28117",
  phone: "(123)-456-7890",
  email: "exmaple@gmail.com",
  themeColor: "#ff6666",
  summery:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  experience: [
    {
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummery:
        "• Designed, developed, and maintained full-stack applications using React and Node.js.\n" +
        "• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n" +
        "various devices and browsers.\n" +
        "• Maintaining the React Native in-house organization application." +
        "• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end" +
        "and back-end systems.",
    },
    {
      title: "Frontend Developer",
      companyName: "Google",
      city: "Charlotte",
      state: "NC",
      startDate: "May 2019",
      endDate: "Jan 2021",
      currentlyWorking: false,
      workSummery:
        " Designed, developed, and maintained full-stack applications using React and Node.js." +
        "• Implemented responsive user interfaces with React, ensuring seamless user experiences across" +
        "various devices and browsers." +
        "• Maintaining the React Native in-house organization application." +
        "• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end" +
        "and back-end systems.",
    },
  ],
  education: [
    {
      universityName: "Western Illinois University",
      startDate: "Aug 2018",
      endDate: "Dec:2019",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    },
    {
      universityName: "Western Illinois University",
      startDate: "Aug 2018",
      endDate: "Dec:2019",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    },
  ],
  skills: [
    {
      name: "Angular",
      rating: 4,
    },
    {
      name: "React",
      rating: 5,
    },
    {
      name: "MySql",
      rating: 4,
    },
    {
      name: "React Native",
      rating: 5,
    },
  ],
};

const emptyResume: ResumeType = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "#000000",
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
