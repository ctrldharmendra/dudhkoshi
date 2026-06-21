import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedUser: {

  }
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
   setSelectedUser: (state, action) => {
      state.selectedUser = action?.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedUser } = stateSlice.actions

export default stateSlice.reducer