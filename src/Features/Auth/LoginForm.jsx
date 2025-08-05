// ✅ File: components/auth/LoginForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from './AuthSclice';
import { loginValidationSchema } from '../../Utils/Validation';
import AccountTypeModal from './AccountTypeModal';
import { toast } from 'react-toastify';
import ForgotPassword from './ForgotPassword';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();
      if (result.success) {
        localStorage.setItem("userdata", JSON.stringify({
          userid: result.data.id,
          name: result.data.fullName,
          role: result.data.role,
        }));
                
        localStorage.setItem("chattoken", result.data.signalRToken)
              

        toast.success(result.message);

        if (result?.data.isUser) navigate('/user/home');
        else if (result?.data.isAdmin) navigate('/admin/dashboard');
        else if (result?.data.isPsychologist) navigate('/psy/home');
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccountSelect = (type) => {
    setShowModal(false);
    if (type === "user") navigate("/user/register");
    else if (type === "psychologist") navigate("/psy/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Emocare</h2>

        {error && <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">{error}</div>}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <button onClick={() => setShowModal(true)} className="text-green-500 underline">
            Sign Up
          </button>
        </p>

        <p className="mt-2 text-center text-sm text-blue-500 underline cursor-pointer" onClick={() => setShowForgot(true)}>
          Forgot password?
        </p>

        <AccountTypeModal isOpen={showModal} onClose={() => setShowModal(false)} onSelect={handleAccountSelect} />

        {showForgot && <ForgotPassword onClose={() => setShowForgot(false)} />}
      </div>
    </div>
  );
};

export default LoginForm;
