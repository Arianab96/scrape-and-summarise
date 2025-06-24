import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ScrapeRequest {
  url: string;
}

interface ScrapeResponse {
  success: boolean;
  data?: {
    title: string;
    content: string;
    summary?: string;
  };
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  scrapeUrl(url: string): Observable<ScrapeResponse> {
    const request: ScrapeRequest = { url };

    return this.http.post<ScrapeResponse>(`${this.apiUrl}/scrape`, request);
  }
}
