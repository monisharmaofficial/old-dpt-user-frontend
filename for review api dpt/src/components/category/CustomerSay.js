import React, { useState, useEffect } from 'react'
import './Style/category.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import config from '../../config';

const Review = () => {
    const [testimonials, setTestimonials] = useState([]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/testimonial/list`);
                const data = await response.json();
                setTestimonials(data.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);
    return (
        <>
            <div className="customersayFullWidth">
                <div className="container">
                    <div className="Title">
                        <h2>What our customer says!</h2>
                    </div>
                    <div className="customersayrhs">
                        <div className="customersaySlider">
                            <div className="owl-carousel owl-theme" id="testiSlider">
                                <Carousel responsive={responsive} infinite={true} arrows={false} itemclassName="carousel-item-padding-60-px">
                                    {testimonials.map((testimonial) => (
                                        <div key={testimonial.id}>
                                            <div className="item">
                                                <div className="SliderBox">
                                                    <div className="text">
                                                        <p>{JSON.parse(testimonial.description).blocks[0].text}</p>
                                                    </div>
                                                    <div className="ratingstar">
                                                        <div className="starimg">
                                                            <img src="images/homepage/ratingstar.png" alt="" />
                                                        </div>
                                                        <h4>{testimonial.name}</h4>
                                                        <span>{testimonial.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Review
