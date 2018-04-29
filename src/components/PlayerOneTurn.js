import React from 'react';
import PropTypes from 'prop-types';

const PlayerOneTurn = props => {
  return (
    <div className="player-one-turn">
      <p>Go Player One!</p>
    </div>
  );
}

PlayerOneTurn.propTypes = {
  pieceTurn: PropTypes.string.isRequired
}

export default PlayerOneTurn;