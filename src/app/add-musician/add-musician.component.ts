import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Musician } from '../models/musician.model';
import { Genre } from '../models/genre.model';
import { MusicianService } from '../services/musician.service';

@Component({
  selector: 'app-add-musician',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './add-musician.component.html',
  styleUrl: './add-musician.component.css'
})
export class AddMusicianComponent {
  newMusician = new Musician();
  genres: Genre[];
  idGenreChoisi: number = 1;

  constructor(private musicianService: MusicianService, private router: Router) {
    this.genres = musicianService.listeGenres();
    this.newMusician.idMusician = musicianService.prochainId();
  }

  changerDate(valeur: string): void {
    if (valeur) {
      this.newMusician.dateNaissance = new Date(valeur);
    }
  }

  addMusician(): void {
    this.newMusician.genre = this.musicianService.consulterGenre(this.idGenreChoisi);
    this.musicianService.ajouterMusician(this.newMusician);
    this.router.navigate(['musicians']);
  }
}
