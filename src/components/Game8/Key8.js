import React, { useContext } from 'react'
import { Keyboard8Context } from './Keyboard8';

function Key({ keyVal, dark, clickableKey, symbol }) {
  const { addNumber } = useContext(Keyboard8Context);
  const selectLetter = () => {
    if (clickableKey) {
      addNumber(keyVal); 
    }};

  return (
      <div className={symbol ? 'key mathsymbol_key' : dark ? 'key dark_key' : 'key'} onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key