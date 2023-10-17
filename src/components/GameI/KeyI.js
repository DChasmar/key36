import React, { useContext } from 'react'
import { KeyboardIContext } from './KeyboardI';
import { TbLetterC, TbLetterH } from 'react-icons/tb';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, guessKey, keyLine }) {
    const { addLetter, removeLetter, disableKeyPressRef } = useContext(KeyboardIContext);
    const selectLetter = () => {
      if (disableKeyPressRef.current) {
        return;
      } else if (keyLine === 0) {
        removeLetter();
      } else {
        addLetter(keyVal);
      }
    };

    let iconComponent = null;

    if (keyVal === 'c') {
        iconComponent = <TbLetterC />;
    } else if (keyVal === 'h') {
        iconComponent = <TbLetterH />; 
    } else if (keyVal === '') {
        iconComponent = <GoDotFill />; 
    }else {
        iconComponent = keyVal;
    };

    return (
        <div className={guessKey ? 'key guess_key' : 'key'} onClick={selectLetter}>
          {iconComponent}
        </div>
      )
}

export default Key