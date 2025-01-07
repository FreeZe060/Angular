import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import localefr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localefr);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  