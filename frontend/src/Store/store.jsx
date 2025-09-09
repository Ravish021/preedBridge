import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlicer'
import chatSlice from './chatSlice'

export   const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
})  
