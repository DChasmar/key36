import React, { useContext } from 'react'
import { KeyboardDContext } from './KeyboardD';
import { TbLetterD } from 'react-icons/tb';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, guessKey, keyLine }) {
    const { addNumber, removeNumber } = useContext(KeyboardDContext);
    const selectLetter = () => {
        if (keyLine === 0) {
            removeNumber(keyVal);
        } else {
            addNumber(keyVal);
        }
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