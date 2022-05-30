import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { toggleTheme } from './actions'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTheme = () => useAppSelector((state) => state.theme.value)
export const dispatch = useDispatch<AppDispatch>()
export const useToggleTheme = () => {
  return () => dispatch(toggleTheme())
}
