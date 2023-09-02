import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { AppContext } from '../../App';
import { useKeydownEffect } from '../../utils';
import Key from './Key2';
import Spacebar from './Spacebar2';
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from 'react-icons/bi';

export const Keyboard2Context = createContext();

function Keyboard2() {
    const { setGameChosen, keysColor, setKeysColor } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [keys1, setKeys1] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [keys2, setKeys2] = useState(["", "", "", "", "", "", "", "", ""]);
    const [totalFactors, setTotalFactors] = useState(0)
    const [factorsList, setFactorsList] = useState([])
    const [factorsFive, setFactorsFive] = useState([])
    const shouldIncludeEllipsisBefore = !factorsList.includes(10);
    const shouldIncludeEllipsisAfter = !factorsList.includes(49);

    const fauxKeys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

    const [symbolResponse, setSymbolResponse] = useState("")

    const arrowStyles = {
        color: "#7dd7ff",
        fontSize: '30px',
        position: 'relative',
        top: '8px',
    };

    const addNumber = (key) => {
        let updatedKeys0 = [...keys0];
        let updatedKeys1 = [...keys1];
        let updatedKeys2 = [...keys2];
        let updatedFactorTotal = totalFactors;
        let numbersEnteredBefore = keys0.filter((val) => val === "").length;
        if (keys0.includes(key)) {
            const emptyIndex1 = updatedKeys1.findIndex((val) => val === '');
            const emptyIndex0 = updatedKeys0.findIndex((val) => val === key);
            if (emptyIndex1 >= 0) {
                updatedKeys1[emptyIndex1] = key; 
                updatedKeys0[emptyIndex0] = '';  
                setKeys1(updatedKeys1);
                setKeys0(updatedKeys0);
            }
        }
            if (numbersEnteredBefore % 2 === 1) {
                const emptyIndex1 = updatedKeys1.findIndex((val) => val === '');
                const emptyIndex2 = updatedKeys2.findIndex((val) => val === '');
                let joinedStrings = '';
                if (emptyIndex1 !== -1) {
                    joinedStrings = updatedKeys1.slice(emptyIndex1 - 2, emptyIndex1).join('');
                } else if (emptyIndex1 === -1) {
                    joinedStrings = updatedKeys1.slice(-2).join('');
                }
                const resultingInteger = parseInt(joinedStrings, 10);
                const newFactorArray = findFactors(resultingInteger);
                const newFactorTotal = newFactorArray.length;
                updatedFactorTotal += newFactorTotal;
                if (emptyIndex1 === 2) {
                    updatedKeys2[emptyIndex2] = newFactorTotal;
                    setKeys2(updatedKeys2);
                } else if (emptyIndex1 > 2 && emptyIndex1 < updatedKeys1.length) {
                    updatedKeys2[emptyIndex2] = '+';
                    updatedKeys2[emptyIndex2 + 1] = newFactorTotal;
                    setKeys2(updatedKeys2);
                } else if (emptyIndex1 === -1) {
                    updatedKeys2[7] = '+';
                    updatedKeys2[8] = newFactorTotal;
                    setKeys2(updatedKeys2);
                }
                setTotalFactors(updatedFactorTotal)
                setFactorsFive(prevFactorsFive => [...prevFactorsFive, newFactorArray])
        }
        
    }
    const removeNumber = () => {
        let updatedKeys0 = [...keys0];
        let updatedKeys1 = [...keys1];
        let updatedKeys2 = [...keys2];
        let updatedFactorTotal = totalFactors
        let numbersEntered = keys0.filter((val) => val === "").length;
        const emptyIndex1 = updatedKeys1.findIndex((val) => val === '');
            if (emptyIndex1 > 0 && emptyIndex1 < 10) {
                const returnIndex = parseInt(updatedKeys1[emptyIndex1 - 1])
                const returnNumberString = updatedKeys1[emptyIndex1 - 1];
                updatedKeys1[emptyIndex1 - 1] = '';
                updatedKeys0[(returnIndex + 9) % 10] = returnNumberString;
            } else if (emptyIndex1 === -1) {
                const returnIndex = parseInt(updatedKeys1[9])
                const returnNumberString = updatedKeys1[9];
                updatedKeys1[9] = '';
                updatedKeys0[(returnIndex + 9) % 10] = returnNumberString;
            }
            setKeys1(updatedKeys1);
            setKeys0(updatedKeys0);
        if (numbersEntered % 2 === 0 && numbersEntered > 0) {
            const emptyIndex1 = updatedKeys1.findIndex((val) => val === '');
            const emptyIndex2 = updatedKeys2.findIndex((val) => val === '');
            let lastFactorTotal = 0;
            if (emptyIndex2 !== -1) {
                lastFactorTotal = updatedKeys2[emptyIndex2 - 1];
            } else if (emptyIndex2 === -1) {
                lastFactorTotal = updatedKeys2[8];
            }
            updatedFactorTotal -= lastFactorTotal;
            if (emptyIndex1 > 0 && emptyIndex1 < 10) {
                updatedKeys2[emptyIndex1 - 1] = '';
                updatedKeys2[emptyIndex1 - 2] = '';
            } else if (emptyIndex1 === -1) {
                updatedKeys2[8] = '';
                updatedKeys2[7] = '';
            }
            setKeys2(updatedKeys2)
            setTotalFactors(updatedFactorTotal)
            const removeLastItem = () => {
                setFactorsFive(prevItems => prevItems.slice(0, -1));
              };
            removeLastItem()
        }
    }
    const findFactors = (number) => {
        const factors = [];
        for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            factors.push(i);
    
            if (number / i !== i) {
            factors.push(number / i);
            }
        }
        }
        factors.sort((a, b) => a - b); // Sort factors in ascending order
        return factors;
    }

    const gameOver = () => {
        setSymbolResponse("check");
        setTimeout(() => {
            // localStorage.setItem('factorsList', JSON.stringify(newFactorsList));
            setSymbolResponse("");
            let newKeysColor = [...keysColor];
            newKeysColor[0][1] = 1;
            setKeysColor(newKeysColor);
            setGameChosen({ gameChosen: false, gameNumber: '' });
        }, 1000); 
    }

    const registerAndReset = () => {
        if (keys1.includes("")) return;
        let newFactorTotal = totalFactors;
        let newFactorsList = [...factorsList];
        if (!factorsList.includes(newFactorTotal)) {
            newFactorsList.push(newFactorTotal)
            newFactorsList.sort((a, b) => a - b); // Sort factors in ascending order
            setFactorsList(newFactorsList)
        }
        setTimeout(() => {
            setFactorsFive([])
            setTotalFactors(0)
            setKeys0(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])
            setKeys1(["", "", "", "", "", "", "", "", "", ""]);
            setKeys2(["", "", "", "", "", "", "", "", ""]);
            if (newFactorsList.includes(10) && newFactorsList.includes(49)) {
                gameOver();
            }
        }, 1000);        
    }

    const getNumberColorStyle = (number) => {
        const colorValue = Math.floor((number - 10) * 5);
        const colorHex = colorValue.toString(16).padStart(2, '0');
        let color = `#${colorHex.repeat(3)}`;
        if (number === 10 || number === 49) {
            color = "#7dd7ff"
        }
        return { color };
    };

    useEffect(() => {
        registerAndReset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keys1]);

    const handleKeyboard = useCallback((event) => {
        if(event.key === "Backspace") {
            removeNumber()
        } else if (event.key === " ") {
            localStorage.setItem('factorsList', JSON.stringify(factorsList));
            setGameChosen({gameChosen: false, gameNumber: ''});
        } else {
            keys0.forEach((key) => {
                if (event.key === key) {
                    addNumber(key)
            }}, [keys0, keys1]);
            fauxKeys1.forEach((key) => {
                if (event.key.toUpperCase() === key.toUpperCase()) {
                    removeNumber()
            }}, [keys0, keys1]);
        }
    });

    // useEffect(() => {
    //     document.addEventListener("keydown", handleKeyboard);

    //     return () => {
    //         document.removeEventListener("keydown", handleKeyboard);
    //     };
    // }, [handleKeyboard]);

    useKeydownEffect(handleKeyboard, [handleKeyboard]);

    // useEffect(() => {
    //     // Retrieve factorsList from localStorage if it exists
    //     const storedFactorsList = localStorage.getItem('factorsList');
    //     if (storedFactorsList) {
    //         try {
    //           setFactorsList(JSON.parse(storedFactorsList));
    //         } catch (error) {
    //           console.error('Error parsing factorsList:', error);
    //           // Handle the error, such as setting a default value for factorsList
    //         }
    //     }
    // }, []);

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };
    
    const rows = chunkArray(keys1.slice(0,10), 2);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <Keyboard2Context.Provider
                value={{
                addNumber,
                removeNumber,
                factorsList}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} keyLine = {0} clickableKey={true} add={true} />;
            })}</div>
            <div className='hundreds_box'>
                {rows.map((row, rowIndex) => (
                    <div className={`factors_line${rowIndex + 1}`} key={`factors_line${rowIndex + 1}`}>
                    {row.map((key, colIndex) => {
                        const uniqueKey = `1-${rowIndex}-${colIndex}`;
                        return <Key keyVal={key} key={uniqueKey} black keyLine = {1} clickableKey={true} add={false} />;
                    })}
                    </div>
                ))}
            </div>
            <div className='line3'>< Spacebar keyVal= {symbolResponse || "Factors: " + totalFactors} /></div>
                {/* factorsFive.map((array, index) => (
                <h3 key={index} style={{ marginTop: '2px', marginBottom: '2px' }} >{array.join(', ')}</h3> */}
            <div> {factorsFive.length > 0 ? (
                factorsFive.map((array, index) => (
                <h3 key={index} style={{ marginTop: '2px', marginBottom: '2px' }} >{array.join(', ')}</h3>
                    ))
                ) : (
                <h3>
                    {shouldIncludeEllipsisBefore && factorsList.length > 0 && <span style={arrowStyles}>{<BiSolidLeftArrowAlt />} </span>}
                    {factorsList.map((number, index) => (
                    <span key={index} style={getNumberColorStyle(number)}> 
                        {number + ' '}
                    </span>
                    ))}
                    {shouldIncludeEllipsisAfter && factorsList.length > 0 && <span style={arrowStyles}>{<BiSolidRightArrowAlt />}</span>}
                </h3>
                )}
            </div>
            </Keyboard2Context.Provider>
        </div>
    )

}

export default Keyboard2