/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProfileE from './employeePages/ProfileE'
import ProfileA from './hrPages/ProfileA'
import DashboardA from './hrPages/DashboardA'

function App() {

  return (
    <>
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/' element={<Login/>}/>
      <Route path='/employee' element={<ProfileE/>}/>
      <Route path='/hr' element={<ProfileA/>}/>
      <Route path='/hr/dashboard' element={<DashboardA/>}/>
    </Routes>
      
    </>
  )
}

export default App
