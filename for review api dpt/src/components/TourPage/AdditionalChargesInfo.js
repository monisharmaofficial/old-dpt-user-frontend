import React, { useEffect, useState } from 'react';
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import config from '../../config';

const AdditionalChargesInfo = () => {
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
      <div className="Whattoexpect">
        <div className="titlewithhd">
          <h3>Additional Charges Info</h3>
        </div>
        <ul>
          {backendData &&
            backendData.data &&
            backendData.data.map((tour) => (
              <div key={tour.id}>
                {tour.additional_charges_info && (
                  <Editor
                    editorState={EditorState.createWithContent(
                      convertToContentState(tour.additional_charges_info)
                    )}
                    readOnly
                  />
                )}
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdditionalChargesInfo;
