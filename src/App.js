import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GameActionCreators } from './redux/redux';
import { CSSTransitionGroup } from 'react-transition-group';
import './css/App.css';

import GameType from './components/GameType';
import XorO from './components/XorO';
import StatsBar from './components/StatsBar';
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
              this.props.playerPiece ?
              <StatsBar
                reset={this.props.actions.reset} 
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
            this.props.playerMode && this.props.playerPiece === null ?
            <XorO
              playerMode={this.props.playerMode}
              choosePiece={this.props.actions.setPlayerPiece}
              reset={this.props.actions.reset}
            /> : null
          }
          {
            this.props.playerPiece ?
            <Board 
              // Passed State
              playerMode={this.props.playerMode}
              playerPiece={this.props.playerPiece}
              pieceTurn={this.props.pieceTurn}
              boardChoices={this.props.boardChoices}
              playerXChoices={this.props.playerXChoices}
              playerOChoices={this.props.playerOChoices}
              // Default Props
              pieces={this.props.pieces}
              winningCombos={this.props.winningCombos}
              // Actions
              placePiece={this.props.actions.placePiece}
            /> : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

App.defaultProps = {
  pieces: ["X","O"],
  winningCombos: [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ]
}

const mapStateToProps = state => {
  return {
    playerMode: state.playerMode,
    playerPiece: state.playerPiece,
    pieceTurn: state.pieceTurn,
    boardChoices: state.boardChoices,
    playerXChoices: state.playerXChoices,
    playerOChoices: state.playerOChoices
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(GameActionCreators,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);