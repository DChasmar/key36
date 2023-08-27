import React, { useContext } from 'react'
import { KeyboardGContext } from './KeyboardG';

function Key({ keyVal, pointVal, keyLine, guessKey }) {
    const { addLetter, removeLetter } = useContext(KeyboardGContext);
    const selectLetter = () => {
        if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
            addLetter(keyVal);
        } else if (keyLine === 0) {
            removeLetter()
        };
    };

    return (
        <div className= { guessKey ? 'key reveal-tile' : 'key' } style={ keyVal !== "" ? {backgroundColor: '#EFC18D'} : undefined } onClick={selectLetter}>
            {/* Centered text */}
            <div className="centered-text">{keyVal}</div>

            {/* Text in the bottom-right corner */}
            <div className="bottom-text">{pointVal}</div>
        </div>
    )
}

export default Key