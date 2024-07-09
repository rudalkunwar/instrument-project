import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from './Navbar/UserNavbar'

export default function pageRouterUser() {
  return (
    <div>
      <UserNavbar/>
        <Outlet/>
    </div>
  )
}
