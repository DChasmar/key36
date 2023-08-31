import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { addLetterToArray, removeLetterFromArray } from '../../utils';
import Key from './Key1';
import Spacebar from './Spacebar1';
import words from './qwertyuiop_words.txt'

export const Keyboard1Context = createContext();

function Keyboard1() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState([""]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    const [symbolResponse, setSymbolResponse] = useState("");

    const [wordList, setWordList] = useState([])
    const [wordSet, setWordSet] = useState(new Set());

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
        newKeysColor[0][0] = 1;
        setKeysColor(newKeysColor);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    }

    const goodWord = () => {
        setSymbolResponse("check");
        disableKeyPressRef.current = true;
        let newWordList = [...wordList];
        newWordList.push(keys0.join(''));
        setWordList(newWordList);
        setTimeout(() => {
            if (keys0.length < 10){
                let length = keys0.length;
                let updatedKeys0 = keys0;
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
        }, 500);
    }

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
        }, 500);
    };

    const checkWord = () => {
        if (keys0.includes("")) return;
        const wordGuess = keys0.join('');
        if (wordSet.has(wordGuess.toLowerCase())) {
            goodWord()
        } else {
            badWord()
        }
    };

    const addLetter = addLetterToArray(keys0, setKeys0);

    const removeLetter = removeLetterFromArray(keys0, setKeys0);

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
            }, [keys0, keys1]);
            keys1.forEach((key) => {
                if (event.key.toUpperCase() === key.toUpperCase()) {
                    addLetter(key)
                }            
            }, [keys0, keys1]);
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
            <Keyboard1Context.Provider
                value={{
                addLetter,
                removeLetter,
                checkWord}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`; // Generate a unique key
                return <Key keyVal={key} key={uniqueKey} keyLine={0} guessLine />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>< Spacebar keyVal={symbolResponse} /></div>
            <div className='word_box'>
                {wordList.map((word, index) => (
                    <p key={index} className="word_box_word" >{word}</p>
            ))}</div>
            </Keyboard1Context.Provider>
        </div>
    )

}

export default Keyboard1