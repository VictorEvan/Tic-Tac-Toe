import React from 'react';
import PropTypes from 'prop-types';

const Message = props => (
  <div className="game--message">
    <p>
      {
        props.result === "draw" ?
          "It was a draw..." : 
        props.result === "P1" ?
          "Player One wins!" : "Player Two wins!"
      }
    </p>
  </div>
)

Message.propTypes = {
  result: PropTypes.string.isRequired
}

export default Message;