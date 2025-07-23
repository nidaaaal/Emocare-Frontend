import React from 'react'
import UserProtectedRoute from '../Routes/UserRoute'
import UserDashboard from '../Features/Users/UserDashboard'
import { Route, Routes } from 'react-router-dom'
import RegisterUserPage from '../Features/Users/Components/Registration/RegisterUserPage'

export default function UserPages() {
  return (
    <Routes>
    <Route path='home' element={<UserProtectedRoute><UserDashboard/></UserProtectedRoute>}></Route>
    <Route path='register' element ={<RegisterUserPage/>}/>
   </Routes>
  )
}
