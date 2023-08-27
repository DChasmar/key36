import React, { useContext } from 'react'
import { KeyboardJContext } from './KeyboardJ';

function Key({ keyVal, clickableKey }) {
    const { addNumber } = useContext(KeyboardJContext);
    const selectLetter = () => {
    
    if (clickableKey) {
      addNumber(keyVal); 
    }};

    let boxColor;

    if (keyVal === "1") {
    boxColor = '#96cf8d'; // green
    } else if (keyVal === "2") {
    boxColor = '#d9d91e'; // yellow
    } else if (keyVal === "3") {
    boxColor = '#23a7fa'; //blue
    } else if (keyVal === "4") {
    boxColor = '#e7427a'; // magenta
    }

  return (
      <div className={'key dark_key'} style={{ backgroundColor: boxColor }} onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key