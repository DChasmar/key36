import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { AppContext } from '../../App';
import Key from './Key1';
import Spacebar from './Spacebar1';

export const Keyboard1Context = createContext();

function Keyboard1() {
    const { setGameChosen, keys0Color, setKeys0Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["", "", "", "", "", "", "", "", ""];
    const keys3 = ["", "", "", "", "", "", "",];
    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const validWords = ['TYPEWRITER', 'REPERTOIRE', 'PERPETUITY', 'PROPRIETOR', 'PEPPERWORT']
    const [response, setResponse] = useState("")

    const addLetter = (key) => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex >= 0) {
            updatedKeys[emptyIndex] = key.toUpperCase();        
        }
        setKeys0(updatedKeys);
    }

    const removeLetter = () => {
        let updatedKeys = [...keys0];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex > 0 && emptyIndex < 10) {
            updatedKeys[emptyIndex - 1] = '';
        } else if (emptyIndex === -1) {
            updatedKeys[9] = '';
        }
        setKeys0(updatedKeys);
    }

    const checkWord = () => {
        if (keys0.includes("")) return;
        const wordGuess = keys0.join('')
        if (validWords.includes(wordGuess)) {
            setResponse("check");
            setTimeout(() => {
                let newKeys0Color = keys0Color;
                newKeys0Color[0] = 1;
                setKeys0Color(newKeys0Color);
                setGameChosen({ gameChosen: false, gameNumber: '' });
            }, 1000);
        } else {
            setResponse("times");
            setTimeout(() => {
                setKeys0(["", "", "", "", "", "", "", "", "", ""])
                setResponse("");
            }, 1000);
        }
    }

    useEffect(() => {
        checkWord()
    }, [keys0]);

    const handleKeyboard = useCallback((event) => {

        if (event.key === "Backspace") {
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
                return <Key keyVal={key} key={uniqueKey} keyLine={0} />;
            })}</div>
            <div className='line1'>{keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={1} />;
            })}</div>
            <div className='line2'>
                {keys2.map((key, index) => {
                const uniqueKey = `2-${index}`;
                return <Key keyVal={key} key={uniqueKey} />;})}
            </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal={response} /></div>
            </Keyboard1Context.Provider>
        </div>
    )

}

export default Keyboard1