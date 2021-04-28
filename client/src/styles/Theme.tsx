import React from 'react'
import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const theme = {
  colors: {
    lightPrimary: 'rgb(255,255,255)',
    lightSecondary: 'rgb(136,136,145)',
    darkPrimary: 'rgb(30,31,49)',
    petrol: '',
    blueMarine: '',
    blueMarineAlpha7: '',
  },
}

export type ITheme = typeof theme
const {
  default: styled,
  css,
  createGlobalStyle,
  ThemeProvider,
  ThemeConsumer,
  keyframes,
} = (styledComponents as any) as ThemedStyledComponentsModule<ITheme>

export { css, createGlobalStyle, keyframes, ThemeProvider, ThemeConsumer }
export default styled
export const Theme = ({ children }: IProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
