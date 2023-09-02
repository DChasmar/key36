import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect, addLetterToArray } from '../../utils';
import Key from './KeyI';
import Spacebar from './SpacebarI';
import words from './CHwords.json'

export const KeyboardIContext = createContext();

function KeyboardI() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["c", "h", "", ""]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [wordList, setWordList] = useState([])

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const [cHWordSet, setCHWordSet] = useState(new Set());
  
    const generateCHWordSet = async () => {
        const cHWordSet = new Set(words.words);
        return { cHWordSet };
    };
      
    useEffect(() => {
        const fetchData = async () => {
          const cHWords = await generateCHWordSet();
      
          setCHWordSet(cHWords.cHWordSet);
        };
      
        fetchData();
    }, []);

    const gameOver = () => {
        let newKeysColor = [...keysColor];
        newKeysColor[1][7] = 1;
        setKeysColor(newKeysColor);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    }

    const goodWord = () => {
        setSymbolResponse("check");
        disableKeyPressRef.current = true;
        
        setWordList((prevWordList) => {
            const newWordList = [...prevWordList];
            newWordList.push(keys0.join('').toUpperCase());
            return newWordList;
        });

        setTimeout(() => {
            if (keys0.length === 10 && keys0.indexOf("h") === 9){
                gameOver();
            }
            let newKeys0 = [...keys0]
            let length = keys0.length;
            const hIndex = newKeys0.indexOf("h");
            for (let i = 0; i < length; i++) {
                newKeys0[i] = "";
            }
            if (keys0.indexOf("h") === length - 1) {
                newKeys0[0] = "c";
                newKeys0[1] = "h";
                newKeys0.push("");
            } else {
                newKeys0[hIndex] = "c";
                newKeys0[hIndex + 1] = "h";
            }
            setKeys0(newKeys0);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
    }

    const badWord = () => {
        setSymbolResponse("times");
        disableKeyPressRef.current = true;
        setTimeout(() => {
            keys0.forEach((value, index) => {
                if (/^[A-Z]$/.test(value)) {
                  keys0[index] = "";
                }
              });
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
    }

    const addLetter = addLetterToArray(keys0, setKeys0);

    const removeLetter = () => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex > 0) {
            if (/^[A-Z]$/.test(updatedKeys[emptyIndex - 1])) {
                updatedKeys[emptyIndex - 1] = "";
            } else if (updatedKeys[emptyIndex - 1] === "h"){
                if (updatedKeys.indexOf("h") === 1) {
                    return;
                } else {
                    updatedKeys[emptyIndex - 3] = "";
                };
            }
        } else if (emptyIndex === -1) {
            
        }
        setKeys0(updatedKeys);
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        if (cHWordSet.has(keys0.join('').toLowerCase())) {
            goodWord()
        } else {
            badWord()
        }
    }

    useEffect(() => {
        checkWord()
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

    useKeydownEffect(handleKeyboard, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardIContext.Provider
                value={{
                addLetter,
                removeLetter
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
                return <Key keyVal={key} key={uniqueKey} keyLine={2} />;
            })}</div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} />;
            })}</div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            <div className="word_box">
                {wordList.map((word, index) => (
                <p key={index} className="word_box_word">{word}</p>
            ))}</div>
            </KeyboardIContext.Provider>
        </div>
    )

}

export default KeyboardI