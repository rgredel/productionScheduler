import React, { useEffect, useState } from 'react';
import { useLocalState } from '../../util/useLocalStorage';
import ProductionProcessTaskList from './task/ProductionProcessTaskList';
import { useParams } from "react-router-dom"
import LoadingPageCircle from '../Loading';

const ProductionProcessDetail = () => {
  const [productionProcess, setProductionProcess] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      try {

        const response = await fetch(`/productionProcess/${params.id}`, {
          method: "get",
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        })

        if (response.status === 200) {
          const data = await response.json();
          setProductionProcess(data);
          setIsLoading(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [])

  return (isLoading ? <LoadingPageCircle /> : <ProductionProcessTaskList productionProcess={productionProcess} />);
};

export default ProductionProcessDetail;