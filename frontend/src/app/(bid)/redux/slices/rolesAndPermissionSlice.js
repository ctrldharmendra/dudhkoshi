import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { cache } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;



// GET 
export const getUserPermissionLoggedInUser = createAsyncThunk(
  'getUserRoleLoggedInUser/getUserRole',
async ({ accessToken, tenantId}, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const { lastFetched, debitNote,error } = state.debitNote;

    // const ONE_HOUR = 60 * 60 * 1000;

    // if (lastFetched && Date.now() - lastFetched < ONE_HOUR) {
    //   return debitNote;
    // }
    try {

      const res = await fetch(
        `api/roles/view/permissions`,
        {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
console.log(data)
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

// POST 
// export const POST = createAsyncThunk(
//   'postDebitNote',
//   async ({ accessToken, tenantId, setBundleDetails, setGlDesc, setIsEditing, focusOnNewButton, payload}, thunkAPI) => {
//     try {
//       const res = await fetch(
//         `${BASE_URL}/entries/debit-note-master/${tenantId}`,
//         {
//           method: 'POST', 
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,   
//           },
//              body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();
//       // console.log(data?.data)


//       if (!res.ok || data.success === false) {
//         toast.error(data.message || 'Failed to save voucher');
//         return thunkAPI.rejectWithValue(data.message);
//       }

//       thunkAPI.dispatch(resetForm());
//       setBundleDetails({});
//       setGlDesc("");
//       setIsEditing(false);
//       focusOnNewButton();
//       return data?.data;

//     } catch (err) {
//       toast.error(err.message);
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );
const rolesAndPermissionSlice = createSlice({
  name: 'rolesAndPermissionSlice',
  initialState: {
    // debitNote: null,
    permissionOfLoggedInUser: null,
    loading: false,
    error: "saasa",
    lastFetched: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserPermissionLoggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPermissionLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.permissionOfLoggedInUser = action.payload;
      })
      .addCase(getUserPermissionLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // POST
    //   builder
    //   .addCase(postDebitNote.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(postDebitNote.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.debitNote = action.payload;
    //   })
    //   .addCase(postDebitNote.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default rolesAndPermissionSlice.reducer;