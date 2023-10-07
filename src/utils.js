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

const GAME_PROGRESS_LOCAL_STORAGE_KEY = "game-progress";
const DEFAULT_GAME_PROGRESS = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

export function readSavedGameProgress() {
  const localStorageValue = localStorage.getItem(
    GAME_PROGRESS_LOCAL_STORAGE_KEY
  );

  if (localStorageValue == null) {
    return DEFAULT_GAME_PROGRESS;
  } else {
    const parsed = JSON.parse(localStorageValue);
    if (parsed instanceof Array && parsed.length === 4) {
        return parsed;
    } else {
        return DEFAULT_GAME_PROGRESS;
    }
  }
}

export function writeSavedGameProgress(value) {
  localStorage.setItem(GAME_PROGRESS_LOCAL_STORAGE_KEY, JSON.stringify(value));
}

export function randomWordle() {
    // Generate two random numbers between 3 and 6 (inclusive)
    const randomNumber1 = Math.floor(Math.random() * 4) + 3; // Generates 3, 4, 5, or 6
    const randomNumber2 = Math.floor(Math.random() * 4) + 3; // Generates 3, 4, 5, or 6
  
    // Create an array with the two random numbers
    const result = [randomNumber1, randomNumber2];
  
    return result;
}