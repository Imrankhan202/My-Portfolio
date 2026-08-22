import pricewiseImage from '../assets/projects/Pricewise.png'
import hospitalImage from '../assets/projects/Home.png'
export interface Project {
  id: number
  number: string
  title: string
  category: string
  year: string
  role: string
  type: 'FINAL YEAR PROJECT' | 'REAL-WORLD PROJECT' | 'PERSONAL PROJECT' | 'CONCEPT PROJECT' | 'EXPERIMENT'
  description: string
  tags: string[]
  previewImage: string
  heroImage: string
  tools: string[]
  context: string
  problem: string
  objective: string
  process: string
  outcome: string
  learnings: string
}

export const projects: Project[] = [
  {
    id: 1,
    number: '01',
    title: 'PRICEWISE',
    category: 'PRODUCT / WEB',
    year: '2025',
    role: 'UX / DEVELOPMENT',
    type: 'FINAL YEAR PROJECT',
    description: 'A price comparison platform designed to help users compare products across multiple e-commerce platforms in one unified interface.',
    tags: ['PRODUCT', 'WEB'],
    previewImage: pricewiseImage,
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=700&fit=crop&auto=format',
    tools: ['Figma', 'React', 'Node.js', 'MongoDB', 'Express'],
    context: 'Online shopping forces users to manually open multiple tabs and compare prices across platforms. Decisions are slow, inconsistent, and often based on incomplete information.',
    problem: 'There was no unified, fast, and user-friendly tool for comparing product prices across major e-commerce platforms in Pakistan and beyond.',
    objective: 'Design and engineer a full-stack platform that aggregates product data and enables real-time price comparison with a clean, trustworthy interface.',
    process: 'I began with competitive analysis of existing tools, conducted user interviews with frequent online shoppers, and mapped their key pain points. I built low-fidelity wireframes, tested them, then moved to high-fidelity Figma prototypes. Development followed a component-first approach in React, with a Node.js/Express backend and MongoDB for product data.',
    outcome: 'A working web application with unified search, side-by-side product comparison, product detail pages, cart simulation, and an AI-assisted recommendation system. The interface reduces average decision time significantly by surfacing the right information at the right moment.',
    learnings: 'Building this end-to-end taught me that the gap between a good design and a good product is always implementation. Small interaction decisions — loading states, empty states, error messages — account for most of the perceived quality.'
  },
  {
    id: 2,
    number: '02',
    title: 'ALLAH NAWAZ HOSPITAL',
    category: 'HEALTHCARE / MOBILE',
    year: '2026',
    role: 'PRODUCT DESIGN',
    type: 'REAL-WORLD PROJECT',
    description: 'Modernizing healthcare access for a rural community in Pakistan through a patient-centered digital platform.',
    tags: ['PRODUCT', 'MOBILE', 'HEALTHCARE'],
    previewImage: hospitalImage,
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1400&h=700&fit=crop&auto=format',
    tools: ['Figma', 'Canva', 'Framer'],
    context: 'Allah Nawaz Hospital serves a rural population with limited digital infrastructure. Patients traveled significant distances for appointments, lab results, or to ask basic questions about services.',
    problem: 'No digital presence meant the hospital was inaccessible outside physical walls. Staff spent disproportionate time on administrative coordination rather than patient care.',
    objective: 'Create a dignified, accessible mobile application that extends the hospital\'s reach and simplifies healthcare access for the community it serves.',
    process: 'I visited the hospital and interviewed both staff and patients to understand real workflows — not assumed ones. The design had to work for users with limited digital literacy. I prioritized clarity over features, ran usability tests with community members, and iterated based on what they actually struggled with.',
    outcome: 'A comprehensive mobile design covering patient onboarding, appointment booking, family accounts, lab report access, pharmacy queries, and an admin dashboard for staff. Every screen was validated against real user behavior.',
    learnings: 'Designing for low-literacy and first-time smartphone users is a discipline of restraint. Every additional option is a potential point of failure. The best interaction I designed was the one I removed.'
  },
  {
    id: 3,
    number: '03',
    title: 'DIGITAL AGENCY APP',
    category: 'WEB / MOBILE',
    year: '2025',
    role: 'UI/UX DESIGN',
    type: 'PERSONAL PROJECT',
    description: 'An editorial agency platform that communicates creative capability through its own interface design.',
    tags: ['WEB', 'MOBILE'],
    previewImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=640&h=420&fit=crop&auto=format',
    heroImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1400&h=700&fit=crop&auto=format',
    tools: ['Figma', 'Canva', 'Framer'],
    context: 'Most digital agencies use generic, template-based websites that fail to reflect the quality of their own work. The website is the first proof of craft.',
    problem: 'How do you design a digital product that communicates creative capability while remaining conversion-focused and accessible?',
    objective: 'Design a cross-platform agency presence with a distinctive visual language that the agency itself could believably have created.',
    process: 'Studied how leading creative studios present themselves — noticing patterns in typography, pacing, and the use of white space as a signal of confidence. Built a multi-screen design system covering web and mobile, with careful attention to how the interface scales between viewports.',
    outcome: 'A full multi-platform design with service pages, portfolio presentation, team profiles, and client inquiry flows. The design system includes a complete component library.',
    learnings: 'A design that showcases design requires a higher standard of execution. Every spacing inconsistency reads as a lack of craft when the product itself is the portfolio.'
  },
  {
    id: 4,
    number: '04',
    title: 'AI STUDY & LEARNING PATH PLANNER',
    category: 'AI / WEB',
    year: '2025',
    role: 'DESIGN / DEVELOPMENT',
    type: 'PERSONAL PROJECT',
    description: 'An AI-powered tool that generates personalized learning roadmaps from user goals and current knowledge.',
    tags: ['AI', 'WEB', 'PRODUCT'],
    previewImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=640&h=420&fit=crop&auto=format',
    heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&h=700&fit=crop&auto=format',
    tools: ['React', 'Node.js', 'OpenAI API', 'Figma', 'MongoDB'],
    context: 'Self-directed learners have access to more educational resources than ever — and are more overwhelmed than ever. The problem is curation, not content.',
    problem: 'No tool existed that could generate a truly personalized, adaptive study plan starting from the learner\'s actual existing knowledge rather than a generic assumption.',
    objective: 'Build an AI-integrated tool that converts goals into structured, achievable learning paths with milestone tracking and resource recommendations.',
    process: 'Designed the conversation model first — figuring out what minimal information the system needed to generate a useful plan. Built and tested several prompt strategies before settling on a structured intake flow. Developed the React frontend with a custom timeline visualization for the generated roadmap.',
    outcome: 'A working prototype with AI-generated learning paths, milestone tracking, resource suggestions, and progress visualization. The intake flow takes under 3 minutes.',
    learnings: 'Designing AI-assisted interfaces requires designing for uncertainty. The product must communicate what it knows, what it doesn\'t, and when to ask for more information without frustrating the user.'
  },
  {
    id: 5,
    number: '05',
    title: 'PARALLEL LIFE SIMULATOR',
    category: 'EXPERIMENT / WEB',
    year: '2025',
    role: 'CONCEPT / DESIGN',
    type: 'CONCEPT PROJECT',
    description: 'A speculative interface exploring alternate life timelines through AI-generated narrative branches.',
    tags: ['EXPERIMENT', 'AI'],
    previewImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=640&h=420&fit=crop&auto=format',
    heroImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&h=700&fit=crop&auto=format',
    tools: ['Figma', 'React', 'AI APIs'],
    context: 'A thought experiment: what would it feel like to see the life you might have lived with different choices? Not as a game — as a quiet, contemplative experience.',
    problem: 'Exploring whether AI narrative generation could serve a genuinely reflective and emotionally resonant purpose rather than entertainment.',
    objective: 'Design a speculative interface that feels honest and personal — not gamified, not dystopian, not sentimental.',
    process: 'Started from the emotional tone I wanted to create, then worked backwards to the interactions. The visual design deliberately avoids excitement. The pacing is slow by design — almost uncomfortably so.',
    outcome: 'A concept prototype exploring branching life narratives. The interface is intentionally sparse. The AI generates quiet, plausible alternatives rather than dramatic ones.',
    learnings: 'The most interesting AI design problems are not about what the model can do — they are about what the interface should ask it to do, and how to frame the output so it lands correctly.'
  },
  {
    id: 6,
    number: '06',
    title: 'AR HOME DESIGN',
    category: 'MOBILE / AR',
    year: '2025',
    role: 'UI/UX DESIGN',
    type: 'CONCEPT PROJECT',
    description: 'An augmented reality application for visualizing furniture in real home environments with a focus on accessible interaction.',
    tags: ['MOBILE', 'PRODUCT'],
    previewImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=640&h=420&fit=crop&auto=format',
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&h=700&fit=crop&auto=format',
    tools: ['Figma', 'Canva', 'Photoshop', 'Blender'],
    context: 'Furniture purchase decisions are high-stakes and difficult to reverse. Most AR furniture apps exist — but most fail to make AR feel like a natural, useful interaction rather than a tech demonstration.',
    problem: 'Existing AR home design apps have unnecessarily complex UX that makes the technology feel inaccessible to the people who would benefit most from it.',
    objective: 'Design an AR home design application focused on reducing friction — making "place this in my room" a five-second interaction.',
    process: 'Analyzed the failure modes of existing apps: too many steps, unclear affordances, no undo, poor onboarding. Rebuilt the placement flow from scratch with a bias toward immediacy. Designed in 3D where appropriate to validate spatial interactions.',
    outcome: 'A mobile concept design with AR placement flows, product browsing, room visualization, and share functionality. The placement flow is three taps from launch.',
    learnings: 'AR UX design requires spatial thinking that standard screen design doesn\'t. The challenge is not the visual — it\'s communicating to the user what they can and cannot do in three-dimensional space.'
  },
  {
    id: 7,
    number: '07',
    title: 'FAKE NEWS AWARENESS',
    category: 'WEB / VISUAL',
    year: '2025',
    role: 'DESIGN',
    type: 'PERSONAL PROJECT',
    description: 'An educational web experience that teaches misinformation recognition through interactive visual analysis.',
    tags: ['WEB', 'VISUAL DESIGN'],
    previewImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&h=420&fit=crop&auto=format',
    heroImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&h=700&fit=crop&auto=format',
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript', 'Illustrator'],
    context: 'Misinformation spreads rapidly and the audiences most vulnerable to it are often the least equipped with tools to recognize it.',
    problem: 'Most media literacy content is either academic and inaccessible, or entertaining but ineffective. The design challenge is making people genuinely more capable, not just aware.',
    objective: 'Create an interactive web experience that builds practical misinformation recognition skills through real examples — without being preachy.',
    process: 'Chose real documented examples of misinformation spread. Designed interactive case studies that walk users through the analysis process. Added a quiz component that tests recognition without feeling like an exam. Kept the visual tone calm and serious — not alarmist.',
    outcome: 'An educational site with interactive case studies, visual analysis breakdowns, a pattern recognition quiz, and shareable "warning signs" reference cards.',
    learnings: 'Changing behavior through design is harder than changing awareness. The quiz revealed that even users who "understood" the content failed to apply it when the examples changed slightly. The design needed to go deeper than information delivery.'
  }
]

export const allTags = ['ALL', 'PRODUCT', 'WEB', 'MOBILE', 'AI', 'HEALTHCARE', 'VISUAL DESIGN', 'EXPERIMENT']
