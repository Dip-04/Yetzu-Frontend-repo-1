import React from "react";
import PageFAQSection from "@/components/shared/PageFAQSection";
import AssignmentWorkflow from "./components/WrokFlow";
import AssignmentWorkflowWithSteps from "./components/AssignmentWorkflows";
import MeetTheBrains from "./components/MeetTheBrains";

const page = () => {
  return (
    <div className="flex flex-col gap-4 mb-5 font-inter">
      <MeetTheBrains />
      <AssignmentWorkflowWithSteps />
      <AssignmentWorkflow />
      <PageFAQSection pageKey="assignments" />
    </div>
  );
};

export default page;
