import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTrends = createAsyncThunk(
  'trend/fetchTrends',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/trends');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const trendSlice = createSlice({
  name: 'trend',
  initialState: {
    trends: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.trends = action.payload;
      })
      .addCase(fetchTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default trendSlice.reducer;