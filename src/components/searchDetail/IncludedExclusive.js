import React, { useState, useEffect } from 'react'
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import config from '../../config';

const IncludedExclusive = () => {
  const [backendData, setBackendData] = useState(null);
  const url = window.location.href;
  const spliturl = url.split("/");
  const slug = spliturl[5];
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
      <div className="tab-content" id="pills-tabContent3">
        <div className="tab-pane fade show active" id="pills-included" role="tabpanel" aria-labelledby="pills-included-tab">
          <div className="datainnerUl">
            {backendData && backendData.data && backendData.data.map((tour) => (
              <div className="UlWrapper" key={tour.id}>
                <Editor editorState={EditorState.createWithContent(convertToContentState(tour.included))} readOnly />

              </div>
            ))}
          </div>
        </div> {/* datainnerUl */}

        <div className="tab-pane fade" id="pills-exclusive" role="tabpanel" aria-labelledby="pills-exclusive-tab">
          <div className="datainnerUl crossicon">
            <div className="UlWrapper">
            {backendData && backendData.data && backendData.data.map((tour) => (
              <div className="UlWrapper" key={tour.id}>
                <Editor editorState={EditorState.createWithContent(convertToContentState(tour.exclusive))} readOnly />

              </div>
            ))}
            </div>
            
          </div>
          {/* datainnerUl */}
        </div>
      </div>
    </div>
  )
}

export default IncludedExclusive
