import './App.css';
import styled, { ThemeProvider } from 'styled-components'
import Menue from './components/menue/Menue';
import Navbar from './components/navbar/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoPage from './pages/VideoPage';
import HomePage from './pages/HomePage';
import { AuthPage } from './pages/AuthPage'
import { SigninPage } from './pages/SigninPage';
import { SignupPage } from './pages/SignupPage';
const Container = styled.div`
  display : flex
`

const Main = styled.div`
    flex: 7;
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 0 30px;
`;
const Wrapper = styled.div``

function App() {

  const [darkMode, setDarkMode] = useState(true)


  return (
    <ThemeProvider theme = {darkMode?lightTheme : darkTheme}>

      <Container>
        <BrowserRouter>
          {/* MENUE */}
          <Menue id="menue" darkMode={darkMode} setDarkMode={setDarkMode}/>
          {/* MAIN */}
          <Main>
              <Navbar />
              
              <Wrapper>
                <Routes>
                  <Route path='/'>
                    <Route index element={<HomePage type={'random'}/>} />
                    <Route path='signin' element={<SigninPage/>}/>
                    <Route path='signup' element={<SignupPage/>}/>
                    <Route path='video'>
                      <Route path=':id' element={<VideoPage/>}/>
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
