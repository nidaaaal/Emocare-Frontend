// src/validation/loginSchema.js
import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

export const registerValidationSchema= yup.object({
    EmailAddress:yup.string().email('Invalid email').required('email is required'),
    Password:yup.string()
    .min(8,'password must be at least 8 charecters')
    .matches(/[A-Z]/,'must include a uppercase letter')
    .matches(/[a-z]/,'must include a lowercase letter')
    .matches(/\d/,'must include a number')
    .matches(/[@$%&*!]/,'must include a special charecter')
    .required('password is required'),
    ConfirmPassword:yup.string()
    .oneOf([yup.ref('Password')],'password must matches')
    .required('confirmpassword is required')
})


export const userCredentialSchema = yup.object().shape({
  EmailAddress: yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  
  Password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  ConfirmPassword: yup.string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required("Confirm your password"),
});

