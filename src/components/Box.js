import React from 'react';
import PropTypes from 'prop-types';

function checker(XChoices,OChoices, boxIndex) {
  let combinedChoices = [...XChoices, ...OChoices];
  let isTaken = false;
  combinedChoices.map( takenIndex => {
    if (takenIndex === boxIndex) isTaken = true;
  });
  return isTaken;
};

const Box = props => (
  <li 
    className="box"
    onClick={() => {
      if (checker(props.playerXChoices, props.playerOChoices, props.index)) {
        console.log(`This piece (${props.index}) is already taken!`);
      } else if (props.playerMode === "two" || (props.playerTurn === "P1" && !props.isProcessing)) {
        props.placePiece(props.index,props.piece);
      }
    }}
  >
    { typeof props.boardChoices[props.index] !== 'number' ?
      props.boardChoices[props.index] : null
      }
  </li>
)

Box.propTypes = {
  piece: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  index: PropTypes.number.isRequired,
  placePiece: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  playerMode: PropTypes.string.isRequired,
  playerTurn: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  playerXChoices: PropTypes.array.isRequired,
  playerOChoices: PropTypes.array.isRequired
}

export default Box;