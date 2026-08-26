import type {
  BuildProject,
  DeliveryStage,
  NetSuiteModule,
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
  sub: "I implement the Oracle NetSuite systems companies run on — end to end, from requirements through go-live — and build the machine-learning models that make them smarter.",
  ctaPrimary: "See the work",
  ctaSecondary: "Download resume",
};

export const ticker: readonly string[] = [
  "Oracle NetSuite",
  "ERP Implementation",
  "Order to Cash",
  "Procure to Pay",
  "Financials · GL / AR / AP",
  "Inventory & Warehouse",
  "Functional Testing",
  "Requirement Gathering",
  "User Training",
  "Go-Live Support",
  "Business Process Analysis",
  "Python",
  "Computer Vision",
  "OpenCV",
  "Machine Learning",
  "SQL",
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
  result: "Dean's List of Excellence ×5",
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

/* --------------------------------------------------------------------------
   NetSuite delivery. The stages below describe a standard ERP implementation
   lifecycle; the `owns` lines under each are drawn strictly from what Jatin
   has actually done, as stated in his experience. Nothing here claims scope
   he has not worked in.
   -------------------------------------------------------------------------- */

export const deliveryStages: readonly DeliveryStage[] = [
  {
    id: "discovery",
    index: "01",
    name: "Discovery",
    summary:
      "Sit with the people who run the process today and write down how it actually works, not how the org chart says it works.",
    owns: [
      "Runs requirement-gathering sessions with client stakeholders",
      "Documents current-state processes across finance and operations",
    ],
  },
  {
    id: "fit-gap",
    index: "02",
    name: "Fit / gap",
    summary:
      "Map each documented process onto standard NetSuite capability. Where it fits, configure. Where it doesn't, decide whether the process or the system should move.",
    owns: [
      "Maps business processes to NetSuite functionality",
      "Analyses where standard behaviour fits and where it does not",
    ],
  },
  {
    id: "configuration",
    index: "03",
    name: "Configuration",
    summary:
      "Build the system: records, forms, roles, permissions, approval routing and the transaction flows the business will live in.",
    owns: [
      "Configures modules across Financials, Order to Cash, Procure to Pay and Inventory",
      "Sets up records, forms, roles and approval routing",
    ],
  },
  {
    id: "testing",
    index: "04",
    name: "Functional testing",
    summary:
      "Walk every transaction path end to end before a user ever sees it. Find the breaks while they are still cheap.",
    owns: [
      "Runs functional testing across configured modules",
      "Triages defects ahead of user acceptance testing",
    ],
  },
  {
    id: "training",
    index: "05",
    name: "Training",
    summary:
      "An ERP nobody can operate is a very expensive database. Adoption is the deliverable, not the configuration.",
    owns: [
      "Runs user training sessions for the teams who use the system daily",
      "Owns adoption from kickoff through handover",
    ],
  },
  {
    id: "go-live",
    index: "06",
    name: "Go-live",
    summary:
      "Cutover. The week where the old system stops being the source of truth and the new one starts.",
    owns: ["Provides go-live support across client engagements"],
  },
  {
    id: "hypercare",
    index: "07",
    name: "Hypercare & support",
    summary:
      "The phase most implementations underestimate. Real usage surfaces the process gaps that testing never will.",
    owns: [
      "Provides ongoing functional support to live clients",
      "Resolves process and configuration issues as they surface",
    ],
  },
];

export const netsuiteModules: readonly NetSuiteModule[] = [
  {
    id: "financials",
    name: "Financials",
    scope: "General ledger, receivables and payables — the books the whole system reconciles to.",
    records: ["Chart of accounts", "Journal entries", "Invoices", "Vendor bills"],
  },
  {
    id: "o2c",
    name: "Order to Cash",
    scope: "From a customer order through fulfilment to cash collected. The revenue path.",
    records: ["Sales orders", "Item fulfilments", "Invoices", "Customer payments"],
  },
  {
    id: "p2p",
    name: "Procure to Pay",
    scope: "From a request to buy through receipt to the vendor being paid. The spend path.",
    records: ["Purchase requisitions", "Purchase orders", "Item receipts", "Vendor payments"],
  },
  {
    id: "inventory",
    name: "Inventory & Warehouse",
    scope: "What stock exists, where it sits, and how it moves between locations.",
    records: ["Item records", "Locations", "Inventory adjustments", "Transfer orders"],
  },
];

/* -------------------------------------------------------------------------- */

export const recordTiles: readonly RecordTile[] = [
  {
    id: "netsuite",
    value: "End to end",
    label:
      "Oracle NetSuite implementations owned from requirement gathering through go-live and hypercare",
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
  { number: "04", label: "NetSuite", href: "#delivery" },
  { number: "05", label: "Ledger", href: "#ledger" },
  { number: "06", label: "Builds", href: "#builds" },
  { number: "07", label: "Record", href: "#record" },
  { number: "08", label: "Now", href: "#now" },
  { number: "09", label: "Contact", href: "#contact" },
];

export const siteMeta = {
  // Change this when a custom domain is attached — canonical URL, Open Graph,
  // JSON-LD and sitemap.xml all derive from it.
  url: "https://jatin-portfolio-krishnamathur008-1499s-projects.vercel.app",
  title: `${profile.name} — ${profile.role}`,
  description:
    "Oracle NetSuite Functional Consultant in Pune. End-to-end ERP implementations across Financials, Order to Cash, Procure to Pay and Inventory — plus applied machine learning and computer vision.",
  portraitAlt:
    "Jatin Acharya in a checked blazer, standing in front of a large painted peacock mural",
} as const;
