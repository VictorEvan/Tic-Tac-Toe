import React from 'react';
import PropTypes from 'prop-types';

const XorO = props => {
  if (props.playerMode) {
    return (
      <div className="game--XorO">
        <h2>
          { props.playerMode === "one" ?
            `Choose` :
            `Player 1: Choose`
          }
        </h2>
        <div className="container--buttons">
          <button
            onClick={() => props.choosePiece(["X","O"])}
          >X</button>
          <button
            onClick={() => props.choosePiece(["O","X"])}
          >O</button>
        </div>
        <button 
          className="back-button"
          onClick={() => props.reset()}
        >Back</button>
      </div>
    );
  } else {
    return null;
  }
}

XorO.propTypes = {
  playerMode: PropTypes.string.isRequired,
  choosePiece: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default XorO;