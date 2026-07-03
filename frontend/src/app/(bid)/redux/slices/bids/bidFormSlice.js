import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED

// GET | GET ALL BID FORM FROM 
export const getAllBidForm = createAsyncThunk(
  'getAllBidForm',
  async ({ bidPage, bidSearch, limit, from, to}, thunkAPI) => {
    try {
        const params = new URLSearchParams();

    params.set("page", bidPage);
    params.set("limit", limit);

    if (bidSearch) {
      params.set("search", bidSearch);
    }

    if (from) {
      params.set("from", from);
    }

    if (to) {
      params.set("to", to);
    }

    const { data } = await axiosInstance.get(
      `/api/bid/bidform?${params.toString()}`
    );
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST | CREATE A BID FORM
export const createBidForm = createAsyncThunk(
  'createBidForm',
  async ({bidData}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/bid/bidform`, bidData);
        console.log(data.data)
      return data?.data;

    } catch (err) {
          console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.log("MESSAGE:", err.message);
      toast.error( 'Failed Add');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET PARTICULAR BID FORM 
export const getParticularBidForm = createAsyncThunk(
  'getParticularBidForm',
  async ({ id}, thunkAPI) => {
    try {

    const { data } = await axiosInstance.get(
      `/api/bid/bidform/${id}`
    );
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// DELETE | DELETE A BID FORM
// export const deleteBidForm = createAsyncThunk(
//   'deleteBidForm',
//   async ({roleId, permissions}, thunkAPI) => {
//     try {
//       const { data } = await axiosInstance.delete(`/api/roles/${roleId}/permissions`, {
//         data: { permissions }  // ← axios DELETE body goes inside { data: ... }
//       });

//       console.log(data, "data")
//       toast.success("Role Add Scuccess.")
//       thunkAPI.dispatch(setIsPermissisonOpened(false));
//       return data?.data;

//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed Add');
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


const bidFormSlice = createSlice({
  name: 'bidFormSlice',
  initialState: {

    allBidFormLoading: false,
    allBidFormFromDb: [],

    createBidFormLoading:false,

    particularBidForm:{},
    particularBidFormLoading:false,


    
    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    // GET | GET ALL BID FORM FROM DB
    builder
      .addCase(getAllBidForm.pending, (state) => {
        state.allBidFormLoading = true;
      })
      .addCase(getAllBidForm.fulfilled, (state, action) => {
        state.allBidFormLoading = false;
        state.allBidFormFromDb = action.payload;
      })
      .addCase(getAllBidForm.rejected, (state, action) => {
        state.allBidFormLoading = false;
        state.error = action.payload;
      });
    //   GET PARTICULAR BID FORM 
    builder
      .addCase(getParticularBidForm.pending, (state) => {
        state.particularBidFormLoading = true;
      })
      .addCase(getParticularBidForm.fulfilled, (state, action) => {
        state.particularBidFormLoading = false;
        state.particularBidForm = action.payload;
      })
      .addCase(getParticularBidForm.rejected, (state, action) => {
        state.particularBidFormLoading = false;
        state.error = action.payload;
      });
    //   POOST | CREATE A BID FORM 
    builder
      .addCase(createBidForm.pending, (state) => {
        state.createBidFormLoading = true;
      })
      .addCase(createBidForm.fulfilled, (state, action) => {
        state.createBidFormLoading = false;
      })
      .addCase(createBidForm.rejected, (state, action) => {
        state.createBidFormLoading = false;
        state.error = action.payload;
      });

  },
});

export default bidFormSlice.reducer;