import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './KeyU';
import Spacebar from './SpacebarU';
import HundredsGrid from './HundredsGridU'

export const KeyboardUContext = createContext();

function KeyboardU() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [guess, setGuess] = useState("");

    const [numberArray, setNumberArray] = useState([
        "  ", "2", "3", "22", "5", "23", "7", "222", "33", "25",
        "11", "", "13", "", "", "", "17", "", "19", "",
        "", "", "23", "", "", "", "", "", "29", "",
        "31", "", "", "", "", "", "37", "", "", "",
        "41", "", "43", "", "", "", "47", "", "", "",
        "", "", "53", "", "", "", "", "", "59", "",
        "61", "", "", "", "", "", "67", "", "", "",
        "71", "", "73", "", "", "", "", "", "79", "",
        "", "", "83", "", "", "", "", "", "89", "",
        "", "", "", "", "", "", "97", "", "", ""
      ]);

    const primeArray = [
        "  ", "2", "3", "22", "5", "23", "7", "222", "33", "25",
        "11",'223', '13', '27', '35', '2222', '17', '233', '19', '225', 
        '37', '211', '23', '2223', '55', '213', '333', '227', '29', '235', 
        '31', '22222', '311', '217', '57', '2233', '37', '219', '313', '2225', 
        '41', '237', '43', '2211', '335', '223', '47', '22223', '77', '255', 
        '317', '2213', '53', '2333', '511', '2227', '319', '229', '59', '2235', 
        '61', '231', '337', '222222', '513', '2311', '67', '2217', '323', '257', 
        '71', '22233', '73', '237', '355', '2219', '711', '2313', '79', '22225', 
        '3333', '241', '83', '2237', '517', '243', '329', '22211', '89', '2335', 
        '713', '2223', '331', '247', '519', '222223', '97', '277', '3311', '2255'
    ];

    const [symbolResponse, setSymbolResponse] = useState("");
    const [xResponse, setXResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("check");
        setTimeout(() => {
            setSymbolResponse("");
            let newKeysColor = [...keysColor];
            newKeysColor[1][6] = 1;
            setKeysColor(newKeysColor);
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
        if (numberArray.includes("")) {
            const guessIndex = numberArray.indexOf("");
            if (guess === primeArray[guessIndex]) {
                newNumberArray[guessIndex] = guess;
                setNumberArray(newNumberArray)
                setGuess("");
                if (newNumberArray[numberArray.length - 1] === "2255") {
                    gameOver()
                }
            } else if (guess.length === primeArray[guessIndex].length) {
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

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardUContext.Provider
                value={{
                addNumber,
                numberArray,
                primeArray, 
                guess, 
                xResponse}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} />;
            })}</div>
            <div className='line1'><HundredsGrid /></div>
            <div className='line2'>< Spacebar keyVal={symbolResponse} /></div>
            </KeyboardUContext.Provider>
        </div>
    )

}

export default KeyboardU