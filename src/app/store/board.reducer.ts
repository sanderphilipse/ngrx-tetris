import { createReducer, on } from "@ngrx/store";
import { BoardState, Grid, GRID_HEIGHT, GRID_WIDTH, Rotation, TetroState } from "../shared/tetro.interface";
import { transformTetro, getClockwiseRotation, getCounterClockwiseRotation, getBlocks, hasCollision, generateNewTetro } from "../shared/utils.functions";
import { createTetromino, startGame, removeLines, rotateClockwise, rotateCounterClockwise, moveLeft, moveRight, moveDown, tick } from "./tetris.actions";


const initialGridState: Grid = Array(GRID_HEIGHT).fill(
  Array(GRID_WIDTH).fill(undefined)
);

const initialTetroState: TetroState | undefined = undefined;

const initialGameBoardState = {
  grid: initialGridState,
  activeTetromino: initialTetroState,
};

export const boardReducer = createReducer<BoardState>(
  initialGameBoardState,
  on(createTetromino, (state, action) => ({
    ...state,
    activeTetromino: {
      color: action.color,
      shape: action.shape,
      rotation: Rotation.UP,
      location: {
        x: 5,
        y: 10,
      },
      settled: false,
    },
  })),
  on(startGame, (state) => ({
    ...state,
    grid: initialGameBoardState.grid,
    activeTetromino: generateNewTetro(),
  })),
  on(removeLines, (state, action) => {
    const cleanedGrid = state.grid.filter(
      (_, index) => !action.lines.some((line) => line === index)
    );
    const linesToAdd = Array(action.lines.length).fill(
      Array(GRID_WIDTH).fill(undefined)
    );
    return { ...state, grid: [...linesToAdd, ...cleanedGrid] };
  }),
  on(rotateClockwise, (state) =>
    transformTetro(
      state,
      state.activeTetromino?.rotation != null
        ? getClockwiseRotation(state.activeTetromino.rotation)
        : undefined,
      undefined
    )
  ),
  on(rotateCounterClockwise, (state) =>
    transformTetro(
      state,
      state.activeTetromino?.rotation != null
        ? getCounterClockwiseRotation(state.activeTetromino.rotation)
        : undefined,
      undefined
    )
  ),
  on(moveLeft, (state) =>
    transformTetro(
      state,
      state.activeTetromino?.rotation,
      state.activeTetromino?.location
        ? {
            ...state.activeTetromino.location,
            x: state.activeTetromino.location.x - 1,
          }
        : undefined
    )
  ),
  on(moveRight, (state) =>
    transformTetro(
      state,
      state.activeTetromino?.rotation,
      state.activeTetromino?.location
        ? {
            ...state.activeTetromino.location,
            x: state.activeTetromino.location.x + 1,
          }
        : undefined
    )
  ),
  on(moveDown, tick, (state) => {
    if (!state.activeTetromino) {
      return state;
    }
    const newLocation = {
      ...state.activeTetromino.location,
      y: state.activeTetromino.location.y + 1,
    };
    const newLocationBlocks = getBlocks(
      state.activeTetromino.shape,
      state.activeTetromino.rotation,
      newLocation
    );
    const collided = hasCollision(state.grid, newLocationBlocks);
    // second time in a row that tetro tried to move down and couldn't, merge with board
    if (collided && state.activeTetromino.settled) {
      const oldLocationBlocks = getBlocks(
        state.activeTetromino.shape,
        state.activeTetromino.rotation,
        state.activeTetromino.location
      );
      return {
        ...state,
        grid: state.grid.map((line, indexY) =>
          line.map((block, indexX) => {
            const tetroLivesHere = oldLocationBlocks.some(
              ({ x, y }) => indexX === x && indexY === y
            );
            return tetroLivesHere ? state.activeTetromino?.color : block;
          })
        ),
        activeTetromino: generateNewTetro(),
      };
    }
    return {
      ...state,
      activeTetromino: {
        ...state.activeTetromino,
        settled: collided,
        location: collided ? state.activeTetromino.location : newLocation,
      },
    };
  })
);
