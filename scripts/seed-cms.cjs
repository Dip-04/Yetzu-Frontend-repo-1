const axios = require("axios");

const BASE_URL = process.env.API_BASE_URL || "https://productionyetzuapi.yetzu.com";
const AUTH_TOKEN = process.env.ADMIN_TOKEN || process.env.ADMIN_JWT || "<YOUR_ADMIN_JWT>";
const USER_ID = process.env.ADMIN_USER_ID || "cccccccc-1111-4111-8111-cccccccccccc";
const PAGE_KEY = "home";

const SECTIONS = [
  {
    sectionKey: "hero",
    sectionTitle: "Hero Section",
    sortOrder: 0,
    metadata: {},
    data: {
      topMessage: "150+ Students Enrolled",
      blackheader: "Your Ultimate Academic",
      blueheader: "Mentorship & Learning Ecosystem",
      subheading: "Work with verified mentors, structured programs, and secure review systems that take you from idea to publication-ready step by step.",
      avatars: [
        "/images/Avatar (1).png",
        "/images/Avatar (2).png",
        "/images/Avatar.png",
      ],
      stats: [
        { num: "92%", label: "Progress completed in guided research tracks" },
        { num: "3x", label: "Faster path from idea to submission" },
        { num: "78%", label: "Learners reporting higher academic confidence" },
        { num: "40+", label: "Expert mentors across research and clinical domains" },
      ],
      heroImage: "/images/Hero Section.png",
    },
  },
  {
    sectionKey: "video",
    sectionTitle: "Video Section",
    sortOrder: 1,
    metadata: {},
    data: {
      heading: "A platform built by mentors who've walked your path",
      youtubeEmbedUrl: "https://www.youtube.com/embed/VCPGMjCW0is?rel=0&modestbranding=1",
    },
  },
  {
    sectionKey: "webinars",
    sectionTitle: "Webinars Section",
    sortOrder: 2,
    metadata: {},
    data: {
      tagline: "Live research training, aligned with your next career step",
      subTagline: "Upcoming",
      ctaLabel: "View all sessions & programs",
    },
  },
  {
    sectionKey: "mentorship",
    sectionTitle: "1:1 Mentorship",
    sortOrder: 3,
    metadata: {},
    data: {
      heading: "1:1 mentorship that makes research feel possible",
      subtext: "Book dedicated time with a verified mentor to clarify your topic, structure your project, and move confidently toward publication.",
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
  },
  {
    sectionKey: "assignmentSupport",
    sectionTitle: "Assignment Support",
    sortOrder: 4,
    metadata: {},
    data: {
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
  },
  {
    sectionKey: "testimonials",
    sectionTitle: "Testimonials",
    sortOrder: 5,
    metadata: {},
    data: {
      tag: "Trust",
      tagline: "Learners who chose guidance over guesswork",
      subTagline: "Read how medical students, researchers, and professionals used Yetzu mentorship, cohorts, and assignments to move from uncertainty to publication-ready work.",
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
  },
  {
    sectionKey: "programsWebinars",
    sectionTitle: "Programs & Webinars",
    sortOrder: 7,
    metadata: {},
    data: {
      tagline: "What's happening next on Yetzu",
      heroTagline: "Explore upcoming webinars and programs led by experienced educators with dates, times, and mentors clearly listed so you can plan with confidence.",
    },
  },
  {
    sectionKey: "resources",
    sectionTitle: "Resources",
    sortOrder: 8,
    metadata: {},
    data: {
      heading: "Resources",
      subheading: "In-depth guides, checklists, and explanations on research, publication readiness, and academic careers so you learn the Yetzu way, even before you enroll.",
      buttonText: "Explore research guides & blogs",
      featured: {
        title: "Lorem ipsum, can be used for free any where for anything. It is effective tool so",
        excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
        image: "/images/blog.png",
        avatar: "/images/Avatar (1).png",
        author: "John Doe",
        date: "Saturday 9:00PM",
      },
      blogs: [
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/images/blog2.png",
          avatar: "/images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/images/blog2.png",
          avatar: "/images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/images/blog2.png",
          avatar: "/images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
      ],
      cards: [
        {
          title: "Lorem ipsum, can be used for free any where for anything. It is effective tool so",
          excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/images/blog.png",
          avatar: "/images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/images/blog2.png",
          avatar: "/images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/images/blog2.png",
          avatar: "/images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt: "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/images/blog2.png",
          avatar: "/images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
      ],
    },
  },
];

async function seedSection(section) {
  const url = `${BASE_URL}/api/cms/pages/${PAGE_KEY}/sections/${section.sectionKey}`;
  const payload = {
    sectionTitle: section.sectionTitle,
    sortOrder: section.sortOrder,
    metadata: section.metadata,
    data: section.data,
  };

  try {
    const response = await axios.put(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "x-user-id": USER_ID,
        userid: USER_ID,
      },
    });
    const status = response.status;
    console.log(`[OK] ${section.sectionKey.padEnd(22)} ${status}`);
    return true;
  } catch (error) {
    const status = error?.response?.status || "ERR";
    const message = error?.response?.data?.message || error?.message || "Unknown error";
    console.error(`[FAIL] ${section.sectionKey.padEnd(22)} ${status}  ${String(message).slice(0, 200)}`);
    return false;
  }
}

async function main() {
  console.log(`\n Seeding CMS page "${PAGE_KEY}" at ${BASE_URL}\n`);
  let ok = 0;
  let fail = 0;

  for (const section of SECTIONS) {
    const success = await seedSection(section);
    if (success) ok++;
    else fail++;
  }

  console.log(`\n Done. ${ok} seeded, ${fail} failed.\n`);
}

main();
