import React , {useEffect , useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import IncludedExclusive from './IncludedExclusive'
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import config from '../../config';

const Detail = () => {
    const [backendData, setBackendData] = useState(null);
    const dispatch = useDispatch();
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
        <>
            <div className="tab-pane fade show active" id="pills-detail" role="tabpanel" aria-labelledby="pills-detail-tab">
               
                {backendData && backendData.data && backendData.data.map((tour) => (
                    <div className="OverviewSection" key={tour.id}> 
                
                    <Editor editorState={EditorState.createWithContent(convertToContentState(tour.tour_details))} readOnly />
                    </div>
                ))}
                
      
                <div className="SecondPartTab">
                    <ul className="nav nav-pills mb-3" id="pills-tab1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-included-tab" data-bs-toggle="pill" data-bs-target="#pills-included" type="button" role="tab" aria-controls="pills-included" aria-selected="true">What's Included?</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-exclusive-tab" data-bs-toggle="pill" data-bs-target="#pills-exclusive" type="button" role="tab" aria-controls="pills-exclusive" aria-selected="false">What’s exclusive?</button>
                        </li>
                    </ul>
                    <IncludedExclusive/>
                </div>
                {/* SecondPartTab */}
            </div>
        </>
    )
}

export default Detail
