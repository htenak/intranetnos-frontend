import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setNav: (state, action) => {
      state.sidebarShow = action.payload
    },
  },
})

export const { setNav } = navSlice.actions
