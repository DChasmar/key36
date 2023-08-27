import React, { useContext } from 'react'
import { KeyboardHContext } from './KeyboardH';
import { GoDotFill } from '../IconModule';

function Key({ keyVal, keyLine, guessKey, yellow }) {
    const { addLetter, removeLetter } = useContext(KeyboardHContext);
    const selectLetter = () => {
        if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
            addLetter(keyVal);
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
        guessKey ? (
        <div className='key guess_key' onClick={selectLetter}>
            {iconComponent}
        </div>
        ) : (
        <svg width="80" height="69.28203230275509">
            <polygon
            className={yellow ? "hexagon-fill" : "hexagon-blank"}
            points="0,34.64101615137754 20,0 60,0 80,34.64101615137754 60,69.28203230275509 20,69.28203230275509"
            stroke="white"
            strokeWidth="8.5"
            />
            <text className={yellow ? "hexagon-letter" : "hexagon-letter hexagon-letter-grey"} x="50%" y="50%" dy="0.35em">{iconComponent}</text>
        </svg>
        )
    );
  
}

export default Key