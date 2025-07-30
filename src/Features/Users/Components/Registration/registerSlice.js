import { createSlice } from "@reduxjs/toolkit";

// Initial state with localStorage hydration for basicInfo
const initialState = {
  basicInfo: JSON.parse(localStorage.getItem("basicInfo")) || {},
  questionInfo: {},
  psychologistDetails: {},
  credentials: {},
};

const registerSlice = createSlice({
  name: "userReg",
  initialState,
  reducers: {
    // Sets and persists basic information
    setBasicInfo: (state, action) => {
      state.basicInfo = action.payload;
      localStorage.setItem("basicInfo", JSON.stringify(action.payload));
    },

    // Sets psychologist-specific form details
    setPsychologistDetails: (state, action) => {
      state.psychologistDetails = action.payload;
    },

    // Sets login credentials (email + password)
    setCredentials: (state, action) => {
      state.credentials = action.payload;
    },

    // Clears all registration state and localStorage
    clearRegistration: (state) => {
      state.basicInfo = {};
      state.questionInfo = {};
      state.psychologistDetails = {};
      state.credentials = {};
      localStorage.removeItem("basicInfo");
    },
  },
});

export const {
  setBasicInfo,
  setQuestionInfo,
  setPsychologistDetails,
  setCredentials,
  clearRegistration,
} = registerSlice.actions;

export default registerSlice.reducer;
