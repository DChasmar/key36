import React, { useContext } from 'react'
import { KeyboardYContext } from './KeyboardY';
import { GiDeer, GiDrippingHoney, GiCakeSlice, GiSlipknot, GiWeight } from 'react-icons/gi';
import { AiFillEye } from 'react-icons/ai';
import { BsArrowLeft, BsCalendarDay, BsTrash3 } from 'react-icons/bs';
import { TbSum, TbHexagonLetterA, TbHexagonLetterC, TbHexagonLetterL, TbHexagonLetterR, TbHexagonLetterU } from 'react-icons/tb';
import { PiNumberSquareTwoBold, PiNumberCircleFourBold, PiNumberCircleEightBold } from 'react-icons/pi';
import { FaStarHalf } from 'react-icons/fa';
import { BiAngry } from 'react-icons/bi';


function Key({ keyVal, keyLine, guessKey }) {
  const { addLetter, removeLetter } = useContext(KeyboardYContext);
  const selectLetter = () => {
    if (keyLine === 1 || keyLine === 2 || keyLine === 3) {
      addLetter(keyVal);
    } else if (keyLine === 0) {
      removeLetter();
    };
  };

  let iconComponent = null;

  if (keyVal === 'deer') {
    iconComponent = <GiDeer />;
  } else if (keyVal === 'honey') {
    iconComponent = <GiDrippingHoney />; 
  } else if (keyVal === 'eye') {
    iconComponent = <AiFillEye />; 
  } else if (keyVal === 'arrow') {
    iconComponent = <BsArrowLeft />; 
  } else if (keyVal === 'sum') {
    iconComponent = <TbSum />; 
  } else if (keyVal === 'cake') {
    iconComponent = <GiCakeSlice />; 
  } else if (keyVal === 'four') {
    iconComponent = <PiNumberCircleFourBold />; 
  } else if (keyVal === 'u') {
    iconComponent = <TbHexagonLetterU />; 
  } else if (keyVal === 'can') {
    iconComponent = <BsTrash3 />; 
  } else if (keyVal === 'knot') {
    iconComponent = <GiSlipknot />; 
  } else if (keyVal === 'weight') {
    iconComponent = <GiWeight />; 
  } else if (keyVal === 'two') {
    iconComponent = <PiNumberSquareTwoBold />; 
  } else if (keyVal === 'c') {
    iconComponent = <TbHexagonLetterC />; 
  } else if (keyVal === 'l') {
    iconComponent = <TbHexagonLetterL />; 
  } else if (keyVal === 'eight') {
    iconComponent = <PiNumberCircleEightBold />; 
  } else if (keyVal === 'r') {
    iconComponent = <TbHexagonLetterR />;
  } else if (keyVal === 'half') {
    iconComponent = <FaStarHalf />; 
  } else if (keyVal === 'a') {
    iconComponent = <TbHexagonLetterA />; 
  } else if (keyVal === 'gr') {
    iconComponent = <BiAngry />; 
  } else if (keyVal === 'day') {
    iconComponent = <BsCalendarDay />; 
  } else {
    iconComponent = keyVal;
  };

  return (
      <div className={ guessKey ? 'key guess_key' : 'key' } onClick={selectLetter}>
        {iconComponent}
      </div>
    )
}

export default Key