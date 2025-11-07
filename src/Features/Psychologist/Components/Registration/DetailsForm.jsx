import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPsychologistDetails } from "../../../Users/Components/Registration/registerSlice";
import Navbar from "../../../../assets/Components/Navbar";

export default function PsychologistDetailsForm({ onNext }) {
  const dispatch = useDispatch();
  const [licenseCopy, setLicenseCopy] = useState(null);

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
    dispatch(setPsychologistDetails(form));
    onNext(licenseCopy);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
            Psychologist Details
          </h2>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
                <input
                  name="Specialization"
                  value={form.Specialization}
                  onChange={handleChange}
                  placeholder="e.g. Clinical Psychology"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
                <input
                  name="LicenseNumber"
                  value={form.LicenseNumber}
                  onChange={handleChange}
                  placeholder="e.g. MH123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload License Copy <span className="text-red-500">*</span>
                </label>
                <label className="w-full flex flex-col items-center px-4 py-6 bg-indigo-50 text-indigo-700 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer hover:bg-indigo-100 transition">
                  <span className="text-sm font-medium">Click to upload or drag & drop</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: PDF, JPG, PNG. Max size: 5MB.
                </p>
                {licenseCopy && (
                  <p className="text-green-600 mt-1 text-sm font-medium">
                    Selected: {licenseCopy.name}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                <input
                  name="Experience"
                  type="number"
                  value={form.Experience}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Biography</label>
                <textarea
                  name="Biography"
                  value={form.Biography}
                  onChange={handleChange}
                  placeholder="Write a short bio about yourself"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg h-28 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
                <input
                  name="Education"
                  value={form.Education}
                  onChange={handleChange}
                  placeholder="e.g. M.A. Clinical Psychology - Delhi University"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="pt-10 text-center">
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-10 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
