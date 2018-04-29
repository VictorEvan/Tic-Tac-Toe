// ================
// Action Types
// ================

const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
const SET_PLAYER_ONE_PIECE = 'SET_PLAYER_ONE_PIECE';
const PLACE_PIECE = 'PLACE_PIECE';
const PROCESS_NEXT_TURN = 'PROCESS_NEXT_TURN';
const SET_RESULT = 'SET_RESULT';
const NEXT_MATCH = 'NEXT_MATCH';
const RESET = 'RESET';

// ActionTypes Object

const GameActionTypes = {
  SET_PLAYER_MODE,
  SET_PLAYER_ONE_PIECE,
  PLACE_PIECE,
  PROCESS_NEXT_TURN,
  SET_RESULT,
  NEXT_MATCH,
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

const setResult = winner => {
  return {
    type: GameActionTypes.SET_RESULT,
    winner
  }
}

const nextMatch = () => {
  return {
    type: GameActionTypes.NEXT_MATCH
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
  setResult,
  nextMatch,
  reset,
}

// ================
// Initial State and Reducer
// ================

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

const initialState = {
  playerMode: null,
  playerOnePiece: null,
  playerTwoPiece: null,
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
        playerOnePiece: action.choice[0],
        playerTwoPiece: action.choice[1],
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
          pieceTurn: state.pieceTurn === "X" ? "O" : "X",
          playerTurn: state.playerTurn === "P1" ? "P2" : "P1",
          currentTurn: state.currentTurn + 1
        };
      } else {
        return state;
      }
    case GameActionTypes.PROCESS_NEXT_TURN:
      if (state.currentTurn > 5) {
      }
    case GameActionTypes.SET_RESULT:
      if (action.winner) {
        return {
          ...state,
          result: action.winner,
          [`${action.winner}Score`]: state[`${action.winner}Score`] + 1,
        }
      } else {
        return {
          ...state,
          result: "draw",
        }
      }
    case GameActionTypes.NEXT_MATCH:
      return {
        playerMode: state.playerMode,
      }
    case GameActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export { GameActionCreators, GameReducer };