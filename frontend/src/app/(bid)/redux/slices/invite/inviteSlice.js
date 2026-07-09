


// /api/invite


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { setIsDeleteOpened } from '../activitySlice';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED


// GET | LOGGED IN USER DETAILS 
export const getInviteHistory = createAsyncThunk(
  'getInviteHistory',
  async ({}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/invite`);
    //   console.log(data, "from Invite")
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const inviteSlice = createSlice({
  name: 'inviteSlice',
  initialState: {

    inviteHistory: [],
    inviteHistoryLoading: false,


    error: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    // GET INVITE HISTORY 
    builder
      .addCase(getInviteHistory.pending, (state) => {
        state.inviteHistoryLoading = true;
      })
      .addCase(getInviteHistory.fulfilled, (state, action) => {
        state.inviteHistoryLoading = false;
        state.inviteHistory = action.payload;
      })
      .addCase(getInviteHistory.rejected, (state, action) => {
        state.inviteHistoryLoading = false;
        state.error = action.payload;
      });
    
  },
});

export default inviteSlice.reducer;