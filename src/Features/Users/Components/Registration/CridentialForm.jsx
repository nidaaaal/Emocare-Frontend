import { useDispatch, useSelector } from "react-redux";
import { setCredentials, clearRegistration } from "./registerSlice";
import { useFormik } from "formik";
import api from "../../../../Api/baseurl";
import { useState } from "react";
import { userCredentialSchema } from "../../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CredentialForm({ isPsychologist = false }) {
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.userReg.basicInfo);
  const questionInfo = useSelector((state) => state.userReg.questionInfo);
  const psychologistDetails = useSelector((state) => state.userReg.psychologistDetails);
  const [submitted, setSubmitted] = useState(false);
const novigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      EmailAddress: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema:userCredentialSchema,
    onSubmit: async (values) => {
      dispatch(setCredentials(values));

      const payload = {
        ...basicInfo,
        ...questionInfo,
        ...values,
        ...(isPsychologist ? psychologistDetails : {}),
      };

      try {
        const endpoint = isPsychologist
          ? "/authentication/register/psychologist"
          : "/authentication/register/user";
          console.log(payload)
        const res = await api.post(endpoint, payload);

        if (res.data.success) {
          setSubmitted(true);
          console.table(res.data);
    const logindata = {
       EmailAddress: values.EmailAddress,
      Password: values.Password
    }
          dispatch(clearRegistration());
          localStorage.removeItem("basicInfo");
          toast.success(res.data.message)
          navigator('/');
        } else {
          toast.error(res.data.message)
        }
      } catch (err) {
        console.table(err?.response?.data?.message || "Something went wrong.");
      }
    },
  });

  

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto space-y-5">
      <div>
        <input
          type="email"
          name="EmailAddress"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.EmailAddress}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.touched.EmailAddress && formik.errors.EmailAddress && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.EmailAddress}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Password}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.touched.Password && formik.errors.Password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.Password}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="ConfirmPassword"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.ConfirmPassword}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.ConfirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Register
      </button>

    </form>
  );
}
