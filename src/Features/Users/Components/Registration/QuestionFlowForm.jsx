import { useDispatch } from "react-redux";
import { useState } from "react";
import { setBasicInfo } from "./registerSlice";
import { useQuestions } from "./useQuestions";

export default function QuestionFlowForm({ onNext }) {
  const dispatch = useDispatch();
  const { questions } = useQuestions();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const current = questions[index];

  const handleNext = () => {
    if (!inputValue.trim()) {
      setError("This field is required.");
      return;
    }

    const updated = { ...answers, [current.key]: inputValue };
    setAnswers(updated);
    setInputValue("");
    setError("");

    if (index === questions.length - 1) {
      dispatch(setBasicInfo(updated));
      onNext(); // call parent to go to CredentialForm
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto shadow-md rounded bg-white">
      <h2 className="text-lg font-semibold mb-3">{current.question}</h2>

      {current.type === "select" ? (
        <select
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select --</option>
          {current.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={current.type || "text"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border p-2 rounded"
        />
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleNext}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {index === questions.length - 1 ? "Continue" : "Next"}
      </button>
    </div>
  );
}
