import { Component } from '@angular/core';
import { TranslateDataService } from '../../services/translate-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(
    public translateDataService: TranslateDataService,
  ) {}

  protected changeLanguage(lang: string): void {
    this.translateDataService.updateData(lang);
  }
}
