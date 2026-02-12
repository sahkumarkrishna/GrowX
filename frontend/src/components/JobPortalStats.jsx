import { motion } from "framer-motion";
import { Users, Briefcase, Building2, TrendingUp } from 'lucide-react';

export default function JobPortalStats() {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Job Seekers', color: 'from-emerald-500 to-teal-500' },
    { icon: Briefcase, value: '1,000+', label: 'Active Jobs', color: 'from-teal-500 to-cyan-500' },
    { icon: Building2, value: '500+', label: 'Companies', color: 'from-cyan-500 to-sky-500' },
    { icon: TrendingUp, value: '85%', label: 'Success Rate', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==')] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-xl text-emerald-200">
            Join thousands finding their dream careers every day
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }} 
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                  <Icon size={36} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-emerald-200">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
            <span className="text-amber-400 text-2xl">⭐</span>
            <span className="font-semibold">4.8/5 average rating from users</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
