import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PesertaComponent } from './peserta/peserta';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PesertaComponent],
  templateUrl: './app.html',

})
export class AppComponent {
  title = 'frontend-kursus';
}