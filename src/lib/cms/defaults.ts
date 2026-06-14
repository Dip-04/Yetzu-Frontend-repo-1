import type { HomePageContent } from "./types";

export const DEFAULT_HOME_CONTENT: HomePageContent = {
  hero: {
    topMessage: "150+ Students Enrolled",
    blackheader: "Your Ultimate Academic",
    blueheader: "Mentorship & Learning Ecosystem",
    subheading:
      "Work with verified mentors, structured programs, and secure review systems that take you from idea to publication-ready step by step.",
    stats: [
      { num: "92%", label: "Progress completed in guided research tracks" },
      { num: "3x", label: "Faster path from idea to submission" },
      { num: "78%", label: "Learners reporting higher academic confidence" },
      { num: "40+", label: "Expert mentors across research and clinical domains" },
    ],
    avatars: [
      "/images/Avatar (1).png",
      "/images/Avatar (2).png",
      "/images/Avatar.png",
    ],
    heroImage: "/images/Hero Section.png",
  },

  video: {
    heading: "A platform built by mentors who've walked your path",
    youtubeEmbedUrl:
      "https://www.youtube.com/embed/VCPGMjCW0is?rel=0&modestbranding=1",
  },

  webinars: {
    tagline: "Live research training, aligned with your next career step",
    subTagline: "Upcoming",
    ctaLabel: "View all sessions & programs",
  },

  mentorship: {
    heading: "1:1 mentorship that makes research feel possible",
    subtext:
      "Book dedicated time with a verified mentor to clarify your topic, structure your project, and move confidently toward publication.",
    buttonText: "Explore 1:1 mentorship sessions",
    featureIcon: "/images/Icon.png",
    cards: [
      {
        title: "Clarity on your path",
        desc: "Define your goals, choose the right project, and understand exactly what to do next.",
        bgColor: "bg-[#E6EAFF]",
        iconBg: "bg-[#9BAAFE]",
        titleColor: "text-[#252525]",
        descColor: "text-[#252525]",
      },
      {
        title: "Line-by-line feedback",
        desc: "Get detailed comments on your drafts, analyses, and structure not vague suggestions.",
        bgColor: "bg-[#506BFE]",
        iconBg: "bg-[#E6EAFF]",
        titleColor: "text-white",
        descColor: "text-white",
      },
      {
        title: "Study-friendly scheduling",
        desc: "Use flexible scheduling and rescheduling to fit mentorship around your workload.",
        bgColor: "bg-[#E6EAFF]",
        iconBg: "bg-[#9BAAFE]",
        titleColor: "text-[#252525]",
        descColor: "text-[#252525]",
      },
      {
        title: "From doubt to readiness",
        desc: "Walk away from each session with concrete tasks, timelines, and measurable progress.",
        bgColor: "bg-[#506BFE]",
        iconBg: "bg-[#E6EAFF]",
        titleColor: "text-white",
        descColor: "text-white",
      },
    ],
  },

  assignmentSupport: {
    heading: "Assignments designed to turn understanding into expertise",
    buttonText: "See how assignments work in Yetzu sessions",
    cards: [
      {
        title: "Practice with purpose",
        description: "Apply concepts through structured tasks that mirror real research workflows.",
        image: "/images/Assignment Submission Card.png",
        imageAlt: "Practice with purpose",
      },
      {
        title: "Feedback you can act on",
        description: "Receive clear, written feedback so you know exactly how to improve.",
        image: "/images/assignment.png",
        imageAlt: "Feedback you can act on",
      },
      {
        title: "Progress you can see",
        description: "Track drafts, versions, and reviews as your work matures over time.",
        image: "/images/Progress Tracking Image.png",
        imageAlt: "Progress you can see",
      },
      {
        title: "Portfolio in the making",
        description: "Convert completed assignments into a credible body of academic work.",
        image: "/images/Certificates Visual.png",
        imageAlt: "Portfolio in the making",
      },
    ],
  },

  testimonials: {
    tag: "Trust",
    tagline: "Learners who chose guidance over guesswork",
    subTagline:
      "Read how medical students, researchers, and professionals used Yetzu mentorship, cohorts, and assignments to move from uncertainty to publication-ready work.",
    testimonials: [
      {
        name: "Sohab Alam",
        role: "Neurosurgeon",
        text: "Yetzu transformed my approach to studying with personalized mentorship that kept me focused and confident.",
        avatar: "/images/Avatar.png",
      },
      {
        name: "Ananya Sharma",
        role: "Medical Student",
        text: "The guidance I received was beyond academics — it shaped how I think and plan for success.",
        avatar: "/images/Avatar.png",
      },
      {
        name: "Rahul Mehta",
        role: "Engineering Graduate",
        text: "Yetzu's mentors were incredibly supportive and practical — helping me balance learning and life.",
        avatar: "/images/Avatar.png",
      },
      {
        name: "Priya Patel",
        role: "Business Analyst",
        text: "Loved how structured and insightful every mentorship session was. Highly recommend to all learners!",
        avatar: "/images/Avatar.png",
      },
      {
        name: "Amit Verma",
        role: "Data Scientist",
        text: "The entire learning journey felt personalized and truly empowering — a great experience overall.",
        avatar: "/images/Avatar.png",
      },
    ],
  },

  ctaBreak: {
    tagline: "Don't guess your way through research. Get guided.",
    description:
      "If you're serious about building an academic profile USMLE, PLAB, residency, postgraduate programs, or a research-driven career you don't have to do it alone.",
    button1Label: "Browse upcoming sessions",
    button2Label: "Book a mentorship consult",
  },

  programsWebinars: {
    tagline: "What's happening next on Yetzu",
    heroTagline:
      "Explore upcoming webinars and programs led by experienced educators with dates, times, and mentors clearly listed so you can plan with confidence.",
  },

  resources: {
    heading: "Resources",
    subheading:
      "In-depth guides, checklists, and explanations on research, publication readiness, and academic careers so you learn the Yetzu way, even before you enroll.",
    buttonText: "Explore research guides & blogs",
    featured: {
      title:
        "Lorem ipsum, can be used for free any where for anything. It is effective tool so",
      excerpt:
        "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
      image: "/images/blog.png",
      avatar: "/images/Avatar (1).png",
      author: "John Doe",
      date: "Saturday 9:00PM",
    },
    blogs: [
      {
        title: "Lorem ipsum, can be used for free any where",
        excerpt:
          "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
        image: "/images/blog2.png",
        avatar: "/images/Avatar (1).png",
        author: "John Doe",
        date: "Saturday 9:00PM",
      },
      {
        title: "Lorem ipsum, can be used for free any where",
        excerpt:
          "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
        image: "/images/blog2.png",
        avatar: "/images/Avatar (1).png",
        author: "John Doe",
        date: "Saturday 9:00PM",
      },
      {
        title: "Lorem ipsum, can be used for free any where",
        excerpt:
          "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
        image: "/images/blog2.png",
        avatar: "/images/Avatar (1).png",
        author: "John Doe",
        date: "Saturday 9:00PM",
      },
    ],
  },

  faq: {
    tag: "Questions",
    description: "Clear answers to your most common doubts.",
    faqs: [
      {
        id: 1,
        question: "Your Question goes here?",
        answer:
          "Accordion description goes here. Try to keep it under 2 lines so it looks good and minimal.",
      },
      {
        id: 2,
        question: "Your Question goes here?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut erat id nunc convallis facilisis.",
      },
      {
        id: 3,
        question: "Your Question goes here?",
        answer:
          "Accordion description goes here. Try to keep it under 2 lines so it looks good and minimal.",
      },
      {
        id: 4,
        question: "Your Question goes here?",
        answer:
          "This can be any short piece of information your users frequently ask.",
      },
      {
        id: 5,
        question: "Your Question goes here?",
        answer:
          "Make sure to provide clear and concise answers for best user experience.",
      },
    ],
    ctaText: "Still have questions?",
    ctaLabel: "Ask Here",
  },

  finalCta: {
    tagline: "Your effort deserves recognition. Start building it.",
    description:
      "Whether you're preparing for exams, targeting journals, or building a long-term academic career, Yetzu gives you verified mentors, structured pathways, and secure tools to turn potential into proven credibility. Take the first step today.",
    ctaLabel: "Get started with Yetzu",
  },
};
