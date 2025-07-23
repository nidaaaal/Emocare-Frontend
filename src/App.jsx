import {BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import UserPages from './Pages/UserPages'
import LoginForm from './Features/Auth/LoginForm'
import AdminDashboard from './Features/Admin/AdminDashboard'
import AdminPages from './Pages/AdminPages'
import PsychologistPages from './Pages/PsychologistPages'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
      <Route path="/" element={<LoginForm/>} />
          <Route path="/psy/*" element={<PsychologistPages/>}/>
          <Route path="/user/*" element={<UserPages/>}/>
          <Route path="/admin/*" element={<AdminPages />}/>
        </Routes>
      </BrowserRouter>
</>
  )
}

export default App
