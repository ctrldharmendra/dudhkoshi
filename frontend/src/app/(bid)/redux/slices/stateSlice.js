import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedUser: {

  },
  selectedRole:{

  },
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
   setSelectedUser: (state, action) => {
      state.selectedUser = action?.payload;
    },
    setSelectedRole:(state, action)=>{
      state.selectedRole = action?.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedUser, setSelectedRole } = stateSlice.actions

export default stateSlice.reducer