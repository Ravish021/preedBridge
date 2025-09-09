import{createSlice} from '@reduxjs/toolkit';
const initialState = {
    user: null,
    profile: null,
}

export const userSlice = createSlice({  // Create a slice of the Redux store
    name:'user',                        // Name of the slice
    initialState,                       // Initial state of the slice
    reducers: {                         // Reducers to handle actions
    setUserDetails:(state,action)=>{    // Action to set user details
        state.user = action.payload;   // Update the state with the payload
    },
    setUserProfile:(state,action)=>{
        state.profile = action.payload;
    }
  },
})

export const { setUserDetails,setUserProfile } = userSlice.actions     // Export the action creator for setting user details
export default userSlice.reducer