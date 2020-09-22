import React from 'react';

const PinMarker: React.FC = (props) => {
    return (
        <>
            <div className="marker"/>
            <span className="beacon"/>
            {props.children}
        </>
    );
}

export default PinMarker;
