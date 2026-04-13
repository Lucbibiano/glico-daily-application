import { computed, effect, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateDataService {
  private _language = signal<string>('pt');

  public readonly language = this._language.asReadonly();

  // When the signal change the language we want to make a
  // boolean value avaliable based on signal value
  public readonly isPortuguese = computed(() => this.language() === 'pt');
  public readonly isEnglish = computed(() => this.language() === 'en');

  constructor(private translateService: TranslateService) {
    effect(() => {
      // When the signal change the language, we update the language on
      // translateService on signal effect as a side effect
      this.translateService.use(this.language());
    });
  }

  public updateData(newLanguage: string): void {
    this._language.set(newLanguage);
  }
}
