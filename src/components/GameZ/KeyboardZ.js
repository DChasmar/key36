import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './KeyZ';
import Spacebar from './SpacebarZ';
import words from './CuriousWords.txt'

export const KeyboardZContext = createContext();

function KeyboardZ() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState([""]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [total, setTotal] = useState(0);

    const [totals, setTotals] = useState([
        "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"
    ]);

    const textColors = {
        1: "#7dd7ff",
        2: "#23a7fa",
        3: "#999",
        4: "#555"
    }

    const [wordSet, setWordSet] = useState(new Set());

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const generateWordSet = async () => {
        const response = await fetch(words);
        const result = await response.text();
        const wordArr = result.split("\n");
        const wordSet = new Set(wordArr);
        return { wordSet };
    }
      
    useEffect(() => {
        const fetchData = async () => {
          const { wordSet } = await generateWordSet();
          setWordSet(wordSet);
        };
      
        fetchData();
    }, []);

    const gameOver = () => {
        let newKeysColor = [...keysColor];
        newKeysColor[3][0] = 1;
        setKeysColor(newKeysColor);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    };

    const containsNumberBetween31And50 = (value) => {
        const numValue = parseInt(value, 10);
        return numValue >= 31 && numValue <= 50 && !isNaN(numValue);
    };

    const goodWord = (wordGuess, total) => {
        setSymbolResponse("check");
        disableKeyPressRef.current = true;
        let newTotals = [...totals];
        let totalIndex = total - 31;
        newTotals[totalIndex] = wordGuess;
        setTotals(newTotals);
        setTimeout(() => {
            if (newTotals.some(containsNumberBetween31And50)){   
                setKeys0([""]);
            } else {
                gameOver()
            }
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
    };

    const badWord = () => {
        setSymbolResponse("times");
        disableKeyPressRef.current = true;
        setTimeout(() => {
            setKeys0([""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
    };

    const checkWord = () => {
        const wordGuess = keys0.join('');
        let newWordTotal = 0;
        for (let i = 0; i < keys0.length; i++) {
            const letter = keys0[i];
            // Calculate the value of the uppercase letter
            const letterValue = letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            newWordTotal += letterValue;
        }
        setTotal(newWordTotal);
        // Now newWordTotal contains the total value of the uppercase letters in keys0.join('')
        if (newWordTotal > 50 || keys0.length > 12) {
            badWord();
        } 
        if (wordSet.has(wordGuess.toLowerCase()) && !totals.includes(wordGuess.toLowerCase())) {
            goodWord(wordGuess.toLowerCase(), newWordTotal);
        }
    };

    const addLetter = (key) => {
        let updatedKeys = [...keys0];
        if (updatedKeys.length === 1 && updatedKeys[0] === "") {
            updatedKeys[0] = key;
        } else {
            updatedKeys.push(key);
        }
        setKeys0(updatedKeys);
    };

    const removeLetter = () => {
        if (keys0.includes("")) return;
        let updatedKeys = [...keys0];
        if (updatedKeys.length > 1) {
            updatedKeys.splice(updatedKeys.length - 1, 1);
            setKeys0(updatedKeys);
        } else {
            setKeys0([""]);
        }
        
    };

    useEffect(() => {
        checkWord();
    }, [keys0]);

    const handleKeyboard = useCallback((event) => {

        if (disableKeyPressRef.current) {
            event.preventDefault();
            return;
        } else if (event.key === "Backspace") {
            removeLetter()
        } else if (event.key === " ") {
            setGameChosen({gameChosen: false, gameNumber: ''});
        } else {
            fauxKeys0.forEach((key) => {
                if (event.key.toUpperCase() === key.toUpperCase()) {
                    removeLetter()
                }            
            });
            for (const keys of allKeys) {
              for (const key of keys) {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                  addLetter(key);
                  break;
                }
              }
            }
          }
      }, [fauxKeys0, allKeys]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardZContext.Provider
                value={{
                addLetter,
                removeLetter,
                total
                }}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={0} guessKey />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={2} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            <div>
                <h2>
                    {totals.slice(0, 10).map((value, index) => (
                        <span key={index} style={{ color: !containsNumberBetween31And50(value)
                            ? index % 2 === 0
                                ? textColors[1]
                                : textColors[2]
                            : index % 2 === 0
                                ? textColors[3]
                                : textColors[4]
                        }}> 
                            {value + ' '}
                        </span>
                    ))}
                </h2>
            </div>
            <div>
                <h2>
                    {totals.slice(10, 20).map((value, index) => (
                        <span key={index + 10} style={{ color: !containsNumberBetween31And50(value)
                            ? index % 2 === 0
                                ? textColors[2]
                                : textColors[1]
                            : index % 2 === 0
                                ? textColors[4]
                                : textColors[3]
                        }}> 
                            {value + ' '}
                        </span>
                    ))}
                </h2>
            </div>
            </KeyboardZContext.Provider>
        </div>
    )
}

export default KeyboardZ