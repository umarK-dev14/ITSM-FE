import React, { type JSX } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
import DashboardPage from './pages/DashboardPage'
const App: React.FC = (): JSX.Element => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
    </Routes>

    </>
  )
}

export default App
