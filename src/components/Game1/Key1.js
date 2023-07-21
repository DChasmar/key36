import React, { useCallback, useContext, useEffect } from 'react'
import { Keyboard1Context } from './Keyboard1';

function Key({ keyVal, keyLine }) {
  const { addLetter, removeLetter } = useContext(Keyboard1Context);
  const selectLetter = () => {
    if (keyLine === 1) {
      addLetter(keyVal);
    } else if (keyLine === 0) {
      removeLetter()
    };
  };

  return (
      <div className='key' onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key