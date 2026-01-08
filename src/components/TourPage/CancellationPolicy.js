import React, { useState, useEffect } from 'react'
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import config from '../../config';

const CancellationPolicy = () => {
    const [backendData, setBackendData] = useState(null);
    const url = window.location.href;
    const spliturl = url.split("/");
    const slug = spliturl[4];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/${slug}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setBackendData(data);
            } catch (error) {
                console.error("Error fetching data from the backend:", error.message);
            }
        };

        fetchData();
    }, []);

    // Function to convert the JSON data to ContentState
    const convertToContentState = (json) => {
        const rawContentState = JSON.parse(json);
        return convertFromRaw(rawContentState);
    };
    return (
        <div>
            <div className="CancellationPolicy">
                <div className="titlewithhd">
                    <h3>Cancellation Policy</h3>
                </div>
                <div className="datainnerUl">
                    {backendData && backendData.data && backendData.data.map((tour) => (
                        <div key={tour.id}>
                                <Editor editorState={EditorState.createWithContent(convertToContentState(tour.policy))} readOnly />
                        </div>
                    ))}
                  

                </div>

            </div>
        </div>
    )
}

export default CancellationPolicy
