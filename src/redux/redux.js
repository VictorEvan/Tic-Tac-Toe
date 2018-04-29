// ================
// Action Types
// ================

const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
const SET_PLAYER_ONE_PIECE = 'SET_PLAYER_ONE_PIECE';
const PLACE_PIECE = 'PLACE_PIECE';
const PROCESS_NEXT_TURN = 'PROCESS_NEXT_TURN';
const START_NEXT_MATCH = 'START_NEXT_MATCH';
const RESET = 'RESET';

// ActionTypes Object

const GameActionTypes = {
  SET_PLAYER_MODE,
  SET_PLAYER_ONE_PIECE,
  PLACE_PIECE,
  PROCESS_NEXT_TURN,
  START_NEXT_MATCH,
  RESET
}

// ================
// Action Creators
// ================

const setPlayerMode = mode => {
  return {
    type: GameActionTypes.SET_PLAYER_MODE,
    mode
  }
}

const setPlayerOnePiece = choice => {
  return {
    type: GameActionTypes.SET_PLAYER_ONE_PIECE,
    choice
  }
}

const placePiece = (index, piece) => {
  return {
    type: GameActionTypes.PLACE_PIECE,
    index,
    piece
  }
}

const processNextTurn = () => {
  return {
    type: GameActionTypes.PROCESS_NEXT_TURN
  }
}

const startNextMatch = () => {
  return {
    type: GameActionTypes.START_NEXT_MATCH
  }
}

const reset = () => {
  return {
    type: GameActionTypes.RESET
  }
}

// ActionCreators Object

const GameActionCreators = {
  setPlayerMode,
  setPlayerOnePiece,
  placePiece,
  processNextTurn,
  startNextMatch,
  reset,
}

// Utility Functions

const randomTurn = () => {
  let num = Math.round(Math.random());
  if (num === 0) {
    return "X"
  } else {
    return "O"
  }
};

const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const playerHasWon = (winningCombos, playerArr) => {
  console.log(`checking if [${playerArr}] has winning combo`);
  for (let i = 0; i < winningCombos.length; i++) {
    let result = 
      winningCombos[i].reduce((bool,winningIndex) => 
        !playerArr.includes(winningIndex) ? false : bool, true);
    if (result) {
      console.log(`[${playerArr}] has winning combo`);
      return true;
    }
  }
  console.log(`[${playerArr}] does not having winning combo`);
  return false;
}

// ================
// Initial State and Reducer
// ================

const initialState = {
  playerMode: null,
  P1Piece: null,
  P2Piece: null,
  playerTwoisComputer: null,
  pieceTurn: null,
  playerTurn: null,
  boardChoices: [null,null,null,null,null,null,null,null,null],
  playerXChoices: [],
  playerOChoices: [],
  P1Score: 0,
  P2Score: 0,
  currentTurn: 1,
  result: null,
  isProcessing: false
};

function GameReducer(state=initialState, action) {
  switch(action.type) {
    case GameActionTypes.SET_PLAYER_MODE:
      return {
        ...state,
        playerMode: action.mode,
        playerTwoisComputer: action.mode === 'one' ? true : false
      };
    case GameActionTypes.SET_PLAYER_ONE_PIECE:
      let randomTurnResult = randomTurn();
      return {
        ...state,
        P1Piece: action.choice[0],
        P2Piece: action.choice[1],
        pieceTurn: randomTurnResult,
        playerTurn: randomTurnResult === action.choice[0] ? "P1" : "P2"
      };
    case GameActionTypes.PLACE_PIECE:
      if (state.boardChoices[action.index] === null && state.result === null) {
        return {
          ...state,
          boardChoices: [
            ...state.boardChoices.slice(0,action.index),
            action.piece,
            ...state.boardChoices.slice(action.index + 1, state.boardChoices.length),
          ],
          playerXChoices: action.piece === "X" ? [...state.playerXChoices, action.index] : state.playerXChoices,
          playerOChoices: action.piece === "O" ? [...state.playerOChoices, action.index] : state.playerOChoices,
          isProcessing: true,
        };
      } else {
        return state;
      }
    case GameActionTypes.PROCESS_NEXT_TURN:
      if (state.currentTurn >= 5 && playerHasWon(winningCombos,state[`player${state.pieceTurn}Choices`])) {
        return {
          ...state,
          result: state.playerTurn,
          [`${state.playerTurn}Score`]: state[`${state.playerTurn}Score`] + 1,
          pieceTurn: null,
          playerTurn: null
        }
      } else if (state.currentTurn === 9) {
        return {
          ...state,
          result: "draw",
          pieceTurn: null,
          playerTurn: null
        }
      } else {
        return {
          ...state,
          pieceTurn: state.pieceTurn === "X" ? "O" : "X",
          playerTurn: state.playerTurn === "P1" ? "P2" : "P1",
          currentTurn: state.currentTurn + 1,
          isProcessing: false,
        }
      }
    case GameActionTypes.START_NEXT_MATCH:
      let winnerGoesFirst, winnerPieceGoesFirst;
      if (state.result === "draw") {
        let randomTurnResult = randomTurn();
        winnerGoesFirst = randomTurnResult === state.playerOnePiece ? "P1" : "P2";
        winnerPieceGoesFirst = randomTurnResult;
      } else {
        winnerGoesFirst = state.result;
        winnerPieceGoesFirst = state[`${state.result}Piece`];
      }
      return {
        ...state,
        result: null,
        playerXChoices: initialState.playerXChoices,
        playerOChoices: initialState.playerOChoices,
        boardChoices: initialState.boardChoices,
        isProcessing: false,
        playerTurn: winnerGoesFirst,
        pieceTurn: winnerPieceGoesFirst,
        currentTurn: 1
      }
    case GameActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export { GameActionCreators, GameReducer };