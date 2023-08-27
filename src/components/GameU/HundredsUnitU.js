import React from 'react'
import { FaTimes } from '../IconModule';

function HundredsUnit( { keyVal, color, next } ) {

  const fontSize = keyVal.length > 3 ? 60 / keyVal.length : '120%';

  let boxColor;

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 
    31, 37, 41, 43, 47, 53, 59, 
    61, 67, 71, 73, 79, 83, 89, 97]

  if (keyVal !== "") {
    if (color === 1) {
      boxColor = '#96cf8d'; // green
    } else if (primes.includes(color)) {
      boxColor = '#d9d91e'; // yellow
    } else if (color > 1 && !primes.includes(color)) {
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
      style= {next ? { backgroundColor: '#ddd', border: '1.5px solid black' } : { backgroundColor: boxColor, fontSize }}>
        {iconComponent}
    </div>
  )
}

export default HundredsUnit