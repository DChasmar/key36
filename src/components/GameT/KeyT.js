import React, { useContext } from 'react'
import { KeyboardTContext } from './KeyboardT';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, keyLine, guessKey, blankKey }) {
  const { addLetter, removeLetter } = useContext(KeyboardTContext);
  const selectLetter = () => {
    if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
        addLetter(keyVal);
    } else if (keyLine === 0) {
        removeLetter()
    };
  };

  let iconComponent = null;

  if (keyLine === 0 && keyVal === "") {
    iconComponent = <GoDotFill />;
  } else {
    iconComponent = keyVal;
  }

  return (
      <div className= {guessKey ? 'key guess_key' : blankKey ? 'key blank_key' : 'key'} onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Key