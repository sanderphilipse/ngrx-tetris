import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from './shared/tetro.interface';
import { keyDown, pauseGame, startGame, stopGame } from './store/tetris.actions';
import { selectBlocks, selectGameState, selectScore } from './store/tetris.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tetris-ngrx';
  blocks$ = this.store.select(selectBlocks);
  state$ = this.store.select(selectGameState);
  score$ = this.store.select(selectScore);
  GameState = GameState;

  constructor(private readonly store: Store) {}

  @HostListener('document:keydown', ['$event'])
  dispatchKeyEvent(event: KeyboardEvent) {
    console.log(event.key);
    this.store.dispatch(keyDown({key: event.key}));
  }

  startGame() {
    this.store.dispatch(startGame());
  }

  resumeGame() {
    this.store.dispatch(pauseGame());
  }

  stopGame() {
    this.store.dispatch(stopGame());
  }
}
