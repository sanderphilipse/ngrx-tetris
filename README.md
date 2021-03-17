# TetrisNgrx

This project was designed to demonstrate the power and flexibility of the Flux/Redux pattern, and specifically the [NgRx](https://ngrx.io/) implementation. 

This version of Tetris runs all of its game logic through NgRx, and uses a 10-line HTML and 38-line component.ts to display it to the user and catch the user interaction. It's probably not the most efficient implementation of Tetris, but it certainly works!

After working on several projects using NgRx or other implementations of the Flux state management pattern, I noticed that we were mostly using NgRx to just manage API calls and storing the resulting data. NgRx is very useful for that purpose, but you can do a lot more with the Flux pattern to manage all of your application's state. A quick overview of what I implemented here:

- [The board reducer](src/app/store/board.reducer.ts) contains most of the logic used to produce the state of the currently active Tetromino and the game board.
- [The game reducer](src/app/store/tetris.reducer.ts) combines the board reducer and other reducers to maintain the entire application state.
- [The selectors](src/app/store/selectors.ts) are mostly very simple. The most interesting one is the grid selector, which turns the multidimensional game board and state into a single-dimensional array that is easy to turn into a visual game board using CSS-Grid in the [App Component](src/app/app.component.html)
- [The effects](src/app/store/tetris.effects.ts) manage a few other stateful things. They don't just fire on actions, but on some state changes as well (such as higher scores leading to speed increases, or the removal of filled lines when a tetromino merges with the board). In addition, the mapping of key-presses to actions to be fired through a normal TypeScript Map is interesting, I think.

There are zero tests in this repository, so I'm sure it's filled with bugs. But the current setup and the nature of functional, reactive programming makes it very easy to add comprehensive unit tests. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
