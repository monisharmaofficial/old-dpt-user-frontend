import React, { useEffect, useState } from 'react'
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import config from '../../config';
import {useParams} from 'react-router-dom'

const AdditionalChargesInfo = () => {
    const [backendData, setBackendData] = useState(null);
    const { categoryName } = useParams();
    const formattedCategory = categoryName
    .split('-') // Split by hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' ');
    const url = window.location.href;
    const spliturl = url.split("/");
    const slug = spliturl[3];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/plan/${slug}`);
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
    }, [slug,setBackendData]);

    // Function to convert the JSON data to ContentState
    const convertToContentState = (json) => {
        const rawContentState = JSON.parse(json);
        return convertFromRaw(rawContentState);
    };
    return (
        <>
            <div className="CategoryToursDescription">
                <div className="container">
                <div class="CategoryToursDescriptionIn">
                 
                        <h3><strong>{formattedCategory} Description</strong></h3>
     
                    <ul>
                        {backendData && backendData.data && backendData.data.map((tour) => (
                            <div key={tour.id}>
                                <Editor editorState={EditorState.createWithContent(convertToContentState(tour.description))} readOnly />
                            </div>
                        ))}

                    </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdditionalChargesInfo
