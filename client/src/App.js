import React from 'react'
import { ThemeProvider, styled } from 'styled-components'
import { lightTheme } from './utils/Themes'
import { BrowserRouter } from 'react-router-dom'
import Authentication from './pages/Authentication'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: ${props => props.theme.bg};
  overflow: hidden;
  transition: all 0.2s ease;
`

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <Container>
            <Authentication/>
          </Container>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App