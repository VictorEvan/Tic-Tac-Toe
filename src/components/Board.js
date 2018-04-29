import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import Message from './Message';
import Box from './Box';

class Board extends Component {

  componentDidUpdate = () => {
    console.log('componentDidUpdate');
    if (this.props.result === null && this.props.currentTurn > 5) {
      let previousTurn = this.props.pieceTurn === "X" ? "O" : "X";
      let previousPlayer = this.props.playerTurn === "P1" ? "P2" : "P1";
      if (this.playerHasWon(this.props.winningCombos, this.props[`player${previousTurn}Choices`])) {
        this.props.setResult(previousPlayer);
      } else if (this.props.currentTurn === 10) {
        this.props.setResult();
      }
    }
  }

  playerHasWon = (winningCombos,playerArr) => {
    for (let i = 0; i < winningCombos.length; i++) {
      let result = 
        winningCombos[i].reduce((bool,winningIndex) => 
          !playerArr.includes(winningIndex) ? false : bool, true);
      console.log(result);
      if (result) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div className="game--board">
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          {
            this.props.result ?
            <Message 
              result={this.props.result}
            /> : null
          }
        </CSSTransitionGroup>
        <ul className="container--boxes">
          {this.props.boardChoices.map((box, i) => (
            <Box
              key={i}
              boardChoices={this.props.boardChoices}
              piece={this.props.pieceTurn}
              index={i}
              placePiece={this.props.placePiece}
            />
          ))}
        </ul>
      </div>
    );
  }
}

Board.defaultProps = {
  winningCombos: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
}

Board.propTypes = {
  playerXChoices: PropTypes.array.isRequired,
  playerOChoices: PropTypes.array.isRequired,
  playerOnePiece: PropTypes.string.isRequired,
  playerTwoPiece: PropTypes.string.isRequired,
  pieceTurn: PropTypes.string.isRequired,
  playerTurn: PropTypes.string.isRequired,
  boardChoices: PropTypes.array.isRequired,
  currentTurn: PropTypes.number.isRequired,
  result: PropTypes.string,
  // actions
  placePiece: PropTypes.func.isRequired,
  setResult: PropTypes.func.isRequired
}

export default Board;