import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { TetrisEffects } from './store/tetris.effects';
import { FEATURE_STATE_KEY, reducer } from './store/tetris.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    StoreModule.forFeature(FEATURE_STATE_KEY, reducer),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([TetrisEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
