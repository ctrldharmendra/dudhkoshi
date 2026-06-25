import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { setIsDeleteOpened } from '../activitySlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;



// GET   | GET PERMISSION OF LOGGED IN USER ROLE
export const deleteUser = createAsyncThunk(
  'deleteUser',
async ({id}, thunkAPI) => {

    try {

      const res = await fetch(
        `/api/user/users/${id}`,
        {
          method: 'DELETE',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      // console.log(data, "user delete slice")

      if (!res.ok) {
        toast.error(data.message || 'Failed Deleting user');
        return thunkAPI.rejectWithValue(data.message);
      }

      if(res.ok) {
        toast.success("User Deleted Success.")
        thunkAPI.dispatch(setIsDeleteOpened(false));
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);






const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    users:[],
    deleteUserLoadingState: false,
    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
// GET   | GET PERMISSION OF LOGGED IN USER ROLE
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


  },
});

export default userSlice.reducer;