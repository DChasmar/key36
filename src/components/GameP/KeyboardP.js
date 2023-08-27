import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './KeyP';
import Spacebar from './SpacebarP';
import Triangle from './TriangleP';

export const KeyboardPContext = createContext();

function KeyboardP() {
    const { setGameChosen, keys1Color, setKeys1Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [guess, setGuess] = useState("");

    const [numberArray, setNumberArray] = useState([
        [''],
        ['', ''],
        ['', '', ''],
        ['', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    ]);

    const pascalsTriangle = [
        ['1'],
        ['1', '1'],
        ['1', '2', '1'],
        ['1', '3', '3', '1'],
        ['1', '4', '6', '4', '1'],
        ['1', '5', '10', '10', '5', '1'],
        ['1', '6', '15', '20', '15', '6', '1'],
        ['1', '7', '21', '35', '35', '21', '7', '1'],
        ['1', '8', '28', '56', '70', '56', '28', '8', '1'],
        ['1', '9', '36', '84', '126', '126', '84', '36', '9', '1'],
        ['1', '10', '45', '120', '210', '252', '210', '120', '45', '10', '1'],
        ['1', '11', '55', '165', '330', '462', '462', '330', '165', '55', '11', '1'],
        ['1', '12', '66', '220', '495', '792', '924', '792', '495', '220', '66', '12', '1'],
    ];

    const [symbolResponse, setSymbolResponse] = useState("");
    const [xResponse, setXResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("check");
        setTimeout(() => {
            setSymbolResponse("");
            let newKeys1Color = keys1Color;
            newKeys1Color[9] = 1;
            setKeys1Color(newKeys1Color)
            setGameChosen({ gameChosen: false, gameNumber: '' });
            disableKeyPressRef.current = false;
        }, 1000);
    }

    const badGuess = () => {
        setXResponse("times");
        disableKeyPressRef.current = true;
        setTimeout(() => {
            setGuess("");
            setXResponse("");
            disableKeyPressRef.current = false;
        }, 500);
    }

    const checkGuess = () => {
        let newNumberArray = [...numberArray];
        if (numberArray.flat().includes("")) {
            let emptyIndex = null;
            let row = null;
            for (let i = 0; i < newNumberArray.length; i++) {
                row = newNumberArray[i];
                for (let j = 0; j < row.length; j++) {
                    if (row[j] === '') {
                        emptyIndex = { rowIndex: i, colIndex: j };
                        break; // Stop searching after finding the first empty string
                    }
                }
                if (emptyIndex) {
                    break; // Stop the outer loop as well
                }
            }

            if (emptyIndex) {
                if (guess === pascalsTriangle[emptyIndex.rowIndex][emptyIndex.colIndex]) {
                    newNumberArray[emptyIndex.rowIndex][emptyIndex.colIndex] = guess;
                    newNumberArray[emptyIndex.rowIndex][row.length - 1 - emptyIndex.colIndex] = guess;
                    setNumberArray(newNumberArray)
                    setGuess("");
                    if (newNumberArray.flat()[newNumberArray.flat().length - 7] === "924") {
                        gameOver()
                    }
                } else if (guess.length === pascalsTriangle[emptyIndex.rowIndex][emptyIndex.colIndex].length) {
                    badGuess();
                }
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

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardPContext.Provider
                value={{
                addNumber,
                numberArray,
                pascalsTriangle, 
                guess, 
                xResponse}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} />;
            })}</div>
            <div className='line1'><Triangle /></div>
            <div className='line2'>< Spacebar keyVal={symbolResponse} /></div>
            </KeyboardPContext.Provider>
        </div>
    )

}

export default KeyboardP