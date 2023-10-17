import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect, updateDordleColors } from '../../utils';
import Key from './KeyF';
import Spacebar from './SpacebarF';
import compoundWordBank from './CompoundWordList.json';
import threeLetterWordBank from './ThreeLetterWords.json';
import sixLetterWordBank from './SixLetterWords.json';
import DordleGuesses from './DordleGuessesF';

export const KeyboardFContext = createContext();

function KeyboardF() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", "", "", "", "", ""]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
    const allKeys = [keys1, keys2, keys3];

    const [keys0DordleColors, setKeys0DordleColors] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const [keys1DordleColors, setKeys1DordleColors] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const [keys2DordleColors, setKeys2DordleColors] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const [keys3DordleColors, setKeys3DordleColors] = useState([-1, -1, -1, -1, -1, -1, -1]);

    const [greenKeys, setGreenKeys] = useState([])
    const [yellowKeys, setYellowKeys] = useState([])
    const [greyKeys, setGreyKeys] = useState([])

    const [guesses, setGuesses] = useState([
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""]]);
    
    const [guessColors, setGuessColors] = useState([
      [-1, -1, -1, -1, -1, -1], 
      [-1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1]]);

    const [turnCounter, setTurnCounter] = useState(0);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    const [compoundWordSet, setCompoundWordSet] = useState(new Set());
    const [threeLetterWordSet, setThreeLetterWordSet] = useState(new Set());
    const [sixLetterWordSet, setSixLetterWordSet] = useState(new Set());
    const [correctWord, setCorrectWord] = useState("");
    const [wordReveal, setWordReveal] = useState("");

    const [symbolResponse, setSymbolResponse] = useState("");

    const disableKeyPressRef = useRef(false);

    const generateCompoundWordSet = async () => {
      const compoundWordSet = new Set(compoundWordBank.words);
      const randomCompoundWord = [...compoundWordSet][Math.floor(Math.random() * compoundWordSet.size)];
      return { compoundWordSet, randomCompoundWord };
    };
    
    const generateThreeLetterWordSet = async () => {
      const threeLetterWordSet = new Set(threeLetterWordBank.words);
      return { threeLetterWordSet };
    };
    
    const generateSixLetterWordSet = async () => {
      const sixLetterWordSet = new Set(sixLetterWordBank.words);
      return { sixLetterWordSet };
    };
    
    useEffect(() => {
      const fetchData = async () => {
        const compoundWords = await generateCompoundWordSet();
        const threeLetterWords = await generateThreeLetterWordSet();
        const sixLetterWords = await generateSixLetterWordSet();
    
        setCompoundWordSet(compoundWords.compoundWordSet);
        setCorrectWord(compoundWords.randomCompoundWord);
        setThreeLetterWordSet(threeLetterWords.threeLetterWordSet);
        setSixLetterWordSet(sixLetterWords.sixLetterWordSet);
      };
    
      fetchData();
    }, []);

    const addLetter = (key) => {
      let updatedKeys = [...keys0];
      const emptyIndex = updatedKeys.findIndex((val) => val === '');
      if (emptyIndex >= 0) {
          updatedKeys[emptyIndex] = key.toUpperCase();
          if (turnCounter < 3) {
            updatedKeys[emptyIndex + 3] = key.toUpperCase();        
      }}
      setKeys0(updatedKeys);
    };

    const removeLetter = () => {
      let updatedKeys = [...keys0];
      const emptyIndex = updatedKeys.findIndex((val) => val === '');
      if (emptyIndex > 0 && emptyIndex < 6) {
          updatedKeys[emptyIndex - 1] = '';
          if (turnCounter < 3) {
            updatedKeys[emptyIndex + 2] = '';
      }}
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

    const registerAndReset = (updatedGuessColors) => {
      if (turnCounter < 3) {
        // Reveal keys for word guess
        setKeys0DordleColors(updatedGuessColors)
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
          setKeys0DordleColors([-1, -1, -1, -1, -1, -1])
          setKeys0(["", "", "", "", "", ""])
          setTurnCounter((prevTurnCounter) => prevTurnCounter + 1);
          disableKeyPressRef.current = false;
        }, 1000);
      // Logic for final guess
      } else if (turnCounter === 3) {
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
            setKeys0DordleColors([-1, -1, -1, -1, -1, -1]);
            setGuesses([
              ["", "", "", "", "", ""],
              ["", "", "", "", "", ""],
              ["", "", "", "", "", ""]
            ]);           
            setGuessColors([
              [-1, -1, -1, -1, -1, -1], 
              [-1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1]
            ]);
            setKeys0DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
            setKeys1DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
            setKeys2DordleColors([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
            setKeys3DordleColors([-1, -1, -1, -1, -1, -1, -1]);
            setGreenKeys([]);
            setYellowKeys([]);
            setGreyKeys([]);
            setKeys0(["", "", "", "", "", ""]);
            setTurnCounter(0);
            setSymbolResponse("");
            setWordReveal("");
            disableKeyPressRef.current = false;
          }, 2000);
        // Correct, so level complete, return home
        } else {
          setSymbolResponse("check");
          setTimeout(() => {
            let newKeysColor = [...keysColor];
            newKeysColor[2][3] = 1;
            setKeysColor(newKeysColor);
            setGameChosen({ gameChosen: false, gameNumber: '' });
            setSymbolResponse("");
            disableKeyPressRef.current = false;
          }, 2000); 
        }
      }
    }

    const findGrey = (wordGuess1, wordGuess2, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys) => {
      if (turnCounter < 3) {
        let newGreyKeys = [...greyKeys]
        for (let i = 0; i < 3; i++) {
          if (wordGuess1[i] !== "_") {
            newGreyKeys.push(wordGuess1[i])
            updatedGuessColors[i] = 0;
          }
          if (wordGuess2[i] !== "_") {
            newGreyKeys.push(wordGuess2[i])
            updatedGuessColors[i + 3] = 0;
          }
        }
        let uniqueGreyKeys = [...new Set(newGreyKeys)];
        // Remove values from uniqueGreyKeys if they are also present in greenKeys or yellowKeys
        uniqueGreyKeys = uniqueGreyKeys.filter(key => !uniqueGreenKeys.includes(key) && !uniqueYellowKeys.includes(key));
        setGreyKeys(uniqueGreyKeys)
        registerAndReset(updatedGuessColors)
      } else if (turnCounter === 3) {
        let newGreyKeys = [...greyKeys]
        for (let i = 0; i < 6; i++) {
          if (wordGuess1[i] !== "_") {
            newGreyKeys.push(wordGuess1[i])
            updatedGuessColors[i] = 0;
          }
        }
        let uniqueGreyKeys = [...new Set(newGreyKeys)];
        // Remove values from uniqueGreyKeys if they are also present in greenKeys or yellowKeys
        uniqueGreyKeys = uniqueGreyKeys.filter(key => !uniqueGreenKeys.includes(key) && !uniqueYellowKeys.includes(key));
        setGreyKeys(uniqueGreyKeys)
        registerAndReset(updatedGuessColors)
      }
    }

    const findYellow = (wordGuess1, compound1, updatedGuessColors, compound2,  wordGuess2, uniqueGreenKeys) => {
      if (turnCounter < 3) {
        let newCompound1 = compound1.join("")
        let newCompound2 = compound2.join("")
        let newYellowKeys = [...yellowKeys];
        for (let i = 0; i < 3; i++) {
          if (newCompound1.includes(wordGuess1[i]) && wordGuess1[i] !== "_") {
            newYellowKeys.push(wordGuess1[i])
            updatedGuessColors[i] = 1;
            newCompound1 = newCompound1.replace(wordGuess1[i], "_");
            wordGuess1[i] = "_";
          }
          if (newCompound2.includes(wordGuess2[i]) && wordGuess2[i] !== "_") {
            newYellowKeys.push(wordGuess2[i])
            updatedGuessColors[i + 3] = 1;
            newCompound2 = newCompound2.replace(wordGuess2[i], "_");
            wordGuess2[i] = "_";
          }
        }
        let uniqueYellowKeys = [...new Set(newYellowKeys)];
        // Remove values from uniqueYellowKeys if they are also present in greenKeys
        uniqueYellowKeys = uniqueYellowKeys.filter(key => !uniqueGreenKeys.includes(key));
        setYellowKeys(uniqueYellowKeys)
        findGrey(wordGuess1, wordGuess2, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys)
      } else if (turnCounter === 3) {
        let newCorrectWord = compound1.join("");
        let newYellowKeys = [...yellowKeys];
        for (let i = 0; i < 6; i++) {
          if (newCorrectWord.includes(wordGuess1[i]) && wordGuess1[i] !== "_") {
            newYellowKeys.push(wordGuess1[i])
            updatedGuessColors[i] = 1;
            newCorrectWord = newCorrectWord.replace(wordGuess1[i], "_");
            wordGuess1[i] = "_";
          }
        }
        let uniqueYellowKeys = [...new Set(newYellowKeys)];
        // Remove values from uniqueYellowKeys if they are also present in greenKeys
        uniqueYellowKeys = uniqueYellowKeys.filter(key => !uniqueGreenKeys.includes(key));
        setYellowKeys(uniqueYellowKeys)
        findGrey(wordGuess1, null, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys)
      }
    }

    const findGreen = (wordGuess) => {
      disableKeyPressRef.current = true;
      if (turnCounter < 3) {
        let compound1 = [...correctWord.slice(0,3)];
        let compound2 = [...correctWord.slice(3,6)];
        let wordGuess1 = [...wordGuess];
        let wordGuess2 = [...wordGuess];
        let updatedGuessColors = [...keys0DordleColors];
        let newGreenKeys = [...greenKeys];
        for (let i = 0; i < 3; i++) {
          if (wordGuess[i] === compound1[i]) {
            newGreenKeys.push(wordGuess1[i])
            wordGuess1[i] = "_";
            compound1[i] = "_";
            updatedGuessColors[i] = 2;
          }
          if (wordGuess2[i] === compound2[i]) {
            newGreenKeys.push(wordGuess2[i])
            wordGuess2[i] = "_";
            compound2[i] = "_";
            updatedGuessColors[i + 3] = 2;
          }
        }
        let uniqueGreenKeys = [...new Set(newGreenKeys)];
        setGreenKeys(uniqueGreenKeys)
        findYellow(wordGuess1, compound1, updatedGuessColors, compound2,  wordGuess2, uniqueGreenKeys)
      } else if (turnCounter === 3) {
        let newCorrectWord = [...correctWord];
        let wordGuess1 = [...wordGuess]
        let updatedGuessColors = [...keys0DordleColors];
        let newGreenKeys = [...greenKeys];
        for (let i = 0; i < 6; i++) {
          if (wordGuess1[i] === newCorrectWord[i]) {
            newGreenKeys.push(wordGuess1[i])
            wordGuess1[i] = "_";
            newCorrectWord[i] = "_";
            updatedGuessColors[i] = 2;
        }}
        let uniqueGreenKeys = [...new Set(newGreenKeys)];
        setGreenKeys(uniqueGreenKeys)
        findYellow(wordGuess1, newCorrectWord, updatedGuessColors, null, null, uniqueGreenKeys)
      }
    }

    const checkWord = () => {
      if (keys0.includes("")) return;
      if (turnCounter < 3) {
        const wordGuess = keys0.slice(0, 3).join('');
        if (threeLetterWordSet.has(wordGuess.toLowerCase())) {
          findGreen(wordGuess.toLowerCase());
        } else {
          disableKeyPressRef.current = true;
          setSymbolResponse("times");
          setTimeout(() => {
            setKeys0(["", "", "", "", "", ""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
        }
      } else if (turnCounter === 3) {
        const wordGuess = keys0.join('');
        if (sixLetterWordSet.has(wordGuess.toLowerCase())) {
          findGreen(wordGuess.toLowerCase());
        } else {
          disableKeyPressRef.current = true;
          setSymbolResponse("times");
          setTimeout(() => {
            setKeys0(["", "", "", "", "", ""]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
      }}
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
            <KeyboardFContext.Provider
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
                  {index === 2 && turnCounter < 3 && <div className='divider'>|</div>}
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
            </KeyboardFContext.Provider>
        </div>
    )

}

export default KeyboardF