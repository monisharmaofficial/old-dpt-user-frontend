import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Make sure to import Swiper's CSS

// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";

// Dummy API key and Place ID
const apiKey = "AIzaSyBycKS2y7N0U1ZKLCn0RipHMW7Sx9szeuE";
const placeId = "ChIJLU7jZClu5kcR4PcOOO6p3I0"; // Eiffel Tower Place ID

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);

  // Dummy reviews for testing purposes
  const dummyReviews = [
    {
      author_name: "John Doe",
      rating: 5,
      text: "Amazing place! The view was incredible and the experience was unforgettable.",
      time: "2 weeks ago",
    },
    {
      author_name: "Jane Smith",
      rating: 4,
      text: "Beautiful landmark but very crowded. The staff was helpful though.",
      time: "1 month ago",
    },
    {
      author_name: "Alice Johnson",
      rating: 3,
      text: "Nice place to visit but quite overrated. The lines were very long.",
      time: "3 months ago",
    },
    {
      author_name: "John Doe",
      rating: 5,
      text: "Amazing place! The view was incredible and the experience was unforgettable.",
      time: "2 weeks ago",
    },
    {
      author_name: "Jane Smith",
      rating: 4,
      text: "Beautiful landmark but very crowded. The staff was helpful though.",
      time: "1 month ago",
    },
    {
      author_name: "Alice Johnson",
      rating: 3,
      text: "Nice place to visit but quite overrated. The lines were very long.",
      time: "3 months ago",
    },
  ];

  // Function to fetch Google reviews
  const fetchReviews = async () => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
      const response = await axios.get(url);
      const result = response.data.result;

      // Check if reviews are available, otherwise use dummy reviews
      if (result && result.reviews && result.reviews.length > 0) {
        setReviews(result.reviews);
      } else {
        console.warn("No reviews found, using dummy reviews.");
        setReviews(dummyReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews, using dummy reviews:", error);
      setReviews(dummyReviews); // Use dummy reviews in case of error
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to render star rating using FontAwesome
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={starStyle} />);
      } else if (i < Math.floor(rating)) {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStarHalfAlt} style={starStyle} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStarEmpty} style={starStyle} />
        );
      }
    }
    return stars;
  };

  return (
    <div className="google-reviews-container" style={{ padding: "20px" }}>
      <h2>Google Reviews</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop
        autoplay={{
          delay: 3000, // Change slide every 3 seconds
          disableOnInteraction: false, // Keeps autoplay running even after interaction
        }}
        breakpoints={{
          575: {
            slidesPerView: 1, // 1 card on mobile screens
          },
          768: {
            slidesPerView: 2, // 2 cards on tablet screens
          },
          1024: {
            slidesPerView: 3, // 3 cards on desktop screens
          },
        }}
        pagination={{ clickable: true }}
      >
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="review-card" style={cardStyle}>
                <h4>{review.author_name}</h4>
                <div className="review-rating">
                  {renderStarRating(review.rating)}
                </div>
                <p>{review.text}</p>
                <p className="review-time">{review.time}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </Swiper>
    </div>
  );
};

const cardStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s ease-in-out",
};

const starStyle = {
  fontSize: "20px", // Adjust the size of the stars
  color: "#ffcc00", // Gold color for the stars
  margin: "0 2px",
};

export default GoogleReviews;
