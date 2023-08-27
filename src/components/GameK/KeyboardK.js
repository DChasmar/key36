import React, { useCallback, useContext, useEffect, useState, createContext, useRef } from 'react';
import { AppContext } from '../../App';
import Key from './KeyK';
import Spacebar from './SpacebarK';

export const KeyboardKContext = createContext();

function KeyboardK() {
    const { setGameChosen, keys2Color, setKeys2Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["one", "one", "snake", "snake", " ", "a", "pawn", "pawn", "pawn", " ", "a", " ", "clock", "clock", "clock", "clock"]);
    const [keys1, setKeys1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
    const [keys2, setKeys2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
    const [keys3, setKeys3] = useState(["Z", "X", "C", "V", "B", "N", "M"]);

    const fauxKeys0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const allKeys = [keys1, keys2, keys3]

    const [noteList, setNoteList] = useState([])

    const codeWords = [
        ["one", "one", "snake", "snake", " ", "a", "pawn", "pawn", "pawn", " ", "a", " ", "clock", "clock", "clock", "clock"], 
        [ "@", "@", " ", "chess", "chess", "chess", "chess", "chess", " ", "club", "club", "club", "club"],
        ["down", "down", "down", "down", " ", "a", " ", "peace", "peace", "peace", "peace", "peace"],
        ["a", " ", "board", "board", "board", "board", "board", " ", "bishop", "bishop", "bishop", "bishop", "bishop", "bishop"],
        ["pear", "pear", "pear", "pear", "e", "d", " ", "up", "up"],
        ["W", "I", "T", "H", " ", "a", " ", "queen", "queen", "queen", "queen", "queen"],
        ["two", "two", " ", "check", "check", "check", "check", "check", "mate", "mate", "mate", "mate"],
        ["a", " ", "castle", "castle", "castle", "castle", "castle", "castle", "d", " ", "king", "king", "king", "king"],
        ["button", "button", "button", " ", "two", "two", "two", " ", "rook", "rook", "rook", "rook", "rook"],
        ['b', 'lock', 'lock', 'lock', 'lock', 'e', 'd', " ", "T", "H", "E", "I", "R", " ", "weigh", "weigh", "weigh"],
        ["sew", "sew", " ", "one", "one", "one", " ", "knight", "knight", "knight", "knight", "knight"],
        ["T", "H", "E", "Y", " ", "turn", "turn", "turn", "turn", "e", "d", " ", "a", " ", "pawn", "pawn", "pawn", "pawn"],
        ["in", "in", "two", "two", " ", "a", " ", "queen", "queen", "queen", "queen", "queen"],
        ["check", "check", "check", "check", "check", "mate", "mate", "mate", "mate"],
        [""]
    ];

    const realWords = [
        "ONCE UPON A TIME", 
        "AT CHESS CLUB",
        "DOWN A PIECE",
        "A BORED BISHOP",
        "PAIRED UP", 
        "WITH A QUEEN",
        "TO CHECKMATE",
        "A CASTLED KING",
        "BUT TWO ROOKS",
        "BLOCKED THEIR WAY",
        "SO ONE NIGHT",
        "THEY TURNEDA PAWN", 
        "INTO A QUEEN", 
        "CHECKMATE"
    ];

    const alternateWords = [
        "ONCE UPON A TIME", 
        "AT CHESS CLUB",
        "DOWN A PEACE",
        "A BOARD BISHOP",
        "PEARED UP", 
        "WITH A QUEEN",
        "TO CHECKMATE",
        "A CASTLED KING",
        "BUT TWO ROOKS",
        "BLOCKED THEIR WAY",
        "SO ONE NIGHT",
        "THEY TURNED A PAWN", 
        "INTO A QUEEN", 
        "CHECKMATE"
    ];

    const note = [
        "Once upon a time, ",
        "at chess club... ",
        "Down a piece, ",
        "a bored bishop ", 
        "paired up ",
        "with a queen ",
        "to checkmate ",
        "a castled king. ",
        "But two rooks ",
        "blocked their way. ",
        "So one night ",
        "they turned a pawn ",
        "into a queen. ",
        "Checkmate.",
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
        let newKeys2Color = keys2Color;
        newKeys2Color[7] = 1;
        setKeys2Color(newKeys2Color);
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
            if (counter < 13){
                setKeys0(codeWords[counter + 1]);
            }
            setSymbolResponse("");
            disableKeyPressRef.current = false;
            if (counter === 13) {
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

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <KeyboardKContext.Provider
                value={{
                addLetter,
                removeLetter
                }}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine={0} dark blank />;
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
            </KeyboardKContext.Provider>
        </div>
    )

}

export default KeyboardK