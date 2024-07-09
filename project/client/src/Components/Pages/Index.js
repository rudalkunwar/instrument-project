import React from 'react';
import Index from '../Index';
import UserIndex from '../user/IndexLoggedin';
import VendorIndex from'../vendor/Index';
import AdminIndex from '../admin/Index';
import { useSelector } from 'react-redux';


export default function IndexWrapper() {


  return (
    <div>
    <Index/>
  </div>
  );
}
