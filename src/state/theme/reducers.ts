import { createSlice } from '@reduxjs/toolkit'
import { toggleTheme } from './actions'

export interface ThemeState {
  value: boolean
}

const initialState = {
  value: localStorage.getItem('darkMode') === 'true',
} as ThemeState

export default createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleTheme.fulfilled, (state) => {
      state.value = !state.value
    })
  },
})
