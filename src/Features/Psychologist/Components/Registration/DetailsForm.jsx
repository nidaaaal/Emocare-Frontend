import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPsychologistDetails } from "../../../Users/Components/Registration/registerSlice";

export default function PsychologistDetailsForm({ onNext }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    Specialization: "",
    LicenseNumber: "",
    Experience: "",
    Biography: "",
    Education: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    dispatch(setPsychologistDetails(form));
    onNext(); // go to credential form
  };

  return (
    <div className="max-w-lg mx-auto space-y-3">
      <input name="Specialization" onChange={handleChange} placeholder="Specialization" className="input" />
      <input name="LicenseNumber" onChange={handleChange} placeholder="License Number" className="input" />
      <input name="Experience" onChange={handleChange} placeholder="Years of Experience" type="number" className="input" />
      <textarea name="Biography" onChange={handleChange} placeholder="Your Biography" className="input" />
      <input name="Education" onChange={handleChange} placeholder="Education" className="input" />
      <button onClick={handleNext} className="btn-primary">Next</button>
    </div>
  );
}
