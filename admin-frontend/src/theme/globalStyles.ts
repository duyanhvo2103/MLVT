import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.background.main};
    color: ${({ theme }) => theme.fontColor.black};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', serif;
    color: ${({ theme }) => theme.fontColor.gray};
  }
  
  a {
    color: ${({ theme }) => theme.fontColor.yellow};
    text-decoration: none;
  }
`
