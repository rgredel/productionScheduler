import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';

const PrivateRoute = ({children}) => {
    
    const [jwt, setJwt] = useLocalState("", "jwt")
    const [isValid, setIsValid] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function validateToken(){
        try {
            const response = await fetch(`/persons/auth/validate-token/${jwt}`, {method : 'post'});
            
            if(response.status === 200) {
                const data = await response.json();
                const isNotExpired = data.isNotExpired
                setIsValid(isNotExpired);
                if(!isNotExpired) localStorage.removeItem('jwt');
                console.log(isNotExpired);
                setIsLoading(false)
              } else {
                setIsLoading(false)
                throw new Error();
              }
        } catch(error) {
            console.log(error);
        }
    }
    //validateToken();

    //return isLoading ? ( <div>Loading...</div>) : isValid === true ? children : <Navigate to="/login"/>
    return children 

};

export default PrivateRoute;