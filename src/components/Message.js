import React from 'react';
import PropTypes from 'prop-types';

const Message = props => (
  <div 
    className={
      props.result === "draw" ?
      "game--message" :
      props.result === "P1" ?
        "game--message--P1" : "game--message--P2"
    }

  >
    <p>
      {
        props.result === "draw" ?
          "It was a draw..." : 
        props.result === "P1" ?
          "Player One wins!" : 
          props.playerMode === "one" ? "AI wins!" : "Player Two wins!"
      }
    </p>
  </div>
)

Message.propTypes = {
  result: PropTypes.string.isRequired,
  playerMode: PropTypes.string.isRequired
}

export default Message;