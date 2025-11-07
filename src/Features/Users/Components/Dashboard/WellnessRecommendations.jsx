// src/Features/Users/Components/Dashboard/WellnessRecommendations.jsx
import { motion } from "framer-motion";
import img1 from "../../../../assets/Images/userdashboard/img6.jpg"
import img2 from "../../../../assets/Images/userdashboard/img5.jpg"
import img3 from "../../../../assets/Images/userdashboard/img1.jpg"

export default function WellnessRecommendations({ profile }) {
  const city = profile?.city ?? "your area";

  const cards = [
    {
      id: 1,
      title: "5-Minute Reset",
      desc: "A quick breathwork routine to clear the mind.",
      image: `${img1}`,
      cta: "/wellness/breathwork",
    },
    {
      id: 2,
      title: "Mindful Meals",
      desc: "Simple habits to eat with awareness.",
      image: `${img2}`,
      cta: "/wellness/nutrition",
    },
    {
      id: 3,
      title: `Walk & Reflect in ${city}`,
      desc: "Light steps, light thoughts. Try an evening reflection.",
      image: `${img3}`,
      cta: "/wellness/walking",
    },
  ];

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Wellness Recommendations
        </h2>
        <a
          href="/wellness"
          className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition"
        >
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.a
            key={c.id}
            href={c.cta}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 text-lg">{c.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{c.desc}</p>
              <span className="inline-block mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition">
                Try it →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
