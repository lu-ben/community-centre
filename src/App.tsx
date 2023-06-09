import React from 'react'
import { useState } from 'react'
import './App.css'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Registration } from './pages/Registration'
import { EquipmentRental } from './pages/EquipmentRental'
import { paths } from './utils/enum'
import { Announcement } from './pages/Announcement'
import { VirtualBulletin } from './pages/VirtualBulletin'


function App() {
  const location = useLocation();
  return (
    <div className='relative'>
      {location.pathname !== '/' && location.pathname !== paths.signup && <Header />}
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.signup} element={<SignUp />} />
        <Route path={paths.dashboard} element={<Dashboard />} />
        <Route path={paths.registration} element={<Registration />} />
        <Route path={paths.rental} element={<EquipmentRental />} />
        <Route path={paths.announcement} element={<Announcement />} />
        <Route path={paths.bulletin} element={<VirtualBulletin />} />
      </Routes>
    </div>
  )
}

export default App
