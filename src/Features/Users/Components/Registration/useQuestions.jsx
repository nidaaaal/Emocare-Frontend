export function useQuestions() {
  const questions = [
    { key: "FullName", question: "What is your full name?" },
    { key: "Age", question: "How old are you?" },
    {
      key: "Gender",
      question: "What is your gender?",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { key: "Job", question: "What is your job?" },
    {
      key: "RelationshipStatus",
      question: "What is your relationship status?",
      type: "select",
      options: ["Single", "Married", "Divorced", "In a Relationship","Not prefer to say"],
    },
    { key: "Country", question: "Which country are you from?" },
    { key: "City", question: "Which city do you live in?" },
  ];

  return { questions };
}
