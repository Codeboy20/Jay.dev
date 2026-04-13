import maleAvatar from '../assets/images/male-avatar.png'
import femaleAvatar from '../assets/images/female-avatar.png'

import certAI102 from '../assets/images/ai 102.png'
import certAI900 from '../assets/images/ai 900.png'
import certAZ104 from '../assets/images/az 104.png'
import certDP900 from '../assets/images/dp 900.png'
import certSC900 from '../assets/images/sc 900.png'
import certIBM from '../assets/images/ibm.jpg'
import invoiceGenPreview from '../assets/images/invoicegen.png'
import xpensPreview from '../assets/images/Xpens.png'
import quizifyPreview from '../assets/images/quizify.png'
import revynAIPreview from '../assets/images/revynAI.png'
import gymDemoPreview from '../assets/images/demo-gym.png'
import sweetshoppreview from '../assets/images/sweetshop.com.png'
import rawclawPreview from '../assets/images/rawclaw.png'

export const portfolioSkills = [
  {
    title: 'MERN Stack',
    points: ['MongoDB architecture', 'Express REST APIs', 'React app systems', 'Node production services'],
  },
  {
    title: 'Frontend Engineering',
    points: ['React + Next ecosystems', 'Animation-rich interfaces', 'Tailwind design systems', 'Performance and accessibility'],
  },
  {
    title: 'Backend Engineering',
    points: ['Scalable API design', 'Auth and secure sessions', 'Data modeling and caching', 'Deployment automation'],
  },
  {
    title: 'Creative Technology',
    points: ['WebGL experiences', 'Motion direction', 'Micro-interactions', 'Immersive storytelling'],
  },
]
export const portfolioTechnologies = [
  {
    name: 'MongoDB',
    logo: '/tech-logos/mongodb.svg',
  },
  {
    name: 'Express.js',
    logo: '/tech-logos/express.svg',
  },
  {
    name: 'React',
    logo: '/tech-logos/react.svg',
  },
  {
    name: 'Node.js',
    logo: '/tech-logos/nodejs.svg',
  },
  {
    name: 'Next.js',
    logo: '/tech-logos/nextjs.svg',
  },
  {
    name: 'Tailwind CSS',
    logo: '/tech-logos/tailwindcss.svg',
  },
  {
    name: 'Framer Motion',
    logo: '/tech-logos/framer.svg',
  },
  {
    name: 'Vite',
    logo: '/tech-logos/vite.svg',
  },
  {
    name: 'Three.js',
    logo: '/tech-logos/threejs.svg',
  },
  {
    name: 'JavaScript',
    logo: '/tech-logos/javascript.svg',
  },
  {
    name: 'TypeScript',
    logo: '/tech-logos/typescript.svg',
  },
  {
    name: 'Git',
    logo: '/tech-logos/git.svg',
  },
  {
    name: 'GitHub',
    logo: '/tech-logos/github.svg',
  },
]
export const portfolioProjects = [
  {
    title: 'Smart InvoiceGen',
    description:
      'A modern GST billing platform for Indian businesses that helps teams create, send, and manage professional invoices online or offline, with seamless Google Drive integration and real-time payment tracking.',
    tags: ['React', 'Vite', 'Supabase', 'Node.js', 'Google Drive API', 'Electron'],
    image: invoiceGenPreview,
    previewUrl: 'https://bill-yourneed.vercel.app/',
    githubUrl: 'https://github.com/Codeboy20/InvoiceGen',
  },
  {
    title: 'Xpens Analytics',
    description:
      'A modern personal finance dashboard that helps users track income and expenses, analyze spending with clean visual reports, and export polished PDF summaries through a simple, session-based experience.',
    tags: ['React', 'Material UI', 'Chart.js', 'JavaScript', 'Responsive Web Design', 'PDF Report Generation'],
    image: xpensPreview,
    previewUrl: 'https://xpens-analytics-dpjg.vercel.app/',
    githubUrl: 'https://github.com/Codeboy20/Xpens-Analytics',
  },
  {
    title: 'Quizify',
    description:
      'An interactive tech quiz platform with Google OAuth login, category-based quizzes, custom quiz creation, animated responsive UI, and downloadable PDF score reports.',
    tags: ['React', 'Tailwind CSS', 'Auth0', 'JavaScript', 'Responsive Web Design', 'PDF Report Generation'],
    image: quizifyPreview,
    previewUrl: 'https://quizify-bay.vercel.app/',
    githubUrl: 'https://github.com/Codeboy20/quizify',
  },
  {
    title: 'RevynAI',
    description:
      'A smart code review web app that analyzes pasted code snippets, detects syntax and logic issues, scores code quality, highlights strengths and weaknesses, suggests improvements, and generates best-effort corrected code through an interactive editor-based review experience.',
    tags: ['React', 'JavaScript', 'Monaco Editor', 'Code Review System', 'Static Analysis', 'Responsive Web Design', 'Markdown Rendering'],
    image: revynAIPreview,
    previewUrl: 'https://revyn-ai-sec.vercel.app/',
    githubUrl: 'https://github.com/Codeboy20/RevynAI',
  },
]

