import React, { useState, useEffect } from 'react';
import { getFeatures } from '../database/db';

const UpcomingFeatures = () => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const featuresData = await getFeatures();
            setFeatures(featuresData);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>A venir</h2>
            {features.map((feature, index) => (
                <ul key={index}>
                    <li>{feature.name}</li>
                    <p>{feature.description}</p>
                </ul>
            ))}
        </div>
    );
};

export default UpcomingFeatures;
