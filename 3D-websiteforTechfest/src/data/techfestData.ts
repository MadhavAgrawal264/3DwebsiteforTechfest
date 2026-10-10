import { Booth, DeveloperProfile } from '../types/techfest';

export const BOOTHS_DATA: Booth[] = [
  {
    id: 'robowars',
    name: 'RoboWars & Mechatronics Arena',
    codename: 'SECTOR-01 // COMBAT',
    category: 'Combat Robotics',
    tagline: 'High-voltage kinetic armor battles & autonomous machines',
    description: 'Techfest IIT Bombay flagship arena where 60kg and 15kg combat robots clash in a bulletproof reinforced polycarbonate cage with spinning blades, pneumatic flippers, and titanium chassis.',
    position3D: [-35, 4, 15],
    cameraPosition: [-25, 12, 35],
    cameraLookAt: [-35, 4, 15],
    themeColor: '#ff007f', // Magenta/Crimson
    modelType: 'robowars',
    prizePool: '₹6,50,000 INR ($8,000 USD)',
    dates: 'Dec 18 - 20, 2026',
    venue: 'Gymkhana Grounds, IIT Bombay',
    highlights: [
      'International teams from 12+ countries',
      'Dual weight categories: 60kg Heavyweight & 15kg Featherweight',
      'Bulletproof Lexan arena with hazard flame pits',
      'Live pit crew telemetry & telemetry stream'
    ],
    specs: [
      { label: 'Cage Dimensions', value: '40ft x 40ft' },
      { label: 'Hazard System', value: 'Hydraulic Spikes & Fire' },
      { label: 'Weapon RPM Limit', value: '12,000 RPM' },
      { label: 'Participating Teams', value: '84 Teams' }
    ],
    featuredEvents: [
      {
        title: 'International RoboWars 60kg',
        description: 'The heavyweight championship. Full contact destructive robotics.',
        category: 'Combat',
        teamsRegistered: 48,
        prize: '₹4,00,000'
      },
      {
        title: 'Cozmo Clench (Robotic Arm)',
        description: 'Gripper robotics navigating complex precision obstacle courses.',
        category: 'Autonomous',
        teamsRegistered: 65,
        prize: '₹1,50,000'
      },
      {
        title: 'Meshmerize (Line Maze)',
        description: 'High-speed autonomous algorithm grid solving.',
        category: 'Algorithms',
        teamsRegistered: 92,
        prize: '₹1,00,000'
      }
    ]
  },
  {
    id: 'quantum-ai',
    name: 'AI & Quantum Computing Nexus',
    codename: 'SECTOR-02 // NEURAL',
    category: 'Artificial Intelligence & Quantum',
    tagline: 'Deep neural networks, frontier LLMs & quantum simulation algorithms',
    description: 'Step into the computational core of Techfest. Explore real-time neural edge processing, quantum circuit emulation, autonomous agent swarms, and high-performance computing workshops led by leading researchers.',
    position3D: [-12, 6, -20],
    cameraPosition: [-6, 14, 5],
    cameraLookAt: [-12, 6, -20],
    themeColor: '#00f3ff', // Cyan
    modelType: 'quantum_ai',
    prizePool: '₹5,00,000 INR ($6,000 USD)',
    dates: 'Dec 18 - 20, 2026',
    venue: 'PC Saxena Auditorium & Foyer, IIT Bombay',
    highlights: [
      'Interactive quantum qubit coherence visualizer',
      'Edge AI computer vision live demo stations',
      'GenAI agent hackathon sponsored by top deep-tech firms',
      'Masterclasses on Transformer architectures and Qiskit'
    ],
    specs: [
      { label: 'Cluster Compute', value: '128x NVIDIA H100s' },
      { label: 'Model Modalities', value: 'Vision, Audio, Reasoning' },
      { label: 'Workshops', value: '6 Hands-on Labs' },
      { label: 'Research Papers', value: '45+ Submissions' }
    ],
    featuredEvents: [
      {
        title: 'Neural Matrix Hackathon',
        description: '36-hour sprint building agentic workflows and local neural models.',
        category: 'Hackathon',
        teamsRegistered: 120,
        prize: '₹2,50,000'
      },
      {
        title: 'Quantum Algorithmic Challenge',
        description: 'Optimize Grover and Shor quantum gate circuits under noise constraints.',
        category: 'Quantum',
        teamsRegistered: 42,
        prize: '₹1,50,000'
      },
      {
        title: 'Edge AI Autonomous Drone Vision',
        description: 'Real-time obstacle evasion using on-device TensorRT acceleration.',
        category: 'Computer Vision',
        teamsRegistered: 56,
        prize: '₹1,00,000'
      }
    ]
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Deep Space Station',
    codename: 'SECTOR-03 // ORBITAL',
    category: 'Aerospace & Space Exploration',
    tagline: 'Orbital mechanics, propulsion innovations & satellite payloads',
    description: 'Celebrating humanity’s journey to the stars and India’s space achievements. Discover student satellite designs, sounding rocket telemetry, hypersonic wind tunnel models, and Martian rover chassis.',
    position3D: [20, 8, -25],
    cameraPosition: [12, 16, -5],
    cameraLookAt: [20, 8, -25],
    themeColor: '#f59e0b', // Amber / Gold
    modelType: 'aerospace',
    prizePool: '₹4,50,000 INR ($5,500 USD)',
    dates: 'Dec 19 - 21, 2026',
    venue: 'Aerospace Engineering Quad, IIT Bombay',
    highlights: [
      'Boeing National Aeromodelling Championship fly-offs',
      'CubeSat structural and communications live test rigs',
      'ISRO veteran keynotes and deep space telemetry displays',
      'Glider precision landing & payload drop challenge'
    ],
    specs: [
      { label: 'Flight Arena', value: 'Open Air Lake Grounds' },
      { label: 'Max Wingspan', value: '2.5 Meters' },
      { label: 'Telemetry Link', value: 'LoRa 868MHz & 2.4GHz' },
      { label: 'Payload Capacity', value: '1.2 kg' }
    ],
    featuredEvents: [
      {
        title: 'Boeing National Aeromodelling Competition',
        description: 'Design, build, and pilot fixed-wing aircraft through precision maneuvers.',
        category: 'Aviation',
        teamsRegistered: 110,
        prize: '₹2,00,000'
      },
      {
        title: 'CanSat Space Probe Challenge',
        description: 'Build a mini-satellite in a soda-can form factor launched to 1000m.',
        category: 'Satellite',
        teamsRegistered: 38,
        prize: '₹1,50,000'
      },
      {
        title: 'Autonomous Lunar Rover Challenge',
        description: 'Navigate rocky regolith mock terrain avoiding hazardous craters.',
        category: 'Space Robotics',
        teamsRegistered: 49,
        prize: '₹1,00,000'
      }
    ]
  },
  {
    id: 'cybersec',
    name: 'CyberSecurity & FinTech Vault',
    codename: 'SECTOR-04 // CIPHER',
    category: 'Cyber Security & Cryptography',
    tagline: 'Zero-knowledge proofs, CTF security war games & distributed ledgers',
    description: 'Enter the secured digital fortress of Techfest. Test your offensive security skills, decipher zero-day vulnerabilities, audit distributed smart contracts, and defend critical cyber infrastructure in live simulations.',
    position3D: [35, 5, 12],
    cameraPosition: [24, 12, 28],
    cameraLookAt: [35, 5, 12],
    themeColor: '#10b981', // Emerald / Neon Green
    modelType: 'cybersec',
    prizePool: '₹4,00,000 INR ($5,000 USD)',
    dates: 'Dec 18 - 20, 2026',
    venue: 'Kanwal Rekhi School of IT (KReSIT), IIT Bombay',
    highlights: [
      'Capture The Flag (CTF) 24-hour jeopardy and attack-defense tournament',
      'Smart contract re-entrancy and fuzzing workshops',
      'Hardware lockpicking & RFID/NFC security village',
      'Cyber defense war room simulation with live scoring'
    ],
    specs: [
      { label: 'CTF Format', value: 'Jeopardy & Attack/Defense' },
      { label: 'Vulnerability Domains', value: 'Web, Binary, Cryptography, Pwn' },
      { label: 'Network Range', value: 'Isolated Cyber Range' },
      { label: 'Security Mentors', value: 'Industry CISO Network' }
    ],
    featuredEvents: [
      {
        title: 'Techfest Global CTF 2026',
        description: 'High-stakes ethical hacking challenge solving reverse engineering and pwn puzzles.',
        category: 'Security',
        teamsRegistered: 215,
        prize: '₹2,50,000'
      },
      {
        title: 'Zero-Knowledge Cryptography Sprint',
        description: 'Develop zk-SNARK proof systems for privacy-preserving verifiable compute.',
        category: 'Cryptography',
        teamsRegistered: 44,
        prize: '₹1,00,000'
      },
      {
        title: 'FinTech Algorithmic Trading Quest',
        description: 'High-frequency order-book arbitrage and risk management simulation.',
        category: 'FinTech',
        teamsRegistered: 78,
        prize: '₹50,000'
      }
    ]
  },
  {
    id: 'portfolio',
    name: 'Developer Pavilion // Madhav Agrawal',
    codename: 'SECTOR-05 // ARCHITECT',
    category: 'Creative Engineering & Web Dev',
    tagline: 'Interactive 3D web technologies, creative computing & full-stack development',
    description: 'The creative command deck engineered by Madhav Agrawal. Explore the architectural blueprints of this 3D WebGL cyber metropolis, interactive creative experiments, and professional profile & portfolio.',
    position3D: [0, 7, 0],
    cameraPosition: [0, 16, 22],
    cameraLookAt: [0, 5, 0],
    themeColor: '#00f3ff', // Radiant Cyan
    modelType: 'portfolio',
    prizePool: 'Open for Tech & Web Inquiries',
    dates: 'Always Active // Online 2026',
    venue: 'Cyberpunk Cloud Core & LinkedIn Network',
    highlights: [
      'Interactive 3D spatial experience engineered by Madhav Agrawal',
      'Full-stack modern TypeScript, Three.js, React 19, and Tailwind architecture',
      'Direct link to Madhav Agrawal’s verified LinkedIn profile',
      'Showcase of advanced creative technology and engineering builds'
    ],
    specs: [
      { label: 'Lead Developer', value: 'Madhav Agrawal' },
      { label: 'Core Specialization', value: '3D WebGL / Full-Stack React' },
      { label: 'Engine', value: 'Three.js & Web Audio API' },
      { label: 'Contact', value: 'madhavagrawal.dev@gmail.com' }
    ],
    featuredEvents: [
      {
        title: 'Explore Madhav’s Featured Projects',
        description: 'Dive into high-performance web applications, 3D simulations, and interactive systems.',
        category: 'Engineering',
        teamsRegistered: 1,
        prize: 'Portfolio Showcase'
      },
      {
        title: 'Connect on LinkedIn',
        description: 'Expand your professional network and discuss creative engineering opportunities.',
        category: 'Networking',
        teamsRegistered: 1,
        prize: 'Direct Profile Link'
      }
    ]
  }
];

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: 'Madhav Agrawal',
  title: 'Lead Creative Developer & 3D Web Engineer',
  role: 'Web Developer for Techfest IIT Bombay 3D Interactive Platform',
  bio: 'Creative full-stack software engineer specializing in 3D WebGL spatial computing, Three.js real-time rendering, interactive graphics, modern React architectures, and high-performance user interfaces. Dedicated to creating memorable digital experiences that push the boundaries of the browser.',
  email: 'madhavagrawal.dev@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/madhav-agrawal-100286430?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/madhav-agrawal',
  portfolioWebsite: 'https://madhav-agrawal.dev',
  stats: [
    { label: 'Years Experience', value: '4+' },
    { label: 'Production Projects', value: '25+' },
    { label: '3D / WebGL Builds', value: '12+' },
    { label: 'Client & Hackathon Awards', value: '8' }
  ],
  skills: [
    {
      category: '3D Graphics & WebGL',
      items: ['Three.js', 'WebGL', 'GLSL Shaders', '3D Scene Graphs', 'Blender Pipeline', 'Raycasting', 'Camera Splines']
    },
    {
      category: 'Frontend Engineering',
      items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Motion', 'Web Audio API', 'Canvas 2D']
    },
    {
      category: 'Architecture & Performance',
      items: ['Vite', 'State Management', 'Full-Stack Node.js', 'REST & GraphQL', 'PWA & Responsive Design']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Techfest IIT Bombay 3D Cyber City',
      category: '3D Spatial WebGL & Interactive Experience',
      period: '2026',
      description: 'Built a full-scale interactive cyberpunk metropolis for Asia’s largest tech festival. Features scroll-driven 3D camera choreography, interactive booth pavilions, procedural skyline, and client-side synthesized sci-fi audio.',
      impact: 'Showcases 5 flagship festival sectors with smooth 60fps rendering across desktop and mobile devices.',
      technologies: ['Three.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
      demoUrl: '#',
      githubUrl: 'https://github.com/madhav-agrawal/techfest-3d-cyber-city',
      featured: true
    },
    {
      id: 'proj-2',
      title: 'AeroSim: Autonomous Drone & Satellite Telemetry',
      category: 'Simulation & Real-Time Visualization',
      period: '2025',
      description: 'Interactive 3D mission control dashboard rendering real-time flight paths, LiDAR point-clouds, attitude gyros, and predictive trajectory splines for autonomous UAV systems.',
      impact: 'Reduced pilot teleoperation latency by 35% with hardware-accelerated WebGL HUD overlays.',
      technologies: ['WebGL', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Chart.js'],
      demoUrl: '#',
      githubUrl: 'https://github.com/madhav-agrawal/aerosim-telemetry',
      featured: true
    },
    {
      id: 'proj-3',
      title: 'NeuralMesh: Hackathon Platform & Code Collab',
      category: 'Full-Stack Cloud Application',
      period: '2025',
      description: 'Collaborative code evaluation and virtual judging platform built for premier university hackathons with live leaderboard, automated test harness, and Discord bot integration.',
      impact: 'Successfully managed 4,200 concurrent participant submissions during a 48-hour global hackathon.',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
      demoUrl: '#',
      githubUrl: 'https://github.com/madhav-agrawal/neuralmesh-platform',
      featured: true
    },
    {
      id: 'proj-4',
      title: 'CipherMatrix: Zero-Knowledge Key Visualizer',
      category: 'CyberSecurity & Cryptography UI',
      period: '2024',
      description: 'Educational cryptography interactive portal explaining elliptic curves, Diffie-Hellman key exchange, and Zero-Knowledge proofs via visual animated mathematical curves.',
      impact: 'Featured as recommended learning resource in university information security courses.',
      technologies: ['TypeScript', 'Canvas API', 'MathJax', 'Tailwind CSS'],
      demoUrl: '#',
      githubUrl: 'https://github.com/madhav-agrawal/ciphermatrix-zk',
      featured: false
    }
  ]
};

export const FESTIVAL_METRICS = [
  { value: '175,000+', label: 'Annual Footfall', sub: 'Across 3 days at IIT Bombay' },
  { value: '₹50,00,000+', label: 'Total Prize Pool', sub: 'Competitions & Hackathons' },
  { value: '2,500+', label: 'Colleges & Universities', sub: 'National & Global representation' },
  { value: '60+', label: 'Countries Participating', sub: 'International delegations' }
];

export const KEYNOTE_SPEAKERS = [
  {
    name: 'Dr. APJ Abdul Kalam',
    role: 'Former President of India',
    topic: 'Vision for Ignited Minds & Youth in Space Technology',
    tag: 'Honorary Patron',
    imageFallback: '🚀'
  },
  {
    name: 'Sophia the Robot',
    role: 'Hanson Robotics Humanoid',
    topic: 'The Horizon of Artificial General Intelligence & Human Empathy',
    tag: 'Historic IIT Bombay Appearance',
    imageFallback: '🤖'
  },
  {
    name: 'Rakesh Sharma',
    role: 'First Indian in Space (Hero of the Soviet Union)',
    topic: 'Human Spaceflight & The Future of Gaganyaan',
    tag: 'Astronautics Keynote',
    imageFallback: '🌌'
  },
  {
    name: 'Prof. Ada Yonath',
    role: 'Nobel Laureate in Chemistry',
    topic: 'Ribosome Crystallography & Next-Gen Antibiotics',
    tag: 'Nobel Lecture Series',
    imageFallback: '🧬'
  }
];
