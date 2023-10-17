import React from 'react'
import { FaTimes } from '../IconModule';

function TriangleUnit( { keyVal, correct, column } ) {

    let blueLevel = 255 - (10 * column);
    let redLevel = 80 + (15 * column);
    let greenLevel = 200 - (5 * column);

    let iconComponent = null;

    if (keyVal === 'times') {
        iconComponent = <FaTimes />;
    } else {
        iconComponent = keyVal;
    }

    return (
        <div className= 'key triangle_key' 
        style={correct ? {backgroundColor: `rgb(${redLevel}, ${greenLevel}, ${blueLevel})`} : undefined} >
            {iconComponent}
        </div>
    )
}

export default TriangleUnit