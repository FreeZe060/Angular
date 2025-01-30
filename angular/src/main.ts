import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import localefr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localefr);

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        provideHttpClient(),
        { provide: LOCALE_ID, useValue: 'fr' },
        ...appConfig.providers,
    ]
}).catch((err) => console.error(err));
