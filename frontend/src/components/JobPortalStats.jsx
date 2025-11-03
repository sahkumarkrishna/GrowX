import { Briefcase, Building2, Users, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Drop into any React app. Tailwind is assumed to be available in this preview.
// Usage: <JobPortalStats jobs={50000} companies={10000} seekers={1000000} applications={250000} hires={50000} />
export default function JobPortalStats({
  jobs = 50000,
  companies = 10000,
  seekers = 1000000,
  applications = 250000,
  hires = 50000,
}) {
  const items = [
    { icon: Briefcase, label: "Jobs Listed", value: jobs },
    { icon: Building2, label: "Companies Hiring", value: companies },
    { icon: Users, label: "Active Job Seekers", value: seekers },
    { icon: FileText, label: "Applications Submitted", value: applications },
    { icon: CheckCircle, label: "Successful Hires", value: hires },
  ];

  return (
    <section className="w-full  text-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item, idx) => (
            <StatCard key={item.label} Icon={item.icon} label={item.label} value={item.value} delay={idx * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ Icon, label, value, delay = 0 }) {
  const display = formatAbbrev(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl  p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-gray-700">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <div>
        <div className="text-2xl font-semibold leading-none tracking-tight">{display}</div>
        <div className="text-sm text-gray-500 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

function formatAbbrev(num) {
  if (num == null || isNaN(num)) return "—";
  const abs = Math.abs(num);
  if (abs >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1)}B+`;
  if (abs >= 1_000_000) return `${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M+`;
  if (abs >= 1_000) return `${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)}k+`;
  return `${num}+`;
}