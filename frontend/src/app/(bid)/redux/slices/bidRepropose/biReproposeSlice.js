// /api/proposal/repropose/52/154


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED


// GET | BID REPROPOSE | OF SELECTED USER
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
// CREATE BID REPROPOSE QUESTION 
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

// CREATE |   REPLY TO REQUOTED QUESTION FOR PARTICULAR BID
export const replyToParticularRequote = createAsyncThunk(
  'replyToParticularRequote',
  async ({bidId, selectedReproposeId, formData}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/proposal/reply/${bidId}/${selectedReproposeId}` , formData);
      console.log(data, "reply repropose ")

            // Refresh the list 
      // thunkAPI.dispatch(
      //   getBidderReproposeDoc({
      //     bidId,
      //     userId,
      //   })
      // );
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// http://localhost:5001/api/proposal/loggedIn/reqoutes/

// GET ALL PROPOSE WITH ANS | LOGGED IN USER 
export const getAllReproposeWithAnsLogged = createAsyncThunk(
  'getAllReproposeWithAnsLogged',
  async ({bidId}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/proposal/loggedIn/reqoutes/${bidId}`);
      // console.log(data, "from bid repropose bidReproposeWithAns")
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

    LoggedInUserBidReProposeWithAns: [],
    LoggedInUserBidReProposeWithAnsLoading: false,

    createReplyReproposeLoading:false,



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

      // GET ALL PROPOSE WITH ANS | LOGGED IN USER 
        builder
          .addCase(getAllReproposeWithAnsLogged.pending, (state) => {
            state.LoggedInUserBidReProposeWithAnsLoading = true;
          })
          .addCase(getAllReproposeWithAnsLogged.fulfilled, (state, action) => {
            state.LoggedInUserBidReProposeWithAnsLoading = false;
            state.LoggedInUserBidReProposeWithAns = action.payload;
          })
          .addCase(getAllReproposeWithAnsLogged.rejected, (state, action) => {
            state.LoggedInUserBidReProposeWithAnsLoading = false;
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

          // CREATE REPLY REPROPOSE
          builder
          .addCase(replyToParticularRequote.pending, (state) => {
            state.createReplyReproposeLoading = true;
          })
          .addCase(replyToParticularRequote.fulfilled, (state, action) => {
            state.createReplyReproposeLoading = false;
          })
          .addCase(replyToParticularRequote.rejected, (state, action) => {
            state.createReplyReproposeLoading = false;
            // state.error = action.payload;
          });
    
  },
});

export default bidReproposeSlice.reducer;