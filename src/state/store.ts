import { combineReducers, configureStore } from '@reduxjs/toolkit'

import themeReducer from './theme/reducers'

const reducer = combineReducers({
  theme: themeReducer.reducer,
})

export const store = configureStore({ reducer })

store.subscribe(() => {})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
