import React from 'react'
import { useState } from 'react'
import './App.css'


function App() {

  return (
    <>
      <div className='grid grid-cols-2 gap-y-2 my-4 w-72'>
        <p className="mr-2 text-left">User Type: </p>
        <select>
          <option value={undefined}></option>
          <option value={0}>Employee</option>
          <option value={1}>Client</option>
        </select>
        <p className="mr-2 text-left">Username: </p>
        <input/>
        <p className="mr-2 text-left">Password: </p>
        <input/>
      </div>
        <button className='w-72'>Login</button>
    </>
  )
}

export default App
