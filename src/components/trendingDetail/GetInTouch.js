import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { useParams } from 'react-router-dom';

const GetInTouch = () => {
  const [destinationInfo, setDestinationInfo] = useState();
  const [duration, setDuration] = useState();
  const { title } = useParams();
  const [reviews, setReviews] = useState([]);  
  const [averageRating, setAverageRating] = useState(0);
  const [backendData, setBackendData] = useState(null);
  const url = window.location.href;
  const spliturl = url.split("/");
  const slug = spliturl[5];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBackendData(data.data[0].id);
   
      } catch (error) {
        console.error("Error fetching data from the backend:", error.message);
      }
    };

    fetchData();
  }, [slug]);
  useEffect(() => {
    if (backendData !== null) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${config.baseUrl}/tour/review/list/${backendData}`);
          const data = await response.json();
          
          if (data.status === 'success') {
            setReviews(data.data);
          } else {
            console.error('Error fetching reviews');
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
    
      fetchData();
    }
  }, [backendData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDestinationInfo(data.data[0].destination_info[0].name)
        setDuration(data.data[0].tour_duration)

      } catch (error) {
        console.error("Error fetching data from the backend:", error.message);
      }
    };

    fetchData();
  }, []);// Empty dependency array ensures that the effect runs only once on component mount


  const shareOnFacebook = () => {
    // Replace with the appropriate Facebook sharing URL
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };

  const shareOnMail = () => {
    // Replace with the appropriate Mail sharing URL
    window.location.href = `mailto:?body=${encodeURIComponent(url)}`;
  };

  const shareOnTwitter = () => {
    // Replace with the appropriate Twitter sharing URL
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);
  };
  const shareOnGooglePlus = () => {
    // Replace with the appropriate Google+ sharing URL (Google+ has been deprecated)
    window.open(`https://plus.google.com/share?url=${encodeURIComponent(url)}`);
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
  };

  const shareOnWhatsApp = () => {
    window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
  };
  const generateStarRating = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;
    const halfStar = decimalPart >= 0.2 && decimalPart <= 0.7;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
  
    const stars = [];
  
    // Inline styles for the stars
    const starStyle = {
      color: '#F4E877', // Change this to your desired star color
      fontSize: '24px', // Change this to your desired star size
      display: 'inline-block', // Display stars horizontally
    };
  
    // Adding full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star" style={starStyle}>&#9733;</span>);
    }
  
    // Adding half star if needed
    if (halfStar) {
      const halfStarContent = decimalPart >= 0.2 && decimalPart < 0.5 ? '&#9733;&#188;' : '&#9733;&#190;';
      stars.push(<span key="half" className="star" style={starStyle} dangerouslySetInnerHTML={{ __html: halfStarContent }} />);
    }
  
    // Adding empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star" style={starStyle}>&#9734;</span>);
    }
  
    return stars;
  };
  
  useEffect(() => {
    if (reviews.length > 0) {
      const totalRatingsCount = reviews.length;
      const totalRatingSum = reviews.reduce((acc, curr) => acc + curr.rating, 0);

      const averageRating = totalRatingSum / totalRatingsCount;
      const averageRatingFixed = averageRating.toFixed(1); // Fix to one decimal place

      // Update the state with the calculated average rating
      setAverageRating(parseFloat(averageRatingFixed));
    }
  }, [reviews]);

  return (
    <div>
      <div className="GetinTouch">
        <div className="GetinTouchWrapper">
          <div className="time">{duration}</div>
          <div className="location">{destinationInfo}</div>
          <div className="review">
          {generateStarRating(averageRating)} {averageRating.toFixed(1)} | {reviews.length} Reviews
          </div>
          <div className="SocialIcon">
            <div className="shareTag">Share with your friends</div>
            <ul>
              <li>
                <Link to="#" className="fb" onClick={shareOnFacebook}></Link>
              </li>
              <li>
                <Link to="#" className="mail" onClick={shareOnMail}></Link>
              </li>
              <li>
                <Link to="#" className="tw" onClick={shareOnTwitter}></Link>
              </li>
              <li>
                <Link to="#" className="gp" onClick={shareOnGooglePlus}></Link>
              </li>
              <li>
                <Link to="#" className="lin" onClick={shareOnLinkedIn}></Link>
              </li>
              <li>
                <Link to="#" className="wp" onClick={shareOnWhatsApp}></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
