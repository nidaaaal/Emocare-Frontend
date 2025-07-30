import { useState } from "react";
import QuestionFlowForm from "../../../Users/Components/Registration/QuestionFlowForm";
import CredentialForm from "../../../Users/Components/Registration/CridentialForm";
import PsychologistDetailsForm from "./DetailsForm";

export default function RegisterPsychologistPage() {
  const [step, setStep] = useState(1);
  const [licenseCopy, setLicenseCopy] = useState(null); // Local file storage

  return (
    <>
      {step === 1 && (
        <QuestionFlowForm onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <PsychologistDetailsForm
          onNext={(file) => {
            setLicenseCopy(file);   // Save uploaded license file
            setStep(3);             // Move to next step
          }}
        />
      )}

      {step === 3 && (
        <CredentialForm
          isPsychologist={true}
          licenseCopy={licenseCopy}
          onComplete={() => setStep(1)} // Optional: Reset after registration
        />
      )}
    </>
  );
}
