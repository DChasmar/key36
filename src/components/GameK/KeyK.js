import React, { useContext } from 'react'
import { KeyboardKContext } from './KeyboardK';
import { GiSandSnake, GiPear, GiCastle, GiShirtButton, GiSewingString } from 'react-icons/gi';
import { BsIndent, BsArrowDown, BsArrowUp, BsFillSignTurnLeftFill } from 'react-icons/bs';
import { TbHexagonLetterA, TbHexagonLetterD, TbHexagonLetterE, TbHexagonLetterB } from 'react-icons/tb';
import { PiNumberOneBold, PiPeaceBold, PiNumberSquareTwoBold } from 'react-icons/pi';
import { FaCheck, FaChessPawn, FaChessKnight, FaChessBishop, FaChessRook, FaChessQueen, FaChessKing, FaRegClock, FaChess, FaBalanceScaleLeft, FaMale } from 'react-icons/fa';
import { BiSolidChess, BiSolidLock } from 'react-icons/bi';
import { ImClubs } from 'react-icons/im';


function Key({ keyVal, dark, clickableKey, blank }) {
  const { addNumber } = useContext(KeyboardKContext);
  const selectLetter = () => {
    if (clickableKey) {
      addNumber(keyVal);
    };
  };

  let iconComponent = null;

  if (keyVal === 'one') {
    iconComponent = <PiNumberOneBold />;
  } else if (keyVal === 'snake') {
    iconComponent = <GiSandSnake />; 
  } else if (keyVal === 'a') {
    iconComponent = <TbHexagonLetterA />; 
  } else if (keyVal === 'pawn') {
    iconComponent = <FaChessPawn />; 
  } else if (keyVal === 'clock') {
    iconComponent = <FaRegClock />; 
  } else if (keyVal === 'in') {
    iconComponent = <BsIndent />; 
  } else if (keyVal === 'chess') {
    iconComponent = <FaChess />; 
  } else if (keyVal === 'club') {
    iconComponent = <ImClubs />; 
  } else if (keyVal === 'down') {
    iconComponent = <BsArrowDown />; 
  } else if (keyVal === 'peace') {
    iconComponent = <PiPeaceBold />; 
  } else if (keyVal === 'board') {
    iconComponent = <BiSolidChess />; 
  } else if (keyVal === 'bishop') {
    iconComponent = <FaChessBishop />; 
  } else if (keyVal === 'pear') {
    iconComponent = <GiPear />; 
  } else if (keyVal === 'e') {
    iconComponent = <TbHexagonLetterE />; 
  } else if (keyVal === 'd') {
    iconComponent = <TbHexagonLetterD />; 
  } else if (keyVal === 'up') {
    iconComponent = <BsArrowUp />; 
  } else if (keyVal === 'queen') {
    iconComponent = <FaChessQueen />; 
  } else if (keyVal === 'two') {
    iconComponent = <PiNumberSquareTwoBold />; 
  } else if (keyVal === 'check') {
    iconComponent = <FaCheck />; 
  } else if (keyVal === 'castle') {
    iconComponent = <GiCastle />; 
  } else if (keyVal === 'king') {
    iconComponent = <FaChessKing />; 
  } else if (keyVal === 'button') {
    iconComponent = <GiShirtButton />; 
  } else if (keyVal === 'rook') {
    iconComponent = <FaChessRook />; 
  } else if (keyVal === 'b') {
    iconComponent = <TbHexagonLetterB />; 
  } else if (keyVal === 'lock') {
    iconComponent = <BiSolidLock />; 
  } else if (keyVal === 'weigh') {
    iconComponent = <FaBalanceScaleLeft />; 
  } else if (keyVal === 'sew') {
    iconComponent = <GiSewingString />; 
  } else if (keyVal === 'knight') {
    iconComponent = <FaChessKnight />;
  } else if (keyVal === 'turn') {
    iconComponent = <BsFillSignTurnLeftFill />; 
  } else if (keyVal === 'mate') {
    iconComponent = <FaMale />; 
  } else {
    iconComponent = keyVal;
  };

  return (
      <div className={ blank ? 'key run_key' : dark ? 'key dark_key' : 'key' } onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Key