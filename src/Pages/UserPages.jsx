import React from 'react'
import UserProtectedRoute from '../Routes/UserRoute'
import UserDashboard from '../Features/Users/UserDashboard'
import { Route, Routes } from 'react-router-dom'
import RegisterUserPage from '../Features/Users/Components/Registration/RegisterUserPage'
import DailyCheckIn from '../Features/Users/Components/Reflection/DailyPrompt'
import ChatPage from '../Features/Users/Components/Chat/Chatpage'
import ReflectionCalendar from '../Features/Users/Components/Reflection/ReflectionCalender'

export default function UserPages() {
  return (
    <Routes>
    <Route path='register' element ={<RegisterUserPage/>}/>

    <Route path='home' element={<UserProtectedRoute><UserDashboard/></UserProtectedRoute>}></Route>
    <Route path='dailycheck' element={<UserProtectedRoute><DailyCheckIn/></UserProtectedRoute>}></Route>
    <Route path='chat' element={<UserProtectedRoute><ChatPage/></UserProtectedRoute>}></Route>
    <Route path="calendar" element={<UserProtectedRoute><ReflectionCalendar /></UserProtectedRoute>} />

   </Routes>
  )
}
