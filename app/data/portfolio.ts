// First, let's create a shared data file to ensure consistency
// app/data/portfolio.ts

export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  completion: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  galleryImages: string[];
  tags: string[];
  client?: string;
  scope?: string;
  budget?: string;
  team?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Knock",
    category: "Renovasi Total",
    location: "Puri Bintaro",
    year: "2023",
    area: "450m² / 48T",
    completion: "2023",
    description: "Transformasi total villa tradisional menjadi hunian mewah modern dengan ruang terbuka dan integrasi indoor-outdoor yang seamless.",
    beforeImage: "/portfolio/1/before.jpg",
    afterImage: "/portfolio/1/after.jpeg",
    galleryImages: [
      "/portfolio/1/gallery1.jpeg",
      "/portfolio/1/gallery2.jpeg",
      "/portfolio/1/gallery3.jpeg",
      "/portfolio/1/gallery4.jpeg",
    ],
    tags: ["Modern", "Mewah", "Berkelanjutan"],
    client: "Private Residence",
    scope: "Full renovation including structural modifications, interior design, and landscaping",
    budget: "Rp 2.5M - 3M",
    team: "Lead Architect: John Smith | Interior Designer: Jane Doe | Contractor: Build Co."
  },
  {
    id: 2,
    title: "Taman Depan Minimalis",
    category: "Desain Eksterior",
    location: "Golden Park 2, Cisauk",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "Redesain total taman depan dengan konsep minimalis tropis, menampilkan tanaman hijau asli Indonesia dan elemen batu alam.",
    beforeImage: "/portfolio/2/before.jpg",
    afterImage: "/portfolio/2/after.jpg",
    galleryImages: [
      "/portfolio/2/gallery1.jpg",
      "/portfolio/2/gallery2.jpg",
    ],
    tags: ["Minimalis", "Tropis", "Modern"],
    client: "Private Client",
    scope: "Exterior design and landscaping",
    budget: "Rp 800K - 1M",
    team: "Lead Designer: Sarah Johnson | Landscaping: Green Solutions"
  },
  {
    id: 3,
    title: "Taman Depan Minimalis",
    category: "Desain Eksterior",
    location: "Simplicity Cisauk",
    year: "2023",
    area: "280m² / 30T",
    completion: "2023",
    description: "Redesain total taman depan dengan konsep minimalis tropis, menampilkan tanaman hijau asli Indonesia dan elemen batu alam.",
    beforeImage: "",
    afterImage: "/portfolio/3/after.jpg",
    galleryImages: [],
    tags: ["Minimalis", "Tropis", "Modern"],
    client: "Private Client",
    scope: "Exterior design and landscaping",
    budget: "Rp 800K - 1M",
    team: "Lead Designer: Sarah Johnson | Landscaping: Green Solutions"
  },
  {
    id: 4,
    title: "Desain Tangga Rumah Tinggal",
    category: "Desain Interior",
    location: "Depok",
    year: "2023",
    area: "150m² / 15T",
    completion: "2023",
    description: "Desain ulang tangga utama dengan material kayu jati dan kaca tempered, menciptakan focal point yang elegan di ruang tamu.",
    beforeImage: "/portfolio/4/before.jpg",
    afterImage: "/portfolio/4/after.jpg",
    galleryImages: [
      "/portfolio/4/gallery1.jpg",
    ],
    tags: ["Kayu Jati", "Minimalis", "Elegan"],
    client: "Private Residence",
    scope: "Interior design for staircase",
    budget: "Rp 500K - 700K",
    team: "Interior Designer: Michael Chen | Woodwork: Craftsmen Inc."
  },
  {
    id: 5,
    title: "Redesain Dapur dan Kamar Mandi",
    category: "Renovasi Interior",
    location: "Maharta",
    year: "2023",
    area: "85m² / 20T",
    completion: "2023",
    description: "Transformasi dapur dan kamar mandi dengan fungsionalitas optimal, menggunakan material premium dan teknologi smart home.",
    beforeImage: "/portfolio/5/before.jpg",
    afterImage: "/portfolio/5/after.png",
    galleryImages: [
      "/portfolio/5/gallery1.png",
    ],
    tags: ["Modern", "Smart Home", "Fungsional"],
    client: "Private Residence",
    scope: "Kitchen and bathroom renovation with smart home integration",
    budget: "Rp 1M - 1.5M",
    team: "Interior Designer: Lisa Wong | Smart Home: Tech Solutions"
  },
  {
    id: 6,
    title: "Desain Interior Kamar Tidur Utama",
    category: "Desain Interior",
    location: "Bekasi Barat, Cisauk",
    year: "2023",
    area: "120m² / 25T",
    completion: "2023",
    description: "Desain ulang total kamar tidur utama dengan konsep resort Bali, menampilkan area lounge dan walk-in closet yang luas.",
    beforeImage: "/portfolio/6/before.jpg",
    afterImage: "/portfolio/6/after.jpg",
    galleryImages: [
      "/portfolio/6/gallery1.jpg",
    ],
    tags: ["Mewah", "Relaksasi"],
    client: "Private Residence",
    scope: "Master bedroom interior design with walk-in closet",
    budget: "Rp 1.2M - 1.8M",
    team: "Interior Designer: Amanda Lee | Closet Design: Space Solutions"
  }
];

export function getProjectById(id: number): Project | undefined {
  return projects.find(project => project.id === id);
}