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
    // console.log(data?.data)
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// APPLY A BID  

// export const applyBid = createAsyncThunk(
//   'applyBid',
//   async ({ bid, values }, thunkAPI) => {
//     try {
//       // Convert the array payload to a JSON string wrapped inside an object key
//       const payload = {
//         values: JSON.stringify(values)
//       };

//       console.log("Payload sent to Backend Slice:", payload);

//       const { data } = await axiosInstance.post(
//         `/api/bid/bidform/${bid}/apply`,
//         payload, 
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Success Response Data:", data);
//       toast.success('Application submitted successfully!');
//       return data?.data;

//     } catch (err) {
//       console.error("Submission Error Response:", err.response?.data);
      
//       const errorMessage = err.response?.data?.message || err.message || 'Failed Add';
//       toast.error(errorMessage);
      
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );


// bidApplicationSlice.js
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

      toast.success('Application submitted successfully.');
      return data?.data;

    } catch (err) {
      // With axios, error response body is at err.response.data
      // NOT at err.message like fetch
      console.log(err.response)
      const message = err.response?.data?.message || 'Failed to apply.';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
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

    particularApplicantDocuments:{},
    particularApplicantDocumentsLoading:{},

    applyBidLoading:false,




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

  },
});

export default bidApplicationSlice.reducer;