import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-scraping-app';

    urlForm = new FormGroup({
    url: new FormControl('', [
    Validators.required,
    Validators.pattern(/^https?:\/\/.+/)
    ])
});

 onSubmit() {
    console.log(this.urlForm.value);
  }
}
