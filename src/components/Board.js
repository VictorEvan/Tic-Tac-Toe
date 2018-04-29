import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import Message from './Message';
import Box from './Box';

class Board extends Component {

  componentDidUpdate = () => {
    if (this.props.result === null && this.props.isProcessing === true) {
      console.log('process next turn');
      this.props.processNextTurn();
    }
    if (this.props.result) {
      console.log('start next match in 3 seconds');
      setTimeout(() => this.props.startNextMatch(),3000);
    }
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

Board.propTypes = {
  playerOnePiece: PropTypes.string.isRequired,
  playerTwoPiece: PropTypes.string.isRequired,
  boardChoices: PropTypes.array.isRequired,
  currentTurn: PropTypes.number.isRequired,
  result: PropTypes.string,
  isProcessing: PropTypes.bool.isRequired,
  pieceTurn: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  playerTurn: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  // actions
  placePiece: PropTypes.func.isRequired,
  processNextTurn: PropTypes.func.isRequired,
  startNextMatch: PropTypes.func.isRequired
}

export default Board;