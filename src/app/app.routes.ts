import { Routes } from '@angular/router';
import { MusiciansComponent } from './musicians/musicians.component';
import { AddMusicianComponent } from './add-musician/add-musician.component';
import { UpdateMusicianComponent } from './update-musician/update-musician.component';

export const routes: Routes = [
  { path: 'musicians', component: MusiciansComponent },
  { path: 'add-musician', component: AddMusicianComponent },
  { path: 'updateMusician/:id', component: UpdateMusicianComponent },
  { path: '', redirectTo: 'musicians', pathMatch: 'full' }
];
