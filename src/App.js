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
                reset={this.props.actions.reset} 
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
              playerOnePiece={this.props.playerOnePiece}
              playerTwoPiece={this.props.playerTwoPiece}
              pieceTurn={this.props.pieceTurn}
              playerTurn={this.props.playerTurn}
              boardChoices={this.props.boardChoices}
              playerXChoices={this.props.playerXChoices}
              playerOChoices={this.props.playerOChoices}
              currentTurn={this.props.currentTurn}
              result={this.props.result}
              // Actions
              placePiece={this.props.actions.placePiece}
              setResult={this.props.actions.setResult}
            /> : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

App.defaultProps = {
  pieces: ["X","O"],
  winningCombos: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
}

const mapStateToProps = state => {
  return {
    playerMode: state.playerMode,
    playerOnePiece: state.playerOnePiece,
    playerTwoPiece: state.playerTwoPiece,
    pieceTurn: state.pieceTurn,
    playerTurn: state.playerTurn,
    boardChoices: state.boardChoices,
    playerXChoices: state.playerXChoices,
    playerOChoices: state.playerOChoices,
    currentTurn: state.currentTurn,
    result: state.result
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(GameActionCreators,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);