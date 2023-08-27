import React, { useContext } from 'react'
import { Keyboard8Context } from './Keyboard8';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, guessKey, clickableKey, symbol }) {
  const { addNumber } = useContext(Keyboard8Context);
  const selectLetter = () => {
    if (clickableKey) {
      addNumber(keyVal); 
    }
  };
  
  let iconComponent = null;

  if (!clickableKey && keyVal === "") {
    iconComponent = <GoDotFill />;
  } else {
    iconComponent = keyVal;
  }

  return (
      <div className={symbol ? 'key mathsymbol_key' : guessKey ? 'key guess_key' : 'key'} onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Key