import React from 'react'
import { Routes, Route } from "react-router"
import MainPage from './pages/main-page'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>} />
      </Routes>
    </div>
  )
}

export default App