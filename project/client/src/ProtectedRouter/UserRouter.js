import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserRouter(props) {
    const navigate = useNavigate();
    const { Component } = props;
    const { name } = useParams();
    const stateData = useSelector(state => state.authenticate);
    const stateid = stateData.userInfo.name;
    const isLoggedin = stateData.isLoggedin;
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (stateid !== name) {
            // Handle logic for mismatched stateid and name here if needed
        }
        if (!isLoggedin && !token) {
            navigate('/login');
        }
    }, [stateid, name, isLoggedin, token, navigate]);


   
    return (
        <div>
            <Component />
        </div>
    );
}
