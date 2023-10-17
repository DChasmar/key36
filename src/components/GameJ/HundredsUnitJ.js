import React from 'react'
import { FaTimes } from '../IconModule';

function HundredsUnit( { keyVal, color, next } ) {

    let boxColor;

    const abundant = [
        "12", "18", "20", "24", "30", "36", "40", "42", "48", "54", "56", "60", "66", "70",
        "72", "78", "80", "84", "88", "90", "96", "100"
    ];

    const perfect = ["6", "28"];

    const primes = [
        "2", "3", "5", "7", "11", "13", "17", "19", "23", "29", 
        "31", "37", "41", "43", "47", "53", "59", 
        "61", "67", "71", "73", "79", "83", "89", "97"
    ];

    if (color !== "") {
        if (perfect.includes(keyVal)) {
        boxColor = '#e7427a'; // magenta
        } else if (primes.includes(keyVal)) {
        boxColor = '#d9d91e'; // yellow
        } else if (abundant.includes(keyVal)) {
        boxColor = '#23a7fa'; //blue
        } else if (!perfect.includes(keyVal) && !primes.includes(keyVal) && !abundant.includes(keyVal)) {
        boxColor = '#96cf8d'; // green
        }
    } else {
        boxColor = '#ddd';
    } 

    let iconComponent = null;

    if (keyVal === 'times') {
        iconComponent = <FaTimes />;
    } else {
        iconComponent = keyVal;
    }

    return (
        <div className= {'key hundreds_key'} 
        style= {{ backgroundColor: boxColor }}>
            {iconComponent}
        </div>
    )
}

export default HundredsUnit