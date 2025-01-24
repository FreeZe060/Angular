import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import localefr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localefr);

bootstrapApplication(AppComponent, {
	...appConfig,
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr' },
		...appConfig.providers,
	],
})
	.catch((err) => console.error(err));
