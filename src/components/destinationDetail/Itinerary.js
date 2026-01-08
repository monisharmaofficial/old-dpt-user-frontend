import React, { useState, useEffect } from 'react';
import config from '../../config';

const Itinerary = () => {
    const [itineraryData, setItineraryData] = useState([]);
    const url = window.location.href;
    const spliturl = url.split("/");
    const slug = spliturl[5];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/${slug}`);
                const data = await response.json();
                if (data.status === 'success' && data.data.length > 0) {
                    setItineraryData(data.data[0].itinerary_info);
                } else {
                    console.error('Failed to fetch itinerary data');
                }
            } catch (error) {
                console.error('Error fetching itinerary data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to fetch data only once when the component mounts

    return (
        <div>
            <div className="Itinerary">
                <h3>Itinerary</h3>
                <div className="ItineraryIn">
                    <div className="d-flex align-items-start">
                        <div className="nav flex-column nav-pills LhsItineraryDiv" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {itineraryData.map((item, index) => (
                                <button
                                    key={index}
                                    className={`nav-link ${index === 0 ? 'active' : ''}`}
                                    id={`v-pills-itinerary${index + 1}-tab`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#v-pills-itinerary${index + 1}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`v-pills-itinerary${index + 1}`}
                                    aria-selected={index === 0 ? 'true' : 'false'}
                                >
                                    <div className="parentWrapper">
                                        <div className="imgWrapper">
                                            <img src={`${config.imageUrl}/${item.image}`} alt="" />
                                        </div>
                                        <div className="Text">
                                            <div className="title">{item.name}</div>
                                            <span className="description">{item.description}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="tab-content RhsItineraryDiv" id="v-pills-tabContent">
                            {itineraryData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                                    id={`v-pills-itinerary${index + 1}`}
                                    role="tabpanel"
                                    aria-labelledby={`v-pills-itinerary${index + 1}-tab`}
                                >
                                    <div className="TabImg1">
                                        <img src={`${config.imageUrl}/${item.image}`} alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
