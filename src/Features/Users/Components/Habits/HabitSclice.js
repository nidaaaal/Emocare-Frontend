// src/features/habits/habitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../Api/baseurl";

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "habits/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/habitCategory", { withCredentials: true });
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch all habits
export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/habit", { withCredentials: true });
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch single habit by ID
export const fetchHabitById = createAsyncThunk(
  "habits/fetchHabitById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/habit/${id}`, { withCredentials: true });
      return res.data.data; // Assuming API returns single habit object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create habit
export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habitData, { rejectWithValue }) => {
    try {
      const res = await api.post("/habit", habitData, { withCredentials: true });
      return res.data; // Assuming API returns created habit object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update habit
export const updateHabit = createAsyncThunk(
  "habits/updateHabit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/habit/${id}`, data, { withCredentials: true });
      return res.data; // Assuming API returns updated habit object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const habitSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [],
    categories: [],
    habitDetails: null, // For storing a single habit
    loading: false,
    error: null,
    createStatus: "idle", // idle | loading | success | failed
  },
  reducers: {
    clearHabitDetails: (state) => {
      state.habitDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Habits
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Habit by ID
      .addCase(fetchHabitById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabitById.fulfilled, (state, action) => {
        state.loading = false;
        state.habitDetails = action.payload;
      })
      .addCase(fetchHabitById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Habit
      .addCase(createHabit.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.habits.push(action.payload.data); // Push newly created habit
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })

      // Update Habit
      .addCase(updateHabit.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        state.createStatus = "success";
        // Update habit in list if it exists
        const index = state.habits.findIndex((h) => h.id === action.payload.data.id);
        if (index !== -1) {
          state.habits[index] = action.payload.data;
        }
        state.habitDetails = action.payload.data;
      })
      .addCase(updateHabit.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearHabitDetails } = habitSlice.actions;
export default habitSlice.reducer;
