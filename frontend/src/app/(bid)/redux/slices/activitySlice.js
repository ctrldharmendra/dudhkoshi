import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        isEditOpened: null,
        isDeleteOpened: null,
        isAddOpened:null, 
        isPermissionOpened:null,
}

export const activitySlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setIsEditOpened: (state, action) =>{
        state.isEditOpened = action.payload;
    },
       
    setIsDeleteOpened:(state, action)=>{
        state.isDeleteOpened = action.payload;
    },
    setIsAddOpened:(state, action)=>{
        state.isAddOpened = action.payload;
    },
    setIsPermissisonOpened:(state, action)=>{
        state.isPermissionOpened = action.payload;
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setIsEditOpened, setIsDeleteOpened, setIsAddOpened, setIsPermissisonOpened } = activitySlice.actions

export default activitySlice.reducer