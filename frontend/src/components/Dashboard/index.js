import React, { useEffect, useState } from 'react';
import SeanceList from './SeanceList';
import { useLocalState } from '../../util/useLocalStorage';


const Dashboard = () => {
    const [seances, setSeances] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [jwt, setJwt] = useLocalState("", "jwt");
    
    useEffect(() => {
        const getData = async () => {
            try {
            const response = await fetch("/seances/all", {method: "get",})
            
            if(response.status === 200) {
                const data = await response.json();
                setSeances(data);
                setIsLoading(false);
              } else {
                throw new Error();
              }
        } catch(error) {
            console.log(error);
        }
      }
      setIsLoading(false);

      //getData();
    },[])
    console.log(seances)

    return (isLoading ? (<div>Loading...</div>) : <SeanceList seances={seances} />
    );
};

export default Dashboard;