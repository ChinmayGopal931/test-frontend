import { Interpolation, Theme } from '@emotion/react'
import { CSSProperties } from 'react'

export interface IBaseProps {
  className?: string | undefined
  children?: any
}

export type ICSSProps = {
  className?: string | undefined
  css?: Interpolation<Theme>
  style?: CSSProperties | undefined
}
