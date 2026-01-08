import React, { Suspense, lazy , memo } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from './components/404/notFound';
import Category from './components/pages/cateory';
import Cart from './components/pages/cart';
import LoadingFallback from './components/Loading/Loading'; 

const TopMenu = lazy(() => import("./components/TopMenu"));
const DetailSection = lazy(() => import("./components/pages/TourSection"));
const Homepage = lazy(() => import("./components/pages/Homepage"));
const DetailPage = lazy(() => import("./components/pages/TourSection"));
const DestinationPage = lazy(() => import("./components/pages/DestinationDetail"));
const TourListing = lazy(() => import("./components/pages/TourListingMain"));
const Login = lazy(() => import("./components/user/Login"));
const Register = lazy(() => import("./components/user/Register"));
const Forget = lazy(() => import("./components/user/Forget"));
const UserProfile = lazy(() => import("./components/user/UserDashboard"));
const TrendingPlaces = lazy(() => import("./components/pages/trendingPlaces"));
const SearchListing = lazy(() => import('./components/pages/SearchListingMain'));
const SearchDetail = lazy(() => import('./components/pages/searchDetail'));
const TrendingDetails = lazy(() => import('./components/pages/TrendingDetail'));
const Attraction = lazy(() => import('./components/pages/attraction'));
const BillingDetails = lazy(() => import("./components/pages/billingDetails"));
const TermCondition = lazy(() => import("./components/pages/termCondition"));
const CancellationPolicy = lazy(() => import("./components/pages/cancellationPolicy"));
const PrivacyPolicy = lazy(() => import('./components/privacyPolicy/privacyPolicy'));
const ContactUs = lazy(() => import('./components/conatctUs/contactUs'));
const AboutUs = lazy(() => import("./components/aboutUs/about"));
const ThankyouPage = lazy(() => import("./components/thankyouPage/thankyouPage"));
const Booking = lazy(() => import("./components/user/myBooking"));
const Wishlist = lazy(() => import("./components/user/wishlist"));
const EditProfile = lazy(() => import("./components/user/editProfile"));
const ChangePassword = lazy(() => import("./components/user/changePassword"));
const Review = lazy(() => import("./components/user/review"));
const ViewDetail = lazy(() => import("./components/user/viewDetail"));
const Visa = lazy(() => import('./components/pages/tourVisa'));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const ViewBookingTour = lazy(() => import("./components/user/viewBookingTour"));
const ResetPassword= lazy(()=> import("./components/user/resetPassword"))


const App = () => {
  return (
    <Router basename={'/'}>
      <React.Fragment>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback className="full-page" />}>
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/forget-password' element={<Forget />} />
            <Route exact path='/reset-password' element={<ResetPassword/>} />
            <Route exact path='/user-dashboard' element={<UserProfile />} />
            <Route exact path="/desert-safari/:title" element={<DetailPage />} />
            <Route exact path="/private-jet/:title" element={<DetailPage />} />
            <Route exact path="/wedding-on-yacht/:title" element={<DetailPage />} />
            <Route exact path="/luxury-tours/:title" element={<DetailPage />} />
            <Route exact path="/private-tour/:title" element={<DetailPage />} />
            <Route exact path="/attraction-tickets/:title" element={<DetailPage />} />
            <Route exact path="/chauffeur/:title" element={<DetailPage />} />
            <Route exact path='/destination/:country' element={<TourListing />} />
            <Route exact path='/destination/:country/:title' element={<DestinationPage />} />
            <Route exact path='trending-tour/:title' element={<TrendingPlaces />} />
            <Route exact path='/trending-tour/:location/:title' element={<TrendingDetails />} />
            <Route exact path='tour/:title' element={<SearchListing />} />
            <Route exact path='/tour/:location/:title' element={<SearchDetail />} />
            <Route exact path='/desert-safari/:title' element={<DetailPage />} />
            <Route exact path='/:categoryName' element={<Category />} />
            <Route exact path='/:categoryName/:title' element={<DetailPage />} />
            <Route exact path='/attraction/:attractionName' element={<Attraction />} />
            <Route exact path='/billing-detail' element={<BillingDetails />} />
            <Route exact path='/cancellation-policy' element={<CancellationPolicy />} />
            <Route exact path='/term-condition' element={<TermCondition />} />
            <Route exact path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route exact path='/contact-us' element={<ContactUs />} />
            <Route exact path='/about-us' element={<AboutUs />} />
            <Route exact path='/thankyou' element={<ThankyouPage />} />
            <Route exact path='/wishlist' element={<Wishlist />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/booking' element={<Booking />} />
            <Route exact path='/editProfile' element={<EditProfile />} />
            <Route exact path='/changepassword' element={<ChangePassword />} />
            <Route exact path='/review/:id' element={<Review />} />
            <Route exact path='/view-detail/:id' element={<ViewDetail />} />
            <Route exact path='/view-tour/:id' element={<ViewBookingTour />} />
            <Route exact path='/tourist-visa' element={<Visa />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </React.Fragment>
    </Router>
  );
}

export default memo(App);