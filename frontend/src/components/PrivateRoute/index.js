import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';
import LoadingPageCircle from '../Loading';
const PrivateRoute = ({children}) => {
    
    const [jwt, setJwt] = useLocalState("", "jwt")
    const [isValid, setIsValid] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function validateToken(){
        try {
            const response = await fetch(`/auth/validate-token/${jwt}`, {method : 'post'});
            
            if(response.status === 200) {
                const data = await response.json();
                const isValid = data.isValid
                setIsValid(isValid);
                if(!isValid) localStorage.removeItem('jwt');
             ;
                setIsLoading(false)
              } else {
                setIsLoading(false)
                throw new Error();
              }
        } catch(error) {
            console.log(error);
        }
    }

    validateToken();

    return isLoading ?  <LoadingPageCircle/> : isValid === true ? children : <Navigate to="/login"/>
};

export default PrivateRoute;