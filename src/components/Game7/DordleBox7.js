import React from 'react'

function DordleBox( { keyVal, color } ) {

  let boxColor;

  if (color === 0) {
    boxColor = '#cccccc'; // grey
  } else if (color === 1) {
    boxColor = '#d9d91e'; // yellow
  } else if (color === 2) {
    boxColor = '#67ae4d'; // green
  } else {
    boxColor = 'white';
  }

  return (
    <div className='key mini_key' style={{ backgroundColor: boxColor }}>
        {keyVal}
    </div>
  )
}

export default DordleBox