import React from 'react';
import PropTypes from 'prop-types';

const StatsBar = props => {
  return (
    <div>
      <div className="bar__player-one">
        {
          props.playerMode === "one" ?
          `${props.P1Piece} - ME: ${props.P1Score}` :
          `${props.P1Piece} - P1: ${props.P1Score}`
        }
      </div>
      <div className="bar__player-two">
        {
          props.playerMode === "one" ?
          `${props.P2Piece} - AI: ${props.P2Score}` :
          `${props.P2Piece} - P2: ${props.P2Score}`
        }
      </div>
      <button 
        onClick={props.reset}
        className="bar__reset-button">
        Reset All
      </button>
    </div>
  );
}

StatsBar.propTypes = {
  playerMode: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  P1Score: PropTypes.number.isRequired,
  P1Piece: PropTypes.string.isRequired,
  P2Score: PropTypes.number.isRequired,
  P2Piece: PropTypes.string.isRequired
}

export default StatsBar;