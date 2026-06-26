import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { setIsDeleteOpened, setIsEditOpened } from './activitySlice';
import { setIsAddOpened } from './activitySlice';
import axiosInstance from "@/lib/axiosInstance";  // ← ADDED

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

// GET | GET PERMISSION OF LOGGED IN USER ROLE
export const getRolePermissionLoggedInUser = createAsyncThunk(
  'getUserRoleLoggedInUser/getUserRole',
  async ({}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/roles/view/permissions`);
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed Get Your Permission');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET | GET ALL ROLE WITH ITS PERMISSION
export const getAllRoleWithItsPermission = createAsyncThunk(
  'RolePermisssion/getAllRoleWithItsPermission',
  async ({}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/manage/roles`);
      return data?.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed Get Your Permission');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PATCH | CHANGE ROLE OF A USER | WHO HAVE ACCESS TO CHANGE ONLY CAN
export const changeRole = createAsyncThunk(
  'postDebitNote',
  async ({id, selectedRole}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch(`/api/user/role/${id}`, {
        role_id: selectedRole,
      });

      toast.success("Role Update Scuccess.")
      thunkAPI.dispatch(setIsEditOpened(false));
      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save voucher');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST | ADD A NEW ROLE
export const addNewRole = createAsyncThunk(
  'addNewRole',
  async ({roleName}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/api/manage/roles`, { roleName });

      toast.success("Role Add Scuccess.")
      thunkAPI.dispatch(setIsAddOpened(false));
      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed Add');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE | DELETE A PARTICULAR ROLE
export const deleteRole = createAsyncThunk(
  'deleteRole',
  async ({id}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/manage/roles/${id}`);
      // No body needed for this DELETE

      console.log(data?.data)
      toast.success("Role Deleted Success.")
      thunkAPI.dispatch(setIsDeleteOpened(false));
      return data?.data;

    } catch (err) {
      // Your backend sends errors in err.response?.data?.errors OR data?.message
      // keeping the same priority you had before: errors first, then message
      toast.error(err.response?.data?.errors || err.response?.data?.message || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PATCH | UPDATE A ROLE NAME
export const updateRoleName = createAsyncThunk(
  'updateRoleName',
  async ({roleId, roleName}, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch(`/api/manage/roles/${roleId}`, { roleName });

      toast.success("Role Update Scuccess.")
      thunkAPI.dispatch(setIsEditOpened(false));
      return data?.data;

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save voucher');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
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
    loadingOfGetRolePermission: false,
    loadingGetAllRoleWithPermission: false,
    addRoleLoading: false,
    deleteRoleLoading: false,
    updateRoleNameLoading: false,
    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    // GET | GET PERMISSION OF LOGGED IN USER ROLE
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

    // GET | GET ALL ROLE WITH ITS PERMISSION
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

    // PATCH | CHANGE ROLE
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

    // POST | ADD ROLE
    builder
      .addCase(addNewRole.pending, (state) => {
        state.addRoleLoading = true;
      })
      .addCase(addNewRole.fulfilled, (state, action) => {
        state.addRoleLoading = false;
        state.RoleWithItsPermission.push(action.payload);
      })
      .addCase(addNewRole.rejected, (state, action) => {
        state.addRoleLoading = false;
      });

    // DELETE | DELETE ROLE
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

    // PATCH | UPDATE ROLE NAME
    builder
      .addCase(updateRoleName.pending, (state) => {
        state.updateRoleNameLoading = true;
      })
      .addCase(updateRoleName.fulfilled, (state, action) => {
        state.updateRoleNameLoading = false;
      })
      .addCase(updateRoleName.rejected, (state, action) => {
        state.updateRoleNameLoading = false;
      });
  },
});

export default rolesAndPermissionSlice.reducer;