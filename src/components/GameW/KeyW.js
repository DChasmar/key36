import React, { useContext } from 'react'
import { KeyboardWContext } from './KeyboardW';

function Key({ keyVal, dark, color }) {
  const { addLetter } = useContext(KeyboardWContext);
  const chooseKey = () => {
    addLetter(keyVal);
  };

  let boxColor;

  if (color === 0) {
    boxColor = '#cccccc'; // grey
  } else if (color === 1) {
    boxColor = '#d9d91e'; // yellow
  } else if (color === 2) {
    boxColor = '#67ae4d'; // green
  } else {
    boxColor = 'white';
  }

  return (
      <div className={dark ? 'key dark_key reveal-tile' : 'key'} style={{ backgroundColor: boxColor }} onClick={chooseKey}>
        {keyVal}
      </div>
    )
}

export default Key