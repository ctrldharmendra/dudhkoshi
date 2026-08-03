import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED

// GET all applicants who has applied to A particular bid
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
// GET all documents of a particular bid applied by particular applicant 
export const getApplicantDocumentForParticularBid = createAsyncThunk(
  'getApplicantDocumentForParticularBid',
  async ({ applicationId, bidId}, thunkAPI) => {
    try {
    const { data } = await axiosInstance.get(
      `/api/bid/${bidId}/application/${applicationId}/documents`
    );
    // console.log(data, "SLI:particular bid docs")
      return data?.data;

    } catch (err) {
      console.log(err.response?.data)
      toast.error(err.response?.data?.errors || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// APPLY A BID  
export const applyBid = createAsyncThunk(
  'bidApplication/applyBid',
  async ({ bid, formDataToSend }, thunkAPI) => {
    try {

      //  No Content-Type header needed
      // axios automatically sets multipart/form-data + correct boundary
      // when it detects the body is a FormData object
      const { data } = await axiosInstance.post(
        `/api/bid/bidform/${bid}/apply`,
        formDataToSend
      );


      if(data?.statusCode === 400) return toast.error(data?.errors || data?.data?.errors)

      // toast.success('Application submitted successfully.');
      return data?.data;

    } catch (err) {
      // With axios, error response body is at err.response.data
      // NOT at err.message like fetch
      console.log(err.response)
      const message = err.response?.data?.errors || err.response?.data?.message ||  'Failed to apply.';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET LOGGEDIN USER APPLIED BID LIST 
export const getLoggedInUserBids = createAsyncThunk(
  'getLoggedInUserBids',
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
      `/api/bid/applied?${params.toString()}`
    );
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// how many bid this user has applied | required: userId
export const getParticularUserAppliedBid = createAsyncThunk(
  'getParticularUserAppliedBid',
  async ({userId}, thunkAPI) => {
    try {

    const { data } = await axiosInstance.get(
      `/api/bid/applied/count/${userId}`
    );
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const bidApplicationSlice = createSlice({
  name: 'bidApplicationSlice',
  initialState: {

    applicantsToParticularBid:[],
    applicantsToParticularBidLoading:false,

    particularApplicantDocuments:{},
    particularApplicantDocumentsLoading:{},

    applyBidLoading:false,

    loggedInUserBidsList: [],
    loggedInUserBidsListLoading:false,

    howManyBidThisUserApplied:[],
    howManyBidThisUserAppliedLoading:false,




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
    //   GET | Particular Applicant DOCS of Particular BID 
    builder
      .addCase(getApplicantDocumentForParticularBid.pending, (state) => {
        state.particularApplicantDocumentsLoading = true;
      })
      .addCase(getApplicantDocumentForParticularBid.fulfilled, (state, action) => {
        state.particularApplicantDocumentsLoading = false;
        state.particularApplicantDocuments = action.payload;
      })
      .addCase(getApplicantDocumentForParticularBid.rejected, (state, action) => {
        state.particularApplicantDocumentsLoading = false;
        state.error = action.payload;
      });

      // POST | APPLY A BID 
    builder
      .addCase(applyBid.pending, (state) => {
        state.applyBidLoading = true;
      })
      .addCase(applyBid.fulfilled, (state, action) => {
        state.applyBidLoading = false;
        // state.particularApplicantDocuments = action.payload;
      })
      .addCase(applyBid.rejected, (state, action) => {
        state.applyBidLoading = false;
        state.error = action.payload;
      });
      // GET LOGGED IN USER BID LIST 
    builder
      .addCase(getLoggedInUserBids.pending, (state) => {
        state.loggedInUserBidsListLoading = true;
      })
      .addCase(getLoggedInUserBids.fulfilled, (state, action) => {
        state.loggedInUserBidsListLoading = false;
        state.loggedInUserBidsList = action.payload;
      })
      .addCase(getLoggedInUserBids.rejected, (state, action) => {
        state.loggedInUserBidsListLoading = false;
        state.error = action.payload;
      });
      
      // GET HOW MANY BID THIS USER APPLIED | 
    builder
      .addCase(getParticularUserAppliedBid.pending, (state) => {
        state.howManyBidThisUserAppliedLoading = true;
      })
      .addCase(getParticularUserAppliedBid.fulfilled, (state, action) => {
        state.howManyBidThisUserAppliedLoading = false;
        state.howManyBidThisUserApplied = action.payload;
      })
      .addCase(getParticularUserAppliedBid.rejected, (state, action) => {
        state.howManyBidThisUserAppliedLoading = false;
        state.error = action.payload;
      });

  },
});

export default bidApplicationSlice.reducer;