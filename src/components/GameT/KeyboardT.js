import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect, addLetterToArray, removeLetterFromArray } from '../../utils';
import Key from './KeyT';
import Spacebar from './SpacebarT';
import oneSyllableWords from './oneSyllableSWords.json'
import sWords from './sWords.json'

export const KeyboardTContext = createContext();

function KeyboardT() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", ""]);
    const [keys1, setKeys1] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [keys2, setKeys2] = useState(["", "S", "", "", "", "", "", "", ""]);
    const [keys3, setKeys3] = useState(["", "", "", "", "", "", ""]);

    const allKeys = [keys1, keys2, keys3]

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const fauxKeys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const fauxKeys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const fauxKeys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const starterKeys1 = ["", "", "", "", "", "", "", "", "", ""];
    const starterKeys2 = ["", "S", "", "", "", "", "", "", ""];
    const starterKeys3 = ["", "", "", "", "", "", ""];
    

    const [wordList, setWordList] = useState([])

    const [oneSyllableWordSet, setOneSyllableWordSet] = useState(new Set());
    const [sWordSet, setSWordSet] = useState(new Set());

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const generateOneSyllableWordSet = async () => {
        const oneSyllableWordSet = new Set(oneSyllableWords.words);
        return { oneSyllableWordSet };
    };

    const generateSWordSet = async () => {
        const sWordSet = new Set(sWords.words);
        return { sWordSet };
    };
      
    useEffect(() => {
        const fetchData = async () => {
          const { oneSyllableWordSet } = await generateOneSyllableWordSet();
          const { sWordSet } = await generateSWordSet();
          setOneSyllableWordSet(oneSyllableWordSet);
          setSWordSet(sWordSet);
        };
      
        fetchData();
    }, []);

    const gameOver = () => {
        let newKeysColor = [...keysColor];
        newKeysColor[1][4] = 1;
        setKeysColor(newKeysColor);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    }

    const setAvailableKeys = () => {
        if (keys0.some(key => key !== "")) {
            setKeys1(fauxKeys1)
            setKeys2(fauxKeys2)
            setKeys3(fauxKeys3)
        } else {
            setKeys1(starterKeys1)
            setKeys2(starterKeys2)
            setKeys3(starterKeys3)
        }
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
                setKeys1(starterKeys1);
                setKeys2(starterKeys2);
                setKeys3(starterKeys3);
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
            setKeys1(starterKeys1);
            setKeys2(starterKeys2);
            setKeys3(starterKeys3);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 500);
    }

    const notOneSyllable = () => {
        setSymbolResponse("times");
        disableKeyPressRef.current = true;
        if (keys0.length > 5) {
            setKeys1(["", "T", "O", "O", "", "M", "A", "N", "Y", ""]);
            setKeys2(["S", "Y", "L", "L", "A", "B", "L", "E", "S"]);
            setKeys3(starterKeys3);
        }
        setTimeout(() => {
            let length = keys0.length;
            let updatedKeys0 = keys0;
            for (let i = 0; i < length; i++) {
            updatedKeys0[i] = "";
            }
            setKeys0(updatedKeys0);
            setKeys1(starterKeys1);
            setKeys2(starterKeys2);
            setKeys3(starterKeys3);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1500);
    }

    const addLetter = addLetterToArray(keys0, setKeys0);

    const removeLetter = removeLetterFromArray(keys0, setKeys0);

    const checkWord = () => {
        if (keys0.includes("")) {
            setAvailableKeys();
            return;
        };
        const wordGuess = keys0.join('');
        if (sWordSet.has(wordGuess.toLowerCase())) {
            if (oneSyllableWordSet.has(wordGuess.toLowerCase())) {
                goodWord()
            } else {
                notOneSyllable()
            }
        } else {
            badWord()
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

    useKeydownEffect(handleKeyboard, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardTContext.Provider
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
            </KeyboardTContext.Provider>
        </div>
    )

}

export default KeyboardT