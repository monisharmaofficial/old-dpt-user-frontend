import React, { useState, useEffect } from 'react';
import '../../Style/header.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { data } from '../../data/index'
import { Link } from 'react-router-dom'
import config from '../../config';

const TopDestination = () => {
    const [destinations, setDestinations] = useState([]);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/destanition/list`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setDestinations(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="TopDestination">
                <div className="container">
                    <div className="Title">
                        <h2>Top Destinations</h2>
                    </div>

                    <div className="TopDestinationSlider">
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            itemClass="carousel-item-padding-60-px"
                            arrows={false}
                        >
                            {destinations.map((destination, index) => (
                                <div key={index} className="carouselItem">
                                    <Link to={`/destination/${destination.destination_name.replace(/\s+/g, '-').toLowerCase()}`} className="item">

                                        <div className="SliderBox">
                                            <div className="SliderBoxImg">
                                                <img src={`${config.imageUrl}/${destination.image}`} alt="" />
                                            </div>
                                            <div className="SliderBoxContent">
                                                <h3>{destination.destination_name}</h3>
                                                <p>{destination.trips} Trips 9</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopDestination;
