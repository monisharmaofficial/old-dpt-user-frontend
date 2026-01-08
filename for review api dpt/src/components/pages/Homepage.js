import React from 'react'
import Header from "../common/Header";
import PopularTour from "../homepage/PopularTour";
import PopularAttraction from "../homepage/PopularAttraction";
import Faq from "../homepage/Faq";
import Footer from "../common/Footer";
import Banner from '../homepage/Banner'
import Memories from '../common/memories'
// import TabSection from './components/homepage/TabSection'
import TopDestination from "../homepage/TopDestination";
import ChooseDpt from '../homepage/ChooseDpt'
import CustomerSay from '../homepage/CustomerSay'
import TrendingPlaces from '../homepage/TrendingPlaces'
const Homepage = () => {
  return (
    <div className="HomePageMin">
    <React.Fragment>
        <Header />
       <Banner/>
       <TopDestination/>
       <PopularTour/>
       <ChooseDpt/>
       <CustomerSay/>
       <TrendingPlaces/>
        <PopularAttraction/>
        <Faq/>
        <Memories/>
        <Footer />
      </React.Fragment>
      
    </div>
  )
}

export default Homepage
