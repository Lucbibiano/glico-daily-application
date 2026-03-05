import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ContentComponent } from "../content/content.component";

@Component({
  selector: 'app-layout',
  imports: [FooterComponent, HeaderComponent, ContentComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor() {

  }

}
