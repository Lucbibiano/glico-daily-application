import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from './states/app.state';
import * as AuthActions from './states/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
  ) {
    const lang = localStorage.getItem('lang') || 'pt';
    this.translate.setFallbackLang('pt');
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.initializeSession());
  }
}
