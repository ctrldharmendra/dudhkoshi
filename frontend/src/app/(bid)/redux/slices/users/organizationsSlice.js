import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from "@/lib/axiosInstance"; 

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;


// PUT | UPDATE A PARTICULAR ORGANIZATION 
export const updateUserOrganization = createAsyncThunk(
  'updateUserOrganization',
  async ({payload}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/userorg/organizations`, 
         payload
    
    );

console.log(data, "DATA ORG SLICE")

      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed Updation');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// GET ALL ORGANIZATION 
export const getUserOrganization = createAsyncThunk(
  'getUserOrganization',
  async ({}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/userorg/organizations`
    );

      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to get info');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



// DOCUMENTS FILE 

// POST USER ORGANIZATION DOCUMENTS 
export const createUserOrgDocuments = createAsyncThunk(
  'createUserOrgDocuments',
  async ({formData}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/userorg/organizations/docs`, 
        formData
      );
      
      console.log(data, "DATA ORG DOCUMENTS SLICE")
      
      return data?.data;
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed Updation');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET USER ORGANIZATION DETAILS 
export const getUserOrganizationDocuments = createAsyncThunk(
  'getUserOrganizationDocuments',
  async ({}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/userorg/organizations/docs`
    );

    console.log(data?.data)
      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to get Info');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const organizationSlice = createSlice({
  name: 'organizationSlice',
  initialState: {
    userOrganization:[],
    organizationUpdateLoading:false,
    organizationGetLoading:false,

    userOrgDocuments: [],
    userOrgDocumentsLoading: false,

    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
//   PUT UPDATE ORG 
    builder
      .addCase(updateUserOrganization.pending, (state) => {
        state.organizationUpdateLoading = true;
      })
      .addCase(updateUserOrganization.fulfilled, (state, action) => {
        state.organizationUpdateLoading = false;
        state.userOrganization = action.payload
      })
      .addCase(updateUserOrganization.rejected, (state, action) => {
        state.organizationUpdateLoading = false;
        state.error = action.payload;
      });
    //   GET ORG 
    builder
      .addCase(getUserOrganization.pending, (state) => {
        state.organizationGetLoading = true;
      })
      .addCase(getUserOrganization.fulfilled, (state, action) => {
        state.organizationGetLoading = false;
        state.userOrganization = action.payload;
      })
      .addCase(getUserOrganization.rejected, (state, action) => {
        state.organizationGetLoading = false;
        state.error = action.payload;
      });

      // USER ORG DOCUMENTS 
      // POST 
    builder
      .addCase(createUserOrgDocuments.pending, (state) => {
        state.userOrgDocumentsLoading = true;
      })
      .addCase(createUserOrgDocuments.fulfilled, (state, action) => {
        state.userOrgDocumentsLoading = false;
        state.userOrgDocuments = action.payload;
      })
      .addCase(createUserOrgDocuments.rejected, (state, action) => {
        state.userOrgDocumentsLoading = false;
        state.error = action.payload;
      });

      // GET 
    builder
      .addCase(getUserOrganizationDocuments.pending, (state) => {
        state.userOrgDocumentsLoading = true;
      })
      .addCase(getUserOrganizationDocuments.fulfilled, (state, action) => {
        state.userOrgDocumentsLoading = false;
        state.userOrgDocuments = action.payload;
      })
      .addCase(getUserOrganizationDocuments.rejected, (state, action) => {
        state.userOrgDocumentsLoading = false;
        state.error = action.payload;
      });
  },
});

export default organizationSlice.reducer;