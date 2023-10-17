import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect } from '../../utils';
import Key from './KeyY';
import Spacebar from './SpacebarY';

export const KeyboardYContext = createContext();

function KeyboardY() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["deer", "deer", "deer", "deer", " ", "honey", "honey", "honey", "honey", "honey"]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [noteList, setNoteList] = useState([])

    const codeWords = [
        ["deer", "deer", "deer", "deer", " ", "honey", "honey", "honey", "honey", "honey"], 
        [ "eye", " ", "arrow", "arrow", "arrow", "arrow", " ", 
        "sum", "sum", "sum", "sum", " ", "cake", "cake", "cake", "cake",
         " ", "four", "four", "four", " ", "u", "u", "u"],
        ["eye", " ", "can", "can", "can", "knot", "knot", "knot", " ",
        "weight", "weight", "weight", "weight"],
        ["two", "two", " ", "c", "c", "c",
        " ", "u", "u", "u", " ", "l", "eight", 'eight', 'eight', "r"],
        ["half", "half", "half", "half", " ", "a", " ", 
        'gr', 'gr', 'eight', 'eight', 'eight', " ", "day", "day", "day"],
        [""]
    ];

    const realWords = [
        "DEAR HONEY", 
        "I LEFT SOME CAKE FOR YOU", 
        "I CANNOT WAIT", 
        "TO SEE YOU LATER", 
        "HAVE A GREAT DAY"
    ];

    const alternateWords = [
        "DEER HONEY", 
        "I LEFT SOME CAKE FOR YOU", 
        "I CANNOT WAIT", 
        "TO SEE YOU LATER", 
        "HALF A GREAT DAY"
    ];

    const note = [
        "Dear Honey, ",
        "I left some cake for you. ",
        "I cannot wait ", 
        "to see you later. ",
        "Have a great day."
    ];

    const letters = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", 
        "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
        "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    const [counter, setCounter] = useState(0)

    const [symbolResponse, setSymbolResponse] = useState("")

    const disableKeyPressRef = useRef(false);

    const gameOver = () => {
        let newKeysColor = [...keysColor];
        newKeysColor[1][5] = 1;
        setKeysColor(newKeysColor);
        setGameChosen({ gameChosen: false, gameNumber: '' });
    }

    const goodWord = () => {
        setSymbolResponse("check");
        disableKeyPressRef.current = true;
        
        setNoteList((prevNoteList) => {
            const newNoteList = [...prevNoteList];
            newNoteList.push(note[counter]);
            return newNoteList;
        });

        setCounter((prevCounter) => prevCounter + 1);

        setTimeout(() => {
            if (counter < 4){
                setKeys0(codeWords[counter + 1]);
            }
            setSymbolResponse("");
            disableKeyPressRef.current = false;
            if (counter === 4) {
                gameOver()
            }
        }, 1000);
    }

    const badWord = () => {
        setSymbolResponse("times");
        disableKeyPressRef.current = true;
        setTimeout(() => {
            setKeys0(codeWords[counter]);
            setSymbolResponse("");
            disableKeyPressRef.current = false;
        }, 1000);
    }
    
    const addLetter = (key) => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => !letters.includes(val) && val !== " ");
        if (emptyIndex >= 0) {
            updatedKeys[emptyIndex] = key.toUpperCase();        
        }
        setKeys0(updatedKeys);
    }

    const removeLetter = () => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => !letters.includes(val) && val !== " ");
        if (emptyIndex > 0) {
            if (updatedKeys[emptyIndex - 1] === " ") {
                updatedKeys[emptyIndex - 2] = codeWords[counter][emptyIndex - 2];
            } else {
                updatedKeys[emptyIndex - 1] = codeWords[counter][emptyIndex - 1];
            }
        }
        setKeys0(updatedKeys);
    }

    const checkWord = () => {
        if (keys0.some((val) => !letters.includes(val) && val !== " ")) return;
        if (keys0.join('') === realWords[counter] || keys0.join('') === alternateWords[counter]) {
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
            <KeyboardYContext.Provider
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
            <div className="note_box">
                {noteList.slice(0, counter).map((line, index) => (
                <p key={index} className="word_box_word">{line}</p>
            ))}</div>
            </KeyboardYContext.Provider>
        </div>
    )

}

export default KeyboardY