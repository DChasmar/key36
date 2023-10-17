import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect, addLetterToArray, removeLetterFromArray } from '../../utils';
import Key from './KeyC';
import Spacebar from './SpacebarC';
import words from './iWords.json'

export const KeyboardCContext = createContext();

function KeyboardC() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState([""]);
    const keys1 = ["Q", "W", "", "R", "T", "", "", "I", "", "P"];
    const [keys2, setKeys2] = useState(["", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [wordList, setWordList] = useState([]);

    const [wordSet, setWordSet] = useState(new Set());

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const generateWordSet = async () => {
        const wordSet = new Set(words.words);
        return { wordSet };
    };
      
    useEffect(() => {
        const fetchData = async () => {
          const { wordSet } = await generateWordSet();
          setWordSet(wordSet);
        };
      
        fetchData();
    }, []);

    const gameOver = () => {
        let newKeysColor = [...keysColor];
        newKeysColor[3][2] = 1;
        setKeysColor(newKeysColor);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    };

    const goodWord = () => {
        setSymbolResponse("check");
        disableKeyPressRef.current = true;
        let newWordList = [...wordList];
        newWordList.push(keys0.join(''));
        setWordList(newWordList);
        setTimeout(() => {
            if (keys0.length < 11){
                let length = keys0.length;
                let updatedKeys0 = keys0
                for (let i = 0; i < length; i++) {
                updatedKeys0[i] = "";
            }
            updatedKeys0.push("");
            setKeys0(updatedKeys0);
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
            let length = keys0.length;
            let updatedKeys0 = keys0
            for (let i = 0; i < length; i++) {
            updatedKeys0[i] = "";
            }
            setKeys0(updatedKeys0);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
    };


    const checkWord = () => {
        if (keys0.includes("")) return;
        const wordGuess = keys0.join('');
        if (wordSet.has(wordGuess.toLowerCase())) {
            goodWord();
        } else {
            badWord();
        }
    };

    const addLetter = addLetterToArray(keys0, setKeys0);

    const removeLetter = removeLetterFromArray(keys0, setKeys0);

    useEffect(() => {
        if (keys0.findIndex((val) => val === '') === keys0.length - 1 && wordList.includes(keys0.slice(0, keys0.length - 1).join('')) && keys0.length > 3) {
            setKeys2(["", "", "D", "F", "G", "H", "J", "K", "L"])
        } else {
            setKeys2(["", "S", "D", "F", "G", "H", "J", "K", "L"])
        }
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
            <KeyboardCContext.Provider
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
                return <Key keyVal={key} key={uniqueKey} keyLine={1} blankKey={key===""} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={2} blankKey={key===""} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            <div className='word_box'>
                {wordList.map((word, index) => (
                    <p key={index} className="word_box_word" >{word}</p>
            ))}</div>
            </KeyboardCContext.Provider>
        </div>
    )
}

export default KeyboardC