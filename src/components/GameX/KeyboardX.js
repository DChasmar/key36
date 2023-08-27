import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './KeyX';
import Spacebar from './SpacebarX';

export const KeyboardXContext = createContext();

function KeyboardX() {
    const { setGameChosen, keys3Color, setKeys3Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [keys1, setKeys1] = useState(["", "", "", "+", "", "", "", "=", "", "", "", ""]);

    const indicesToCheck = [0, 1, 2, 4, 5, 6];

    const [symbolResponse, setSymbolResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        setSymbolResponse("check");
        setTimeout(() => {
          let newKeys3Color = keys3Color;
          newKeys3Color[1] = 1;
          setKeys3Color(newKeys3Color)
          setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000);
    }

    const resetBadSum = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("times");
        setTimeout(() => {
            setKeys0(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
            setKeys1(["", "", "", "+", "", "", "", "=", "", "", "", ""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 2000);
    }

    const findSum = () => {
        let newKeys0 = [...keys0];
        let newKeys1 = [...keys1];
        if (indicesToCheck.every(index => keys1[index] !== "") && keys1.includes("")) {
            const keys1Int1 = parseInt(keys1.slice(0,3).join(""));
            const keys1Int2 = parseInt(keys1.slice(4,7).join(""));
            const sum = keys1Int1+keys1Int2;
            const digitsArray = sum.toString().split('');
            const allDigitsExistInKeys0 = digitsArray.every((digit) => keys0.includes(digit)) && new Set(digitsArray).size === digitsArray.length;
            if (allDigitsExistInKeys0) {
                newKeys1[8] = digitsArray[0];
                newKeys1[9] = digitsArray[1];
                newKeys1[10] = digitsArray[2];
                newKeys1[11] = digitsArray[3];
                setKeys1(newKeys1);
                digitsArray.forEach((val) => {
                    let returnIndex = keys0.indexOf(val);
                    newKeys0[returnIndex] = "";
                })
                setKeys0(newKeys0);
                gameOver();
            } else {
                let newDigitsArray = [...digitsArray];
                digitsArray.forEach((val) => {
                    if (!keys0.includes(val)) {
                        let returnIndex = digitsArray.indexOf(val);
                        newDigitsArray[returnIndex] = "";
                    };
                })
                newKeys1[8] = digitsArray[0];
                newKeys1[9] = digitsArray[1];
                newKeys1[10] = digitsArray[2];
                newKeys1[11] = digitsArray[3];
                setKeys1(newKeys1);
                resetBadSum();
            }
        }
    };

    useEffect(() => {
        findSum()
    }, [keys1]);

    const addNumber = (key) => {
        let newKeys0 = [...keys0]
        let newKeys1 = [...keys1]
        let newPlayableArray = [...indicesToCheck.map(index => keys1[index])];
        if (keys0.includes(key)) {
            const emptyIndex = newPlayableArray.findIndex((val) => val === "");
            const keyIndex = newKeys0.findIndex((val) => val === key);
            if (emptyIndex < 3) {
                newKeys1[emptyIndex] = key;
                setKeys1(newKeys1)
            } else if (emptyIndex > 2) {
                newKeys1[emptyIndex + 1] = key;
                setKeys1(newKeys1)
            } else {
                return
            }
            newKeys0[keyIndex] = "";
            setKeys0(newKeys0)
        }
        
    }

    const handleKeyboard = useCallback((event) => {
        if (disableKeyPressRef.current) {
            event.preventDefault();
            return;
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
            <KeyboardXContext.Provider
                value={{
                addNumber}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} keyLine={0} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                const isSymbol = index === 3 || index === 7;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} symbol={isSymbol ? true : undefined} keyLine={1} guessKey={!isSymbol} />;
            })}</div>
            <div className='line3'>< Spacebar keyVal={symbolResponse} /></div>
            </KeyboardXContext.Provider>
        </div>
    )

}

export default KeyboardX