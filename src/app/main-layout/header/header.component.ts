import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateDataService } from '../../services/translate-data.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    public translateDataService: TranslateDataService,
    private store: Store,
  ) {}

  public logout(): void {
    this.store.dispatch(AuthActions.logOut());
  }
}
