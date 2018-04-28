import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GameActionCreators } from './redux/redux';
import { CSSTransitionGroup } from 'react-transition-group';
import './css/App.css';

import GameType from './components/GameType';
import XorO from './components/XorO';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <CSSTransitionGroup
        component="div"
        className="container--outer"
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
            // Props
            pieces={this.props.pieces}
            playerMode={this.props.playerMode}
            playerPiece={this.props.playerPiece}
            pieceTurn={this.props.pieceTurn}
            boardChoices={this.props.boardChoices}
            // Actions
            placePiece={this.props.actions.placePiece}
          /> : null
        }
      </CSSTransitionGroup>
    );
  }
}

App.defaultProps = {
  pieces: ["X","O"]
}

const mapStateToProps = state => {
  return {
    playerMode: state.playerMode,
    playerPiece: state.playerPiece,
    pieceTurn: state.pieceTurn,
    boardChoices: state.boardChoices
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(GameActionCreators,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);