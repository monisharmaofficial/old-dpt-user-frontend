import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/attraction.css';
import ContentRhs from './contentRhs';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { Helmet } from "react-helmet";
import 'draft-js/dist/Draft.css';
import config from '../../config';

const ContentListing = () => {
  const [tour, setTour] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const url = window.location.href;
  const spliturl = url.split("/");
  const slug = spliturl[4];

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/popular-attraction/${slug}`);
        const data = await response.json();

        if (data.status === 'success') {
          setTour(data.data[0]);
          setMetaTitle(data.data[0].meta_title);
          setMetaDescription(data.data[0].meta_description);
          setMetaKeywords(data.data[0].meta_keyword);
          

          // Parse the JSON string and convert it to Draft.js content state
          const rawContent = JSON.parse(data.data[0].description);
          const contentState = convertFromRaw(rawContent);
          setEditorState(EditorState.createWithContent(contentState));
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchTourData();
  }, [slug]);
  return (
    <div>
      <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        {/* Add other meta tags if needed */}
      </Helmet>
        <div className="attractiondetailPage">
          <div className="attraction-detailTopTab">
            <div className="container">
              <div className="attraction-detailTopTabIN">
                <ul className="nav nav-pills mb-5" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-overviewtab-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-overviewtab"
                      type="button"
                      role="tab"
                      aria-controls="pills-overviewtab"
                      aria-selected="true"
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-toursticket-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-toursticket"
                      type="button"
                      role="tab"
                      aria-controls="pills-toursticket"
                      aria-selected="false"
                    >
                      Tours &amp; Tickets
                    </button>
                  </li>
                </ul>
              </div>
              {/*attraction-detailTopTabIN*/}
            </div>
            {/*container*/}
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-overviewtab"
                role="tabpanel"
                aria-labelledby="pills-overviewtab-tab"
              >
                <div className="overviewtabData">
                  <div className="container">
                    <h2>The Basics</h2>
                    <img src="images/homepage/listproduct1.png" alt="" />
                    <p><Editor editorState={editorState} readOnly={true} /></p>
                    {/*   <Link href="/" className="cta">
                 View all 137 experiences
                </Link>*/}
                    <div className="ThingstwoSection">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="ThingstwoSectionIn">
                            <h2>Things to Know Before You Go</h2>
                            <ul>
                              <li>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit.
                              </li>
                              <li>
                                Aliquam vitae metus eget tortor luctus placerat at in
                                ligula.
                              </li>
                              <li>Sed cursus quam ac nunc vestibulum aliquam.</li>
                              <li>Aenean tincidunt tortor at aliquam dictum.</li>
                              <li>
                                Vestibulum sed quam posuere, ornare felis id, vehicula
                                lorem.
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="ThingstwoSectionIn">
                            <h2>How to Get There</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Donec quis consequat tellus, eget facilisis libero.
                              Nullam sem nisi, maximus elementum dolor non, sodales
                              ornare libero. Quisque tincidunt turpis ac lectus
                              ultrices porta. Integer eget fermentum tortor. Nunc
                              massa lacus, commodo a venenatis et, rutrum sed nulla.
                              Pellentesque fringilla tincidunt tellus, non ultrices
                              neque volutpat eget. Etiam luctus tempus lorem, dictum
                              sodales tortor.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*container*/}
                </div>
                {/*overviewtabData*/}

              </div>
              <div class="tab-pane fade" id="pills-toursticket" role="tabpanel" aria-labelledby="pills-toursticket-tab">
                <div class="CategoryTopSection">
                  <ContentRhs />
                </div>
              </div>
            </div>
          </div>
          {/*attraction-detailTopTab*/}
          {/*faq*/}

          {/*dubaimemories*/}
        </div>
        {/*attractiondetailPage*/}
        <div className="menuOverlay" />
      </>

    </div>
  )
}

export default ContentListing;
