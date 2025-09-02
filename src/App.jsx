import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import AboutPage from './components/AboutPage'
import LandingPage from './components/LandingPage'
import  NavBar from './components/NavBar'
import  Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      
      <Route path='/' element={<LandingPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/register' element={<RegisterPage />} />


    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
