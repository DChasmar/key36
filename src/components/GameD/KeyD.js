import React, { useContext } from 'react'
import { KeyboardDContext } from './KeyboardD';
import { TbLetterD } from 'react-icons/tb';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, guessKey, keyLine }) {
    const { addLetter, removeLetter, disableKeyPressRef } = useContext(KeyboardDContext);
    const selectLetter = () => {
        if (disableKeyPressRef.current) {
            return;
        } else if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
            addLetter(keyVal);
        } else if (keyLine === 0) {
            removeLetter();
        };
    };

    let iconComponent = null;

    if (keyVal === 'd') {
        iconComponent = <TbLetterD />;
    } else if (keyVal === '') {
        iconComponent = <GoDotFill />; 
    } else {
        iconComponent = keyVal;
    };

    return (
        <div className={guessKey ? 'key guess_key' : 'key'} onClick={selectLetter}>
            {iconComponent}
        </div>
        )
}

export default Key