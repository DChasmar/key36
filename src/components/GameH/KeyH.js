import React, { useContext } from 'react'
import { KeyboardHContext } from './KeyboardH';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, keyLine, guessKey, yellow }) {
    const { addLetter, removeLetter, disableKeyPressRef } = useContext(KeyboardHContext);
    const selectLetter = () => {
        if (disableKeyPressRef.current) {
            return;
        } else if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
            if (yellow) {
                addLetter(keyVal);
            }
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
        <div className={guessKey ? 'key guess_key' : yellow ? 'key anagram-fill' : 'key blank_key'} onClick={selectLetter}>
            {iconComponent}
        </div>
    );
  
}

export default Key