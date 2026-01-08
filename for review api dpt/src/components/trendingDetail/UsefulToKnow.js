import React , {useEffect , useState} from 'react'
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import config from '../../config';

const UsefulToKnow = () => {
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
            <div className="usefultoknow">
                <div className="titlewithhd">
                    <h3>That’s useful to know</h3>
                </div>
                <ul>
                {backendData && backendData.data && backendData.data.map((tour) => (
                    <div  key={tour.id}>
                    <Editor editorState={EditorState.createWithContent(convertToContentState(tour.know))} readOnly />
                    </div>
              
                ))}
                </ul>
            </div>
        </div>
    )
}

export default UsefulToKnow
