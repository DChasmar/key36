import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './Key8';
import Spacebar from './Spacebar8';

export const Keyboard8Context = createContext();

function Keyboard8() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    const [keys1, setKeys1] = useState(["", ""]);
    const [keys2, setKeys2] = useState(["x", ""]);
    const [keys3, setKeys3] = useState(["", ""]);
    const [keys4, setKeys4] = useState(["+", "", "", " "]);
    const [keys5, setKeys5] = useState(["", ""]);

    const [symbolResponse, setSymbolResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        setSymbolResponse("check");
        setTimeout(() => {
            let newKeysColor = [...keysColor];
            newKeysColor[0][7] = 1;
            setKeysColor(newKeysColor);
            setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000);
    }

    const resetBadProduct = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("times");
        setTimeout(() => {
            setKeys0(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
            setKeys1(["", ""]);
            setKeys2(["x", ""]);
            setKeys3(["", ""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 500);
    }

    const resetBadSum = () => {
        disableKeyPressRef.current = true;
        setSymbolResponse("times");
        setTimeout(() => {
            setKeys4(["x","", "", " "]);
            setKeys5(["", ""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 500);
}

    const findProduct = () => {
        if (keys1.includes("") || keys2.includes("")) {
            return;
        } else {
            const keys1Int = parseInt(keys1.join(""));
            const keys2Int = parseInt(keys2[1]);
            const product = keys1Int*keys2Int;
            if (product > 9 && product < 100) {
                const digitsArray = product.toString().split('');
                const bothDigitsExistInKeys0 = digitsArray.every((digit) => keys0.includes(digit));
                if (bothDigitsExistInKeys0) {
                    setKeys3(digitsArray);
                    let newKeys0 = [...keys0];
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
                    setKeys3(newDigitsArray);
                    resetBadProduct()
                }
            } else {
                resetBadProduct()
            }
        }
    }

    const findSum = () => {
        if (keys3.includes("") || keys4[1] === "" || keys4[2] === "") {
            return;
        } else {
            const keys3Int = parseInt(keys3.join(""));
            const keys4Int = parseInt(keys4[1] + keys4[2]);
            const sum = keys3Int+keys4Int;
            if (sum < 100) {
                const digitsArray = sum.toString().split('');
                const bothDigitsExistInKeys0 = digitsArray.every((digit) => keys0.includes(digit));
                if (bothDigitsExistInKeys0) {
                    setKeys5(digitsArray);
                    let newKeys0 = [...keys0];
                    digitsArray.forEach((val) => {
                        let returnIndex = keys0.indexOf(val);
                        newKeys0[returnIndex] = "";
                    })
                    setKeys0(newKeys0);
                    gameOver()
                } else {
                    let newDigitsArray = [...digitsArray];
                    digitsArray.forEach((val) => {
                        if (!keys0.includes(val)) {
                            let returnIndex = digitsArray.indexOf(val);
                            newDigitsArray[returnIndex] = "";
                        };
                    })
                    setKeys5(newDigitsArray);
                    resetBadSum()
                    resetBadProduct()
                }
            } else {
                resetBadSum()
                resetBadProduct()
            }
        }
    } 

    useEffect(() => {
        findProduct()
    }, [keys2]);

    useEffect(() => {
        findSum()
    }, [keys4]);

    const addNumber = (key) => {
        let newKeys0 = [...keys0]
        let newKeys1 = [...keys1]
        let newKeys2 = [...keys2]
        let newKeys4 = [...keys4]
        let newPlayableArray = [...keys1, keys2[1], keys4[1], keys4[2]];
        if (keys0.includes(key)) {
            const emptyIndex = newPlayableArray.findIndex((val) => val === "");
            const keyIndex = newKeys0.findIndex((val) => val === key);
            if (emptyIndex < 2) {
                if (newKeys1[0] === "") {
                    newKeys1[0] = key;
                } else if (newKeys1[1] === "") {
                    newKeys1[1] = key;
                }
                setKeys1(newKeys1)
            } else if (emptyIndex === 2) {
                newKeys2[1] = key;
                setKeys2(newKeys2)
            } else if (emptyIndex > 2) {
                if (newKeys4[1] === "") {
                    newKeys4[1] = key;
                } else if (newKeys4[2] === "") {
                    newKeys4[2] = key;
                }
                setKeys4(newKeys4)
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
            <Keyboard8Context.Provider
                value={{
                addNumber}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} guessKey />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                const isSymbol = index === 0;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} symbol={isSymbol ? true : undefined} guessKey={index===1} />;})}
            </div>
            <hr width='200px' size='3' color='#444444' />
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} guessKey />;
                })}
            </div>
            <div className='line4'>
                {keys4.map((key, index) => {
                const uniqueKey = `4-${index}`;
                const isSymbol = index === 0 || index === 3;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} symbol={isSymbol ? true : undefined} guessKey={index===1 || index===2} />;})}
            </div>
            <hr width='200px' size='3' color='#444444' />
            <div className='line5'>{keys5.map((key, index) => {
                const uniqueKey = `5-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} guessKey />;
                })}
            </div>
            <div className='line6'>< Spacebar keyVal={symbolResponse} /></div>
            </Keyboard8Context.Provider>
        </div>
    )

}

export default Keyboard8