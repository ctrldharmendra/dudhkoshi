import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED

// GET PARTICULAR BID FORM 
export const getApplicantsToParticularBid = createAsyncThunk(
  'getApplicantsToParticularBidd',
  async ({ bid}, thunkAPI) => {
    try {

    const { data } = await axiosInstance.get(
      `/api/bid/${bid}/applicants`
    );
    console.log(data?.data)
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// EDIT PARTICULAR BID FORM 
// export const editBidForm = createAsyncThunk(
//   'editBidForm',
//   async ({bidData, id}, thunkAPI) => {

//     console.log(bidData, "FTOM SLCIE")
//     try {
//       const { data } = await axiosInstance.put(`/api/bid/bidform/${id}`, bidData);
//         console.log(data.data)
//       return data?.data;

//     } catch (err) {
//           console.log("STATUS:", err.response?.status);
//   console.log("DATA:", err.response?.data);
//   console.log("MESSAGE:", err.message);
//       toast.error( 'Failed Add');
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


const bidApplicationSlice = createSlice({
  name: 'bidApplicationSlice',
  initialState: {

    applicantsToParticularBid:[],
    applicantsToParticularBidLoading:false,



    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    // GET | GET APPLICANTS OF PARTICYULAR BID
    builder
      .addCase(getApplicantsToParticularBid.pending, (state) => {
        state.applicantsToParticularBidLoading = true;
      })
      .addCase(getApplicantsToParticularBid.fulfilled, (state, action) => {
        state.applicantsToParticularBidLoading = false;
        state.applicantsToParticularBid = action.payload;
      })
      .addCase(getApplicantsToParticularBid.rejected, (state, action) => {
        state.applicantsToParticularBidLoading = false;
        state.error = action.payload;
      });

  },
});

export default bidApplicationSlice.reducer;