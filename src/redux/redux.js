// ================
// Action Types
// ================

const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
const SET_PLAYER_ONE_PIECE = 'SET_PLAYER_ONE_PIECE';
const PLACE_PIECE = 'PLACE_PIECE';
const PLACE_AI_PIECE = 'PLACE_AI_PIECE';
const PROCESS_NEXT_TURN = 'PROCESS_NEXT_TURN';
const START_NEXT_MATCH = 'START_NEXT_MATCH';
const RESET = 'RESET';

// ActionTypes Object

const GameActionTypes = {
  SET_PLAYER_MODE,
  SET_PLAYER_ONE_PIECE,
  PLACE_PIECE,
  PLACE_AI_PIECE,
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

const placeAIPiece = () => {
  return {
    type: GameActionTypes.PLACE_AI_PIECE
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
  placeAIPiece,
  processNextTurn,
  startNextMatch,
  reset,
}

// ================
// Utility Functions & Variables
// ================

const randomTurn = () => {
  let num = Math.round(Math.random());
  if (num === 0) {
    return "X"
  } else {
    return "O"
  }
};

/* const playerHasWon = (playerArr) => {
  let winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
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
} */

// grabbed off the internet - don't like it as much as mine, but makes the AI work without reinventing the wheel

function playerHasWon(board, player) {
  if (
  (board[0] === player && board[1] === player && board[2] === player) ||
  (board[3] === player && board[4] === player && board[5] === player) ||
  (board[6] === player && board[7] === player && board[8] === player) ||
  (board[0] === player && board[3] === player && board[6] === player) ||
  (board[1] === player && board[4] === player && board[7] === player) ||
  (board[2] === player && board[5] === player && board[8] === player) ||
  (board[0] === player && board[4] === player && board[8] === player) ||
  (board[2] === player && board[4] === player && board[6] === player)
  ) {
  return true;
  } else {
  return false;
  }
 }

const listAvailableIndices = board => board.filter(spot => typeof spot === 'number');

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
  boardChoices: [0,1,2,3,4,5,6,7,8],
  playerXChoices: [],
  playerOChoices: [],
  P1Score: 0,
  P2Score: 0,
  currentTurn: 1,
  result: null,
  readyForProcessing: false
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
      // one player - P1 cannot control P2
      if (state.playerMode === 'one' && state.playerTurn === "P2") {
        return state;
      }
      // two player - board cannot be changed if chosen index is not equal to null or if game has ended
      if (typeof state.boardChoices[action.index] === 'number' && state.result === null) {
        return {
          ...state,
          boardChoices: [
            ...state.boardChoices.slice(0,action.index),
            action.piece,
            ...state.boardChoices.slice(action.index + 1, state.boardChoices.length),
          ],
          playerXChoices: action.piece === "X" ? [...state.playerXChoices, action.index] : state.playerXChoices,
          playerOChoices: action.piece === "O" ? [...state.playerOChoices, action.index] : state.playerOChoices,
          readyForProcessing: true,
        };
      } else {
        return state;
      }
    case GameActionTypes.PLACE_AI_PIECE:
      // recursive AI
      const miniMax = (newBoard, player) => {
        // available Indices in board
        let availSpots = listAvailableIndices(newBoard);
        // Terminal States - P1 wins -10, P2 wins 10, draw 0
        if (playerHasWon(newBoard, state.P1Piece)) {
          return {score: -10};    
        } else if (playerHasWon(newBoard, state.P2Piece)) {
          return {score: 10};
        } else if (availSpots.length === 0) {
          return {score: 0};
        }
        let moves = [];
        for (let i = 0; i < availSpots.length; i++) {
          // create an object for each and store the index of that spot 
          let move = {};
          move.index = newBoard[availSpots[i]];
          // set the empty spot to the current player
          newBoard[availSpots[i]] = player;
          /* collect the score resulted from calling minimax 
          on the opponent of the current player */
          if (player === state.P2Piece) {
            // if current player is AI, process P1 turn
            let result = miniMax(newBoard, state.P1Piece);
            move.score = result.score;
          } else {
            // if current player is P1, process AI turn
            let result = miniMax(newBoard, state.P2Piece);
            move.score = result.score;
          }
          // reset the spot to empty
          newBoard[availSpots[i]] = move.index;
          // push the object to outer moves array
          moves.push(move);
        }
        // if it is the computer's turn loop over the moves and choose the move with the highest score
        let bestMove;
        if (player === state.P2Piece) {
          let bestScore = -10000;
          for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
              // establish new bestScore and bestMove IF current score is greater than previous
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        } else {
          let bestScore = 10000;
          for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
              // establish new bestScore and bestMove IF current score is less than previous
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }
        return moves[bestMove];
      }
      let AIChosenIndex = miniMax(state.boardChoices, state.P2Piece).index;
      console.log(AIChosenIndex);
      return {
        ...state,
        boardChoices: [
          ...state.boardChoices.slice(0,AIChosenIndex),
          state.P2Piece,
          ...state.boardChoices.slice(AIChosenIndex + 1, state.boardChoices.length)
        ],
        playerOChoices: [...state.playerOChoices, AIChosenIndex],
        readyForProcessing: true
      }
    case GameActionTypes.PROCESS_NEXT_TURN:
      if (state.currentTurn >= 5 && playerHasWon(state.boardChoices,state.pieceTurn)) {
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
          readyForProcessing: false,
        }
      }
    case GameActionTypes.START_NEXT_MATCH:
      let winnerGoesFirst, winnerPieceGoesFirst;
      if (state.result === "draw") {
        console.log();
        let randomTurnResult = randomTurn();
        winnerGoesFirst = randomTurnResult === state.P1Piece ? "P1" : "P2";
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
        readyForProcessing: false,
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