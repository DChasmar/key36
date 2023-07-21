import React, { useContext } from 'react'
import { Keyboard2Context } from './Keyboard2';

function Key({ keyVal, dark, index, clickableKey, add }) {
  const { addNumber, removeNumber } = useContext(Keyboard2Context);
  const selectLetter = () => {
    if (clickableKey) {
      if (add) {
        addNumber(keyVal);
      } else {
        removeNumber()
      }
    }};

  return (
      <div className={dark ? 'key dark_key' : 'key'} onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key