import axiosInstance from "@/lib/axiosInstance";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';



// {
//    "bidId":42,
//     "winnerUserId":26
// }


export const createAward = createAsyncThunk(
  'createAward',
  async ({bidId, winnerUserId}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/auction/award`, {bidId, winnerUserId});

    console.log(data, "from award slice")
      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);





const awardSlice = createSlice({
  name: 'awardSlice',
  initialState: {
    awardLoading: false,



    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    // POST | CREATE AWARD
    builder
      .addCase(createAward.pending, (state) => {
        state.awardLoading = true;
      })
      .addCase(createAward.fulfilled, (state, action) => {
        state.awardLoading = false;
      })
      .addCase(createAward.rejected, (state, action) => {
        state.awardLoading = false;
        state.error = action.payload;
      });
  },
});

export default awardSlice.reducer;