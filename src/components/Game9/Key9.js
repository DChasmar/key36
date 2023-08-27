import React, { useContext } from 'react'
import { Keyboard9Context } from './Keyboard9';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, keyLine }) {
  const { addLetter, removeLetter } = useContext(Keyboard9Context);
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
      <div className={keyLine===0 ? 'key guess_key' : 'key'} onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Key