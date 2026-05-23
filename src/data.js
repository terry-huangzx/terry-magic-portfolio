// EXPERIENCES — five career acts
export const experiences = [
  {
    id: 'singlekey',
    type: 'exp',
    suit: 'A',
    suitGlyph: '♠',
    tag: 'ASIP · Now',
    accent: '#f5d77a',
    title: 'Data Engineer (Co-op)',
    subtitle: 'SingleKey Inc.',
    period: 'May 2026 — Aug 2027',
    location: 'Toronto · Hybrid',
    summary:
      "Just started a 16-month co-op through U of T's ASIP program — building data pipelines and BI dashboards for a fast-paced PropTech startup.",
    details: [
      'Building and maintaining data pipelines to support analytics and reporting across product, business, and marketing functions.',
      'Collaborating with product and business stakeholders to define data requirements and unblock decisions.',
      'Supporting business intelligence and product analytics initiatives — turning raw events into measurable signal.',
      'Developing and maintaining internal dashboards and reports for cross-functional teams.',
      'Assisting with data modelling and data quality efforts to keep the warehouse honest.',
      'Reporting to Konrad Droeske, Engineering Director, in a flexible hybrid setup.'
    ],
    current: true
  },
  {
    id: 'lenovo',
    type: 'exp',
    suit: 'K',
    suitGlyph: '♥',
    tag: 'CV · Internship',
    accent: '#f0abfc',
    title: 'Computer Vision Intern',
    subtitle: 'Lenovo Group Ltd.',
    period: 'May 2025 — Aug 2025',
    location: 'Beijing',
    summary:
      'Trained YOLO-based detectors and CNNs for an AI-powered Game Mode on Lenovo PCs — real-time recognition with >85% accuracy.',
    details: [
      'Supported development of an AI-powered Game Mode for Lenovo PCs by training and fine-tuning YOLO-based detectors and CNNs in PyTorch, achieving real-time recognition of in-game elements with >85% accuracy.',
      'Collected, handled, and annotated 5k+ gameplay videos/images using Pillow, Labelme/Labelimg, and OpenCV.',
      'Built a Python + SQL data pipeline (20k+ records) to support reproducible experiments and real-time analytics.',
      'Implemented evaluation scripts (per-class metrics, confusion matrices, failure-case snapshots) to compare model variants and surface edge cases — helping the team iterate faster on architecture and in-game UX.'
    ]
  },
  {
    id: 'cmb',
    type: 'exp',
    suit: 'Q',
    suitGlyph: '♣',
    tag: 'Banking · Internship',
    accent: '#9fe1cb',
    title: 'Data Support Intern',
    subtitle: 'China Merchants Bank',
    period: 'Jun 2024 — Aug 2024',
    location: 'Shenzhen',
    summary:
      'Cleaned transaction data, automated inconsistency tracing, and prepared activity summaries for private-banking relationship managers.',
    details: [
      'Helped manage private client accounts by tracking transaction records; maintained internal client database and prepared account-activity summaries for relationship managers.',
      'Cleaned and validated transaction data; automated inconsistency tracing with Python/SQL.',
      'Provided data support for client relationship managers and internal service teams.'
    ]
  },
  {
    id: 'fab',
    type: 'exp',
    suit: 'J',
    suitGlyph: '♦',
    tag: 'Web · 2-yr',
    accent: '#85b7eb',
    title: 'Data & Web Analytics Intern',
    subtitle: 'Fab Party Boutique',
    period: 'Feb 2023 — Feb 2025',
    location: 'Toronto',
    summary:
      'Built & maintained the company website tracking 1,000+ user interactions, plus designed promo content across socials.',
    details: [
      'Developed and maintained website using Python, HTML/CSS, and JavaScript, tracking 1,000+ user interactions.',
      'Analyzed engagement and designed digital promotional content across social media platforms.'
    ]
  },
  {
    id: 'cssa',
    type: 'exp',
    suit: '10',
    suitGlyph: '♠',
    tag: 'Student union · Ongoing',
    accent: '#afa9ec',
    title: 'Data Analyst',
    subtitle: 'CSSA Student Union, U of T',
    period: 'Sep 2023 — Present',
    location: 'Toronto',
    summary:
      'Performance metrics & reporting for 100+ student members — dashboards that translate data into decisions.',
    details: [
      'Built performance metrics and reporting using Python/Excel for 100+ student members.',
      'Created dashboards and maintained website to track participation and event performance for non-technical leadership.',
      'Quantified department output and contributed to yearly planning, reward mechanism, and goal-setting.'
    ]
  }
]

