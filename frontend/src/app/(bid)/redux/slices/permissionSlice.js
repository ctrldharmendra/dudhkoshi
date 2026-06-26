import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { setIsPermissisonOpened } from './activitySlice';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED

// GET | GET ALL PERMISSION FROM DB
export const getAllPermissionFromDbFn = createAsyncThunk(
  'getAllPermissionFromDbFn',
  async ({}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/roles/view/allpermissions`);
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST | ADD PERMISSION TO A ROLE
export const addPermissionFn = createAsyncThunk(
  'addPermissionFn',
  async ({roleId, permissions}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/roles/${roleId}/permissions`, { permissions });

      toast.success("Role Add Scuccess.")
      thunkAPI.dispatch(setIsPermissisonOpened(false));
      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed Add');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE | DELETE PERMISSION FROM A ROLE
export const deletePermissionFn = createAsyncThunk(
  'deletePermissionFn',
  async ({roleId, permissions}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/roles/${roleId}/permissions`, {
        data: { permissions }  // ← axios DELETE body goes inside { data: ... }
      });

      console.log(data, "data")
      toast.success("Role Add Scuccess.")
      thunkAPI.dispatch(setIsPermissisonOpened(false));
      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed Add');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const permissionSlice = createSlice({
  name: 'permissionSlice',
  initialState: {
    allPermissionFromDb: [],
    allPermissionLoading: false,
    addPermissionLoading: false,
    deletePermissionLoading: false,
    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    // GET | GET ALL PERMISSION FROM DB
    builder
      .addCase(getAllPermissionFromDbFn.pending, (state) => {
        state.allPermissionLoading = true;
      })
      .addCase(getAllPermissionFromDbFn.fulfilled, (state, action) => {
        state.allPermissionLoading = false;
        state.allPermissionFromDb = action.payload;
      })
      .addCase(getAllPermissionFromDbFn.rejected, (state, action) => {
        state.allPermissionLoading = false;
        state.error = action.payload;
      });

    // POST | ADD PERMISSION
    builder
      .addCase(addPermissionFn.pending, (state) => {
        state.addPermissionLoading = true;
      })
      .addCase(addPermissionFn.fulfilled, (state, action) => {
        state.addPermissionLoading = false;
      })
      .addCase(addPermissionFn.rejected, (state, action) => {
        state.addPermissionLoading = false;
        state.error = action.payload;
      });

    // DELETE | DELETE PERMISSION
    builder
      .addCase(deletePermissionFn.pending, (state) => {
        state.deletePermissionLoading = true;
      })
      .addCase(deletePermissionFn.fulfilled, (state, action) => {
        state.deletePermissionLoading = false;
      })
      .addCase(deletePermissionFn.rejected, (state, action) => {
        state.deletePermissionLoading = false;
        state.error = action.payload;
      });
  },
});

export default permissionSlice.reducer;