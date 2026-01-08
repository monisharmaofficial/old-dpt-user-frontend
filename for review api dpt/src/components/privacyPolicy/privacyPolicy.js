import React from 'react'
import InnerHeader from '../common/InnerHeader'
import Memories from '../common/memories'
import Footer from '../common/Footer'
import './style/privacyPolicy.css'
import { Helmet } from 'react-helmet'

const privacyPolicy = () => {
    return (
        <div>
            <InnerHeader />
            <Helmet>
                <title>Privacy Policy</title>
                <meta name="description" content="Privacy Policy" />
                <meta name="keywords" content="Privacy Policy" />
                {/* Add other meta tags if needed */}
            </Helmet>
         <div className="privacypolicyPage">
                <div className="container">
                    <h2>Privacy Policy</h2>
                    <p>
                        <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rem
                        eveniet dolorem consectetur praesentium autem esse. Voluptatibus, eaque?
                        Saepe iure at reiciendis illum fugiat cumque voluptatem non illo
                        perspiciatis repellat. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Eligendi, rem eveniet dolorem consectetur praesentium autem esse.
                        Voluptatibus, eaque? Saepe iure at reiciendis illum fugiat cumque
                        voluptatem non illo perspiciatis repellat. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Eligendi, rem eveniet dolorem consectetur
                        praesentium autem esse. Voluptatibus, eaque? Saepe iure at reiciendis
                        illum fugiat cumque voluptatem non illo perspiciatis repellat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rem
                        eveniet dolorem consectetur praesentium autem esse. Voluptatibus, eaque?
                        Saepe iure at reiciendis illum fugiat cumque voluptatem non illo
                        perspiciatis repellat. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Eligendi, rem eveniet dolorem consectetur praesentium autem esse.
                        Voluptatibus, eaque? Saepe iure at reiciendis illum fugiat cumque
                        voluptatem non illo perspiciatis repellat.
                    </p>
                    <ul>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero fuga est,
                            quam minima corrupti delectus
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero fuga est,
                            quam minima corrupti delectus
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero fuga est,
                            quam minima corrupti delectus
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero fuga est,
                            quam minima corrupti delectus
                        </li>
                    </ul>
                    <p>
                        <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rem
                        eveniet dolorem consectetur praesentium autem esse. Voluptatibus, eaque?
                        Saepe iure at reiciendis illum fugiat cumque voluptatem non illo
                        perspiciatis repellat. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Eligendi, rem eveniet dolorem consectetur praesentium autem esse.
                        Voluptatibus, eaque? Saepe iure at reiciendis illum fugiat cumque
                        voluptatem non illo perspiciatis repellat.
                    </p>
                    <p>
                        <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rem
                        eveniet dolorem consectetur praesentium autem esse. Voluptatibus, eaque?
                        Saepe iure at reiciendis illum fugiat cumque voluptatem non illo
                        perspiciatis repellat. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Eligendi, rem eveniet dolorem consectetur praesentium autem esse.
                        Voluptatibus, eaque? Saepe iure at reiciendis illum fugiat cumque
                        voluptatem non illo perspiciatis repellat.
                    </p>
                </div>
            </div>
            <Memories />
            <Footer />
        </div>
    )
}

export default privacyPolicy
