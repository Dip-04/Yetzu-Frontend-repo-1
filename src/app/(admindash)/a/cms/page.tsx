"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown } from "lucide-react";
import { CMSSidebar } from "./components/CMSSidebar";

import { HeroSectionEditor } from "./components/HeroSectionEditor";
import { VideoSectionEditor } from "./components/VideoSectionEditor";
import { MentorshipSectionEditor } from "./components/MentorshipSectionEditor";
import { AssignmentSupportSectionEditor } from "./components/AssignmentSupportSectionEditor";
import { ResourcesSectionEditor } from "./components/ResourcesSectionEditor";
import { WebinarsSectionEditor } from "./components/WebinarsSectionEditor";
import { TestimonialsSectionEditor } from "./components/TestimonialsSectionEditor";
import { JoinCommunitySectionEditor } from "./components/JoinCommunitySectionEditor";
import { ProgramsWebinarsSectionEditor } from "./components/ProgramsWebinarsSectionEditor";
import { TrustedByLeadersEditor } from "./components/TrustedByLeadersEditor";

import { AboutHeroSectionEditor } from "./components/AboutHeroSectionEditor";
import { FounderStoryEditor } from "./components/FounderStoryEditor";
import { TeamSectionEditor } from "./components/TeamSectionEditor";
import { MissionVisionSectionEditor } from "./components/MissionVisionSectionEditor";
import { InitiativesSectionEditor } from "./components/InitiativesSectionEditor";
import { PurposeBeliefSectionEditor } from "./components/PurposeBeliefSectionEditor";
import { OurImpactSectionEditor } from "./components/OurImpactSectionEditor";

import { CoursesHeroEditor } from "./components/CoursesHeroEditor";
import { CourseFiltersEditor } from "./components/CourseFiltersEditor";
import { CourseCardsEditor } from "./components/CourseCardsEditor";
import { CertificationSectionEditor } from "./components/CertificationSectionEditor";
import { PromoCardsEditor } from "./components/PromoCardsEditor";
import { BookSlotSectionEditor } from "./components/BookSlotSectionEditor";
import { FAQSectionEditor } from "./components/FAQSectionEditor";

import { MeetTheBrainsEditor } from "./components/MeetTheBrainsEditor";
import { AssignmentWorkflowsEditor } from "./components/AssignmentWorkflowsEditor";
import { AssignmentWorkflowEditor } from "./components/AssignmentWorkflowEditor";

import { ContactFormEditor } from "./components/ContactFormEditor";
import { OurOfficesEditor } from "./components/OurOfficesEditor";
import { ContactResourceCardsEditor } from "./components/ContactResourceCardsEditor";

import { CMSApi } from "@/lib/api/cmsApi";
import { SECTION_KEY_MAP, getDefaultSectionData } from "./sectionConfig";

interface EditorProps {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  pageKey: string;
}

type EditorComponent = React.FC<EditorProps>;

const SECTION_EDITORS: Record<string, Record<string, EditorComponent>> = {
  home: {
    "Hero Section": HeroSectionEditor as EditorComponent,
    "Video Section": VideoSectionEditor as EditorComponent,
    "Webinars Section": WebinarsSectionEditor as EditorComponent,
    "1:1 Mentorship": MentorshipSectionEditor as EditorComponent,
    "Assignment Support": AssignmentSupportSectionEditor as EditorComponent,
    "Testimonials": TestimonialsSectionEditor as EditorComponent,
    "Join Community": JoinCommunitySectionEditor as EditorComponent,
    "Programs & Webinars": ProgramsWebinarsSectionEditor as EditorComponent,
    "Resources": ResourcesSectionEditor as EditorComponent,
    "FAQs": FAQSectionEditor as EditorComponent,
    "Trusted By Leaders": TrustedByLeadersEditor as EditorComponent,
  },
  about: {
    "About Hero": AboutHeroSectionEditor as EditorComponent,
    "Founder Story": FounderStoryEditor as EditorComponent,
    "Team Section": TeamSectionEditor as EditorComponent,
    "Mission & Vision": MissionVisionSectionEditor as EditorComponent,
    "Initiatives": InitiativesSectionEditor as EditorComponent,
    "Purpose & Belief": PurposeBeliefSectionEditor as EditorComponent,
    "Our Impact": OurImpactSectionEditor as EditorComponent,
    "Trusted By Leaders": TrustedByLeadersEditor as EditorComponent,
  },
  courses: {
    "Courses Hero": CoursesHeroEditor as EditorComponent,
    "Course Filters": CourseFiltersEditor as EditorComponent,
    "Course Cards": CourseCardsEditor as EditorComponent,
    "Testimonials": TestimonialsSectionEditor as EditorComponent,
    "Certification": CertificationSectionEditor as EditorComponent,
    "FAQs": FAQSectionEditor as EditorComponent,
    "Promo Cards": PromoCardsEditor as EditorComponent,
    "Book Slot": BookSlotSectionEditor as EditorComponent,
  },
  assignments: {
    "Meet The Brains": MeetTheBrainsEditor as EditorComponent,
    "Assignment Workflow Steps": AssignmentWorkflowsEditor as EditorComponent,
    "Assignment Workflow": AssignmentWorkflowEditor as EditorComponent,
    "FAQs": FAQSectionEditor as EditorComponent,
  },
  contact: {
    "Contact Form": ContactFormEditor as EditorComponent,
    "Our Offices": OurOfficesEditor as EditorComponent,
    "Resource Cards": ContactResourceCardsEditor as EditorComponent,
    "FAQs": FAQSectionEditor as EditorComponent,
    "Book Slot": BookSlotSectionEditor as EditorComponent,
  },
};

