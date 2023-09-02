import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect } from '../../utils';
import Key from './KeyE';
import Spacebar from './SpacebarE';

export const KeyboardEContext = createContext();

function KeyboardE() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    const [keys1, setKeys1] = useState(["", "", "x", "", "=", "", ""]);
    const [keys2, setKeys2] = useState(["", "x", "", "=", "", ""]);

    const [symbolResponse, setSymbolResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        setSymbolResponse("check");
        setTimeout(() => {
            let newKeysColor = [...keysColor];
            newKeysColor[1][2] = 1;
            setKeysColor(newKeysColor);
            setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000);
    }

    const resetBadProduct = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("times");
        setTimeout(() => {
            setKeys0(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
            setKeys1(["", "", "x", "", "=", "", ""]);
            setKeys2(["", "x", "", "=", "", ""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 500);
    }

    const findProduct = () => {
        let newKeys0 = [...keys0];
        let newKeys1 = [...keys1];
        let newKeys2 = [...keys2];
        if (keys1[0] !== "" && keys1[1] !== "" && keys1[3] !== "" && keys1.includes("")) {
            const keys1Int1 = parseInt(keys1.slice(0,2).join(""));
            const keys1Int2 = parseInt(keys1[3]);
            const product = keys1Int1*keys1Int2;
            if (product < 100) {
                const digitsArray = product.toString().split('');
                const bothDigitsExistInKeys0 = digitsArray.every((digit) => keys0.includes(digit));
                if (bothDigitsExistInKeys0) {
                    newKeys1[5] = digitsArray[0];
                    newKeys1[6] = digitsArray[1];
                    setKeys1(newKeys1);
                    digitsArray.forEach((val) => {
                        let returnIndex = keys0.indexOf(val);
                        newKeys0[returnIndex] = "";
                    })
                    setKeys0(newKeys0);
                } else {
                    let newDigitsArray = [...digitsArray];
                    digitsArray.forEach((val) => {
                        if (!keys0.includes(val)) {
                            let returnIndex = digitsArray.indexOf(val);
                            newDigitsArray[returnIndex] = "";
                        };
                    })
                    newKeys1[5] = digitsArray[0];
                    newKeys1[6] = digitsArray[1];
                    setKeys1(newKeys1);
                    resetBadProduct();
                }
            } else {
                resetBadProduct();
            }
        } else if (!keys1.includes("") && keys2[0] !== "" && keys2[2] !== "" && keys2.includes("")) {
            const keys2Int1 = parseInt(keys2[0]);
            const keys2Int2 = parseInt(keys2[2]);
            const product = keys2Int1*keys2Int2;
            if (product > 9 && product < 100) {
                const digitsArray = product.toString().split('');
                const bothDigitsExistInKeys0 = digitsArray.every((digit) => keys0.includes(digit)) && new Set(digitsArray).size === digitsArray.length;
                if (bothDigitsExistInKeys0) {
                    newKeys2[4] = digitsArray[0];
                    newKeys2[5] = digitsArray[1];
                    setKeys2(newKeys2);
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
                    newKeys2[4] = digitsArray[0];
                    newKeys2[5] = digitsArray[1];
                    setKeys2(newKeys2);
                    resetBadProduct();
                }
            } else {
                resetBadProduct();
            }
        } else {

        }
    };

    useEffect(() => {
        findProduct()
    }, [keys1, keys2]);

    const addNumber = (key) => {
        let newKeys0 = [...keys0]
        let newKeys1 = [...keys1]
        let newKeys2 = [...keys2]
        let newPlayableArray = [keys1[0], keys1[1], keys1[3], keys2[0], keys2[2]];
        if (keys0.includes(key)) {
            const emptyIndex = newPlayableArray.findIndex((val) => val === "");
            const keyIndex = newKeys0.findIndex((val) => val === key);
            if (emptyIndex < 2) {
                newKeys1[emptyIndex] = key;
                setKeys1(newKeys1)
            } else if (emptyIndex === 2) {
                newKeys1[3] = key;
                setKeys1(newKeys1)
            } else if (emptyIndex > 2) {
                if (newKeys2[0] === "") {
                    newKeys2[0] = key;
                } else if (newKeys2[2] === "") {
                    newKeys2[2] = key;
                }
                setKeys2(newKeys2)
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

    useKeydownEffect(handleKeyboard, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardEContext.Provider
                value={{
                addNumber}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} keyLine={0} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                const isSymbol = index === 2 || index === 4;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} symbol={isSymbol ? true : undefined} keyLine={1} guessKey={!isSymbol} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                const isSymbol = index === 1 || index === 3;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} symbol={isSymbol ? true : undefined} keyLine={2} guessKey={!isSymbol}  />;})}
            </div>
            <div className='line3'>< Spacebar keyVal={symbolResponse} /></div>
            </KeyboardEContext.Provider>
        </div>
    )

}

export default KeyboardE