import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shapeMap } from '../shared/shapes.map';
import { Color, State } from '../shared/tetro.interface';
import { FEATURE_STATE_KEY } from './tetris.reducer';

const selectFeatureState = createFeatureSelector<State>(FEATURE_STATE_KEY);

const selectBoard = createSelector(selectFeatureState, s => s.board);

export const selectGrid = createSelector(selectBoard, (s) => s ? s.grid : []);

export const selectTetromino = createSelector(
  selectBoard,
  (s) => s?.activeTetromino
);

export const selectTetroBlocks = createSelector(selectTetromino, (s) =>
  s?.shape ? shapeMap.get(s?.shape)?.[s?.rotation] ?? [] : []
);

export const selectTetroColor = createSelector(
  selectTetromino,
  (s) => s?.color ?? Color.GREY
);

export const selectTetroLocation = createSelector(
  selectTetromino,
  (s) => s?.location
);

export const selectTetroBlocksLocation = createSelector(
  selectTetroBlocks,
  selectTetroLocation,
  (blocks, location) =>
    blocks.map(({ x, y }) => {
      const locationX = location?.x ?? 0;
      const locationY = location?.y ?? 0;
      return { x: x + locationX, y: y + locationY };
    })
);

export const selectBlocks = createSelector(
  selectGrid,
  selectTetroBlocksLocation,
  selectTetroColor,
  (s, tetroBlocks, tetroColor): Color[] => {
    return s
      .map((lines, indexY) =>
        lines.map((block, indexX) => {
          const color = tetroBlocks.find(
            ({ x, y }) => x === indexX && y === indexY
          )
            ? tetroColor
            : block;
          return color ?? Color.GREY;
        })
      )
      .reduce((prev, curr) => [...prev, ...curr]);
  }
);

export const selectGameState = createSelector(selectFeatureState, s => s.gameState);
export const selectGameSpeed = createSelector(selectFeatureState, s => s.gameSpeed);

export const selectSettings = createSelector(selectFeatureState, s => s.settings);
export const selectControls = createSelector(selectSettings, s => s.controls);

export const selectScore = createSelector(selectFeatureState, s => s.score);
