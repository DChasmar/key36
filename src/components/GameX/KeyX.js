import React, { useContext } from 'react'
import { KeyboardXContext } from './KeyboardX';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, guessKey, keyLine, clickableKey, symbol }) {
  const { addNumber } = useContext(KeyboardXContext);
  const selectLetter = () => {
    if (clickableKey) {
      addNumber(keyVal); 
    }
  };

  let iconComponent = null;

  if ((keyLine === 1 || keyLine === 2) && keyVal === "") {
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