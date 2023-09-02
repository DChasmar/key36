import { useEffect } from 'react';

export function addLetterToArray(keysArray, setKeysArray) {
    return (key) => {
        let updatedKeys = [...keysArray];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex >= 0) {
            updatedKeys[emptyIndex] = key.toUpperCase();
        }
        setKeysArray(updatedKeys);
    };
}

export function removeLetterFromArray(keysArray, setKeysArray) {
    return () => {
        let updatedKeys = [...keysArray];
        const emptyIndex = updatedKeys.findIndex((val) => val === '');
        if (emptyIndex > 0) {
            updatedKeys[emptyIndex - 1] = '';
        }
        setKeysArray(updatedKeys);
    };
}

export function useKeydownEffect(callback, dependencies = []) {
    useEffect(() => {
        document.addEventListener("keydown", callback);
    
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, dependencies);
}

export function updateDordleColors(colorKeys, value, keys, setKeysDordleColors) {
    setKeysDordleColors(prevKeysDordleColors => {
        const newKeysDordleColors = [...prevKeysDordleColors];
        for (let key of colorKeys) {
            const index = keys.indexOf(key.toUpperCase());
            if (index !== -1) {
                newKeysDordleColors[index] = value;
            }
        }
        return newKeysDordleColors;
    });
};