import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './Key4';
import Spacebar from './Spacebar4';

export const Keyboard4Context = createContext();

function Keyboard4() {
    const { setGameChosen, keys0Color, setKeys0Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", "2", "", "4", "", "6", "", "8", "", "0"]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const fauxKeys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const fauxKeys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const fauxKeys3 = ["Z", "X", "C", "V", "B", "N", "M"]

    const [wordGuess, setWordGuess] = useState("")
    const [letterSet, setLetterSet] = useState("EVENSPRIMESSQUARESODDSPERFECT".split(""))
    const [correctWords, setCorrectWords] = useState(['EVENS', 'PRIMES', 'SQUARES', 'ODDS', 'PERFECT'])
    const [puzzleArrays, setPuzzleArrays] = useState([
        ["", "2", "", "4", "", "6", "", "8", "", "0"], 
        ["", "2", "3", "", "5", "", "7", "", "", ""], 
        ["1", "", "", "4", "", "", "", "", "9", ""], 
        ["1", "", "3", "", "5", "", "7", "", "9"], 
        ["", "", "", "", "6", "", "", ""]])

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const addLetter = (key) => {
        let updatedKeys = [...keys0];
        let updatedLetterSet = [...letterSet];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex >= 0) {
            updatedKeys[emptyIndex] = key.toUpperCase();        
        }
        const indexToRemove = updatedLetterSet.indexOf(key);
        if (indexToRemove >= 0) {
            updatedLetterSet.splice(indexToRemove, 1);
        }
        setKeys0(updatedKeys);
        setLetterSet(updatedLetterSet)
    }

    const removeLetter = () => {
        let updatedKeys = [...keys0];
        let updatedLetterSet = [...letterSet];
        let removedValue = null;

        for (let i = updatedKeys.length - 1; i >= 0; i--) {
          const key = updatedKeys[i];
          if (key !== "" && !/\d/.test(key)) {
            updatedKeys[i] = "";
            removedValue = key;
            break;
          }
        }

        if (removedValue !== null) {
            updatedLetterSet = [...updatedLetterSet, removedValue];
        }

        setKeys0(updatedKeys);
        console.log(updatedLetterSet)
        setLetterSet(updatedLetterSet);
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        const wordGuessLetters = keys0.filter(key => !/\d/.test(key));
        let updatedLetterSet = [...letterSet, ...wordGuessLetters];
        const wordGuess = wordGuessLetters.join('');
        if (correctWords[0] === wordGuess) {
            setSymbolResponse("check");
            disableKeyPressRef.current = true;
            setTimeout(() => {
                if (puzzleArrays.length > 1){
                    setKeys0(puzzleArrays[1])
                }
                const newPuzzleArrays = puzzleArrays.slice(1);
                setPuzzleArrays(newPuzzleArrays)
                const newCorrectWords = correctWords.slice(1);
                setCorrectWords(newCorrectWords)
                setSymbolResponse("");
                disableKeyPressRef.current = false;
            }, 1000);
        } else {
            setSymbolResponse("times");
            disableKeyPressRef.current = true;
            setTimeout(() => {
                setLetterSet(updatedLetterSet)
                setKeys0(puzzleArrays[0])
                setSymbolResponse("");
                disableKeyPressRef.current = false;
            }, 1000);
        }
    }

    const registerAndReset = () => {
        if (puzzleArrays.length !== 0) return;
        let newKeys0Color = keys0Color;
        newKeys0Color[3] = 1;
        setKeys0Color(newKeys0Color);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    }

    useEffect(() => {
        const updatedKeys1 = fauxKeys1.map(key => letterSet.includes(key) ? key : "");
        setKeys1(updatedKeys1);
      
        const updatedKeys2 = fauxKeys2.map(key => letterSet.includes(key) ? key : "");
        setKeys2(updatedKeys2);
      
        const updatedKeys3 = fauxKeys3.map(key => letterSet.includes(key) ? key : "");
        setKeys3(updatedKeys3);
    }, [letterSet]);

    useEffect(() => {
        const wordGuessLetters = keys0.filter(key => key !== "" && !/\d/.test(key));
        const updatedWordGuess = wordGuessLetters.join('');
        setWordGuess(updatedWordGuess)
        checkWord()
    }, [keys0]);

    useEffect(() => {
        registerAndReset()
    }, [puzzleArrays])

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
            }, [keys0, keys1, keys2, keys3]);
            keys1.forEach((key) => {
                if (event.key.toUpperCase() === key.toUpperCase()) {
                    addLetter(key)
                }            
            }, [keys0, keys1, keys2, keys3]);
            keys2.forEach((key) => {
                if (event.key.toUpperCase() === key.toUpperCase()) {
                    addLetter(key)
                }            
            }, [keys0, keys1, keys2, keys3]);
            keys3.forEach((key) => {
                if (event.key.toUpperCase() === key.toUpperCase()) {
                    addLetter(key)
                }            
            }, [keys0, keys1, keys2, keys3]);
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
            <Keyboard4Context.Provider
                value={{
                addLetter,
                removeLetter,
                disableKeyPressRef
                }}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={0} dark={!/\d/.test(key) && key !== "*"} />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={2} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={3} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={symbolResponse} /></div>
            <div>
                <h2 style={{ marginTop: '2px', marginBottom: '2px' }}>{wordGuess}</h2>
            </div>
            </Keyboard4Context.Provider>
        </div>
    )

}

export default Keyboard4