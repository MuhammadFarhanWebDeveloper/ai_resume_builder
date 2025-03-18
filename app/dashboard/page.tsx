import CardsSectionDashboard from "@/components/dashboard/CardsSection";

import React from "react";

export default async function page() {
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl">My Resume</h1>
        <p>Start create your resume for your next job</p>
      </div>
      <div className="my-2">
        <CardsSectionDashboard />
      </div>
    </div>
  );
}
