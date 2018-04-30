import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GameActionCreators } from './redux/redux';
import { CSSTransitionGroup } from 'react-transition-group';
import './css/App.css';

import StatsBar from './components/StatsBar';
import PlayerOneTurn from './components/PlayerOneTurn';
import PlayerTwoTurn from './components/PlayerTwoTurn';
import GameType from './components/GameType';
import XorO from './components/XorO';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <div className="container--outer">
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          {
              this.props.playerOnePiece ?
              <StatsBar
                playerMode={this.props.playerMode}
                reset={this.props.actions.reset} 
                P1Score={this.props.P1Score}
                P1Piece={this.props.playerOnePiece}
                P2Piece={this.props.playerTwoPiece}
                P2Score={this.props.P2Score}
              /> : null
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          {
            this.props.pieceTurn !== null &&
            this.props.playerOnePiece === this.props.pieceTurn ?
            <PlayerOneTurn
              playerOne={this.props.playerOnePiece}
              pieceTurn={this.props.pieceTurn}
            /> : null
          }
          {
            this.props.pieceTurn !== null &&
            this.props.playerTwoPiece === this.props.pieceTurn ?
            <PlayerTwoTurn
              playerTwo={this.props.playerTwoPiece}
              pieceTurn={this.props.pieceTurn}
              playerMode={this.props.playerMode}
            /> : null
          } 
        </CSSTransitionGroup>
        <CSSTransitionGroup
          component="div"
          className="container--inner"
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          {
            this.props.playerMode === null ?
            <GameType
              playerMode={this.props.playerMode}
              chooseMode={this.props.actions.setPlayerMode}
            /> : null
          }
          {
            this.props.playerMode && this.props.playerOnePiece === null ?
            <XorO
              playerMode={this.props.playerMode}
              choosePiece={this.props.actions.setPlayerOnePiece}
              reset={this.props.actions.reset}
            /> : null
          }
          {
            this.props.playerOnePiece ?
            <Board 
              // Passed State
              playerMode={this.props.playerMode}
              playerOnePiece={this.props.playerOnePiece}
              playerTwoPiece={this.props.playerTwoPiece}
              pieceTurn={this.props.pieceTurn}
              playerTurn={this.props.playerTurn}
              boardChoices={this.props.boardChoices}
              currentTurn={this.props.currentTurn}
              result={this.props.result}
              isProcessing={this.props.isProcessing}
              // Actions
              placePiece={this.props.actions.placePiece}
              placeAIPiece={this.props.actions.placeAIPiece}
              processNextTurn={this.props.actions.processNextTurn}
              startNextMatch={this.props.actions.startNextMatch}
            /> : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

App.defaultProps = {
  pieces: ["X","O"],
}

const mapStateToProps = state => {
  return {
    playerMode: state.playerMode,
    playerOnePiece: state.P1Piece,
    playerTwoPiece: state.P2Piece,
    pieceTurn: state.pieceTurn,
    playerTurn: state.playerTurn,
    boardChoices: state.boardChoices,
    P1Score: state.P1Score,
    P2Score: state.P2Score,
    currentTurn: state.currentTurn,
    result: state.result,
    isProcessing: state.readyForProcessing
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(GameActionCreators,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);