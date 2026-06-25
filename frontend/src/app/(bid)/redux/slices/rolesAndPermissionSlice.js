import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { cache } from 'react';
import { setIsDeleteOpened, setIsEditOpened } from './activitySlice';
import { setIsAddOpened } from './activitySlice';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;



// GET   | GET PERMISSION OF LOGGED IN USER ROLE
export const getRolePermissionLoggedInUser = createAsyncThunk(
  'getUserRoleLoggedInUser/getUserRole',
async ({}, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const { lastFetched, debitNote,error } = state.debitNote;

    // const ONE_HOUR = 60 * 60 * 1000;

    // if (lastFetched && Date.now() - lastFetched < ONE_HOUR) {
    //   return debitNote;
    // }
    try {

      const res = await fetch(
        `/api/roles/view/permissions`,
        {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      // console.log(data, "getRolePerLoggUser slice")

      if (!res.ok) {
        toast.error(data.message || 'Failed Get Your Permission');
        return thunkAPI.rejectWithValue(data.message);
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// GET   | GET ALL ROLE WITH ITS PERMISSION 
export const getAllRoleWithItsPermission = createAsyncThunk(
  'RolePermisssion/getAllRoleWithItsPermission',
async ({}, thunkAPI) => {
    try {

      const res = await fetch(
        `/api/manage/roles`,
        {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      // console.log(data.data, "getAllRoleWithItsPermission slice")
      if (!res.ok) {
        toast.error(data.message || 'Failed Get Your Permission');
        return thunkAPI.rejectWithValue(data.message);
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// PATCH   | CHANGE ROLE OF A USER  | WHO HAVE ACCESS TO CHANGE ONLY CAN 
  export const changeRole = createAsyncThunk(
  'postDebitNote',
  async ({id, selectedRole}, thunkAPI) => {
    try {
      const res = await fetch(
        `/api/user/role/${id}`,
        {
          method: 'PATCH', 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          //  convert into json    
            body: JSON.stringify({
            role_id: selectedRole,
             }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to save voucher');
        return thunkAPI.rejectWithValue(data.message);
      }
      if(res.ok) {
        toast.success("Role Update Scuccess.")
        thunkAPI.dispatch(setIsEditOpened(false));
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// ADD A NEW ROLE 
  export const addNewRole = createAsyncThunk(
  'addNewRole',
  async ({roleName}, thunkAPI) => {
    try {
      const res = await fetch(
        `/api/manage/roles`,
        {
          method: 'POST', 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          //  convert into json    
            body: JSON.stringify({roleName}),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed Add');
        return thunkAPI.rejectWithValue(data.message);
      }
      if(res.ok) {
        toast.success("Role Add Scuccess.")
        thunkAPI.dispatch(setIsAddOpened(false));
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// DELETE A PARTICULAR ROLE 
export const deleteRole = createAsyncThunk(
  'deleteRole',
async ({id}, thunkAPI) => {

    try {

      const res = await fetch(
        `/api/manage/roles/${id}`,
        {
          method: 'DELETE',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();

      console.log(data?.data)

      if (!res.ok || res.status!=201) {
        toast.error(data.errors || data?.message);
        return thunkAPI.rejectWithValue(data.message);
      }
      

      if(res.ok && res.status==201) {
        toast.success("Role Deleted Success.")
        thunkAPI.dispatch(setIsDeleteOpened(false));
      }
      
      return data?.data;

  

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// UPDATE A ROLE NAME 
  export const updateRoleName = createAsyncThunk(
  'updateRoleName',
  async ({roleId, roleName}, thunkAPI) => {
    try {
      const res = await fetch(
        `/api/manage/roles/${roleId}`,
        {
          method: 'PATCH', 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          //  convert into json    
            body: JSON.stringify({roleName}),
        }
      );

      const data = await res.json();

      // console.log(data)

      if (!res.ok) {
        toast.error(data.message || 'Failed to save voucher');
        return thunkAPI.rejectWithValue(data.message);
      }
      if(res.ok) {
        toast.success("Role Update Scuccess.")
        thunkAPI.dispatch(setIsEditOpened(false));
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const rolesAndPermissionSlice = createSlice({
  name: 'rolesAndPermissionSlice',
  initialState: {
    permissionOfLoggedInRoleOfUser: null,
    RoleWithItsPermission: null,
    loading: false,
    loadingChangeRole: false,
    loadingOfGetRolePermission:false,
    loadingGetAllRoleWithPermission:false,

    addRoleLoading:false,
    deleteRoleLoading:false,
    updateRoleNameLoading:false,

    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
// GET   | GET PERMISSION OF LOGGED IN USER ROLE
    builder
      .addCase(getRolePermissionLoggedInUser.pending, (state) => {
        state.loadingOfGetRolePermission = true;
      })
      .addCase(getRolePermissionLoggedInUser.fulfilled, (state, action) => {
        state.loadingOfGetRolePermission = false;
        state.permissionOfLoggedInRoleOfUser = action.payload;
      })
      .addCase(getRolePermissionLoggedInUser.rejected, (state, action) => {
        state.loadingOfGetRolePermission = false;
        state.error = action.payload;
      });

// GET   | GET ALL ROLE WITH ITS PERMISSION 
    builder
      .addCase(getAllRoleWithItsPermission.pending, (state) => {
        state.loadingGetAllRoleWithPermission = true;
      })
      .addCase(getAllRoleWithItsPermission.fulfilled, (state, action) => {
        state.loadingGetAllRoleWithPermission = false;
        state.RoleWithItsPermission = action.payload;
      })
      .addCase(getAllRoleWithItsPermission.rejected, (state, action) => {
        state.loadingGetAllRoleWithPermission = false;
        state.error = action.payload;
      });

      // PUT
      builder
      .addCase(changeRole.pending, (state) => {
        state.loadingChangeRole = true;
      })
      .addCase(changeRole.fulfilled, (state, action) => {
        state.loadingChangeRole = false;
      })
      .addCase(changeRole.rejected, (state, action) => {
        state.loadingChangeRole = false;
      });

      // ADD ROLE | POST
      builder
      .addCase(addNewRole.pending, (state) => {
        state.addRoleLoading = true;
      })
      .addCase(addNewRole.fulfilled, (state, action) => {
        state.addRoleLoading = false;
        state.RoleWithItsPermission.push(action.payload)
      })
      .addCase(addNewRole.rejected, (state, action) => {
        state.addRoleLoading = false;
      });

      // DELETE ROLE 
      builder
      .addCase(deleteRole.pending, (state) => {
        state.deleteRoleLoading = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.deleteRoleLoading = false;
        state.RoleWithItsPermission = state.RoleWithItsPermission.filter(
    role => String(role.roleId) !== String(action.payload.roleId)
  );
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.deleteRoleLoading = false;
      });
      // UPDATE ROLE NAME 
      builder
      .addCase(updateRoleName.pending, (state) => {
        state.updateRoleNameLoading = true;
      })
      .addCase(updateRoleName.fulfilled, (state, action) => {
        state.updateRoleNameLoading = false;
        // state.RoleWithItsPermission.push(action.payload)
      })
      .addCase(updateRoleName.rejected, (state, action) => {
        state.updateRoleNameLoading = false;
      });
  },
});

export default rolesAndPermissionSlice.reducer;