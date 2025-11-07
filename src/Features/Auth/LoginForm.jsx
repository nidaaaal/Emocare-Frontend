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
import loginIllustration from '../../assets/Images/heroSection/login.png'; // add your SVG/PNG here
import Navbar from '../../assets/Components/Navbar';

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
        localStorage.setItem(
          'userdata',
          JSON.stringify({
            userid: result.data.id,
            name: result.data.fullName,
            role: result.data.role,
          })
        );
        localStorage.setItem('chattoken', result.data.signalRToken);
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
    if (type === 'user') navigate('/user/register');
    else if (type === 'psychologist') navigate('/psy/register');
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e6f7f7] to-white px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Form Section */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Login Account</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Don’t have an account?{' '}
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
              {error}
            </div>
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Password*
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Remember Me?</span>
                  </label>
                  <span
                    onClick={() => setShowForgot(true)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Forgot Password
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                {/* <button
                  type="button"
                  className="w-full bg-gray-100 flex items-center justify-center py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Sign in with Google
                </button> */}
                
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Illustration Section */}
        <div className="flex-1 hidden md:flex items-center justify-center bg-white p-6">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="max-w-5xl"
          />
        </div>
      </div>

      <AccountTypeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleAccountSelect}
      />

      {showForgot && <ForgotPassword onClose={() => setShowForgot(false)} />}
    </div>
        </>

  );
};

export default LoginForm;
