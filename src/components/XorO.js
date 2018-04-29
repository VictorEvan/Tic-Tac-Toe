import React from 'react';
import PropTypes from 'prop-types';

const XorO = props => {
  if (props.playerMode) {
    return (
      <div className="game--XorO">
        <p>
          { props.playerMode === "one" ?
            `Would you like X or O?` :
            `Player 1: Would you like X or O?`
          }
        </p>
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