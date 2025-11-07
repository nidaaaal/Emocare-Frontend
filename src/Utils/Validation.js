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

export const questionValidationSchema = yup.object({
  fullName: yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(30, "Full name must be at most 30 characters"),
  
  age: yup.number()
    .required("Age is required")
    .min(13, "You must be at least 13")
    .max(99, "You must be under 100"),
  
  gender: yup.string()
    .required("Gender is required")
    .max(6, "Gender must be less than 6 characters"),
  
  job: yup.string()
    .required("Job is required"),
  
  relationshipStatus: yup.string()
    .required("Relationship status is required"),
  
  country: yup.string()
    .max(100, "Country name too long")
    .nullable(),
  
  city: yup.string()
    .max(100, "City name too long")
    .nullable(),
  
  email: yup.string()
    .required("Email is required")
    .email("Invalid email format")
});

