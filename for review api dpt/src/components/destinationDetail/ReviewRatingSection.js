import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import './Style/TourPage.css'
import config from '../../config';

const ReviewRatingSection = () => {
  const [reviews, setReviews] = useState([]);
  const [backendData, setBackendData] = useState(null);
  const [totalFourStarReviews, setTotalFourStarReviews] = useState(0);
  const [totalFirstStarReviews, setTotalFirstStarReviews] = useState(0);
  const [totalSecondStarReviews, setTotalSecondStarReviews] = useState(0);
  const [totalThirdStarReviews, setTotalThirdStarReviews] = useState(0);
  const [totalFifthStarReviews, setTotalFifthStarReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState(5);
  const [showAllReviews, setShowAllReviews] = useState(false);
  let totalFourStarRating = 0;
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
    if (reviews.length > 0) {
      const fourStarReviews = reviews.filter(review => review.rating === 4);
      setTotalFourStarReviews(fourStarReviews.length);
      const firstStarReviews = reviews.filter(review => review.rating === 1);
      setTotalFirstStarReviews(firstStarReviews.length);
      const secondStarReviews = reviews.filter(review => review.rating === 2);
      setTotalSecondStarReviews(secondStarReviews.length);
      const thirdStarReviews = reviews.filter(review => review.rating === 3);
      setTotalThirdStarReviews(thirdStarReviews.length);
      const fifthStarReviews = reviews.filter(review => review.rating === 5);
      setTotalFifthStarReviews(fifthStarReviews.length);

      if (totalFourStarReviews > 0) {
        totalFourStarRating = fourStarReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalFourStarReviews;
      }
    }
  }, [reviews, totalFourStarReviews]);

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

  const percentageFirstStarReviews = ((totalFirstStarReviews / reviews.length) * 100).toFixed(2);
  const percentageSecondStarReviews = ((totalSecondStarReviews / reviews.length) * 100).toFixed(2);
  const percentageThirdStarReviews = ((totalThirdStarReviews / reviews.length) * 100).toFixed(2);
  const percentageFourthStarReviews = ((totalFourStarReviews / reviews.length) * 100).toFixed(2);
  const percentageFifthStarReviews = ((totalFifthStarReviews / reviews.length) * 100).toFixed(2);

  const handleViewToggle = () => {
    // Toggle between showing all reviews and showing limited reviews
    setShowAllReviews(!showAllReviews);
    if (!showAllReviews) {
      setDisplayedReviews(reviews.length); // Show all reviews
    } else {
      setDisplayedReviews(5); // Show only 5 reviews
    }
  };
  


  return reviews.length === 0 ? null : (
    <div>
      <div className="ReviewRatingSection">
        <div className="container">
          <div className="ReviewRatingWrapper">
            <div className="ReviewsLhs">
              <div className="Title">Reviews</div>
              <div className="RatingPoint">
                <span>5.0 </span>
              </div>

              <div className="reviewText"> <span>{averageRating.toFixed(1)}</span> | {reviews.length} Reviews </div>
              {generateStarRating(averageRating)}
            </div>
            {/* ReviewsLhs */}
            <div className="ReviewsRhs">
              <p>Total review count and overall rating based on Viator and Tripadvisor reviews</p>
              <div className="ProgressDiv">
                <div className="ProgressRow">
                  <span>5 Stars</span>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percentageFifthStarReviews}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span>{totalFifthStarReviews}</span>
                </div>
                {/* ProgressRow */}
                <div className="ProgressRow">
                  <span>4 Stars</span>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percentageFourthStarReviews}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span>{totalFourStarReviews}</span>
                </div>
                {/* ProgressRow */}
                <div className="ProgressRow">
                  <span>3 Stars</span>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percentageThirdStarReviews}%` }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span>{totalThirdStarReviews}</span>
                </div>
                {/* ProgressRow */}
                <div className="ProgressRow">
                  <span>2 Stars</span>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percentageSecondStarReviews}%` }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span>{totalSecondStarReviews}</span>
                </div>
                {/* ProgressRow */}
                <div className="ProgressRow">
                  <span>1 Stars</span>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percentageFirstStarReviews}%` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span>{totalFirstStarReviews}</span>
                </div>
                {/* ProgressRow */}
              </div>
              {/* ProgressDiv */}
            </div>
            {/* ReviewsRhs */}
          </div>
          {/* ReviewRatingWrapper */}
          <div className="ShowingReview">
            <p>Showing total {reviews.length} reviews</p>
            <div className="ShowingReviewWidget">
            {reviews.slice(0, displayedReviews).map((review) => (
              <div key={review.id} className="ShowingReviewRow">
                <div className="starRating">
                  {generateStarRating(review.rating)} {review.name}
                </div>
                <p>{review.comments}</p>
              </div>
            ))}
          </div>
          {reviews.length > 5 && (
          <div className="center">
            <button onClick={handleViewToggle} className="cta" style={{
              backgroundColor: '#fff',
              boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.1)',
              borderRadius: '100px',
              padding: '14px 41px',
              fontSize: '17px',
              color: '#000',
              fontWeight: '500',
              position: 'relative',
              display: 'inline-block',
              border: 'none'
            }}>
               
              {showAllReviews ? 'View Less' : 'View More'}
            </button>
          </div>
          )}

          </div>
          {/* ShowingReview */}
        </div>
      </div>
    </div>
  );
}

export default ReviewRatingSection;
