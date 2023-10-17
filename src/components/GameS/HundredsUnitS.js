import React from 'react'
import { FaTimes } from '../IconModule';

function HundredsUnit( { keyVal, color, next } ) {

    let boxColor;

    const squares = ["1", "4", "9", "16", "25", "36", "49", "64", "81", "100"];

    const primes = ["2", "3", "5", "7", "11", "13", "17", "19", "23", "29", 
        "31", "37", "41", "43", "47", "53", "59", 
        "61", "67", "71", "73", "79", "83", "89", "97"];

    if (color !== "") {
        if (squares.includes(keyVal)) {
        boxColor = '#96cf8d'; // green
        } else if (primes.includes(keyVal)) {
        boxColor = '#d9d91e'; // yellow
        } else if (!squares.includes(keyVal) && !primes.includes(keyVal)) {
        boxColor = '#23a7fa'; //blue
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