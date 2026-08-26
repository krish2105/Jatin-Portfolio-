import type {
  BuildProject,
  ContactContent,
  EducationEntry,
  ExperienceEntry,
  HeroContent,
  NavItem,
  NowContent,
  Profile,
  RecordTile,
  SkillGroup,
  StackPanel,
} from "@/types/portfolio";

/* ==========================================================================
   ALL SITE COPY LIVES HERE. Nothing in `src/components` hard-codes text.
   To update the site, edit this file.
   ========================================================================== */

export const profile: Profile = {
  name: "Jatin Acharya",
  role: "Oracle NetSuite Functional Consultant",
  tagline: "Enterprise systems by day. Computer vision by conviction.",
  location: "Pune, Maharashtra, India",
  email: "jatinacharya786@gmail.com",
  phone: "+91 7976859039",
  linkedin: "https://www.linkedin.com/in/jatin-acharya-148032230",
  github: "https://github.com/AcharyaJatin20",
};

export const hero: HeroContent = {
  eyebrow: "ORACLE NETSUITE FUNCTIONAL CONSULTANT · PUNE",
  display: "JATIN ACHARYA",
  rotating: ["ERP implementations", "computer vision", "client delivery"],
  sub: "I implement the systems companies run on, and build the models that make them smarter. B.Tech (Hons.) CSE — AI & ML, 9.37 CGPA.",
  ctaPrimary: "See the work",
  ctaSecondary: "Download resume",
};

export const ticker: readonly string[] = [
  "Oracle NetSuite",
  "Python",
  "OpenCV",
  "SuiteScript",
  "scikit-learn",
  "SQL",
  "ERP Implementation",
  "Computer Vision",
  "Functional Testing",
  "TensorFlow",
  "Business Process Analysis",
  "MediaPipe",
  "Requirement Gathering",
  "Machine Learning",
];

/* -------------------------------------------------------------------------- */

export const stacks: readonly StackPanel[] = [
  {
    id: "systems",
    label: "SYSTEMS",
    body: "Since January 2025 I've worked on Oracle NetSuite implementations end to end — gathering requirements from clients, configuring modules, running functional testing, and training the people who use it every day. The work taught me something a degree can't: most enterprise problems aren't modelling problems. They're process problems wearing a technical costume.",
  },
  {
    id: "models",
    label: "MODELS",
    body: "My degree is in AI and ML, and that's still where I build for myself. Computer vision mostly — gesture tracking, medical image classification, the kind of problem where the data is messy and the ground truth is contested. I graduated top of my cohort across five consecutive semesters, which mattered less than the one hackathon we won at 4am with a model that finally converged.",
  },
  {
    id: "seam",
    label: "THE SEAM",
    body: "The interesting work is between the two. Enterprise systems generate enormous, structured, underused data. I want to be the person who can read the process and build the model.",
  },
];

/* -------------------------------------------------------------------------- */

