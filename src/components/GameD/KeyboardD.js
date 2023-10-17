import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect, addLetterToArray } from '../../utils';
import Key from './KeyD';
import Spacebar from './SpacebarD';
import words from './ddWords.json'

export const KeyboardDContext = createContext();

function KeyboardD() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["d", "", "d"]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [wordList, setWordList] = useState([])

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const [ddWordSet, setDDWordSet] = useState(new Set());
  
    const generateDDWordSet = async () => {
        const ddWordSet = new Set(words.words);
        return { ddWordSet };
    };
      
    useEffect(() => {
        const fetchData = async () => {
          const ddWords = await generateDDWordSet();
      
          setDDWordSet(ddWords.ddWordSet);
        };
      
        fetchData();
    }, []);

    const gameOver = () => {
        let newKeysColor = [...keysColor];
        newKeysColor[2][2] = 1;
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
            if (keys0.length === 12){
                gameOver();
            }
            let newKeys0 = [...keys0]
            let length = keys0.length;
            for (let i = 0; i < length + 1; i++) {
                newKeys0[i] = "";
            }
            newKeys0[0] = "d";
            newKeys0[newKeys0.length - 1] = "d";
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
            }
        }
        setKeys0(updatedKeys);
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        if (ddWordSet.has(keys0.join('').toLowerCase())) {
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
            <KeyboardDContext.Provider
                value={{
                addLetter,
                removeLetter,
                disableKeyPressRef
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
            </KeyboardDContext.Provider>
        </div>
    )

}

export default KeyboardD