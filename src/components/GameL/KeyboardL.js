import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect, updateDordleColors } from '../../utils';
import Key from './KeyL';
import Spacebar from './SpacebarL';
import compoundWordBank from './CompoundWordList.json';
import fourLetterWordBank from '../FourLetterWords.json';
import fiveLetterWordBank from '../FiveLetterWords.json';
import nineLetterWordBank from '../NineLetterWords.json';
import DordleGuesses from './DordleGuessesL';

export const KeyboardLContext = createContext();

function KeyboardL() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", "", "", ""]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
    const allKeys = [keys1, keys2, keys3];

    const [keys0DordleColors, setKeys0DordleColors] = useState([-1, -1, -1, -1]);
    const [keys1DordleColors, setKeys1DordleColors] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const [keys2DordleColors, setKeys2DordleColors] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const [keys3DordleColors, setKeys3DordleColors] = useState([-1, -1, -1, -1, -1, -1, -1]);

    const [greenKeys, setGreenKeys] = useState([]);
    const [yellowKeys, setYellowKeys] = useState([]);
    const [greyKeys, setGreyKeys] = useState([]);

    const[storedColorKeys, setStoredColorKeys] = useState([]);
    const[finalColorKeys, setFinalColorKeys] = useState([]);

    const [guesses, setGuesses] = useState([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""]
    ]);
    
    const [guessColors, setGuessColors] = useState([
        [-1, -1, -1, -1], 
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1, -1], 
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]);

    const [turnCounter, setTurnCounter] = useState(0);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    const [compoundWordSet, setCompoundWordSet] = useState(new Set());
    const [fourLetterWordSet, setFourLetterWordSet] = useState(new Set());
    const [fiveLetterWordSet, setFiveLetterWordSet] = useState(new Set());
    const [nineLetterWordSet, setNineLetterWordSet] = useState(new Set());
    const [correctWord, setCorrectWord] = useState("");
    const [wordReveal, setWordReveal] = useState("");

    const [symbolResponse, setSymbolResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const generateCompoundWordSet = async () => {
        const compoundWordSet = new Set(compoundWordBank.words);
        const randomCompoundWord = [...compoundWordSet][Math.floor(Math.random() * compoundWordSet.size)];
        return { compoundWordSet, randomCompoundWord };
    };
      
    const generateFourLetterWordSet = async () => {
        const fourLetterWordSet = new Set(fourLetterWordBank.words);
        return { fourLetterWordSet };
    };

    const generateFiveLetterWordSet = async () => {
        const fiveLetterWordSet = new Set(fiveLetterWordBank.words);
        return { fiveLetterWordSet };
    };
      
    const generateNineLetterWordSet = async () => {
        const nineLetterWordSet = new Set(nineLetterWordBank.words);
        return { nineLetterWordSet };
    };
      
    useEffect(() => {
        const fetchData = async () => {
          const compoundWords = await generateCompoundWordSet();
          const fourLetterWords = await generateFourLetterWordSet();
          const fiveLetterWords = await generateFiveLetterWordSet();
          const nineLetterWords = await generateNineLetterWordSet();
      
          setCompoundWordSet(compoundWords.compoundWordSet);
          setCorrectWord(compoundWords.randomCompoundWord);
          setFourLetterWordSet(fourLetterWords.fourLetterWordSet);
          setFiveLetterWordSet(fiveLetterWords.fiveLetterWordSet);
          setNineLetterWordSet(nineLetterWords.nineLetterWordSet);
        };
      
        fetchData();
    }, []);

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
        if (emptyIndex > 0) {
            updatedKeys[emptyIndex - 1] = '';
        }
        setKeys0(updatedKeys);
    };

    const findKeyboardColors = (colorKeys, value) => {
        updateDordleColors(colorKeys, value, keys1, setKeys1DordleColors);
        updateDordleColors(colorKeys, value, keys2, setKeys2DordleColors);
        updateDordleColors(colorKeys, value, keys3, setKeys3DordleColors);
    };

    useEffect(() => {
        findKeyboardColors(greyKeys, 0)
        findKeyboardColors(yellowKeys, 1)
        findKeyboardColors(greenKeys, 2)
    }, [greenKeys, yellowKeys, greyKeys]);

    useEffect(() => {
        if (finalColorKeys.green && finalColorKeys.yellow && finalColorKeys.grey) {
            setKeys1DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
            setKeys2DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
            setKeys3DordleColors([-1, -1, -1, -1, -1, -1, -1]);
            setGreenKeys(finalColorKeys.green);
            setYellowKeys(finalColorKeys.yellow);
            setGreyKeys(finalColorKeys.grey);
        }
    }, [finalColorKeys.green, finalColorKeys.yellow, finalColorKeys.grey]);

    const findFinalColorKeys = (green, yellow, grey) => {
        const uniqueGreenKeys = new Set([...green, ...storedColorKeys.green]);
        const uniqueYellowKeys = new Set([...yellow, ...storedColorKeys.yellow]);
        const uniqueGreyKeys = new Set(grey.filter(key => storedColorKeys.grey.includes(key)));

        const finalGreenKeys = Array.from(uniqueGreenKeys);
        const finalYellowKeys = Array.from(uniqueYellowKeys).filter(key => !uniqueGreenKeys.has(key));
        const finalGreyKeys = Array.from(uniqueGreyKeys).filter(key => !uniqueGreenKeys.has(key) && !uniqueYellowKeys.has(key));

        setFinalColorKeys({
            green: finalGreenKeys,
            yellow: finalYellowKeys,
            grey: finalGreyKeys,
        });
    }

    const registerAndReset = (updatedGuessColors) => {
        if (turnCounter < 6) {
            // Reveal keys for word guess
            setKeys0DordleColors(updatedGuessColors);
            // Record guess colors in bottom table
            setGuessColors((prevGuessColors) => {
                const newGuessColors = [...prevGuessColors];
                newGuessColors[turnCounter] = updatedGuessColors;
                return newGuessColors;
            });
            // Record guess letters in bottom table
            setGuesses((prevGuesses) => {
                const newGuesses = [...prevGuesses];
                newGuesses[turnCounter] = [...keys0];
                return newGuesses;
            });
            // Reset guess keys to blank and white
            setTimeout(() => {
                if (turnCounter < 2) {
                    setKeys0DordleColors([-1, -1, -1, -1]);
                    setKeys0(["", "", "", ""]);
                } else if (turnCounter > 1 && turnCounter < 5) {
                    setKeys0DordleColors([-1, -1, -1, -1, -1]);
                    setKeys0(["", "", "", "", ""]);
                    if (turnCounter === 2) {
                        setGreenKeys([]);
                        setYellowKeys([]);
                        setGreyKeys([]);
                        setKeys1DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
                        setKeys2DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
                        setKeys3DordleColors([-1, -1, -1, -1, -1, -1, -1]);
                    }
                } else {
                    setKeys0DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
                    setKeys0(["", "", "", "", "", "", "", "", ""]);
                }
                setTurnCounter((prevTurnCounter) => prevTurnCounter + 1);
                disableKeyPressRef.current = false;
            }, 1000);
        // Logic for final guess
        } else if (turnCounter === 6) {
            setKeys0DordleColors(updatedGuessColors);
            const hasNonGreenColors = updatedGuessColors.some(color => color !== 2);
            // Incorrect, so reset with new word
            if (hasNonGreenColors) {
                setSymbolResponse("times");
                setWordReveal(correctWord);
                setTimeout(() => {
                    const compoundWordArray = Array.from(compoundWordSet);
                    const newCompoundWordSet = compoundWordArray.filter(word => word !== correctWord);
                    const randomCompoundWord = newCompoundWordSet[Math.floor(Math.random() * newCompoundWordSet.length)];
                    setCorrectWord(randomCompoundWord);
                    setKeys0DordleColors([-1, -1, -1, -1]);
                    setGuesses([
                        ["", "", "", ""],
                        ["", "", "", ""],
                        ["", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", ""]
                    ]);           
                    setGuessColors([
                        [-1, -1, -1, -1], 
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1, -1], 
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1, -1, -1, -1, -1]
                    ]);
                    setKeys0DordleColors([-1, -1, -1, -1]);
                    setKeys1DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
                    setKeys2DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
                    setKeys3DordleColors([-1, -1, -1, -1, -1, -1, -1]);
                    setGreenKeys([]);
                    setYellowKeys([]);
                    setGreyKeys([]);
                    setKeys0(["", "", "", ""]);
                    setTurnCounter(0);
                    setSymbolResponse("");
                    setWordReveal("");
                    setStoredColorKeys([]);
                    disableKeyPressRef.current = false;
                }, 2000);
                // Correct, so level complete, return home
                } else {
                setSymbolResponse("check");
                setTimeout(() => {
                    let newKeysColor = [...keysColor];
                    newKeysColor[2][8] = 1;
                    setKeysColor(newKeysColor);
                    setGameChosen({ gameChosen: false, gameNumber: '' });
                    setSymbolResponse("");
                    disableKeyPressRef.current = false;
                }, 2000); 
            }
        }
    }

    const findGrey = (wordGuess, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys) => {
        if (turnCounter < 6) {
            let newGreyKeys = [...greyKeys]
            for (let i = 0; i < wordGuess.length; i++) {
                if (wordGuess[i] !== "_") {
                    newGreyKeys.push(wordGuess[i])
                    updatedGuessColors[i] = 0;
                }
            }
            let uniqueGreyKeys = [...new Set(newGreyKeys)];
            // Remove values from uniqueGreyKeys if they are also present in greenKeys or yellowKeys
            uniqueGreyKeys = uniqueGreyKeys.filter(key => !uniqueGreenKeys.includes(key) && !uniqueYellowKeys.includes(key));
            setGreyKeys(uniqueGreyKeys)
            if (turnCounter === 2) {
                setStoredColorKeys({
                    green: uniqueGreenKeys,
                    yellow: uniqueYellowKeys,
                    grey: uniqueGreyKeys,
                });
            }
            if (turnCounter === 5) {
                findFinalColorKeys(uniqueGreenKeys, uniqueYellowKeys, uniqueGreyKeys);
            }
            registerAndReset(updatedGuessColors) 
        } else if (turnCounter === 6) {
            let newGreyKeys = [...greyKeys]
            for (let i = 0; i < wordGuess.length; i++) {
            if (wordGuess[i] !== "_") {
                newGreyKeys.push(wordGuess[i])
                updatedGuessColors[i] = 0;
            }
            }
            let uniqueGreyKeys = [...new Set(newGreyKeys)];
            // Remove values from uniqueGreyKeys if they are also present in greenKeys or yellowKeys
            uniqueGreyKeys = uniqueGreyKeys.filter(key => !uniqueGreenKeys.includes(key) && !uniqueYellowKeys.includes(key));
            setGreyKeys(uniqueGreyKeys);
            registerAndReset(updatedGuessColors);
        }
    }

    const findYellow = (wordGuess, compound, updatedGuessColors, uniqueGreenKeys) => {
        if (turnCounter < 6) {
            let newCompound = compound.join("")
            let newYellowKeys = [...yellowKeys];
            for (let i = 0; i < wordGuess.length; i++) {
                if (newCompound.includes(wordGuess[i]) && wordGuess[i] !== "_") {
                    newYellowKeys.push(wordGuess[i])
                    updatedGuessColors[i] = 1;
                    newCompound = newCompound.replace(wordGuess[i], "_");
                    wordGuess[i] = "_";
                }
            }
            let uniqueYellowKeys = [...new Set(newYellowKeys)];
            // Remove values from uniqueYellowKeys if they are also present in greenKeys
            uniqueYellowKeys = uniqueYellowKeys.filter(key => !uniqueGreenKeys.includes(key));
            setYellowKeys(uniqueYellowKeys)
            findGrey(wordGuess, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys)
        } else if (turnCounter === 6) {
            let newCorrectWord = compound.join("");
            let newYellowKeys = [...yellowKeys];
            for (let i = 0; i < wordGuess.length; i++) {
                if (newCorrectWord.includes(wordGuess[i]) && wordGuess[i] !== "_") {
                    newYellowKeys.push(wordGuess[i])
                    updatedGuessColors[i] = 1;
                    newCorrectWord = newCorrectWord.replace(wordGuess[i], "_");
                    wordGuess[i] = "_";
                }
            }
            let uniqueYellowKeys = [...new Set(newYellowKeys)];
            // Remove values from uniqueYellowKeys if they are also present in greenKeys
            uniqueYellowKeys = uniqueYellowKeys.filter(key => !uniqueGreenKeys.includes(key));
            setYellowKeys(uniqueYellowKeys)
            findGrey(wordGuess, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys)
        }
    }

    const findGreen = (wordGuess) => {
        disableKeyPressRef.current = true;
        let newWordGuess = [...wordGuess];
        if (turnCounter < 6) {
            let compound;
            if (turnCounter < 3) {
                compound = [...correctWord.slice(0,5)];
            } else {
                compound = [...correctWord.slice(5,9)];
            }
            let updatedGuessColors = [...keys0DordleColors];
            let newGreenKeys = [...greenKeys];
            for (let i = 0; i < wordGuess.length; i++) {
                if (newWordGuess[i] === compound[i]) {
                    newGreenKeys.push(newWordGuess[i])
                    newWordGuess[i] = "_";
                    compound[i] = "_";
                    updatedGuessColors[i] = 2;
                }
            }
            let uniqueGreenKeys = [...new Set(newGreenKeys)];
            setGreenKeys(uniqueGreenKeys)
            findYellow(newWordGuess, compound, updatedGuessColors, uniqueGreenKeys)
        } else if (turnCounter === 6) {
            let newCorrectWord = [...correctWord];
            let updatedGuessColors = [...keys0DordleColors];
            let newGreenKeys = [...greenKeys];
            for (let i = 0; i < wordGuess.length; i++) {
                if (newWordGuess[i] === newCorrectWord[i]) {
                    newGreenKeys.push(newWordGuess[i])
                    newWordGuess[i] = "_";
                    newCorrectWord[i] = "_";
                    updatedGuessColors[i] = 2;
                }
            }
            let uniqueGreenKeys = [...new Set(newGreenKeys)];
            setGreenKeys(uniqueGreenKeys)
            findYellow(newWordGuess, newCorrectWord, updatedGuessColors, uniqueGreenKeys)
        }
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        if (turnCounter < 6) {
            const wordGuess = keys0.join('');
            if (fiveLetterWordSet.has(wordGuess.toLowerCase()) || fourLetterWordSet.has(wordGuess.toLowerCase())) {
                findGreen(wordGuess.toLowerCase());
            } else {
            disableKeyPressRef.current = true;
            setSymbolResponse("times");
            setTimeout(() => {
                if (turnCounter < 3) {
                    setKeys0(["", "", "", ""]);
                } else {
                    setKeys0(["", "", "", "", ""]);
                }
                setSymbolResponse("");
                disableKeyPressRef.current = false;
            }, 1000);
            }
        } else if (turnCounter === 6) {
            const wordGuess = keys0.join('');
            if (nineLetterWordSet.has(wordGuess.toLowerCase())) {
                findGreen(wordGuess.toLowerCase());
            } else {
            disableKeyPressRef.current = true;
            setSymbolResponse("times");
            setTimeout(() => {
                setKeys0(["", "", "", "", "", "", "", "", ""]);
                setSymbolResponse("");
                disableKeyPressRef.current = false;
            }, 1000);
            }
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
            <KeyboardLContext.Provider
                value={{
                addLetter,
                removeLetter,
                guesses,
                guessColors,
                turnCounter,
                disableKeyPressRef}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return (
                  <React.Fragment key={uniqueKey}>
                  <Key keyVal={key} dark color={keys0DordleColors[index]} keyLine={0} />
                  </React.Fragment>
                );
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} color={keys1DordleColors[index]} 
                  key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>
              {keys2.map((key, index) => {
              const uniqueKey = `2-${index}`;
              return <Key keyVal={key} color={keys2DordleColors[index]} 
              key={uniqueKey} keyLine={2} />;
              })}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
              const uniqueKey = `3-${index}`;
                return <Key keyVal={key} color={keys3DordleColors[index]} 
                  key={uniqueKey} keyLine={3} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            {wordReveal ? (<h1>{wordReveal.toUpperCase()}</h1>) : (<div className='line5'><DordleGuesses /></div>)}
            </KeyboardLContext.Provider>
        </div>
    )

}

export default KeyboardL