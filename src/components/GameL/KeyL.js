import React, { useContext } from 'react'
import { KeyboardLContext } from './KeyboardL';

function Key({ keyVal, dark, color, keyLine }) {
  const { addLetter, removeLetter, disableKeyPressRef } = useContext(KeyboardLContext);
  const chooseKey = () => {
    if (disableKeyPressRef.current) {
      return;
    } else if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
        addLetter(keyVal);
    } else if (keyLine === 0) {
        removeLetter()
    };
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