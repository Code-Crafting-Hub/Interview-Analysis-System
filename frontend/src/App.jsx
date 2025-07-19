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

function App() {

  return (
    <>
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/' element={<Login/>}/>
      <Route path='/employee' element={<ProfileE/>}/>


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
