import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  keyDown,
  lostGame,
  removeLines,
  setSpeed,
  tick,
} from './tetris.actions';
import {
  concatMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import {
  selectControls,
  selectGameSpeedState,
  selectGameState,
  selectGrid,
  selectScore,
} from './tetris.selectors';
import { GameState } from '../shared/tetro.interface';

@Injectable()
export class TetrisEffects {
  keyDown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(keyDown),
      withLatestFrom(
        this.store.select(selectControls),
        this.store.select(selectGameState)
      ),
      concatMap(([action, controls, state]) =>
        state === GameState.ACTIVE ? [controls.get(action.key)] : []
      ),
      filterNullish()
    )
  );

  removeLines$ = createEffect(() =>
    this.store.select(selectGrid).pipe(
      concatMap((grid) => {
        const filteredGrid = grid
          .map((line, index) =>
            line.every((block) => block != undefined) ? index : undefined
          )
          .filter(isNotNullish);
        if (filteredGrid.length === 0) {
          return [];
        }
        return [removeLines({ lines: filteredGrid })];
      })
    )
  );

  gameLost$ = createEffect(() =>
    this.store.select(selectGrid).pipe(
      switchMap((grid) => {
        const lost = grid[0].some((value) => value != undefined);
        return lost ? [lostGame()] : [];
      })
    )
  );

  tick$ = createEffect(() =>
    this.store.select(selectGameSpeedState).pipe(
      switchMap(({ gameSpeed, gameState }) => {
        const timer$ = timer(gameSpeed, gameSpeed).pipe(map(() => tick()));
        return gameState === GameState.ACTIVE ? timer$ : [];
      })
    )
  );

  speed$ = createEffect(() =>
    this.store
      .select(selectScore)
      .pipe(
        concatMap((score) => [
          setSpeed({ speed: 500 / (Math.floor(score / 1000) + 1) }),
        ])
      )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}

function isNotNullish<T>(input: T | null | undefined): input is T {
  return input != null;
}

function filterNullish<T>() {
  return (source$: Observable<null | undefined | T>) =>
    source$.pipe(filter(isNotNullish));
}
