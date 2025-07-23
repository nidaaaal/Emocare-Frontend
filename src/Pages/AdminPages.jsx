import React from 'react'
import AdminDashboard from '../Features/Admin/AdminDashboard'
import AdminProtectedRoute from '../Routes/AdminRoute'
import { Route, Routes } from 'react-router-dom'

export default function AdminPages() {
  return (
    <Routes>
    <Route path='dashboard' element={<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>}></Route>
   </Routes>
  )
}
