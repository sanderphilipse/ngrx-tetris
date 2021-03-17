import { Action } from "@ngrx/store";

export const enum Color {
  CYAN = 'cyan',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  GREEN = 'green',
  RED = 'red',
  BLUE = 'blue',
  ORANGE = 'orange',
  GREY = 'grey',
}

export const enum Shape {
  'I' = 'I',
  'O' = 'O',
  'T' = 'T',
  'S' = 'S',
  'Z' = 'Z',
  'J' = 'J',
  'L' = 'L',
}
export const enum Rotation {
  'UP' = 0,
  'RIGHT' = 1,
  'DOWN' = 2,
  'LEFT' = 3,
}

export type Grid = Array<Array<Color | undefined>>;

export enum GameState {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  INACTIVE = 'INACTIVE',
  LOST = 'LOST',
}

export interface Settings {
  controls: Map<string, Action>;
}

export interface BoardLocation {
  x: number;
  y: number;
}

export interface TetroState {
  location: BoardLocation;
  rotation: Rotation;
  color: Color;
  shape: Shape;
  settled: boolean; // gets set to true when the tetro tries to move down but encounters a collision
}
export interface BoardState {
  grid: Grid;
  activeTetromino?: TetroState;
}

export interface State {
  board: BoardState;
  gameState: GameState;
  gameSpeed: number; // in milleseconds between game ticks
  score: number;
  settings: Settings;
}

export const GRID_HEIGHT = 22;
export const GRID_WIDTH = 10;

export const tetroMap = new Map([
  [0, { shape: Shape.I, color: Color.CYAN }],
  [1, { shape: Shape.J, color: Color.BLUE }],
  [2, { shape: Shape.L, color: Color.ORANGE }],
  [3, { shape: Shape.O, color: Color.YELLOW }],
  [4, { shape: Shape.S, color: Color.BLUE }],
  [5, { shape: Shape.T, color: Color.PURPLE }],
  [6, { shape: Shape.Z, color: Color.RED }],
]);
