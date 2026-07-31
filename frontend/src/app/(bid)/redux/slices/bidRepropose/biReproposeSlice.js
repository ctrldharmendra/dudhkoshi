// /api/proposal/repropose/52/154


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED


// GET | BID REPROPOSE 
export const getBidderReproposeDoc = createAsyncThunk(
  'getBidderReproposeDoc',
  async ({bidId, userId}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/proposal/repropose/${bidId}/${userId}`);
    //   console.log(data, "from bid repropose")
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createBidPropose = createAsyncThunk(
  'createBidPropose',
  async ({bidId, userId, formData}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/proposal/repropose/${bidId}/${userId}` , formData);
      console.log(data, "from bid repropose create")

            // Refresh the list 
      thunkAPI.dispatch(
        getBidderReproposeDoc({
          bidId,
          userId,
        })
      );
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const bidReproposeSlice = createSlice({
  name: 'bidReproposeSlice',
  initialState: {

    bidReproposeData: [],
    bidReproposeLoading: false,


    error: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    // GET BID REPROPSE 
    builder
      .addCase(getBidderReproposeDoc.pending, (state) => {
        state.bidReproposeLoading = true;
      })
      .addCase(getBidderReproposeDoc.fulfilled, (state, action) => {
        state.bidReproposeLoading = false;
        state.bidReproposeData = action.payload;
      })
      .addCase(getBidderReproposeDoc.rejected, (state, action) => {
        state.bidReproposeLoading = false;
        state.error = action.payload;
      });

      // CREATE BID REPROPOSE
        builder
          .addCase(createBidPropose.pending, (state) => {
            state.bidReproposeLoading = true;
          })
          .addCase(createBidPropose.fulfilled, (state, action) => {
            state.bidReproposeLoading = false;
          })
          .addCase(createBidPropose.rejected, (state, action) => {
            state.bidReproposeLoading = false;
            // state.error = action.payload;
          });
    
  },
});

export default bidReproposeSlice.reducer;