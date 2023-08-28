import { configureStore } from '@reduxjs/toolkit'
import { navSlice } from './slices/nav'

export const store = configureStore({
  reducer: {
    navReducer: navSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Habilita DevTools en desarrollo
})
