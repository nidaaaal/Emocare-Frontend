import React from 'react'
import UserProtectedRoute from '../Routes/UserRoute'
import UserDashboard from '../Features/Users/Components/Dashboard/UserDashboard'
import { Route, Routes } from 'react-router-dom'
import RegisterUserPage from '../Features/Users/Components/Registration/RegisterUserPage'
import DailyCheckIn from '../Features/Users/Components/Reflection/DailyPrompt'
import ChatPage from '../Features/Users/Components/Chat/Chatpage'
import ReflectionCalendar from '../Features/Users/Components/Reflection/ReflectionCalender'
import AllHabits from '../Features/Users/Components/Habits/AllHabits'
import NewHabitForm from '../Features/Users/Components/Habits/NewHabitForm'
import HabitDetails from '../Features/Users/Components/Habits/IndivitualHabit'
import TaskPage from '../Features/Users/Components/Tasks/TaskPage'

export default function UserPages() {
  return (
    <Routes>
    <Route path='register' element ={<RegisterUserPage/>}/>
    
    <Route element={<UserProtectedRoute/>}>
        <Route path='home' element={<UserDashboard/>}/>
        <Route path='dailycheck' element={<DailyCheckIn/>}/>
        <Route path='chat' element={<ChatPage/>}/>
        <Route path="task" element={<TaskPage/>}/>
        <Route path="calendar" element={<ReflectionCalendar/>}/>
        <Route path="habit" element={<AllHabits/>}/>
        <Route path="habit/:id" element={<><HabitDetails/></>}/>
        <Route path="habit/create" element={<NewHabitForm/>} />
        <Route path="habit/update/:id" element={<NewHabitForm/>} />
    </Route>


   </Routes>
  )
}
