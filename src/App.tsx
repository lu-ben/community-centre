import React from 'react'
import { useState } from 'react'
import './App.css'
import { Login } from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Registration } from './pages/Registration'
import { EquipmentRental } from './pages/EquipmentRental'
import { paths } from './utils/enum'


function App() {
  return (
    <div className='relative'>
      <Header />
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.dashboard} element={<Dashboard />} />
        <Route path={paths.registration} element={<Registration />} />
        <Route path={paths.registration} element={<EquipmentRental />} />
      </Routes>
    </div>
  )
}

export default App
