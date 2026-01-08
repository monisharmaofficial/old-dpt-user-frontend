import React from 'react'
import './style/cancellationPolicy.css'
import { Helmet } from 'react-helmet'

const cancellationPolicy = () => {
    return (
        <div>
            <div className="CancellationPolicyPage">
                <Helmet>
                    <title>Cancellation Policy</title>
                    <meta name="description" content="Cancellation Policy" />
                    <meta name="keywords" content="Cancellation Policy" />
                    {/* Add other meta tags if needed */}
                </Helmet>
                <div className="container">
                    <h2>Cancellation Policy</h2>
                    <p>
                        <strong>
                            You can cancel up to 24 hours in advance of the experience for a full
                            refund
                        </strong>
                    </p>
                    <ul>
                        <li>
                            For a full refund, you must cancel at least 24 hours before the
                            experience’s start time.
                        </li>
                        <li>
                            If you cancel less than 24 hours before the experience’s start time, the
                            amount you paid will not be refunded.
                        </li>
                        <li>Cut-off times are based on the experience’s local time.</li>
                        <li>Cut-off times are based on the experience’s local time.</li>
                        <li>
                            Any changes made less than 24 hours before the experience’s start time
                            will not be accepted.
                        </li>
                    </ul>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nesciunt,
                        maxime cum eligendi dolorem repellat, saepe neque error expedita, amet
                        velit? Laborum doloribus cum numquam facilis? Quos enim quisquam quod!
                    </p>
                </div>
            </div>

        </div>
    )
}

export default cancellationPolicy
