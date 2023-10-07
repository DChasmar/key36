import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect } from '../../utils';
import Key from './KeyJ';
import Spacebar from './SpacebarJ';
import HundredsGrid from './HundredsGridJ'

export const KeyboardJContext = createContext();

function KeyboardJ() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const keys0 = ["1", "2", "3", "4"];
    const [guess, setGuess] = useState("");

    const [colorArray, setColorArray] = useState([
        "1", "2", "2", "1", "2", "4", "2", "1", "1", "1", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", "", 
        "", "", "", "", "", "", "", "", "", ""
      ]);

    const primeAbundantArray = [
        "1", "2", "2", "1", "2", "4", "2", "1", "1", "1",
        "2", "3", "2", "1", "1", "1", "2", "3", "2", "3",
        "1", "1", "2", "3", "1", "1", "1", "4", "2", "3",
        "2", "1", "1", "1", "1", "3", "2", "1", "1", "3",
        "2", "3", "2", "1", "1", "1", "2", "3", "1", "1",
        "1", "1", "2", "3", "1", "3", "1", "1", "2", "3",
        "2", "1", "1", "1", "1", "3", "2", "1", "1", "3",
        "2", "3", "2", "1", "1", "1", "1", "3", "2", "3",
        "1", "1", "2", "3", "1", "1", "1", "3", "2", "3",
        "1", "1", "1", "1", "1", "3", "2", "1", "1", "3"
    ];

    const wordColors = [
        { word: 'Deficient', color: '#96cf8d' },
        { word: 'Prime', color: '#d9d91e' },
        { word: 'Abundant', color: '#23a7fa' },
        { word: 'Perfect', color: '#e7427a' }
    ];
    
    const [symbolResponse, setSymbolResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("check");
        setTimeout(() => {
            setSymbolResponse("");
            let newKeysColor = [...keysColor];
            newKeysColor[2][6] = 1;
            setKeysColor(newKeysColor);
            setGameChosen({ gameChosen: false, gameNumber: '' });
            disableKeyPressRef.current = false;
        }, 4000);
    }

    const badGuess = () => {
        setSymbolResponse("times");
        disableKeyPressRef.current = true;
        setTimeout(() => {
            let newColorArray = [...colorArray]
            const guessIndex = colorArray.indexOf("");
            for (let i = 0; i < guessIndex % 10; i++) {
                newColorArray[guessIndex - 1 - i] = "";
            }
            setColorArray(newColorArray);
            setGuess("");
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 500);
    }

    const checkGuess = () => {
        let newColorArray = [...colorArray];
        if (colorArray.includes("")) {
            const guessIndex = colorArray.indexOf("");
            if (guess === primeAbundantArray[guessIndex]) {
                newColorArray[guessIndex] = guess;
                setColorArray(newColorArray)
                setGuess("");
                if (newColorArray[colorArray.length - 1] === "3") {
                    gameOver()
                }
            } else if (guess.length === primeAbundantArray[guessIndex].length) {
                badGuess();
            }
        }
    }

    const addNumber = (key) => {
        let newGuess = guess.concat(key);
        setGuess(newGuess);
    }

    const removeNumber = () => {
        if (guess.length > 0) {
            let newGuess = guess.slice(0, -1);
            setGuess(newGuess);
        }
    }

    useEffect(() => {
        if (guess !== "") {
            checkGuess();
        }
    }, [guess]);

    const handleKeyboard = useCallback((event) => {
        if (disableKeyPressRef.current) {
            event.preventDefault();
            return;
        } else if (event.key === "Backspace") {
            removeNumber()
        } else if (event.key === " ") {
            setGameChosen({gameChosen: false, gameNumber: ''});
        } else {
            keys0.forEach((key) => {
                if (event.key === key) {
                    addNumber(key)
            }});
        }
    });

    useKeydownEffect(handleKeyboard, [handleKeyboard]);
    
    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardJContext.Provider
                value={{
                addNumber,
                colorArray
                }}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} />;
            })}</div>
            <div className='line1'><HundredsGrid /></div>
            <div className='line2'>< Spacebar keyVal={symbolResponse} /></div>
            <div className='line3'>
            {symbolResponse === "check" && (
                <h2>
                    {wordColors.map(({ word, color }, index) => (
                        <span key={index} style={{ color }}>
                        {word}{' '}
                        </span>
                    ))}
                </h2>
            )}
            </div>
            </KeyboardJContext.Provider>
        </div>
    )

}

export default KeyboardJ