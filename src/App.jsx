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
import LoginPage from './components/LoginPage'
import DashboardLayout from './components/Dashboard/DashboardLayout'

function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      
      <Route path='/' element={<LandingPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/signup' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/dashboard' element={<DashboardLayout />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
