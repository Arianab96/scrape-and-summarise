import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScraperService } from './services/scraper.service';

@Component({
  selector: 'web-scraper-form',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './web-scraper-form.component.html',
  styleUrl: './web-scraper-form.component.scss'
})
export class WebScraperFormComponent {
  title = 'scrape-and-summarise';

  isLoading = false;
  results: any = null;
  error: string = '';

    urlForm = new FormGroup({
    url: new FormControl('', [
    Validators.required,
    Validators.pattern(/^https?:\/\/.+/)
    ])
});

 constructor(private scraperService: ScraperService) {}

 onSubmit() {
    if (this.urlForm.valid) {
      const url = this.urlForm.value.url;

      if (url) {
        console.log('Submitting URL:', url);

        this.results = null;
        this.error = '';
        this.isLoading = true;

        this.scraperService.scrapeUrl(url).subscribe({
          next: (response) => {
            console.log('Response received:', response);
            this.isLoading = false;

            if (response.success) {
              this.results = response.data;
            } else {
              this.error = response.error || 'Unknown error occurred';
            }
          },
          error: (error) => {
            console.error('Error occurred:', error);
            this.isLoading = false;
            this.error = 'Failed to connect to server';
          }
        });
      }
    }
  }
}
