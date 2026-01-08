import React from 'react'
import { Link } from 'react-router-dom'
import './style/style.css'

const breadcrum = () => {
    return (
        <div>
            <>
                <div
                    className="InnerBanner"
                    style={{ backgroundImage: "url(https://res.cloudinary.com/dqslvlm0d/image/upload/v1698737900/innerbanner_rnna6u.jpg)" }}
                >
                    <div className="container">
                        <h1>Tourist Visa</h1>
                    </div>
                </div>
                <div className="BreadcrumbSection">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Tourist Visa
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </>

        </div>
    )
}

export default breadcrum
