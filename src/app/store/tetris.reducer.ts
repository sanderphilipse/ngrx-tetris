import { Action, combineReducers, createReducer, on } from '@ngrx/store';
import {
  GameState,
  State,
} from '../shared/tetro.interface';
import { boardReducer } from './board.reducer';
import {
  moveDown,
  moveLeft,
  moveRight,
  removeLines,
  rotateClockwise,
  rotateCounterClockwise,
  pauseGame,
  startGame,
  stopGame,
  lostGame,
  setSpeed,
} from './tetris.actions';

export const FEATURE_STATE_KEY = 'game-state';

const defaultControls = new Map<string, Action>([
  ['ArrowDown', moveDown()],
  ['ArrowLeft', moveLeft()],
  ['ArrowRight', moveRight()],
  ['ArrowUp', rotateClockwise()],
  ['Control', rotateCounterClockwise()],
  ['Escape', pauseGame()],
]);

const initialSettingsState = {
  controls: defaultControls,
};

const settingsReducer = createReducer(initialSettingsState);
const stateReducer = createReducer<GameState>(
  GameState.INACTIVE,
  on(startGame, (state) => GameState.ACTIVE),
  on(pauseGame, (state) => {
    if (state === GameState.ACTIVE) return GameState.PAUSED;
    if (state === GameState.PAUSED) return GameState.ACTIVE;
    return state;
  }),
  on(stopGame, (state) => GameState.INACTIVE),
  on(lostGame, (state) => GameState.LOST)
);
const speedReducer = createReducer(
  500,
  on(setSpeed, (state, action) => action.speed)
);

const scoreMap = new Map([
  [1, 40],
  [2, 100],
  [3, 300],
  [4, 1200],
]);

const scoreReducer = createReducer(
  0,
  on(removeLines, (state, action) => {
    const score = scoreMap.get(action.lines.length) ?? 0;
    return state + score;
  })
);

export const reducer = combineReducers<State>({
  board: boardReducer,
  settings: settingsReducer,
  gameState: stateReducer,
  gameSpeed: speedReducer,
  score: scoreReducer,
});

