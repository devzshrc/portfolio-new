import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Devashish",
  initials: "dev",
  url: "https://devzshrc.in",
  location: "Varanasi, India",
  locationLink: "https://maps.app.goo.gl/qSvDxBfiHya7pSp27",
  birthDate: new Date("2003-01-25"), 
  description:
    "into tech, physics and poetry.",
  summary:
  "tldr; learnt by hacking around on the internet. \n\n" +
  "I am mostly interested in backend engineering, scaling systems, thermodynamics, quantum ideas, and poetry.\n\n" +
  "Right now im building [@helm](https://helm.devzshrc.in), exploring mobile development, and trying to understand how complex systems behave.",

  avatarUrl: "/me.png",
  skills: [
    "react",
    "next.js",
    "typescript",
    "trpc",
    "postgres",
    "shitposting",
    "corsair integrations",
    "rev matching",
    "can install custom roms"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "devzshrc@gmail.com",
    tel: "+8471024009",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/devzshrc",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/devzshrc",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/devzshrc",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://youtube.com/@devzshrc",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:devzshrc@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  education: [
    {
      school: "babasaheb bhimrao ambedkar university, lucknow",
      href: "https://linkedin.com/in/devzshrc",
      degree: "computer science and engineering",
      logoUrl: "/mu.png",
      start: "2021",
      end: "2025",
    },
  ],

  work: [
    {
      company: "redstring",
      href: "https://redstring.co.in/",
      badges: [],
      location: "remote",
      title: "software engineer | fulltime",
      logoUrl: "/whop.png",
      start: "april 2026",
      end: "present",
      description:
        "building autonomous hr agent."
    },
  ],
  achievements: [
    {
      title: "21st rank in chaicode x corsair hackathon",
      description: "built [@helm](https://helm.devzshrc.in) in hackathon, which i'm continuing to build as a full fledged product.",
      image: "/chaicode-corsair-hackathon.webp",
    },
    {
      title: "built an ai-powered form generator in a hackathon",
      description: "shipped [SCHEMA](https://notyourtypeformx-web.vercel.app/), with multiple themes, ai-assisted generation, deep analytics, and team collaboration with rbac.",
      image: "",
    },
  ],
  projects: [
    {
      title: "Helm",
      href: "https://helm.devzshrc.in",
      dates: "2026",
      active: true,
      description: "Core product I am building right now. Replace this with the sharper one-line version.",
      technologies: ["Next.js", "TypeScript", "tRPC", "Postgres"],
      links: [
        {
          type: "Website",
          href: "https://helm.devzshrc.in",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/helm.png",
      lightImage: "/helm-light.png",
      video: "",
    },
    {
      title: "Schema",
      href: "https://notyourtypeformx-web.vercel.app/",
      dates: "2026",
      active: true,
      description: "An ai-powered form generator with multiple themes, ai-assisted generation, deep analytics, and team collaboration with rbac.",
      technologies: ["Next.js", "TypeScript", "AI", "Analytics", "RBAC"],
      links: [
        {
          type: "Website",
          href: "https://notyourtypeformx-web.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/notyourtypeformx.png",
      lightImage: "",
      video: "",
    },
  ],
  writing: [
    {
      title: "Blog",
      href: "/blog",
      type: "Writing",
      description: "my notes, essays, and technical posts live here.",
      image: "",
    },
    {
      title: "YouTube",
      href: "https://www.youtube.com/watch?v=zH3i_waG5Mk",
      type: "Video",
      description: "Watch and understand the internals of nodejs",
      image: "/youtube-zH3i_waG5Mk.jpg",
    },
  ],
} as const;
