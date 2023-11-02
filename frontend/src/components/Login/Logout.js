import React, { useEffect } from 'react';
import {  Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';

const Logout = () => {
    useEffect(() => {
        window.localStorage.clear();
    },[]);

    return (
        <div>
             <Navigate to="/login"/>   
        </div>
    );
};

export default Logout;