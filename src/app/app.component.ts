import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    if (!lang || lang === 'ar') {
      document.getElementsByTagName('body')[0].className = 'ar rtl';
    } else {
      document.getElementsByTagName('body')[0].className = 'en';
    }
  }
}
