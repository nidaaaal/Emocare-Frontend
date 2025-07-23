// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Api/baseurl';

export const loginUser = createAsyncThunk(
  'authentication/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post('/authentication/login', loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  if(action.payload.success){
  state.user = action.payload.data;
  localStorage.setItem('token', action.payload.data.token);
    localStorage.setItem('userId', action.payload.data.id);
  }

})
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;