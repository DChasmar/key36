import './App.css';
import Prompt from './components/Prompt';
import Keyboard from './components/Keyboard';
import HelpButton from './components/HelpButton';
import { createContext, useState, lazy, Suspense, useEffect } from 'react';
import { readSavedGameProgress, writeSavedGameProgress } from './utils';

const generateKeyboardComponent = (letter) => {
  return lazy(() => import(`./components/Game${letter}/Keyboard${letter}`));
};

export const AppContext = createContext();

function App() {
    const [showPrompt, setShowPrompt] = useState(true);

    const hidePrompt = () => {
      if (!showPrompt) return;
      setShowPrompt(false);
    };

    const [gameChosen, setGameChosen] = useState({
        gameChosen: false,
        gameNumber: '',
    })

    const [keysColor, setKeysColor] = useState(readSavedGameProgress());

    useEffect(() => {
      writeSavedGameProgress(keysColor);
    }, [keysColor]);

    const helpData = [
      { color: '#63b9ab', title: '1 Vowel:', description: 'Spell words using only one vowel' },
      { color: '#23a7fa', title: '100 Grid:', description: 'Identify the pattern and complete the grid' },
      { color: '#d22c35', title: 'Logic:', description: 'Try to turn all the keys blue by swapping values' },
      { color: '#7d71d7', title: 'Curious:', description: 'Spell words that total to the values below (A = 1, B = 2...)' },
      { color: '#67ae4d', title: 'Wordle:', description: 'Identify the compound word' },
      { color: '#efc18d', title: 'Scrabby:', description: 'Spell words of the value in the spacebar' },
      { color: '#f7da21', title: 'Anagram:', description: 'Spell words of the desired length using all the yellow letters' },
      { color: '#89d5ff', title: 'Maze:', description: 'Connect all keys by connecting touching keys' },
      { color: '#e07ba1', title: 'Puzzle:', description: 'Solve the picture pun puzzle to complete the passage' },
      { color: '#888', title: 'Words:', description: 'Make words' },
      { color: '#d99916', title: 'Numbers:', description: 'Do math' },
    ];

    const modalContent = (
      <div>
        <p>This website is designed to be used without instructions.</p>
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul>
          <li>Each keyboard key leads to a different game.</li>
          <li>When you complete a game, a checkmark will appear on the key on the homepage.</li>
          <li>To return to the homepage, press the spacebar.</li>
        </ul>
        <ul className="help-icons">
          {helpData.map((item, index) => (
            <div style={{ display: 'inline-flex' }} key={index}>
              <div className="help-icon" style={{ backgroundColor: item.color }}></div>
              <span>
                <strong>{item.title}</strong> {item.description}
              </span>
            </div>
          ))}
        </ul>
      </div>
    );
  
    const chooseGame = (keyVal) => {
        if (gameChosen.gameChosen === true) return;
        const newSelectedLetter = keyVal;
        setGameChosen({gameChosen: true, gameNumber: newSelectedLetter});
    };
  
    const KeyboardComponent = generateKeyboardComponent(gameChosen.gameNumber);

    return (
      <div className="App">
        
        <AppContext.Provider
          value={{
            chooseGame,
            gameChosen,
            setGameChosen,
            keysColor,
            setKeysColor,
            hidePrompt}}>
          {showPrompt && <Prompt />}
          <div className='game'>
          <HelpButton content={modalContent} />
            {gameChosen.gameNumber ? (
              <Suspense fallback={<Keyboard />}>
                <KeyboardComponent />
              </Suspense>
            ) : <Keyboard />}
          </div>

        </AppContext.Provider>
      </div>

    );
}

export default App;