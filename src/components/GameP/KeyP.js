import React, { useContext } from 'react'
import { KeyboardPContext } from './KeyboardP';

function Key({ keyVal, dark, clickableKey, symbol }) {
  const { addNumber } = useContext(KeyboardPContext);
  const selectLetter = () => {
    if (clickableKey) {
      addNumber(keyVal); 
    }};

  return (
      <div className={'key'} onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key