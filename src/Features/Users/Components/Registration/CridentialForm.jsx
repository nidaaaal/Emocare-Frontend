import { useDispatch, useSelector } from "react-redux";
import { setCredentials, clearRegistration } from "./registerSlice";
import { useFormik } from "formik";
import api from "../../../../Api/baseurl";
import { useEffect, useState } from "react";
import { userCredentialSchema } from "../../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OtpModal from "../../../Common/OtpModal";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function CredentialForm({ isPsychologist = false, licenseCopy }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basicInfo = useSelector((state) => state.userReg.basicInfo);
  const psychologistDetails = useSelector((state) => state.userReg.psychologistDetails);

  const [submitted, setSubmitted] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      EmailAddress: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema: userCredentialSchema,
    onSubmit: handleSubmit,
  });

  const email = formik.values.EmailAddress;

  useEffect(() => {
    if (email) checkEmailVerification();
  }, [email]);

  async function checkEmailVerification() {
    try {
      const res = await api.get(`/email/check/${email}`);
      setEmailVerified(res.data);
    } catch {
      toast.error("Failed to check email verification status");
    }
  }

  const handleRequestOtp = async () => {
    setOtpLoading(true);
    try {
      const res = await api.post(`/email/otp/request/${email}`);
      if (res.data.success) {
        toast.success(res.data.message);
        setShowOtpModal(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setOtpLoading(true);
    try {
      const res = await api.post(`/email/otp/verify/${email}`,JSON.stringify(otp),
    {headers:{"Content-Type":"application/json"}});
      if (res.data.success) {
        const verifyRes = await api.post(`/email/verify/${email}`);
        if (verifyRes.data.success) {
          toast.success("Email verified successfully!");
          setEmailVerified(true);
          setShowOtpModal(false);
        }
      }else{
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message);
    } finally {
      setOtpLoading(false);
    }
  };

  async function handleSubmit(values) {
    if (!emailVerified) {
      toast.warning("Please verify your email first");
      return;
    }

    setIsLoading(true);
    dispatch(setCredentials(values));

    try {
      const endpoint = isPsychologist ? "/psychologist/register" : "/users/register";
      let res;

      if (isPsychologist) {
        const formData = new FormData();
        const allFields = { ...basicInfo, ...psychologistDetails, ...values };

        Object.entries(allFields).forEach(([key, value]) => {
          if (value != null) formData.append(key, String(value));
        });

        if (licenseCopy) formData.append("UploadLicense", licenseCopy);

        res = await api.post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.post(endpoint, { ...basicInfo, ...values });
      }

      if (res.data.success) {
        setSubmitted(true);
        dispatch(clearRegistration());
        localStorage.removeItem("basicInfo");
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const inputBase =
    "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 " +
    "focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isPsychologist ? "Psychologist Registration" : "Create Your Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">Please enter your credentials to register</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          {/* Email Field */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="EmailAddress" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              {email && (
                <span
                  className={`text-xs font-medium ${
                    emailVerified ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {emailVerified ? "Verified" : "Not Verified"}
                </span>
              )}
            </div>
            <div className="mt-1 relative">
              <input
                id="EmailAddress"
                name="EmailAddress"
                type="email"
                autoComplete="email"
                required
                placeholder="your@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.EmailAddress}
                className={`${inputBase} ${
                  formik.touched.EmailAddress && formik.errors.EmailAddress
                    ? "border-red-300 text-red-900"
                    : "border-gray-300"
                }`}
              />
            </div>
            {formik.touched.EmailAddress && formik.errors.EmailAddress && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.EmailAddress}</p>
            )}

            {email && !emailVerified && (
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={otpLoading}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:text-blue-400 disabled:cursor-not-allowed"
                >
                  {otpLoading ? "Sending OTP..." : "Verify Email"}
                </button>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="Password"
                name="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
                className={`${inputBase} ${
                  formik.touched.Password && formik.errors.Password
                    ? "border-red-300 text-red-900"
                    : "border-gray-300"
                } pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {formik.touched.Password && formik.errors.Password && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.Password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                id="ConfirmPassword"
                name="ConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ConfirmPassword}
                className={`${inputBase} ${
                  formik.touched.ConfirmPassword && formik.errors.ConfirmPassword
                    ? "border-red-300 text-red-900"
                    : "border-gray-300"
                } pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.ConfirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || !emailVerified}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                         text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                         disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 
                         0 5.373 0 12h4zm2 5.291A7.962 
                         7.962 0 014 12H0c0 3.042 1.135 
                         5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        {/* OTP Verification Modal */}
        <OtpModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleVerifyOtp}
          isLoading={otpLoading}
        />
      </div>
    </div>
  );
}
