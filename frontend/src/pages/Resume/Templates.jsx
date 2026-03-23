// ── Proxy helper — bypasses hotlink protection ────────────────────────────────
const proxy = (url) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=450&q=90&output=jpg`;

const templates = [
  {
    id: 1,
    name: "Dark Blue Professional",
    category: "Professional",
    color: "#1e3a5f",
    preview: proxy("https://resumegenius.com/wp-content/uploads/2026-resume-builder-template-dark-blue.png"),
  },
  {
    id: 2,
    name: "Clean Classic",
    category: "Minimal",
    color: "#374151",
    preview: proxy("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20L1uSSWQa5qDWcW1QFfEqMnpw7HgnHvkBw&s"),
  },
  {
    id: 3,
    name: "Modern Simple",
    category: "Modern",
    color: "#1d4ed8",
    preview: proxy("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0I4cj_pWrpVaqmloLtdv9su2czbF7So_IYA&s"),
  },
  {
    id: 4,
    name: "Graphic Header Bold",
    category: "Creative",
    color: "#111827",
    preview: proxy("https://cdn.create.microsoft.com/catalog-assets/en-us/04e82405-df7a-4af6-9848-ce6d82dbc617/thumbnails/400/graphic-header-professional-resume-black-modern-bold-0-1-9233a041da00.webp"),
  },
  {
    id: 5,
    name: "Tutor Professional",
    category: "Professional",
    color: "#0369a1",
    preview: proxy("https://www.jobhero.com/resources/wp-content/uploads/2023/07/tutor-template-resume-JH.svg"),
  },
  {
    id: 6,
    name: "Executive Style",
    category: "Executive",
    color: "#7c3aed",
    preview: proxy("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12BKj9ThjBLtnTRRlujwiAqLpR9ZiVGEIFQ&s"),
  },
  {
    id: 7,
    name: "Lilac Creative",
    category: "Creative",
    color: "#6d28d9",
    preview: proxy("https://www.myperfectresume.com/wp-content/uploads/2025/08/security-officer-students-resume-electric-lilac-color.svg"),
  },
  {
    id: 8,
    name: "Student Modern",
    category: "Student",
    color: "#065f46",
    preview: proxy("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9EK28gAmg85zvXY8TKB3wFA0Nr1rstUKmg&s"),
  },
  {
    id: 9,
    name: "Two Column Pro",
    category: "Modern",
    color: "#1e40af",
    preview: proxy("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyBdKsAh9GP8-bLeswC54ANlvsyim8keXvQ&s"),
  },
  // ── Extra high-quality previews from reliable sources ─────────────────────
  {
    id: 10,
    name: "Minimalist White",
    category: "Minimal",
    color: "#374151",
    preview: proxy("https://marketplace.canva.com/EAFXKFIDad4/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR2K8hGs.jpg"),
  },
  {
    id: 11,
    name: "Simple Student",
    category: "Student",
    color: "#2563eb",
    preview: proxy("https://marketplace.canva.com/EAFqNPReKFI/1/0/1131w/canva-white-simple-student-cv-resume-7g1omEDTNTg.jpg"),
  },
  {
    id: 12,
    name: "Brown Modern",
    category: "Executive",
    color: "#92400e",
    preview: proxy("https://marketplace.canva.com/EAE4jxRs0hQ/2/0/1131w/canva-brown-modern-resume-cv-template-YJN_xQ0j_Ew.jpg"),
  },
];

export default templates;