export default function CMSPage() {
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState("Hero Section");
  const [sectionsData, setSectionsData] = useState<Record<string, Record<string, unknown>>>({});
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const pageEditors = SECTION_EDITORS[activePage];
  const EditorComponent = pageEditors ? pageEditors[activeSection] : null;

  const loadPageData = useCallback(async (page: string) => {
    setLoading(true);
    const keys = SECTION_KEY_MAP[page];
    if (!keys) {
      setSectionsData({});
      setLoading(false);
      return;
    }

    const results: Record<string, Record<string, unknown>> = {};
    const entries = Object.entries(keys);

    await Promise.all(
      entries.map(async ([displayName, sectionKey]) => {
        const section = await CMSApi.getSection(page, sectionKey);
        results[displayName] = (section?.data ?? getDefaultSectionData(page, displayName)) as Record<string, unknown>;
      })
    );

    setSectionsData(results);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPageData(activePage);
  }, [activePage, loadPageData]);

  const handlePageSelect = (page: string) => {
    setActivePage(page);
    const firstSection = Object.keys(SECTION_EDITORS[page] || {})[0] || "";
    setActiveSection(firstSection);
    setDirty(new Set());
    setSaveStatus("idle");
  };

  const handleDataChange = (displayName: string, newData: Record<string, unknown>) => {
    setSectionsData((prev) => ({ ...prev, [displayName]: newData }));
    setDirty((prev) => new Set(prev).add(displayName));
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    if (dirty.size === 0) return;
    setSaving(true);
    setSaveStatus("saving");

    const keys = SECTION_KEY_MAP[activePage];
    let allSuccess = true;

    for (const displayName of dirty) {
      const sectionKey = keys?.[displayName];
      const data = sectionsData[displayName];
      if (sectionKey && data) {
        const ok = await CMSApi.updateSection(activePage, sectionKey, { data });
        if (!ok) allSuccess = false;
      }
    }

    if (allSuccess) {
      setDirty(new Set());
      setSaveStatus("success");
    } else {
      setSaveStatus("error");
    }
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-[24px] font-semibold text-[#0A0A0A]"
            style={{
              fontFamily: "'Inter', sans-serif",
              lineHeight: "36px",
              letterSpacing: "0.0703125px",
            }}
          >
            Content Management System
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {saveStatus === "success"
              ? "All changes saved successfully."
              : saveStatus === "error"
                ? "Some changes failed to save. Please try again."
                : saveStatus === "saving"
                  ? "Saving changes..."
                  : dirty.size > 0
                    ? `${dirty.size} section(s) have unsaved changes.`
                    : "Edit and manage content for all public pages."}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={dirty.size === 0 || saving}
          className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${
            dirty.size === 0
              ? "bg-slate-300 cursor-not-allowed"
              : saving
                ? "bg-slate-500 cursor-wait"
                : "bg-slate-900 hover:bg-slate-800"
          }`}
        >
          {saving ? "Saving..." : dirty.size > 0 ? `Save Changes (${dirty.size})` : "Update CMS"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative w-56">
          <select
            value={activePage}
            onChange={(e) => handlePageSelect(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 font-medium"
          >
            <option value="home">Home</option>
            <option value="about">About Us</option>
            <option value="courses">Courses</option>
            <option value="assignments">Assignments</option>
            <option value="contact">Contact Us</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <div className="relative w-full sm:max-w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            placeholder="Search sections..."
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <CMSSidebar
          activePage={activePage}
          activeSection={activeSection}
          onPageSelect={handlePageSelect}
          onSectionSelect={setActiveSection}
        />

        <div className="flex-1 max-w-4xl pt-2">
          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-400 p-12">
              Loading section data...
            </div>
          ) : EditorComponent ? (
            <EditorComponent
              data={sectionsData[activeSection] ?? getDefaultSectionData(activePage, activeSection)}
              onChange={(newData) => handleDataChange(activeSection, newData)}
              pageKey={activePage}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 p-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              Select a section to edit from the sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
