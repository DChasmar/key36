import React, { useContext, useState } from 'react';
import { AppContext } from '../App'

function Prompt() {
    const { hidePrompt } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(true); // Use state to manage visibility

    const iconGrid = [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ];

    const iconColors = [
        ['#888', '#d99916', '#d22c35', '#89d5ff', '#d22c35', '#63b9ab', '#67ae4d', '#d99916', '#888', '#888'],
        ['#89d5ff', '#67ae4d', '#d99916', '#d22c35', '#888', '#e07ba1', '#23a7fa', '#888', '#63b9ab', '#d99916'],
        ['#63b9ab', '#23a7fa', '#888', '#67ae4d', '#efc18d', '#f7da21', '#23a7fa', '#e07ba1', '#67ae4d'],
        ['#7d71d7', '#d99916', '#63b9ab', '#efc18d', '#f7da21', '#67ae4d', '#7d71d7']
    ];

    const practice = () => {
      setIsVisible(false); // Trigger the fade-out effect
      setTimeout(() => hidePrompt(), 500);
    }

  return (
    <div className={`prompt ${isVisible ? '' : 'hidden'}`}>
        <div>
            {iconGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="key-icon-row">
                    {row.map((icon, columnIndex) => (
                        <div key={columnIndex} className="key-icon" style={{backgroundColor: iconColors[rowIndex][columnIndex]}}>
                            {icon}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <h1>Key 36</h1>
        <button className="play-button" onClick={practice}>
            Play
        </button>
    </div>
  );
}

export default Prompt;