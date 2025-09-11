import React, { type JSX } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
const App: React.FC = (): JSX.Element => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage />}/>
    </Routes>
    </>
  )
}

export default App;
