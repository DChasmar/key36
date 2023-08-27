import React from 'react'
import { BsStar, BsStarFill } from '../IconModule';

function StarBox({ tally }) {
    const stars = [];
  
    for (let i = 0; i < 5; i++) {
        if (i < tally) {
        stars.push(<BsStarFill key={i} />);
        } else {
        stars.push(<BsStar key={i} />);
        }
    }
  

  return (
      <div className={`star-box`} >
        {stars}
      </div>
    )
}

export default StarBox