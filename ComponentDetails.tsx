import React from 'react';

const ComponentDetails = ({ component }) => {
    return (
        <div>
            <h1>{component.name}</h1>
            <p>{component.description}</p>
            <h2>Documentation</h2>
            <pre>{component.documentation}</pre>
        </div>
    );
};

export default ComponentDetails;