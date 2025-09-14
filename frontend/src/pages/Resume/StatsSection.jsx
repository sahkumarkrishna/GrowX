export default function StatsSection() {
  const stats = [
    { value: "5 min", label: "Avg Build Time", color: "text-blue-600" },
    { value: "120+", label: "Resumes Created", color: "text-green-600" },
    { value: "100%", label: "Client Satisfaction", color: "text-pink-600" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <h3 className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</h3>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
