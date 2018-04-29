import React from 'react';
import PropTypes from 'prop-types';

const Box = props => (
  <li 
    className="box"
    onClick={() => {
      props.placePiece(props.index,props.piece);
    }}
  >
    {props.boardChoices[props.index]}
  </li>
)

Box.propTypes = {
  piece: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  placePiece: PropTypes.func.isRequired
}

export default Box;