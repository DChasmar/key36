import React, { useContext } from 'react'
import { Keyboard1Context } from './Keyboard1';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, keyLine }) {
  const { addLetter, removeLetter } = useContext(Keyboard1Context);
  const selectLetter = () => {
    if (keyLine === 1) {
      addLetter(keyVal);
    } else if (keyLine === 0) {
      removeLetter()
    };
  };

  let iconComponent = null;

  if (keyVal === "") {
    iconComponent = <GoDotFill />;
  } else {
    iconComponent = keyVal;
  }


  return (
      <div className= {keyLine === 0 ? 'key guess_key' : 'key'} onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Key