import {BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import UserPages from './Pages/UserPages'
import LoginForm from './Features/Auth/LoginForm'
import AdminPages from './Pages/AdminPages'
import PsychologistPages from './Pages/PsychologistPages'
import { ToastContainer } from 'react-toastify'
import LandingPage from './assets/pages/LandingPage'
import NotFound from './Features/Users/Components/Ui/NotFount'

function App() {
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginForm/>} />
          <Route path="/psy/*" element={<PsychologistPages/>}/>
          <Route path="/user/*" element={<UserPages/>}/>
          <Route path="/admin/*" element={<AdminPages />}/>
        </Routes>
      </BrowserRouter>
</>
  )
}

export default App
