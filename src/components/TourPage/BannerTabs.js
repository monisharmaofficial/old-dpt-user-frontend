import React , {useEffect , useState} from 'react'
import AskQuestion from './AskQuestion'
import BookThisTour from './BookThisTour'
import { useDispatch, useSelector } from "react-redux";
import Detail from './Detail'
import config from '../../config';

const DetailOverview = () => {
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
      
    return (
        <>
            <div className="DetailTab">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-detail-tab" data-bs-toggle="pill" data-bs-target="#pills-detail" type="button" role="tab" aria-controls="pills-detail" aria-selected="true">
                            <img src="images/info.png" alt="" />Details </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-bookthistour-tab" data-bs-toggle="pill" data-bs-target="#pills-bookthistour" type="button" role="tab" aria-controls="pills-bookthistour" aria-selected="false">
                            <img src="images/add-to-basket.png" alt="" />Book This Tour </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-askquestions-tab" data-bs-toggle="pill" data-bs-target="#pills-askquestions" type="button" role="tab" aria-controls="pills-askquestions" aria-selected="false">
                            <img src="images/question.png" alt="" />Ask Questions </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <Detail/>
              {/* tab pannel */}
                    <BookThisTour/>
                    {/*tab pannel*/}
                    <AskQuestion/>
                   { /*tab panne*/}
                </div>
            </div>
        </>
    )
}

export default DetailOverview
