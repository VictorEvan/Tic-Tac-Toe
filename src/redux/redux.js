// ================
// Action Types
// ================

const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
const SET_PLAYER_PIECE = 'SET_PLAYER_PIECE';
const PLACE_PIECE = 'PLACE_PIECE';
const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';
const NEXT_MATCH = 'NEXT_MATCH';
const RESET = 'RESET';

// ActionTypes Object

const GameActionTypes = {
  SET_PLAYER_MODE,
  SET_PLAYER_PIECE,
  PLACE_PIECE,
  UPDATE_PLAYER_SCORE,
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

const updatePlayerScore = piece => {
  return {
    type: GameActionTypes.UPDATE_PLAYER_SCORE
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
  setPlayerPiece,
  placePiece,
  updatePlayerScore,
  nextMatch,
  reset,
}

// ================
// Initial State and Reducer
// ================

// Utility Functions

const randomTurn = () => Math.round(Math.random());

const hasAPlayerWon = () => {

};

const initialState = {
  playerMode: null,
  playerPiece: null,
  pieceTurn: null,
  boardChoices: [null,null,null,null,null,null,null,null,null],
  playerXChoices: [],
  playerOChoices: [],
  playerXScore: 0,
  playerOScore: 0,
  players: [
    {
      piece: "X",
      isPlayerOne: false,
      playerXChoices: [],
      playerXScore: 0,
      hasWon: false,
    },
    {
      piece: "O",
      isPlayerOne: false,
      playerOChoices: [],
      playerOScore: 0,
      hasWon: false
    }
  ]
};

function GameReducer(state=initialState, action) {
  switch(action.type) {
    case GameActionTypes.SET_PLAYER_MODE:
      return {
        playerMode: action.mode,
        playerPiece: state.playerPiece,
        pieceTurn: state.pieceTurn,
        boardChoices: state.boardChoices,
        playerXChoices: state.playerXChoices,
        playerOChoices: state.playerOChoices,
        playerXScore: state.playerXScore,
        playerOScore: state.playerOScore
      };
    case GameActionTypes.SET_PLAYER_PIECE:
      return {
        playerMode: state.playerMode,
        playerPiece: action.choice,
        pieceTurn: randomTurn(),
        boardChoices: state.boardChoices,
        playerXChoices: state.playerXChoices,
        playerOChoices: state.playerOChoices,
        playerXScore: state.playerXScore,
        playerOScore: state.playerOScore
      };
    case GameActionTypes.PLACE_PIECE:
      if (state.boardChoices[action.index] === null) {
        return {
          playerMode: state.playerMode,
          playerPiece: state.playerPiece,
          pieceTurn: state.pieceTurn === 0 ? 1 : 0,
          boardChoices: [
            ...state.boardChoices.slice(0,action.index),
            action.piece,
            ...state.boardChoices.slice(action.index + 1, state.boardChoices.length),
          ],
          playerXChoices: action.piece === "X" ? [...state.playerXChoices, action.index] : state.playerXChoices,
          playerOChoices: action.piece === "O" ? [...state.playerOChoices, action.index] : state.playerOChoices,
          playerXScore: state.playerXScore,
          playerOScore: state.playerOScore
        };
      } else {
        return state;
      }
    case GameActionTypes.UPDATE_PLAYER_SCORE:
      return {
        playerMode: state.playerMode,
        playerPiece: state.playerPiece,
        pieceTurn: action.piece === "X" ? 0 : 1,
        boardChoices: initialState.boardChoices,
        playerXChoices: initialState.playerXChoices,
        playerOChoices: initialState.playerOChoices,
        playerXScore: action.piece === "X" ? state.playerXScore + 1 : state.playerXScore,
        playerOScore: action.piece === "O" ? state.playerOScore + 1 : state.playerOScore
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