export const portfolioTimeline = [
  {
    title: 'Full Stack Developer',
    company: 'MaMo Technolab LLP',
    logo: '/experience-logos/mamo.ico',
    period: 'Feb 2026 - Present',
    description:
      'Building scalable React.js, Node.js, and MongoDB applications while improving system performance by 30% and raising client satisfaction by 35% through production-ready feature delivery.',
  },
  {
    title: 'Full Stack Engineer',
    company: 'AarogyaCraft',
    logo: '/experience-logos/aarogyacraft.svg',
    period: 'Mar 2024 - Aug 2025',
    description:
      'Led UI development with React.js, Tailwind CSS, and Material UI, built Express + PostgreSQL APIs, and deployed CI/CD with Docker on Azure to cut deployment time by 35%.',
  },
  {
    title: 'Tech Contributor',
    company: 'GSSoC\'25',
    logo: '/experience-logos/gssoc.svg',
    period: '2024 - 2025',
    description:
      'Contributed to open-source repositories in GSSoC, achieving rank 101st among 40,000 active contributors through consistent pull requests, issue resolution, feature improvements, and high-quality documentation updates.',
  },
]

export const portfolioCertifications = [
  {
    title: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    organization: 'Microsoft',
    description:
      'Validates the ability to design and implement AI solutions using Azure AI services for real-world business applications.',
    image: certAI102,
    credentialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/',
  },
  {
    title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    organization: 'Microsoft',
    description:
      'Demonstrates foundational understanding of AI workloads, machine learning concepts, and responsible AI on Azure.',
    image: certAI900,
    credentialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
  },
  {
    title: 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
    organization: 'Microsoft',
    description:
      'Shows practical expertise in managing cloud services such as compute, storage, networking, identity, and governance in Azure.',
    image: certAZ104,
    credentialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/',
  },
  {
    title: 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
    organization: 'Microsoft',
    description:
      'Covers core data concepts, relational and non-relational data services, and analytics workloads in the Azure ecosystem.',
    image: certDP900,
    credentialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/',
  },
  {
    title: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)',
    organization: 'Microsoft',
    description:
      'Demonstrates knowledge of security principles, identity management, and compliance capabilities across Microsoft cloud solutions.',
    image: certSC900,
    credentialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/',
  },
  {
    title: 'IBM Professional Certificate',
    organization: 'IBM',
    description:
      'Highlights practical capabilities in enterprise-grade technology learning with focus areas in applied tools and solution thinking.',
    image: certIBM,
    credentialLink: 'https://www.ibm.com/training/',
  },
]

export const servicesList = [
  {
    title: 'Business Websites',
    text: 'Professional brand websites that build trust and convert visitors into qualified leads.',
  },
  {
    title: 'Ecommerce Websites',
    text: 'Fast shopping experiences with secure checkout, product storytelling, and growth-focused UX.',
  },
  {
    title: 'Landing Pages',
    text: 'High-performing campaign pages designed for paid ads, launches, and lead generation funnels.',
  },
  {
    title: 'SEO Optimization',
    text: 'Technical and on-page improvements to improve discoverability, ranking potential, and local reach.',
  },
]

export const demoProjects = [
  {
    title: 'AstrafitClub',
    summary: 'Gym website demo with membership plans, trainer profiles, and high-energy brand visuals.',
    image: gymDemoPreview,
    previewLabel: 'View Live Demo',
    previewUrl: 'https://astrafit-club.vercel.app',
  },
  {
    title: 'SweetShop.com',
    summary: 'Service showcase, maps integration, and inquiry conversion flow.',
    image: sweetshoppreview,
    previewLabel: 'View Live Demo',
    previewUrl: 'https://sweet-shop-two-lyart.vercel.app/',
  },
  {
    title: 'Ecommerce Demo',
    summary: 'Category-first shopping experience with product highlights and fast checkout journey.',
    image: rawclawPreview,
    previewLabel: 'View Live Preview',
    previewUrl: 'https://rawclaw.vercel.app/',
  },
]


export const serviceTestimonials = [
  {
    name: 'Ravi Sharma',
    role: 'Gym Owner',
    avatar: maleAvatar,
    quote:
      'Our new website looks premium and helped us increase membership inquiries within the first two weeks.',
  },
  {
    name: 'Neha Patel',
    role: 'Local Business Founder',
    avatar: femaleAvatar,
    quote:
      'The design, speed, and structure were exactly what we needed. Clients now trust us faster and contact us more.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Ecommerce Brand',
    avatar: maleAvatar,
    quote:
      'Great communication and delivery. The final site feels high-end and performs really well on mobile too.',
  },
]

export const pricingPlans = [
  {
    tier: 'Basic Plan',
    price: 'INR 4,999 Only',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Contact form setup',
      'Basic SEO setup',
      'Speed optimization basics',
      '7-day post-launch support',
    ],
  },
  {
    tier: 'Standard Plan',
    price: 'INR 9,999 Only',
    features: [
      'Up to 12 pages',
      'Custom animations',
      'CMS-ready sections',
      'Enhanced SEO + speed',
      'Lead capture + inquiry workflows',
      'Performance and analytics integration',
      '30-day post-launch support',
    ],
    featured: true,
  },
  {
    tier: 'Premium Plan',
    price: 'INR 19,999 Only',
    features: [
      'Custom web app feel',
      'Advanced interactions',
      'Conversion strategy',
      'Priority support',
      'Funnel + event tracking setup',
      'Advanced speed and technical SEO',
      'Premium UI/UX personalization',
      '60-day post-launch support',
    ],
  },
]

export const processSteps = ['Customer visits your website', 'Website captures enquiry', 'System sends owner notification', 'Owner closes the deal']












