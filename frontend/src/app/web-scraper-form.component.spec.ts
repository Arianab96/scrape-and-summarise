import { TestBed } from '@angular/core/testing';
import { WebScraperFormComponent } from './web-scraper-form.component';

describe('WebScraperFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebScraperFormComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WebScraperFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'scrape-and-summarise' title`, () => {
    const fixture = TestBed.createComponent(WebScraperFormComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('scrape-and-summarise');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WebScraperFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, scrape-and-summarise');
  });
});
