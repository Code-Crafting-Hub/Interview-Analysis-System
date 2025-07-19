/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProfileE from './employeePages/ProfileE'
import ProfileA from './hrPages/ProfileA'
import DashboardA from './hrPages/DashboardA'
import EmployeeManagementA from './hrPages/EmployeeManagementA'
import LeaveMangementA from './hrPages/LeaveMangementA'
import PayrollA from './hrPages/PayrollA'
import PerformanceA from './hrPages/PerformanceA'
import SettingsA from './hrPages/SettingsA'
import TeamAllocationA from './hrPages/TeamAllocationA'
import Downloads from './employeePages/Downloads'
import PerformanceE from './employeePages/PerformanceE'
import SettingsE from './employeePages/SettingsE'

function App() {

  return (
    <>
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/' element={<Login/>}/>


      {/* Employee Routes */}
      <Route path='/employee' element={<ProfileE/>}/>
      <Route path='/downloads' element={<Downloads/>}/>
      <Route path='/performance' element={<PerformanceE/>}/>
      <Route path='/settings' element={<SettingsE/>}/>


      {/* Hr routes */}
      <Route path='/hr' element={<ProfileA/>}/>
      <Route path='/hr/dashboard' element={<DashboardA/>}/>
      <Route path='/hr/employee-management' element={<EmployeeManagementA/>}/>
      <Route path='/hr/leave-management' element={<LeaveMangementA/>}/>
      <Route path='/hr/payroll' element={<PayrollA/>}/>
      <Route path='/hr/team-allocation' element={<TeamAllocationA/>}/>
      <Route path='/hr/performance-report' element={<PerformanceA/>}/>
      <Route path='/hr/settings' element={<SettingsA/>}/>
    </Routes>
      
    </>
  )
}

export default App
