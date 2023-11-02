import React, { useEffect, useState } from 'react';
import { useLocalState } from '../../util/useLocalStorage';
import ProductionProcessList from './ProductionProcessList';


const ProductionProcesses = () => {
    const [productionProcesses, setProductionProcesses] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [jwt, setJwt] = useLocalState("", "jwt");
    
    useEffect(() => {
        const getData = async () => {
            try {
            const response = await fetch("/productionProcess", {method: "get",})
            
            if(response.status === 200) {
                const data = await response.json();
                setProductionProcesses(data);
                setIsLoading(false);
              } else {
                throw new Error();
              }
        } catch(error) {
            console.log(error);
        }
      }

      getData();
    },[])
    console.log(productionProcesses)

    return (isLoading ? (<div>Loading...</div>) : <ProductionProcessList productionProcesses={productionProcesses} />);
};

export default ProductionProcesses;