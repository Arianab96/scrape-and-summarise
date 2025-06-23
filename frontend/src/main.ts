import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { WebScraperFormComponent } from './app/web-scraper-form.component';

bootstrapApplication(WebScraperFormComponent, appConfig)
  .catch((err) => console.error(err));
