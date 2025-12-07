import { Routes } from '@angular/router';
import { PesertaComponent } from './peserta/peserta';

export const routes: Routes = [
    { path: '', component: PesertaComponent },
    { path: 'peserta', component: PesertaComponent }
];