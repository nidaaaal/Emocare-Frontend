import { useState } from "react";
import QuestionFlowForm from "./QuestionFlowForm";
import CredentialForm from "./CridentialForm";

export default function RegisterUserPage() {
  const [step, setStep] = useState(2);

  return (
    <>
      {step === 2 && <QuestionFlowForm onNext={() => setStep(3)} />}
      {step === 3 && <CredentialForm isPsychologist={false} />}
    </>
  );
}
