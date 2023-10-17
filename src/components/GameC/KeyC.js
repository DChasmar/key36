import React, { useContext } from 'react'
import { KeyboardCContext } from './KeyboardC';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, keyLine, guessKey, blankKey }) {
  const { addLetter, removeLetter, disableKeyPressRef } = useContext(KeyboardCContext);
  const selectLetter = () => {
    if (disableKeyPressRef.current) {
      return;
    } else if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
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