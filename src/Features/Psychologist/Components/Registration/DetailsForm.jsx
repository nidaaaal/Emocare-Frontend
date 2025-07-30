import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPsychologistDetails } from "../../../Users/Components/Registration/registerSlice";

export default function PsychologistDetailsForm({ onNext }) {
  const dispatch = useDispatch();
  const [licenseCopy, setLicenseCopy] = useState(null); // Local only

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

  const handleFileChange = (e) => {
    setLicenseCopy(e.target.files[0]);
  };

  const handleNext = () => {
    dispatch(setPsychologistDetails(form)); // No file here
    onNext(licenseCopy); // Send file to parent
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700">Psychologist Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
        <input
          name="Specialization"
          value={form.Specialization}
          onChange={handleChange}
          placeholder="e.g. Clinical Psychology"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
        <input
          name="LicenseNumber"
          value={form.LicenseNumber}
          onChange={handleChange}
          placeholder="e.g. MH123456"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* 🔐 Upload License Copy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload License Copy <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="w-full p-2 border border-dashed border-indigo-500 rounded-lg bg-indigo-50 text-sm text-gray-600"
        />
        <p className="text-xs text-gray-500 mt-1">
          Accepted formats: PDF, JPG, PNG. Max size: 5MB.
        </p>
        {form.LicenseCopy && (
          <p className="text-green-600 mt-1 text-sm">Selected: {form.LicenseCopy.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
        <input
          name="Experience"
          type="number"
          value={form.Experience}
          onChange={handleChange}
          placeholder="e.g. 5"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
        <textarea
          name="Biography"
          value={form.Biography}
          onChange={handleChange}
          placeholder="Write a short bio about yourself"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg h-28 resize-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
        <input
          name="Education"
          value={form.Education}
          onChange={handleChange}
          placeholder="e.g. M.A. Clinical Psychology - Delhi University"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
