import React from 'react'

import {Outlet} from 'react-router-dom';
import AdminNavbar from './Navbar/AdminNavbar';

export default function PageRouter() {
  return (
    <div>
        <AdminNavbar/>
        <div class="ml-10">
        <Outlet/>
        </div>
    </div>
  )
}
