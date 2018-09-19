import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import Message from './Message';
import Box from './Box';

class Board extends Component {

  componentDidUpdate = () => {
    console.log('Board updated');
    // handle starting next turn
    if (this.props.result === null && this.props.isProcessing === true) {
      console.log('process next turn');
      this.props.processNextTurn();
    } else
    // handle match end
    if (this.props.result !== null) {
      console.log('start next match in 3 seconds');
      setTimeout(() => this.props.startNextMatch(),3000);
    } else
    // handle AI Move
    if (this.props.playerMode === 'one' && this.props.playerTurn === 'P2') {
      setTimeout(() => this.props.placeAIPiece(),1000);
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
              playerMode={this.props.playerMode}
            /> : null
          }
        </CSSTransitionGroup>
        <ul className={
          this.props.playerTurn === "P1" ?
          "container--boxes--P1" : "container--boxes--P2"
        }
        >
          {this.props.boardChoices.map((box, i) => (
            <Box
              key={i}
              boardChoices={this.props.boardChoices}
              piece={this.props.pieceTurn}
              index={i}
              placePiece={this.props.placePiece}
              playerMode={this.props.playerMode}
              playerTurn={this.props.playerTurn}
              isProcessing={this.props.isProcessing}
              playerXChoices={this.props.playerXChoices}
              playerOChoices={this.props.playerOChoices}
            />
          ))}
        </ul>
      </div>
    );
  }
}

Board.propTypes = {
  playerMode: PropTypes.string.isRequired,
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
  playerXChoices: PropTypes.array.isRequired,
  playerOChoices: PropTypes.array.isRequired,
  // actions
  placePiece: PropTypes.func.isRequired,
  placeAIPiece: PropTypes.func.isRequired,
  processNextTurn: PropTypes.func.isRequired,
  startNextMatch: PropTypes.func.isRequired
}

export default Board;