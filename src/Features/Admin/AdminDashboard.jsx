import React, { useEffect, useState } from 'react';
import api from '../../Api/baseurl';

export default function AdminDashboard() {
  const[users,setUsers] = useState([]);
    const[psy,setPsy] = useState([]);

  let id = localStorage.getItem("userid");
  try{
  useEffect(()=>{
    let fetchUsers = async () => {
      let res = (await api.get('admin/allUsers')).data;
      setUsers(res.data)
    };

    let fetchPsy = async () => {
      let res = (await api.get('admin/allPsychologist')).data;
      console.table(res.data)
      setPsy(res.data)
    };
    fetchUsers();
    fetchPsy();
  },[id]);

}catch(err){
    console.error(err.message);
    
}
  let active = psy.filter((x)=>x.isApproved===true);

  let pending = psy.filter((x)=>x.isApproved===false);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-semibold text-purple-700 mb-4">Welcome, Admin </h1>
        <p className="text-gray-600 mb-6">
          Here’s a quick overview of platform activity and admin tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-purple-800">Total Users</h2>
            <p className="text-2xl font-bold text-gray-800 mt-2">{users.length}</p>
          </div>

          <div className="bg-red-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-red-800">Active Psychologists</h2>
            <p className="text-2xl font-bold text-gray-800 mt-2">{active.length}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-green-800">Pending Approvals</h2>
            <p className="text-2xl font-bold text-gray-800 mt-2">{pending.length}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Recent Activities</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>New user registered: nidal </li>
            <li>Therapist request pending approval</li>
            <li>System update scheduled for July 25</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
