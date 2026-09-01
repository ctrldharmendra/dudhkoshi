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
    console.log(data, "all bid")
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST | CREATE A BID FORM
export const createBidForm = createAsyncThunk(
  "createBidForm",
  async ({ bidData }, thunkAPI) => {
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("title", bidData.title);
      formData.append("publishDate", bidData.publishDate);
      formData.append("openDate", bidData.openDate);
      formData.append("closeDate", bidData.closeDate);
      formData.append("description", bidData.description);
      formData.append("status", bidData.status);

      formData.append("estimatedAmt", bidData.estimatedAmt);
      formData.append(
        "isEstimatedIncludingVat",
        bidData.isEstimatedIncludingVat
      );
      formData.append("bidSecurityAmnt", bidData.bidSecurityAmnt);
      formData.append("bidSecurityValidityInDays",bidData.bidSecurityValidityInDays);
      formData.append(
        "bidDocumentRefundable",
        bidData.bidDocumentRefundable
      );
      formData.append(
        "isBidDocumentRefundable",
        bidData.isBidDocumentRefundable
      );
      formData.append("contractNo", bidData.contractNo);

      // Arrays/objects -> stringify
      formData.append("fields", JSON.stringify(bidData.fields));

      // Attachments
      bidData.attachments.forEach((item) => {
        formData.append("files", item.attachment); // File object
        formData.append("attachmentTitles", item.title);
      });

      const { data } = await axiosInstance.post(
        "/api/bid/bidform",
        formData
      );
      return data.data;
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.errors || "Something Went Wrong.");
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
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
    console.log(data?.data, "DATA")
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.errors || "Something Went Wrong.");
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
//       if(err.response?.data?.errors){
//             console.log("STATUS:", err.response?.status);
//     console.log("DATA:", err.response?.data?.errors);
//           toast.error( err.response?.data?.errors);
//   }

//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
export const editBidForm = createAsyncThunk(
  'editBidForm',
  async ({ formData, id }, thunkAPI) => {  //  destructure formData not bidData
    try {

      const { data } = await axiosInstance.put(
        `/api/bid/bidform/${id}`,
        formData
        //  NO Content-Type header — axios detects FormData automatically
        // and sets multipart/form-data + correct boundary
      );

      return data?.data;

    } catch (err) {
      const message = err.response?.data?.message || err.message;

      if (err.response?.data?.errors) {
        toast.error(err.response?.data?.errors);
      } else {
        toast.error(message);
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);



// GET ALL ACTIVE, NON AWARDED BID 
export const getAllActiveNonAwardedBid = createAsyncThunk(
  'getAllActiveNonAwardedBid',
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
      `/api/bid/active?${params.toString()}`
    );
    console.log(data, "all bid")
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
const bidFormSlice = createSlice({
  name: 'bidFormSlice',
  initialState: {

    allBidFormLoading: false,
    allBidFormFromDb: [],

    createBidFormLoading:false,

    particularBidForm:null,
    particularBidFormLoading:false,

    activeBidLoading:false,
    activeBids:[],


    
    error: "",
    lastFetched: "",
  },
   reducers: {
    clearParticularBidForm: (state) => {
      state.particularBidForm = null
    }
  },

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

      // GET ACTIVE BID 
      builder
      .addCase(getAllActiveNonAwardedBid.pending, (state) => {
        state.activeBidLoading = true;
      })
      .addCase(getAllActiveNonAwardedBid.fulfilled, (state, action) => {
        state.activeBidLoading = false;
        state.activeBids = action.payload;
      })
      .addCase(getAllActiveNonAwardedBid.rejected, (state, action) => {
        state.activeBidLoading = false;
        state.error = action.payload;
      });

  },
});

export const { clearParticularBidForm } = bidFormSlice.actions
export default bidFormSlice.reducer;