export const experience: readonly ExperienceEntry[] = [
  {
    id: "epiq",
    company: "EPIQ Softech India Pvt Ltd",
    location: "Pune, Maharashtra",
    mode: "On-site",
    roles: [
      {
        title: "Oracle NetSuite Functional Consultant",
        employment: "Full-time",
        period: "May 2026 – Present",
        sortKey: "2026-05",
        isCurrent: true,
        bullets: [
          "Delivering end-to-end Oracle NetSuite implementation projects, from module configuration through go-live.",
          "Providing ongoing functional support to live clients, resolving process and configuration issues as they surface.",
        ],
      },
    ],
  },
  {
    id: "prateek",
    company: "Prateek Technosoft India Pvt Ltd",
    location: "Jaipur, Rajasthan",
    mode: "On-site",
    duration: "1 yr 5 mos",
    skills: ["ERP Basics", "Functional Testing", "NetSuite Configuration"],
    roles: [
      {
        title: "Oracle NetSuite Functional Consultant",
        employment: "Full-time",
        period: "May 2025 – May 2026",
        sortKey: "2025-05",
        bullets: [
          "Delivered end-to-end Oracle NetSuite ERP implementations: module configuration, functional testing, and go-live support across client engagements.",
          "Ran client requirement-gathering sessions and user training, owning system adoption from kickoff through handover.",
        ],
      },
      {
        title: "Trainee Oracle NetSuite Functional Consultant",
        employment: "Internship",
        period: "Jan 2025 – Apr 2025",
        sortKey: "2025-01",
        bullets: [
          "Learned NetSuite configuration and ERP process analysis on live client implementations.",
        ],
      },
    ],
  },
  {
    id: "ibm",
    company: "IBM",
    location: "Remote",
    roles: [
      {
        title: "Project Trainee",
        employment: "Apprenticeship",
        period: "Jun 2024 – Jul 2024",
        sortKey: "2024-06",
        bullets: [
          "Built and deployed machine learning models for predictive analytics problems over a six-week structured programme.",
          'Capstone: "Weight Loss Prediction using Linear Regression" — a regression model estimating outcomes from multi-feature health inputs. Certificate issued.',
        ],
      },
    ],
  },
  {
    id: "vvdn",
    company: "VVDN Technologies",
    location: "Gurugram",
    roles: [
      {
        title: "Internship Trainee",
        employment: "Internship",
        period: "May 2023 – Jun 2023",
        sortKey: "2023-05",
        bullets: [
          "First hands-on exposure to production data science and OpenCV, contributing to computer vision testing workflows.",
        ],
      },
    ],
  },
];

export const education: EducationEntry = {
  id: "muj",
  institution: "Manipal University Jaipur",
  qualification: "B.Tech (Hons.) Computer Science & Engineering",
  specialisation: "Artificial Intelligence & Machine Learning",
  period: "Jan 2021 – Dec 2025",
  result: "CGPA 9.37 / 10",
};

/* --------------------------------------------------------------------------
   Note on metrics: the resume carries percentage claims ("40% reduction",
   "30% accuracy improvement") with no stated baseline. They are deliberately
   omitted. What appears below is verifiable: the hackathon win, the 10,000+
   image dataset, 30fps real-time tracking. If baselines surface, add the
   numbers back WITH the baseline stated.
   -------------------------------------------------------------------------- */

export const builds: readonly BuildProject[] = [
  {
    id: "skin-disease",
    index: "01",
    title: "Skin Disease Detection from Dermoscopic Images",
    tag: "Computer Vision · Medical Imaging",
    context: "MUJHACKX — 1st place",
    dates: "Oct 2023 – Dec 2023",
    problem:
      "Dermatological diagnosis is inaccessible in large parts of India. A phone photo and a model is a plausible first-line triage.",
    approach:
      "Collected and curated a dermoscopic image dataset of 10,000+ samples, then trained a CNN classifier for multi-class skin condition identification.",
    built:
      "Data collection and curation pipeline, class-balancing, augmentation strategy, training loop, evaluation harness.",
    result: "Won first place at MUJHACKX. Team project.",
    stack: ["Python", "TensorFlow", "OpenCV", "NumPy"],
  },
  {
    id: "virtual-mouse",
    index: "02",
    title: "Virtual Mouse — Hands-Free Cursor Control",
    tag: "Computer Vision · Real-Time",
    context: "Research team project",
    dates: "May 2023 – Jun 2023",
    problem:
      "Hardware input is a barrier for users with limited motor control, and for any context where touching a surface isn't possible.",
    approach:
      "Real-time hand landmark tracking through a webcam, mapping gesture states to cursor position, click, and drag.",
    built:
      "The tracking pipeline, gesture state machine, and screen-coordinate mapping with smoothing to remove jitter.",
    result:
      "Sustained real-time tracking at 30 fps with reliable gesture recognition in normal lighting.",
    stack: ["Python", "OpenCV", "MediaPipe"],
  },
  {
    id: "syncskills",
    index: "03",
    title: "SyncSkills — Resume Analysis & ATS Optimisation",
    tag: "NLP · Product",
    context: "Minor project",
    dates: "May 2023 – Jun 2023",
    problem:
      "Applicants are rejected by ATS parsers before a human ever reads the resume, and get no feedback about why.",
    approach:
      "Parse an uploaded resume, score it against a target job description for keyword coverage and structural compliance, return specific fixes rather than a score.",
    built:
      "Parsing layer, keyword-relevance scoring, formatting checks, and the feedback generation that turns a score into an instruction.",
    result: "Substantially reduced manual resume review time for test users.",
    stack: ["Python", "NLP", "Flask"],
  },
];

