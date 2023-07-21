import React, { useCallback, useContext, useEffect, useState, createContext } from 'react';
import { AppContext } from '../../App';
import Key from './Key2';
import Spacebar from './Spacebar2';
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from 'react-icons/bi';

export const Keyboard2Context = createContext();

function Keyboard2() {
    const { setGameChosen, keys0Color, setKeys0Color } = useContext(AppContext);
    const [keys0, setKeys0] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
    const [keys1, setKeys1] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [keys2, setKeys2] = useState(["", "", "", "", "", "", "", "", ""]);
    const keys3 = ["", "", "", "", "", "", "",];
    const [totalFactors, setTotalFactors] = useState(0)
    const [factorsList, setFactorsList] = useState([])
    const [factorsFive, setFactorsFive] = useState([])
    const darkKeys = [0, 1, 4, 5, 8, 9]
    const shouldIncludeEllipsisBefore = !factorsList.includes(10);
    const shouldIncludeEllipsisAfter = !factorsList.includes(49);

    const fauxKeys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

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
                console.log(newFactorArray)
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
    const registerAndReset = () => {
        if (keys1.includes("")) return;
        let newFactorTotal = totalFactors;
        let newFactorsList = factorsList;
        setTimeout(() => {
            setFactorsFive([])
            setTotalFactors(0)
            setKeys0(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])
            setKeys1(["", "", "", "", "", "", "", "", "", ""]);
            setKeys2(["", "", "", "", "", "", "", "", ""]);
            if (factorsList.includes(newFactorTotal)) return;
            newFactorsList.push(newFactorTotal)
            newFactorsList.sort((a, b) => a - b); // Sort factors in ascending order
            setFactorsList(newFactorsList)
            // const hasAllNumbers = Array.from({ length: 40 }, (_, index) => index + 10).every(number => factorsList.includes(number));
            // if (hasAllNumbers === true) {
            //     let newKeys0Color = keys0Color;
            //     newKeys0Color[0] = 1;
            //     setKeys0Color(newKeys0Color)
            //     setGameChosen({gameChosen: false, gameNumber: ''})}
            if (newFactorsList.includes(10) && newFactorsList.includes(49)) {
                localStorage.setItem('factorsList', JSON.stringify(newFactorsList));
                let newKeys0Color = keys0Color;
                newKeys0Color[1] = 1;
                setKeys0Color(newKeys0Color)
                setGameChosen({gameChosen: false, gameNumber: ''}) 
            }
        }, 400);        
    }

    const getNumberColorStyle = (number) => {
        const colorValue = Math.floor((number - 10) * 255 / 51);
        const colorHex = colorValue.toString(16).padStart(2, '0');
        const color = `#${colorHex.repeat(3)}`;
        return { color };
    };

    useEffect(() => {
        registerAndReset()
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

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    useEffect(() => {
        // Retrieve factorsList from localStorage if it exists
        const storedFactorsList = localStorage.getItem('factorsList');
        if (storedFactorsList) {
            try {
              setFactorsList(JSON.parse(storedFactorsList));
            } catch (error) {
              console.error('Error parsing factorsList:', error);
              // Handle the error, such as setting a default value for factorsList
            }
        }
    }, []);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <Keyboard2Context.Provider
                value={{
                addNumber,
                removeNumber,
                factorsList}}>
            <div className='line0'>{keys0.map((key, index) => {
                const uniqueKey = `0-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={true} add={true} />;
            })}</div>
            <div className='line1'>
                {keys1.map((key, index) => {
                const uniqueKey = `1-${index}`;
                return <Key keyVal={key} key={uniqueKey} dark={darkKeys.includes(index)} clickableKey={true} add={false} />;
            })}</div>
                <div className='line2'>
                    {keys2.map((key, index) => {
                    const uniqueKey = `2-${index}`;
                    return <Key keyVal={key} key={uniqueKey} clickableKey={false} />;})}
                </div>
            <div className='line3'>{keys3.map((key, index) => {
                const uniqueKey = `3-${index}`;
                return <Key keyVal={key} key={uniqueKey} clickableKey={false} />;
                })}
            </div>
            <div className='line4'>< Spacebar keyVal= {"Factors: " + totalFactors} /></div>
            <div>{factorsFive.length > 0 ? (
                factorsFive.map((array, index) => (
                <h3 key={index} style={{ marginTop: '2px', marginBottom: '2px' }} >{array.join(', ')}</h3>
                    ))
                ) : (
                    <h3>
                    {shouldIncludeEllipsisBefore && factorsList.length > 0 && <span style={{
                        color: '#000000',
                        fontSize: '30px',
                        position: 'relative',
                        top: '8px'
                    }}>{<BiSolidLeftArrowAlt />} </span>}
                    {factorsList.map((number, index) => (
                    <span key={index} style={getNumberColorStyle(number)}> 
                        {number + ' '}
                    </span>
                    ))}
                    {shouldIncludeEllipsisAfter && factorsList.length > 0 && <span style={{ 
                        color: '#aaaaaa',
                        fontSize: '30px',
                        position: 'relative',
                        top: '8px'
                    }}>{<BiSolidRightArrowAlt />}</span>}
                    </h3>
            )}</div>
            </Keyboard2Context.Provider>
        </div>
    )

}

export default Keyboard2