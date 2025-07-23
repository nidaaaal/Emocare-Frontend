import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PsyDashboard from '../Features/Psychologist/PsyDashboard'
import PsyProtectedRoute from '../Routes/PsyRoute'
import RegisterPsychologistPage from '../Features/Psychologist/Components/Registration/RegisterPsychologistPage'

export default function PsychologistPages() {
  return (
   <Routes>
    <Route path='home' element={<PsyProtectedRoute><PsyDashboard/></PsyProtectedRoute>}></Route>
    <Route path='register' element={<RegisterPsychologistPage/>}/>
   </Routes>
  )
}
