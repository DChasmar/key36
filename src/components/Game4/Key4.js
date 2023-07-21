import React, { useContext } from 'react'
import { Keyboard4Context } from './Keyboard4';

function Key({ keyVal, dark, keyLine }) {
  const { addLetter, removeLetter, disableKeyPressRef } = useContext(Keyboard4Context);
  const selectLetter = () => {
    if (disableKeyPressRef.current) return;
    if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
      addLetter(keyVal);
    } else if (keyLine === 0) {
      removeLetter()
    };
};

  return (
      <div className={dark ? 'key dark_key' : 'key'} onClick={selectLetter}>
        {keyVal}
      </div>
    )
}

export default Key