// priceUtils.js
export const getUserPrice = (tour, userType, userDiscount) => {
    if (userType === 2) {
      // Agent user type
      return (tour.tourPriceAed - (tour.tourPriceAed * userDiscount / 100)).toFixed(2);
    } else if (userType === 3) {
      // Normal user type
      return tour.tourPriceAed;
    } else {
      // Default case (handle other user types if needed)
      return tour.tourPriceAed;
    }
  };
  
  // Repeat a similar function for USD pricing if needed
  