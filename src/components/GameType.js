import React from 'react';
import PropTypes from 'prop-types';

const GameType = props => {
  if (props.playerMode === null) {
    return (
      <div className="game--type">
        <p>How do you want to play?</p>
        <div className="container--buttons">
          <button
            onClick={() => props.chooseMode("one")}
          >One Player</button>
          <button
            onClick={() => props.chooseMode("two")}
          >Two Player</button>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

GameType.propTypes = {
  playerMode: PropTypes.object,
  chooseMode: PropTypes.func.isRequired
}

export default GameType;