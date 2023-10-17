import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect, addLetterToArray, removeLetterFromArray } from '../../utils';
import Key from './KeyV';
import Spacebar from './SpacebarV';
import words from './ScrabbleWords12.json'

export const KeyboardVContext = createContext();

function KeyboardV() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", "", ""]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [wordTotal, setWordTotal] = useState(12)

    const scrabbleLetterValues = {
        'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8,
        'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1,
        'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
    };

    const letterColors = {
        1: '#000',
        2: '#222',
        3: '#444',
        4: '#666',
        5: '#888',
        8: '#aaa',
        10: '#ccc',
    }

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
        newKeysColor[3][3] = 1;
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
            if (keys0.length < 12){
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
            setWordTotal(12);
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
            setWordTotal(12);
            disableKeyPressRef.current = false;
        }, 1000);
    };

    const checkTotal = () => {
        let newWordTotal = 0;
        for (let i = 0; i < keys0.length; i++) {
            const letter = keys0[i];
            newWordTotal += scrabbleLetterValues[letter] || 0;
        }
        setWordTotal(12 - newWordTotal);
    }

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
        checkTotal();
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

    useKeydownEffect(handleKeyboard, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardVContext.Provider
                value={{
                addLetter,
                removeLetter,
                disableKeyPressRef
                }}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} pointVal={scrabbleLetterValues[key]} key={uniqueKey} keyLine={0} guessKey />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} pointVal={scrabbleLetterValues[key]} key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} pointVal={scrabbleLetterValues[key]} key={uniqueKey} keyLine={2} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} pointVal={scrabbleLetterValues[key]} key={uniqueKey} keyLine={3} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse || `${wordTotal}`} /></div>
            <div className='word_box'>
                {wordList.map((word, index) => (
                    <p key={index} className="word_box_word">
                        {word.split('').map((letter, letterIndex) => (
                            <span
                                key={letterIndex}
                                style={{ color: letterColors[scrabbleLetterValues[letter.toUpperCase()]] }}
                            >
                                {letter}
                            </span>
                        ))}
                    </p>
                ))}
            </div>
            </KeyboardVContext.Provider>
        </div>
    )
}

export default KeyboardV