import React, { useState, useEffect } from 'react';
import '../../Style/header.css';
import config from '../../config'

const Faq = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/faq/list`);
        const data = await response.json();
        if (data.status === 'success') {
          setFaqData(data.data);
        } else {
          console.error('Error fetching FAQ data');
        }
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchData();
  }, []);

  const renderFaqItems = () => {
    return faqData.map((faq) => (
      <div className="faqBox" key={faq.id}>
        <div className="accordion" id={`accordionExample${faq.id}`}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`heading${faq.id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${faq.id}`}
                aria-expanded="false"
                aria-controls={`collapse${faq.id}`}
              >
                {faq.name}
              </button>
            </h2>
            <div
              id={`collapse${faq.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${faq.id}`}
              data-bs-parent={`#accordionExample${faq.id}`}
            >
              <div className="accordion-body">
                <p>{faq.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="accordionDiv">
        <div className="container">
          <div className="accordionDivIN">
            <h2>Frequently asked Questions</h2>
            <div className="accordionDivWrapper">
              {renderFaqItems().slice(0, faqData.length / 2)}
              {renderFaqItems().slice(faqData.length / 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
