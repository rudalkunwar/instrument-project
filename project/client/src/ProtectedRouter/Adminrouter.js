
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Adminrouter(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {Component} = props;

    useEffect(() => {
        // Redirect to login if not logged in
        if ( !token) {
            navigate('/admin/login');
        }
        // Redirect to 404 if user ID mismatch logic is uncommented
        // if (stateid !== id) {
        //     navigate('/pagenotfound404');
        // }
    }, [token, navigate]);

    return (
        <div>
            <Component />
        </div>
    );
}
