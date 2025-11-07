import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../../../Api/baseurl";


const extractQuote = (text) => {
  if (typeof text !== "string") return "";
  const match = text.match(/\*\s*"(.+?)"\s*\*/s); // between *" and "*
  return match ? match[1].trim() : text;
};

export default function WellnessQuote() {
  const [quotes, setQuotes] = useState([]);
  const [dailyQuote, setDailyQuote] = useState("");

  useEffect(() => {
    const storedDaily = sessionStorage.getItem("dailyQuote");
    if (storedDaily) {
      setDailyQuote(extractQuote(storedDaily));
      return;
    }

    const getAll = async () => {
      try {
        const res = (await api.get("/reflection/all")).data;
        if (res.success) {
          setQuotes(res.data.map((q) =>extractQuote(q.reflection?.trim() || "")));
        }
      } catch (err) {
        console.error("Error fetching quotes:", err);
      }
    };
    getAll();
  }, []);

  if (!dailyQuote && !quotes.length) return null;

  const selectedQuote = dailyQuote || quotes[new Date().getDate() % quotes.length];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl px-4"
    >
      <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center shadow-sm">
        <p className="text-lg md:text-xl text-emerald-900 italic whitespace-pre-line">
          {selectedQuote}
        </p>
      </div>
    </motion.section>
  );
}
