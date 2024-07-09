import React from 'react'
import VendorNavbar from './Navbar/VendorNavbar'
import {Outlet} from 'react-router-dom';

export default function PageRouter() {
  return (
    <div>
        <VendorNavbar/>
        <Outlet/>
    </div>
  )
}
