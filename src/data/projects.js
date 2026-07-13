export const projects = [
  {
    id: 1,
    title: "Student Management System",
    description: "A comprehensive full-stack application to efficiently manage student records with CRUD operations, authentication, and a responsive UI.",
    longDescription: "Built with SvelteKit for the frontend and Node.js/Express.js for the backend, this application provides complete student record management. Features include secure authentication, real-time updates, and seamless MongoDB integration.",
    tags: ["SvelteKit", "Node.js", "Express.js", "MongoDB"],
    category: ["Node.js", "MongoDB"],
    github: "https://github.com/abhidev17",
    live: null,
    featured: true,
    color: "#6366f1",
    icon: "🎓",
    features: ["CRUD Operations", "Authentication", "Responsive UI", "MongoDB Integration"],
    status: "Completed"
  },
  {
    id: 2,
    title: "QueueLessPrint",
    description: "Smart campus printing solution that eliminates waiting time using intelligent online scheduling and queue management.",
    longDescription: "A Node.js-powered platform that revolutionizes campus printing by allowing students to schedule print jobs online, upload documents, and manage print queues — drastically reducing waiting time.",
    tags: ["Node.js", "JavaScript", "MongoDB"],
    category: ["Node.js", "MongoDB"],
    github: "https://github.com/abhidev17",
    live: null,
    featured: true,
    color: "#06b6d4",
    icon: "🖨️",
    features: ["Print Scheduling", "Document Upload", "Queue Management", "Campus Printing"],
    status: "Completed"
  },
  {
    id: 3,
    title: "RideShare Application",
    description: "A ride-sharing platform developed using OOP concepts for efficient transportation sharing among college students.",
    longDescription: "Developed in Java using core Object-Oriented Programming principles. The platform enables students to share rides efficiently, reducing transportation costs and environmental impact.",
    tags: ["Java"],
    category: ["Java"],
    github: "https://github.com/abhidev17",
    live: null,
    featured: false,
    color: "#8b5cf6",
    icon: "🚗",
    features: ["OOP Design", "Ride Matching", "User Profiles", "Route Optimization"],
    status: "Completed"
  },
  {
    id: 4,
    title: "Personal Portfolio",
    description: "A stunning, award-worthy personal portfolio built with React 19, featuring glassmorphism, animations, and a premium UI/UX.",
    longDescription: "This very portfolio! Built with React 19 + Vite, featuring Framer Motion animations, particle effects, custom cursor, dark/light mode, and much more. Deployed on GitHub Pages.",
    tags: ["React", "Vite", "Framer Motion"],
    category: ["React"],
    github: "https://github.com/abhidev17/portfolio",
    live: "https://abhidev17.github.io/portfolio/",
    featured: true,
    color: "#ec4899",
    icon: "🌟",
    features: ["React 19", "Framer Motion", "GitHub Pages", "Responsive Design"],
    status: "Live"
  }
];

export const projectCategories = ["All", "React", "Node.js", "MongoDB", "Java"];