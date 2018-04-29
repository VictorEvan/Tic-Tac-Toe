import React from 'react';
import PropTypes from 'prop-types';

import BoardMessage from './Message';
import Box from './Box';

const Board = props => {
  if (props.playerPiece === null) {
    return null;
  } else {
    return (
      <div className="game--board">
        {/* <BoardMessage /> */}
        <ul className="container--boxes">
          {props.boardChoices.map((box, i) => (
            <Box
              key={i}
              boardChoices={props.boardChoices}
              piece={props.pieces[props.pieceTurn]}
              index={i}
              placePiece={props.placePiece}
            />
          ))}
        </ul>
      </div>
    );
  }
}

Board.propTypes = {
  pieces: PropTypes.array.isRequired,
  winningCombos: PropTypes.array.isRequired,
  playerXChoices: PropTypes.array.isRequired,
  playerOChoices: PropTypes.array.isRequired,
  playerMode: PropTypes.isRequired,
  playerPiece: PropTypes.isRequired,
  pieceTurn: PropTypes.number,
  placePiece: PropTypes.func.isRequired,
  boardChoices: PropTypes.array.isRequired
}

export default Board;