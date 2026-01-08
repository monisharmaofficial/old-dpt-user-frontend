import React, { useEffect, useState } from 'react';
import './Style/TourPage.css'; // Import your CSS file
import config from '../../config';
import dummyReviewData from '../../dummyReview.json'; 

const ReviewRatingSection = () => {
  const [reviews, setReviews] = useState([]);
  const [totalFourStarReviews, setTotalFourStarReviews] = useState(0);
  const [totalFirstStarReviews, setTotalFirstStarReviews] = useState(0);
  const [totalSecondStarReviews, setTotalSecondStarReviews] = useState(0);
  const [totalThirdStarReviews, setTotalThirdStarReviews] = useState(0);
  const [totalFifthStarReviews, setTotalFifthStarReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState(5);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    // Fetch reviews from the dummy API (replace this with your actual fetch logic if needed)
    setReviews(dummyReviewData.reviews);
  }, []);

  useEffect(() => {
    // Calculate total number of each star rating
    const countStarReviews = () => {
      const stars = [0, 0, 0, 0, 0];
      reviews.forEach(review => {
        stars[review.rating - 1]++;
      });
      setTotalFirstStarReviews(stars[0]);
      setTotalSecondStarReviews(stars[1]);
      setTotalThirdStarReviews(stars[2]);
      setTotalFourStarReviews(stars[3]); // Corrected function name
      setTotalFifthStarReviews(stars[4]);
    };
    countStarReviews();
  }, [reviews]);


  useEffect(() => {
    // Calculate average rating
    const calculateAverageRating = () => {
      const totalRatingsCount = reviews.length;
      const totalRatingSum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      const averageRating = totalRatingSum / totalRatingsCount;
      setAverageRating(averageRating.toFixed(1));
    };
    calculateAverageRating();
  }, [reviews]);

  // Function to generate star rating JSX
  const generateStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return stars;
  };

  // Function to toggle displaying all reviews
  const handleViewToggle = () => {
    setShowAllReviews(!showAllReviews);
    if (!showAllReviews) {
      setDisplayedReviews(reviews.length);
    } else {
      setDisplayedReviews(5);
    }
  };

  return (
    <div className="ReviewRatingSection">
      <div className="container">
        {/* Render average rating */}
        <div className="RatingPoint">
          <span>{averageRating}</span>
          {generateStarRating(averageRating)}
        </div>
        <div className="ReviewCount">{reviews.length} Reviews</div>
        {/* Render individual reviews */}
        {reviews.slice(0, displayedReviews).map((review, index) => (
          <div key={index} className="Review">
            <div className="ReviewRating">{generateStarRating(review.rating)}</div>
            <div className="ReviewAuthor">{review.author_name}</div>
            <div className="ReviewText">{review.text}</div>
          </div>
        ))}
        {/* Render view more/less button if there are more than 5 reviews */}
        {reviews.length > 5 && (
          <div className="ViewToggle">
            <button onClick={handleViewToggle}>
              {showAllReviews ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewRatingSection;
