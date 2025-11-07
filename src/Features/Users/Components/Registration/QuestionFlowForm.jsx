import { useDispatch } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setBasicInfo } from "./registerSlice";
import { useQuestions } from "./useQuestions";
import { questionValidationSchema } from "../../../../Utils/Validation";
import Navbar from "../../../../assets/Components/Navbar";

export default function QuestionFlowForm({ onNext }) {
  const dispatch = useDispatch();
  const { questions } = useQuestions();

  // Group into pages
  const pages = [
    questions.slice(0, 3),
    questions.slice(3, 5),
    questions.slice(5, 7)
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const progress = ((pageIndex + 1) / pages.length) * 100;

  const normalizeKey = (key) => {
    // Ensure question keys match schema keys (e.g., FullName -> fullName)
    return key.charAt(0).toLowerCase() + key.slice(1);
  };

  const handleChange = async (key, value) => {
    const schemaKey = normalizeKey(key);
    setAnswers((prev) => ({ ...prev, [schemaKey]: value }));
    setTouched((prev) => ({ ...prev, [schemaKey]: true }));

    try {
      await questionValidationSchema.validateAt(schemaKey, {
        ...answers,
        [schemaKey]: value,
      });
      setErrors((prev) => ({ ...prev, [schemaKey]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [schemaKey]: err.message }));
    }
  };

  const validatePage = async () => {
    const pageErrors = {};

    for (const q of pages[pageIndex]) {
      const schemaKey = normalizeKey(q.key);
      try {
        await questionValidationSchema.validateAt(schemaKey, answers);
      } catch (err) {
        pageErrors[schemaKey] = err.message;
      }
    }

    setErrors((prev) => ({ ...prev, ...pageErrors }));
    return Object.keys(pageErrors).length === 0;
  };

  const handleNext = async () => {
    const isValid = await validatePage();
    if (!isValid) return;

    if (pageIndex === pages.length - 1) {
      dispatch(setBasicInfo(answers));
      onNext();
    } else {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBack = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <Navbar />
      <div className="w-full bg-white shadow px-6 py-3 flex justify-between items-center fixed top-0">
        <h1 className="text-lg font-bold text-gray-700">User Registration</h1>
        <div className="w-1/3 bg-gray-200 h-2 rounded-full">
          <motion.div
            className="h-2 bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
      </div>

      <div className="w-full max-w-xl mt-20 p-8 bg-white rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            {pages[pageIndex].map((q) => {
              const schemaKey = normalizeKey(q.key);
              return (
                <div key={q.key} className="mb-6">
                  <label className="block mb-2 font-semibold text-gray-700">
                    {q.question}
                  </label>

                  {q.type === "select" ? (
                    <select
                      value={answers[schemaKey] || ""}
                      onChange={(e) => handleChange(q.key, e.target.value)}
                      onBlur={() =>
                        setTouched((prev) => ({
                          ...prev,
                          [schemaKey]: true,
                        }))
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="">-- Select --</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={q.type || "text"}
                      value={answers[schemaKey] || ""}
                      onChange={(e) => handleChange(q.key, e.target.value)}
                      onBlur={() =>
                        setTouched((prev) => ({
                          ...prev,
                          [schemaKey]: true,
                        }))
                      }
                      className="w-full border p-2 rounded"
                    />
                  )}

                  {touched[schemaKey] && errors[schemaKey] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[schemaKey]}
                    </p>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          {pageIndex > 0 ? (
            <button
              onClick={handleBack}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {pageIndex === pages.length - 1 ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
