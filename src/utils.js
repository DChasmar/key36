

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