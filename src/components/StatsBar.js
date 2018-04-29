import React from 'react';
import PropTypes from 'prop-types';

const StatsBar = props => {
  return (
    <div>
      <div className="bar__player-one">
        P1: 0
      </div>
      <div className="bar__player-two">
        P2: 0
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
  reset: PropTypes.func.isRequired
}

export default StatsBar;