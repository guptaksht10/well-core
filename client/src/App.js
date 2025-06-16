import React, { useState } from 'react'
import { ThemeProvider, styled } from 'styled-components'
import { lightTheme } from './utils/Themes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Navbar from './components/Navbar'
import Workouts from './pages/Workouts'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'

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
  const {currentUser} = useSelector((state) => state.user); 
  return (
    <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          {currentUser ?   
            (<Container>
              <Navbar currentUser={currentUser}/>
              <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/workouts" element={<Workouts/>} />
              </Routes>
            </Container>) 
          : 
            (<Container>
              <Authentication/>
            </Container>
          )}
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App