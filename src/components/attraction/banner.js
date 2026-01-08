import React , {useState , useEffect} from 'react';
import './Style/attraction.css';
import { useParams } from 'react-router-dom';
import config from '../../config'

const Banner = () => {
    const { attractionName } = useParams();
    const [tour, setTour] = useState({});
    const url = window.location.href;
    const spliturl = url.split("/");
    const slug = spliturl[4];
    useEffect(() => {
        const fetchTourData = async () => {
          try {
            const response = await fetch(`${config.baseUrl}/popular-attraction/${slug}`);
            const data = await response.json();
    
            if (data.status === 'success') {
              setTour(data.data[0]);
            } else {
              // Handle error
            }
          } catch (error) {
            // Handle error
          }
        };
    
        fetchTourData();
      }, [slug]);
      const backgroundImageUrl = tour 
  ? `url(${config.imageUrl}/${tour.image})`
  : '';
    
    return (
        <div>
            <div
                className="InnerBanner"
                style={{ backgroundImage: backgroundImageUrl }} 
            >
                <div className="container">
                    <h1>{attractionName.replace(/-/g, ' ')}</h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;
