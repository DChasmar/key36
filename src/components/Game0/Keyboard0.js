import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './Key0';
import Spacebar from './Spacebar0';
import words from './NoRepeats.txt'

export const Keyboard0Context = createContext();

function Keyboard0() {
    const { setGameChosen, keys0Color, setKeys0Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState([""]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const fauxKeys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const fauxKeys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const fauxKeys3 = ["Z", "X", "C", "V", "B", "N", "M"];
    const allKeys = [keys1, keys2, keys3]

    const [wordList, setWordList] = useState([])

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
        let newKeys0Color = keys0Color;
        newKeys0Color[9] = 1;
        setKeys0Color(newKeys0Color);
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
                setKeys1(fauxKeys1);
                setKeys2(fauxKeys2);
                setKeys3(fauxKeys3);
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
            setKeys1(fauxKeys1);
            setKeys2(fauxKeys2);
            setKeys3(fauxKeys3);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 500);
    }
    
    const addLetter = (key) => {
        let updatedKeys0 = [...keys0];
        let updatedKeys1 = [...keys1];
        let updatedKeys2 = [...keys2];
        let updatedKeys3 = [...keys3];
        const emptyIndex = updatedKeys0.findIndex((val) => val === '');
        if (emptyIndex >= 0) {
            updatedKeys0[emptyIndex] = key.toUpperCase();        
        }
        setKeys0(updatedKeys0);
        if (updatedKeys1.includes(key)) {
            const removeIndex = updatedKeys1.indexOf(key);
            updatedKeys1[removeIndex] = "";
            setKeys1(updatedKeys1)
        } else if (updatedKeys2.includes(key)) {
            const removeIndex = updatedKeys2.indexOf(key);
            updatedKeys2[removeIndex] = "";
            setKeys2(updatedKeys2)
        } else if (updatedKeys3.includes(key)) {
            const removeIndex = updatedKeys3.indexOf(key);
            updatedKeys3[removeIndex] = "";
            setKeys3(updatedKeys3)
        }
    }

    const removeLetter = () => {
        let updatedKeys0 = [...keys0];
        let updatedKeys1 = [...keys1];
        let updatedKeys2 = [...keys2];
        let updatedKeys3 = [...keys3];
        const emptyIndex = updatedKeys0.findIndex((val) => val === '');
        const key = updatedKeys0[emptyIndex - 1];
        if (emptyIndex > 0 && emptyIndex < 10) {
            updatedKeys0[emptyIndex - 1] = '';
        } else if (emptyIndex === -1) {
            
        }
        setKeys0(updatedKeys0);
        if (fauxKeys1.includes(key)) {
            const returnIndex = fauxKeys1.indexOf(key);
            updatedKeys1[returnIndex] = key;
            setKeys1(updatedKeys1)
        } else if (fauxKeys2.includes(key)) {
            const returnIndex = fauxKeys2.indexOf(key);
            updatedKeys2[returnIndex] = key;
            setKeys2(updatedKeys2)
        } else if (fauxKeys3.includes(key)) {
            const returnIndex = fauxKeys3.indexOf(key);
            updatedKeys3[returnIndex] = key;
            setKeys3(updatedKeys3)
        }
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        if (keys0.length === 1) {
            if (keys0[0] === "A" || keys0[0] === "I") {
                goodWord()
            } else {
                badWord()
            }
        } else {
            const wordGuess = keys0.join('');
            if (wordSet.has(wordGuess.toLowerCase())) {
                goodWord()
            } else {
                badWord()
            }
        }
    };

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

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <Keyboard0Context.Provider
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
                return <Key keyVal={key} key={uniqueKey} keyLine={1} blankKey={key===""} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={2} blankKey={key===""} />;
            })}</div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} blankKey={key===""} />;
            })}</div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            <div className='word_box'>
                {wordList.map((word, index) => (
                    <p key={index} className="word_box_word" >{word}</p>
            ))}</div>
            </Keyboard0Context.Provider>
        </div>
    )

}

export default Keyboard0