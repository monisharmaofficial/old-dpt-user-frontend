// LoadingSkeleton.jsx

import React, { useEffect, useState } from 'react';
import './loading.css';

const LoadingSkeleton = () => {
  const [dataLoaded, setDataLoaded] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
        // Simulating a delay to fetch data
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('Data loaded');
        setDataLoaded(true);
      };
      fetchData();
    }, []);
    

  return (
    <div className={`loading-skeleton ${dataLoaded ? 'hidden' : ''}`}>

      <div className="square"></div>
    </div>
  );
};

export default LoadingSkeleton;
