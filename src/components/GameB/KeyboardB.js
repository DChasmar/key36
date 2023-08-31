import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './KeyB';
import Spacebar from './SpacebarB';
import pangrams from './EightLetterPangrams.txt';
import combinations from './EightLetterSets.txt';
import StarBox from './StarBoxB';

export const KeyboardBContext = createContext();

function KeyboardB() {
    const { setGameChosen, keys3Color, setKeys3Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", "", "", "", "", "", "", ""]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const allKeys = [keys1, keys2, keys3];

    const [correctWords, setCorrectWords] = useState([]);

    const [pangramSet, setPangramSet] = useState(new Set());
    const [combinationsSet, setCombinationsSet] = useState(new Set());

    const [combinationLetters, setCombinationsLetters] = useState("");

    const [symbolResponse, setSymbolResponse] = useState("");
    const [starTally, setStarTally] = useState(0);

    const disableKeyPressRef = useRef(false);

    const generatePangramSet = async () => {
        const response = await fetch(pangrams);
        const result = await response.text();
        const wordArr = result.split("\n");
        const pangramSet = new Set(wordArr);
        return { pangramSet };
    }

    const generateCombinationsSet = async () => {
        const response = await fetch(combinations);
        const result = await response.text();
        const wordArr = result.split("\n");
        const randomCombination = wordArr[Math.floor(Math.random() * wordArr.length)];
        const combinationsSet = new Set(wordArr);
        return { combinationsSet, randomCombination };
    }

    const findPangramWord = (combinationLetters, pangramSet) => {
        const lowercaseCombination = combinationLetters.map(letter => letter.toLowerCase());
      
        // Array to store matching words
        const matchingWords = [];

        // Iterate through the pangramSet
        for (const word of pangramSet) {
            // Convert the current word to lowercase
            const lowercaseWord = word.toLowerCase();
        
            // Check if all letters from combinationLetters are present in the word
            const containsAllLetters = lowercaseCombination.every(letter => lowercaseWord.includes(letter));
        
            if (containsAllLetters) {
                matchingWords.push(word.toUpperCase());
            }
        }
      
        return matchingWords;
    }

    useEffect(() => {
        const fetchData = async () => {
            const { pangramSet } = await generatePangramSet();
            const { combinationsSet, randomCombination } = await generateCombinationsSet();
            setPangramSet(pangramSet);
            setCombinationsSet(combinationsSet);

            const uppercaseArray = Array.from(randomCombination.toUpperCase());
            setCombinationsLetters(uppercaseArray);
            
            if (uppercaseArray.length > 0) {
                setCorrectWords(findPangramWord(uppercaseArray, pangramSet));
            }
        };
      
        fetchData();
    }, []);

    const gameOver = () => {
        let newKeys3Color = [...keys3Color];
        newKeys3Color[4] = 1;
        setKeys3Color(newKeys3Color);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    };

    const newLetterCombination = () => {
        const wordArray = Array.from(combinationsSet);
        const newCombinationsSet = wordArray.filter(combo => combo !== combinationLetters);
        const newRandomCombination = newCombinationsSet[Math.floor(Math.random() * newCombinationsSet.length)];
        const newUppercaseArray = Array.from(newRandomCombination.toUpperCase());
        setCombinationsLetters(newUppercaseArray);
        setCorrectWords(findPangramWord(newUppercaseArray, pangramSet));
    }

    const goodWord = () => {
        setSymbolResponse("check");
        disableKeyPressRef.current = true;
        let newStarTally = starTally;
        newStarTally++
        setStarTally(newStarTally)
        setTimeout(() => {
            if (newStarTally < 5) {
                setKeys0(["", "", "", "", "", "", "", ""]);
                newLetterCombination();
            } else {
                gameOver()
            }
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 2000);
    };

    const badWord = () => {
        setSymbolResponse("times");
        disableKeyPressRef.current = true;
        setTimeout(() => {
            setKeys0(["", "", "", "", "", "", "", ""]);
            newLetterCombination();
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 2000);
    };

    const checkWord = () => {
        if (keys0.includes("")) return;
        const wordGuess = keys0.join('');
        if (pangramSet.has(wordGuess.toLowerCase())) {
            goodWord();
        } else {
            badWord();
        }
    };

    const addLetter = (key) => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex >= 0) {
            updatedKeys[emptyIndex] = key.toUpperCase();        
        }
        setKeys0(updatedKeys);
    };

    const removeLetter = () => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex > 0 && emptyIndex < 8) {
            updatedKeys[emptyIndex - 1] = '';
        }
        setKeys0(updatedKeys);
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
                if (!combinationLetters.includes(event.key.toUpperCase())) {
                    return;
                }
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
            <KeyboardBContext.Provider
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
                return <Key keyVal={key} key={uniqueKey} keyLine={1} yellow={combinationLetters.includes(key)} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={2} yellow={combinationLetters.includes(key)} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} yellow={combinationLetters.includes(key)} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            <div>
            {symbolResponse ? (
                <div className='word_box'>
                {correctWords.map((word, index) => (
                    <p key={index} className="word_box_word">{word}</p>
                ))}
                </div>
            ) : (
                <div className='line5'>
                <StarBox tally={starTally} />
                </div>
            )}
            </div>
            </KeyboardBContext.Provider>
        </div>
    )
}

export default KeyboardB