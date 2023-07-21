import React, { useContext } from 'react'
import { KeyboardTContext } from './KeyboardT';

function Key({ keyVal, keyLine }) {
  const { addLetter, removeLetter } = useContext(KeyboardTContext);
  const selectLetter = () => {
    if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
        addLetter(keyVal);
    } else if (keyLine === 0) {
        removeLetter()
    };
};

  return (
      <div className= 'key' onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key