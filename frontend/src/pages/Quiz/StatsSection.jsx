export default function StatsSection() {
  const stats = [
    { value: "25K+", label: "Active Learners" },
    { value: "1K+", label: "Quizzes Created" },
    { value: "15K+", label: "Daily Quiz Attempts" },
    { value: "90%", label: "Happy Learners" },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-4xl sm:text-5xl font-extrabold text-indigo-600">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-2 text-sm sm:text-base font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