// PROJECTS — ten tricks from the deck
export const projects = [
  {
    id: 'housing',
    type: 'proj',
    suit: 'A',
    suitGlyph: '♠',
    tag: 'Python · ML',
    accent: '#5b8def',
    title: 'Toronto Housing Price Prediction',
    subtitle: 'XGBoost · Streamlit · Folium',
    summary:
      'End-to-end ML pipeline on 10k+ records with adjusted R² of 0.89.',
    details: [
      'Built full pipeline: data cleaning, geo-feature engineering, model training on 10k+ records. Adjusted R² = 0.89.',
      'Compared FFNN, Random Forest, XGBoost — selected XGBoost, cutting RMSE 15% vs. baseline.',
      'K-Means clustering segmented 5 geographic zones, improving local accuracy.',
      'Integrated crime, school, and transit data — boosted explanatory power 12%.',
      'Delivered an interactive Streamlit + Folium dashboard with dynamic maps.'
    ],
    link: 'https://github.com/terry-huangzx/SDSS-Datathon-Project'
  },
  {
    id: 'music',
    type: 'proj',
    suit: 'K',
    suitGlyph: '♥',
    tag: 'D3 · JS',
    accent: '#e24b4a',
    title: 'Urban Music Pulse',
    subtitle: 'Interactive city-music visualization',
    summary:
      'Interactive viz comparing live music scenes across 6 North American cities.',
    details: [
      'Multi-layered visualization of 600+ concert events, genres, and venue distributions.',
      'Vinyl-record aesthetic with real-time beat synchronization via Web Audio.',
      'Click any city to dive into its genre DNA and top venues.'
    ],
    link: 'https://github.com/terry-huangzx/City_music_analysis'
  },
  {
    id: 'uno',
    type: 'proj',
    suit: 'Q',
    suitGlyph: '♣',
    tag: 'C · Sockets',
    accent: '#9fe1cb',
    title: 'UNO, Multiplayer',
    subtitle: 'Terminal-based UNO over TCP',
    summary:
      'Terminal UNO with TCP socket networking. Pure C, multiple concurrent players.',
    details: [
      'Full UNO game logic with TCP socket programming in C.',
      'Concurrent multi-player real-time state synchronization.',
      'Edge cases: skip, reverse, draw-two, wild, and win detection.'
    ],
    link: 'https://github.com/terry-huangzx/UNO'
  },
  {
    id: 'gearup',
    type: 'proj',
    suit: 'J',
    suitGlyph: '♦',
    tag: 'Java · GUI',
    accent: '#ef9f27',
    title: 'GearUp — G1 Prep',
    subtitle: 'Ontario G1 study & test platform',
    summary:
      'Comprehensive Ontario G1 road test prep platform with progress tracking and study modes.',
    details: [
      'Java GUI with account creation, history, progress tracking, and test/study modes.',
      'Clean architecture & SOLID principles with decoupled storage backend.',
      'Integrated external API for email validation and personalized feedback.'
    ],
    link: 'https://github.com/terry-huangzx/GearUp'
  },
  {
    id: 'drmario',
    type: 'proj',
    suit: '10',
    suitGlyph: '♠',
    tag: 'MIPS · Asm',
    accent: '#fac775',
    title: 'Dr. Mario, in MIPS',
    subtitle: 'Bare-metal arcade in assembly',
    summary:
      'Classic Dr. Mario rebuilt entirely in MIPS assembly with bitmap display.',
    details: [
      'Full Dr. Mario in bare MIPS assembly with bitmap display.',
      'Pill physics, virus matching, gravity, and scoring — all from registers.'
    ],
    link: 'https://github.com/terry-huangzx/drmario-mips'
  },
  {
    id: 'json-tool',
    type: 'proj',
    suit: '9',
    suitGlyph: '♥',
    tag: 'JS · Tooling',
    accent: '#ed93b1',
    title: 'JSON Annotation Tool',
    subtitle: 'Bounding-box editor for CV data',
    summary:
      'Desktop app for browsing & editing bounding-box annotations linked to images.',
    details: [
      'Built for CV workflows: image preview, JSON editing, batch processing.',
      'Bounding-box creation/editing for training datasets.'
    ],
    link: 'https://github.com/terry-huangzx/json_annotation_tool'
  },
  {
    id: 'event',
    type: 'proj',
    suit: '8',
    suitGlyph: '♣',
    tag: 'Python · Tk',
    accent: '#9fe1cb',
    title: 'Event Recorder',
    subtitle: 'Timestamped video annotator',
    summary:
      'Video event annotation tool — Python + Tkinter for timestamped labeling.',
    details: [
      'Desktop GUI for annotating events at precise timestamps.',
      'Designed for CV data labeling with export support.'
    ],
    link: 'https://github.com/terry-huangzx/event_recorder'
  },
  {
    id: 'magic-portfolio',
    type: 'proj',
    suit: '7',
    suitGlyph: '♦',
    tag: 'React · Vite',
    accent: '#f5d77a',
    title: 'Magic Portfolio',
    subtitle: 'The very site you are on',
    summary:
      'A magic-themed personal portfolio — fanned card decks, 3D flips, custom cursor, confetti on every reveal.',
    details: [
      'React 18 + Vite, hand-rolled CSS (no UI framework). Deployed on Vercel.',
      'Two interactive playing-card decks (Acts + Tricks) with 3D flip, fan layout, and modal draw.',
      'Custom-built blue cursor + spray-trail particle system on HTML5 Canvas.',
      'Confetti engine with physics (gravity, drag, rotation, wobble) firing on every card reveal.',
      'DPR-aware canvas re-calibration so visuals stay aligned across monitors and zoom levels.'
    ],
    link: 'https://github.com/terry-huangzx/terry-magic-portfolio'
  },
  {
    id: 'douyin-filter',
    type: 'proj',
    suit: '6',
    suitGlyph: '♠',
    tag: 'Python · Flask',
    accent: '#ed93b1',
    title: 'Douyin Comment IP Filter',
    subtitle: 'Geo-aware comment scraper',
    summary:
      'Fetches and analyzes Douyin (TikTok China) comments, with filtering by IP geolocation, keyword search, and CSV/JSON export.',
    details: [
      'Filters comments by geographic region with automatic highlighting of overseas IPs.',
      'Pure-Python ABogus signature generation to bypass Douyin’s Web API signing requirements.',
      'Dual modes: automatic scraping and manual JSON paste, both exporting to JSON/CSV.',
      'Flask backend + gmssl / PyCryptodome for crypto operations.'
    ],
    link: 'https://github.com/terry-huangzx/douyin-comment-ip-filter'
  },
  {
    id: 'invoice-dashboard',
    type: 'proj',
    suit: '5',
    suitGlyph: '♥',
    tag: 'Next.js · Postgres',
    accent: '#9fe1cb',
    title: 'Invoice Dashboard',
    subtitle: 'Full-stack Next.js 15 app',
    summary:
      'A full-stack invoice management dashboard showcasing modern Next.js development practices.',
    details: [
      'Next.js 15 + React 19 + TypeScript + Tailwind, deployed on Vercel with Postgres.',
      'Complete CRUD on invoices with server-side form validation.',
      'Debounced search + URL-based pagination state.',
      'NextAuth.js authentication with bcrypt-hashed passwords and secure sessions.'
    ],
    link: 'https://github.com/terry-huangzx/vercel-react-web'
  }
]

export const skills = [
  {
    vol: 'Vol. I',
    title: 'Languages I write in',
    tags: ['Python', 'Java', 'C', 'C++', 'SQL', 'R', 'SAS', 'MIPS', 'JavaScript']
  },
  {
    vol: 'Vol. II',
    title: 'ML & Computer Vision',
    tags: ['PyTorch', 'scikit-learn', 'OpenCV', 'Pillow', 'YOLO', 'XGBoost', 'Labelme', 'Labelimg']
  },
  {
    vol: 'Vol. III',
    title: 'Web & Frontend',
    tags: ['HTML/CSS', 'React', 'D3.js', 'Streamlit', 'Canvas', 'Folium', 'Vite']
  },
  {
    vol: 'Vol. IV',
    title: 'Data & Analytics',
    tags: ['Data Viz', 'Machine Learning', 'Database Mgmt', 'Survey Design', 'Economic Analysis']
  },
  {
    vol: 'Vol. V',
    title: 'Tools & Infra',
    tags: ['Git', 'AWS', 'Linux', 'Photoshop', 'Unit Testing']
  },
  {
    vol: 'Vol. VI',
    title: "Things I'm exploring",
    tags: ['Generative models', '3D viz', 'Japanese', 'Stage magic']
  }
]
