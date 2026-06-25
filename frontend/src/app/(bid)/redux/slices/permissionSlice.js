// /api/roles/view/allpermissions




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { setIsPermissisonOpened } from './activitySlice';

// GET   | GET ALL PERMISSION FROM DB
export const getAllPermissionFromDbFn = createAsyncThunk(
  'getAllPermissionFromDbFn',
async ({}, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const { lastFetched, debitNote,error } = state.debitNote;

    // const ONE_HOUR = 60 * 60 * 1000;

    // if (lastFetched && Date.now() - lastFetched < ONE_HOUR) {
    //   return debitNote;
    // }
    try {

      const res = await fetch(
        `/api/roles/view/allpermissions`,
        {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log(data, "get all permission permissionslice fromdb")

      if (!res.ok) {
        toast.error(data.message || 'Failed To Fetch all Permissions');
        return thunkAPI.rejectWithValue(data.message);
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//POST | ADD PERMISSION TO A ROLE 
  export const addPermissionFn = createAsyncThunk(
  'addPermissionFn',
  async ({roleId, permissions}, thunkAPI) => {
    try {
      const res = await fetch(
        `/api/roles/${roleId}/permissions`,
        {
          method: 'POST', 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          //  convert into json    
            body: JSON.stringify({permissions}),
        }
      );

      const data = await res.json();
// console.log(res, "res")
// console.log(data, "data")
      if (!res.ok) {
        toast.error(data.message || 'Failed Add');
        return thunkAPI.rejectWithValue(data.message);
      }
      if(res.ok) {
        toast.success("Role Add Scuccess.")
        thunkAPI.dispatch(setIsPermissisonOpened(false));
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

  export const deletePermissionFn = createAsyncThunk(
  'deletePermissionFn',
  async ({roleId, permissions}, thunkAPI) => {
    try {
      const res = await fetch(
        `/api/roles/${roleId}/permissions`,
        {
          method: 'DELETE', 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          //  convert into json    
            body: JSON.stringify({permissions}),
        }
      );

      const data = await res.json();
console.log(res, "res")
console.log(data, "data")
      if (!res.ok) {
        toast.error(data.message || 'Failed Add');
        return thunkAPI.rejectWithValue(data.message);
      }
      if(res.ok) {
        toast.success("Role Add Scuccess.")
        thunkAPI.dispatch(setIsPermissisonOpened(false));
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const permissionSlice = createSlice({
  name: 'permissionSlice',
  initialState: {
    allPermissionFromDb: [],
    allPermissionLoading:false,

    addPermissionLoading:false,
    deletePermissionLoading:false,

    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
// GET   | GET ALL PERMISSION FROM DB
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
      // POST | Add a new permission
    builder
      .addCase(addPermissionFn.pending, (state) => {
        state.addPermissionLoading = true;
      })
      .addCase(addPermissionFn.fulfilled, (state, action) => {
        state.addPermissionLoading = false;
        // state.allPermissionFromDb = action.payload;
      })
      .addCase(addPermissionFn.rejected, (state, action) => {
        state.addPermissionLoading = false;
        state.error = action.payload;
      });
      // DELETE | Deletre a permissionn 
    builder
      .addCase(deletePermissionFn.pending, (state) => {
        state.deletePermissionLoading = true;
      })
      .addCase(deletePermissionFn.fulfilled, (state, action) => {
        state.deletePermissionLoading = false;
        // state.allPermissionFromDb = action.payload;
      })
      .addCase(deletePermissionFn.rejected, (state, action) => {
        state.deletePermissionLoading = false;
        state.error = action.payload;
      });

  },
});

export default permissionSlice.reducer;