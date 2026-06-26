import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { setIsDeleteOpened } from '../activitySlice';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

// DELETE | DELETE USER BY ID
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async ({id}, thunkAPI) => {
    try {

      const { data } = await axiosInstance.delete(`/api/user/users/${id}`);
      // ↑ No body here so no need for { data: ... }, just the URL is enough

      toast.success("User Deleted Success.");
      thunkAPI.dispatch(setIsDeleteOpened(false));

      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      //                ↑ axios errors nest the response body under err.response.data
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



// GET | LOGGED IN USER DETAILS 
export const getLoggedInUserBasicInfo = createAsyncThunk(
  'getLoggedInUserBasicInfo',
  async ({}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/user/myprofile`);
      // console.log(data, "from getLoggedInUserBasic")
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    users:[],
    deleteUserLoadingState: false,

    loggedInUserBasicData:{},
    loggedInUserBasicDataLoading:false,


    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoadingState = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoadingState = false;
        state.users = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserLoadingState = false;
        state.error = action.payload;
      });
      // LOGGED IN USER BASIC DATA GET 
    builder
      .addCase(getLoggedInUserBasicInfo.pending, (state) => {
        state.loggedInUserBasicDataLoading = true;
      })
      .addCase(getLoggedInUserBasicInfo.fulfilled, (state, action) => {
        state.loggedInUserBasicDataLoading = false;
        state.loggedInUserBasicData = action.payload;
      })
      .addCase(getLoggedInUserBasicInfo.rejected, (state, action) => {
        state.loggedInUserBasicDataLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;