/* -------------------------------------------------------------------------- */

export const recordTiles: readonly RecordTile[] = [
  {
    id: "cgpa",
    value: "9.37",
    label: "CGPA · B.Tech (Hons.) CSE — AI & ML, Manipal University Jaipur",
    size: "large",
  },
  {
    id: "deans-list",
    value: "×5",
    label:
      "Dean's List of Excellence — highest GPA, semesters 3, 4, 5, 6 and 7",
    size: "large",
  },
  {
    id: "mujhackx",
    value: "1st",
    label: "MUJHACKX Hackathon — dermatological diagnostic aid",
    size: "wide",
  },
  {
    id: "dataset",
    value: "10,000+",
    label: "dermoscopic images collected and curated",
    size: "wide",
  },
  {
    id: "placement",
    value: "Placement Coordinator",
    label: "Student Placement Coordinator, AIML Department, MUJ",
    size: "wide",
  },
  {
    id: "acm",
    value: "ACM",
    label:
      "Certificate of Appreciation — service and leadership, ACM Student Chapter",
    size: "wide",
  },
  {
    id: "school",
    value: "89% / 90%",
    label: "CBSE XII (Central Academy, Ajmer) / X (All Saints, Ajmer)",
    size: "small",
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "systems",
    label: "Systems",
    items: [
      "Oracle NetSuite",
      "ERP Implementation",
      "Functional Testing",
      "Business Process Analysis",
      "Requirement Gathering",
      "User Training",
      "DBMS",
    ],
  },
  {
    id: "models",
    label: "Models",
    items: [
      "Python",
      "Machine Learning",
      "OpenCV",
      "Computer Vision",
      "Data Analysis",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "C", "C++", "SQL", "HTML", "CSS"],
  },
  {
    id: "learning",
    label: "Learning",
    items: [
      "Data Fundamentals (IBM)",
      "Design and Analysis of Algorithms (NPTEL)",
      "Database Management Systems (Oracle)",
      "NetSuite ERP Implementation",
    ],
  },
];

export const now: NowContent = {
  body: "Currently implementing Oracle NetSuite for clients out of Pune. Reading about retrieval-augmented systems over enterprise data, and looking for the projects where ERP telemetry and machine learning actually meet.",
  open:
    "Open to conversations about: ERP-adjacent AI, data and automation consulting, and applied ML roles at companies that run real operations.",
};

export const contact: ContactContent = {
  heading: "Let's talk about the seam",
  sub: "Best reached by email. I read everything.",
  email: "jatinacharya786@gmail.com",
  resume: "/resume/Jatin_Acharya_Resume.pdf",
};

export const navItems: readonly NavItem[] = [
  { number: "03", label: "Stacks", href: "#stacks" },
  { number: "04", label: "Ledger", href: "#ledger" },
  { number: "05", label: "Builds", href: "#builds" },
  { number: "06", label: "Record", href: "#record" },
  { number: "07", label: "Now", href: "#now" },
  { number: "08", label: "Contact", href: "#contact" },
];

export const siteMeta = {
  url: "https://jatinacharya.vercel.app",
  title: `${profile.name} — ${profile.role}`,
  description:
    "Oracle NetSuite Functional Consultant and AI/ML engineer. I implement the enterprise systems companies run on, and build the computer-vision models that make them smarter.",
  portraitAlt:
    "Jatin Acharya in a checked blazer, standing in front of a large painted peacock mural",
} as const;
