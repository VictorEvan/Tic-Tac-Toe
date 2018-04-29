import React from 'react';
import PropTypes from 'prop-types';

const PlayerTwoTurn = props => {
  return (
    <div className='player-two-turn'>
      <p>
        {props.playerMode === 'one' ?
          'Computer Turn' : 'Go Player Two!'
        }
      </p>
    </div>
  );
}

PlayerTwoTurn.propTypes = {
  playerMode: PropTypes.string.isRequired
}

export default PlayerTwoTurn;