import React, { useContext } from 'react'
import { KeyboardEContext } from './KeyboardE';

function Key({ keyVal, dark, clickableKey, symbol }) {
  const { addNumber } = useContext(KeyboardEContext);
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