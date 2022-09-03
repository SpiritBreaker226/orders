import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color: ${theme.text};
    background: ${theme.background};
    font-family: "Roobert", "Times New Roman", "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root{
    margin:0 auto;
  }
`
