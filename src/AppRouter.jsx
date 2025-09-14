import ShortenUrlPage from './components/ShortenUrlPage'
import { BrowserRouter, Route,Router,Routes } from 'react-router-dom'
import AboutPage from './components/AboutPage'
import LandingPage from './components/LandingPage'
import Navbar from './components/NavBar'
import  Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import DashboardLayout from './components/Dashboard/DashboardLayout'
import PrivateRoute from './PrivateRoute'


const AppRouter=()=>{
    return (
    <>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<LandingPage />} />
      <Route path='/about' element={< AboutPage />} />
      <Route path='/register' element={<PrivateRoute publicPage={true} ><RegisterPage/> </PrivateRoute>}/>
      <Route path='/login' element={<PrivateRoute publicPage={true}  > <LoginPage />  </PrivateRoute>} />
      <Route path='/dashboard' element={<PrivateRoute publicPage={false} >  <DashboardLayout />  </PrivateRoute>} />
    </Routes>
    <Footer/>

    </>
    )
    
}

export default AppRouter

export const  SubDomainRouter=()=>{
    return (
        <Routes>
      
      <Route path='/:url' element={<ShortenUrlPage />} />
      
    </Routes>
    )
}

