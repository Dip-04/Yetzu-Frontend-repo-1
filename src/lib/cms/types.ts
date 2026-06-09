export interface HeroStat {
  num: string;
  label: string;
}

export interface HeroData {
  topMessage: string;
  heading: string;
  subheading: string;
  stats: HeroStat[];
  avatars: string[];
  heroImage: string;
}

export interface VideoData {
  heading: string;
  youtubeEmbedUrl: string;
}

export interface MentorshipCard {
  title: string;
  desc: string;
  bgColor: string;
  iconBg: string;
  titleColor: string;
  descColor: string;
}

export interface MentorshipData {
  heading: string;
  subtext: string;
  buttonText: string;
  featureIcon: string;
  cards: MentorshipCard[];
}

export interface AssignmentCard {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface AssignmentSupportData {
  heading: string;
  buttonText: string;
  cards: AssignmentCard[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface TestimonialsData {
  tag: string;
  tagline: string;
  subTagline: string;
  testimonials: Testimonial[];
}

export interface WebinarsData {
  tagline: string;
  subTagline: string;
  ctaLabel: string;
}

export interface CtaBreakData {
  tagline: string;
  description: string;
  button1Label: string;
  button2Label: string;
}

export interface ProgramsWebinarsData {
  tagline: string;
  heroTagline: string;
}

export interface ResourceBlog {
  title: string;
  excerpt: string;
  image: string;
  avatar: string;
  author: string;
  date: string;
}

export interface ResourcesData {
  heading: string;
  subheading: string;
  buttonText: string;
  featured: ResourceBlog;
  blogs: ResourceBlog[];
}

export interface FAQData {
  tag: string;
  description: string;
  faqs: FAQItem[];
  ctaText: string;
  ctaLabel: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FinalCtaData {
  tagline: string;
  description: string;
  ctaLabel: string;
}

export interface HomePageContent {
  hero: HeroData;
  video: VideoData;
  webinars: WebinarsData;
  mentorship: MentorshipData;
  assignmentSupport: AssignmentSupportData;
  testimonials: TestimonialsData;
  ctaBreak: CtaBreakData;
  programsWebinars: ProgramsWebinarsData;
  resources: ResourcesData;
  faq: FAQData;
  finalCta: FinalCtaData;
}

export type SectionKey =
  | "hero"
  | "video"
  | "webinars"
  | "mentorship"
  | "assignmentSupport"
  | "testimonials"
  | "ctaBreak"
  | "programsWebinars"
  | "resources"
  | "faq"
  | "finalCta";

export interface CMSSectionResponse<D = Record<string, unknown>> {
  _id: string;
  pageKey: string;
  sectionKey: string;
  sectionTitle: string;
  sortOrder: number;
  metadata: Record<string, unknown>;
  data: D;
}
