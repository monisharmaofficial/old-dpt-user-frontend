import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';
import './Style/category.css'

const Banner = () => {
  const { categoryName } = useParams();
  const [tour, setTour] = useState({});
  const url = window.location.href;
  const spliturl = url.split("/");
  const slug = spliturl[3];

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/plan/${slug}`);
        const data = await response.json();
  
        if (data.status === 'success' && data.data.length > 0) {
          setTour(data.data[0].image);
        } else {
          // Handle error or set default values for tour
        }
      } catch (error) {
        // Handle error
      }
    };
  
    fetchTourData();
  }, [slug]);
  const backgroundImageUrl = `url(${config.imageUrl}/${tour})`


  return (
    <div>
      <div
        className="InnerBanner"
        style={{ backgroundImage: backgroundImageUrl }} 
      >
        <div className="container">
          <h1>{categoryName.replace(/-/g, ' ')}</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
