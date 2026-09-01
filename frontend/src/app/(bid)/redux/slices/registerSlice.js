import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { cache } from 'react';
import axiosInstance from '@/lib/axiosInstance';



//POST | User registration function
  export const registeruserFn = createAsyncThunk(
  'registeruserFn',
  async ({data}, thunkAPI) => {
    try {
      const res = await fetch(
        `/api/auth/register`,
        {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
            body: data,
            // body: JSON.stringify({permissions}),
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
        // thunkAPI.dispatch(setIsPermissisonOpened(false));
      }
      return data?.data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// create invitaiton 
  export const createInvitation = createAsyncThunk(
  'createInvitation',
  async ({email}, thunkAPI) => {
    try {

      const { data } = await axiosInstance.post(`/api/invite`, {email});
        toast.success("Getting Ready...")
      return data?.data ? data?.data : data;

    } catch (err) {
      toast.error(err.response.data.errors || "Something Went Wrong...");
      console.log(err.response)
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// get emailContent to send | body and subject 
  export const getEmailContents = createAsyncThunk(
  'getEmailContents',
  async ({}, thunkAPI) => {
    try {
      const res = await fetch(
        `/api/emailcontents`,
        {
          method: 'GET', 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      // console.log(data, "from registerslice email cont")
      if (!res.ok) {
        toast.error(data.message || 'Failed To Get Email Contents');
        return thunkAPI.rejectWithValue(data.message);
      }

        
    if(data.statusCode==403){
      toast.error(data.message || "Something went wrong")
    }
      return data?.data ? data?.data : data;

    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);



// ALLL USERS GET 
  export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async ({}, thunkAPI) => {
    try {

      const { data } = await axiosInstance.get(`/api/user/users`);

      // console.log(data?.data, "FROM Gell all users IN REGISTER SLICE ")
      return data?.data ? data?.data : data;

    } catch (err) {
      toast.error(err.response.data.errors || "Something Went Wrong...");
      console.log(err.response)
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// CREATE A USER | BY ADMIN 
  export const createUserByAdmin = createAsyncThunk(
  'createUserByAdmin',
  async ({formData}, thunkAPI) => {
    try {

      const { data } = await axiosInstance.post(`/api/auth/create-user`, formData);

      // console.log(data, "FROM CREATE USER IN REGISTER SLICE ")
      return data?.data ? data?.data : data;

    } catch (err) {
      toast.error(err.response.data.errors || "Something Went Wrong...");
      console.log(err.response)
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const registrationSlice = createSlice({
  name: 'registrationSlice',
  initialState: {
  registrationLoadingState:false,

  invitationCreationLoading:false,

  emailContentsLoading:false,
  emailContents:[],
  allUsers:[],
  allUsersLoading:false,

  createUserByAdminLoading:false,

    error: "",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
      // POST | Add a new permission
    builder
      .addCase(registeruserFn.pending, (state) => {
        state.addPermissionLoading = true;
      })
      .addCase(registeruserFn.fulfilled, (state, action) => {
        state.addPermissionLoading = false;
        // state.allPermissionFromDb = action.payload;
      })
      .addCase(registeruserFn.rejected, (state, action) => {
        state.addPermissionLoading = false;
        state.error = action.payload;
      });
      // POST | Create invitation 
    builder
      .addCase(createInvitation.pending, (state) => {
        state.invitationCreationLoading = true;
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.invitationCreationLoading = false;
        // state.allPermissionFromDb = action.payload;
      })
      .addCase(createInvitation.rejected, (state, action) => {
        state.invitationCreationLoading = false;
        state.error = action.payload;
      });
      // GET email contens 
    builder
      .addCase(getEmailContents.pending, (state) => {
        state.emailContentsLoading = true;
      })
      .addCase(getEmailContents.fulfilled, (state, action) => {
        state.emailContentsLoading = false;
        state.emailContents = action.payload;
      })
      .addCase(getEmailContents.rejected, (state, action) => {
        state.emailContentsLoading = false;
        state.error = action.payload;
      });
      // create user by admin 
    builder
      .addCase(createUserByAdmin.pending, (state) => {
        state.createUserByAdminLoading = true;
      })
      .addCase(createUserByAdmin.fulfilled, (state, action) => {
        state.createUserByAdminLoading = false;
        // state.emailContents = action.payload;
      })
      .addCase(createUserByAdmin.rejected, (state, action) => {
        state.createUserByAdminLoading = false;
        // state.error = action.payload;
      });

      // GET ALL USERS
      builder
        .addCase(getAllUsers.pending, (state) => {
          state.allUsersLoading = true;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
          state.allUsersLoading = false;
          state.allUsers = action.payload;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
          state.allUsersLoading = false;
          state.error = action.payload;
        });
  },


});

export default registrationSlice.reducer;