import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const PopularAttraction = () => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/popular-attraction/list`);
        if (response.data.status === 'success') {
          setAttractions(response.data.data);
        } else {
          console.error('Error fetching attractions');
        }
      } catch (error) {
        console.error('Error fetching attractions', error);
      }
    };

    fetchAttractions();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  return (
    <div>
      <div className="PopularAttractions">
        <div className="container">
          <div className="Title">
            <h2>Popular Attractions</h2>
          </div>
          <div className="tags">
            {attractions.map((attraction) => (
              <Link key={attraction.id} to={`/attraction/${attraction.slug}`}>
                {attraction.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularAttraction;
