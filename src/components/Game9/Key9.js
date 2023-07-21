import React, { useContext } from 'react'
import { Keyboard9Context } from './Keyboard9';

function Key({ keyVal, keyLine }) {
  const { addLetter, removeLetter } = useContext(Keyboard9Context);
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