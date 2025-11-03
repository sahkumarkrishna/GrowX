export default function StatsSection() {
  const stats = [
    { value: "50+", label: "Interns Onboarded" },
    { value: "10+", label: "Departments Covered" },
    { value: "100%", label: "Projects Delivered" },
    { value: "95%", label: "Happy Interns" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pink-600">
              {stat.value}
            </h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
