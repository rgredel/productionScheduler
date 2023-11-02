import React, { useEffect, useState } from 'react';
import GanttCharTable from './GanttCharTable';
import { useLocation } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useLocalState } from '../../util/useLocalStorage';


const GanttChar = ({}) => {
    const [schedule, setSchedule] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const params = useParams();

    useEffect(() => {
        const getScheduleData = async () => {
            try {
            const response = await fetch(`/schedule/${params.id}`, {method: "get",})
            
            if(response.status === 200) {
                const data = await response.json();
                setSchedule(data);
                setIsLoading(false)
              } else {
                throw new Error();
              }
        } catch(error) {
            console.log(error);
        }
      }

      getScheduleData()


    },[])


    return (isLoading ? (<div>Loading...</div>) : <GanttCharTable data={schedule} />);
};
export default GanttChar;