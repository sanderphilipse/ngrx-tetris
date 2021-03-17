import { createAction, props } from '@ngrx/store';
import { Color, Shape } from '../shared/tetro.interface';

export const createTetromino = createAction(
  'create tetromino',
  props<{ color: Color; shape: Shape }>()
);

export const tick = createAction('tick');

export const startGame = createAction('start game');

export const pauseGame = createAction('pause game');

export const stopGame = createAction('stop game');

export const lostGame = createAction('lost game');

export const mergeTetromino = createAction('merge tetromino with board');

export const rotateClockwise = createAction('rotate tetromino clockwise');

export const rotateCounterClockwise = createAction(
  'rotate tetromino counterclockwise'
);

export const moveLeft = createAction('move tetromino left');

export const moveRight = createAction('move tetromino right');

export const moveDown = createAction('move tetromino down');

export const keyDown = createAction('key down', props<{ key: string }>());

export const removeLines = createAction(
  'remove lines',
  props<{ lines: number[] }>()
);

export const setSpeed = createAction('set speed', props<{ speed: number }>());
