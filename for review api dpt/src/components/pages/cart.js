import React from "react";
import InnerHeader from "../common/InnerHeader";
import YouAlsoLike from "../TourPage/YouAlsoLike";
import Footer from "../common/Footer";
import Cart from "../cart/Cart";
import BreadCrum from "../cart/BreadCrum";

const cart = () => {
  return (
    <div>
      <InnerHeader />
      <BreadCrum/>
      <Cart />
      <YouAlsoLike />
      <Footer />
    </div>
  );
};

export default cart;
