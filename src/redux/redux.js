// ================
// Action Types
// ================

const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
const SET_PLAYER_PIECE = 'SET_PLAYER_PIECE';
const PLACE_PIECE = 'PLACE_PIECE';
const RESET = 'RESET';

// ActionTypes Object

const GameActionTypes = {
  SET_PLAYER_MODE,
  SET_PLAYER_PIECE,
  PLACE_PIECE,
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

const setPlayerPiece = choice => {
  return {
    type: GameActionTypes.SET_PLAYER_PIECE,
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

const reset = () => {
  return {
    type: GameActionTypes.RESET
  }
}

// ActionCreators Object

const GameActionCreators = {
  setPlayerMode,
  setPlayerPiece,
  placePiece,
  reset,
}

// ================
// Initial State and Reducer
// ================

const randomTurn = () => Math.round(Math.random());

const initialState = {
  playerMode: null,
  playerPiece: null,
  pieceTurn: null,
  playerXChoices: [],
  playerOChoices: [],
  boardChoices: [null,null,null,null,null,null,null,null,null]
};

function GameReducer(state=initialState, action) {
  switch(action.type) {
    case GameActionTypes.SET_PLAYER_MODE:
      return {
        playerMode: action.mode,
        playerPiece: state.playerPiece,
        pieceTurn: state.pieceTurn,
        playerXChoices: state.playerXChoices,
        playerOChoices: state.playerOChoices,
        boardChoices: state.boardChoices
      };
    case GameActionTypes.SET_PLAYER_PIECE:
      return {
        playerMode: state.playerMode,
        playerPiece: action.choice,
        pieceTurn: randomTurn(),
        playerXChoices: state.playerXChoices,
        playerOChoices: state.playerOChoices,
        boardChoices: state.boardChoices
      };
    case GameActionTypes.PLACE_PIECE:
      console.log('action.piece: ',action.piece);
      if (state.boardChoices[action.index] === null) {
        return {
          playerMode: state.playerMode,
          playerPiece: state.playerPiece,
          pieceTurn: state.pieceTurn === 0 ? 1 : 0,
          playerXChoices: action.piece === "X" ? [...state.playerXChoices, action.index] : state.playerXChoices,
          playerOChoices: action.piece === "O" ? [...state.playerOChoices, action.index] : state.playerOChoices,
          boardChoices: [
            ...state.boardChoices.slice(0,action.index),
            action.piece,
            ...state.boardChoices.slice(action.index + 1, state.boardChoices.length),
          ]
        };
      } else {
        return state;
      }
    case GameActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export { GameActionCreators, GameReducer };