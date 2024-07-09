import React from 'react'
import LoginUser from '../Global/Login'
import { useSelector } from 'react-redux';


export default function Login() {
    const SessionData=useSelector(state=>state.authenticate);
  return (
    <div>
       <LoginUser/>

    </div>
  )
}
