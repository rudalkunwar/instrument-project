import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UserRouter(props) {
    const navigate = useNavigate();
    const { Component } = props;
    let { id } = useParams();
    const stateData = useSelector(state => state.authenticate);
    const stateid = stateData.userInfo.uid;
    const isLoggedin = stateData.isLoggedin;

    const token=localStorage.getItem('token');
  
   

    useEffect(() => {
        // if (stateid !== id ) {
        //     navigate('/pagenotfound404');
        // }
        if(isLoggedin == false && !token)
            {
                navigate('/login');
            }

    })
    return (
        <div>
            <Component />
        </div>
    )
}

