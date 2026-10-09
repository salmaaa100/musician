import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Musician } from '../models/musician.model';
import { Genre } from '../models/genre.model';
import { MusicianService } from '../services/musician.service';

@Component({
  selector: 'app-musicians',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './musicians.component.html',
  styleUrl: './musicians.component.css'
})
export class MusiciansComponent {
  musicians: Musician[];
  genres: Genre[];
  nomRecherche: string = '';
  idGenreRecherche: number = 0;

  constructor(private musicianService: MusicianService) {
    this.musicians = musicianService.listeMusicians();
    this.genres = musicianService.listeGenres();
  }

  supprimerMusician(m: Musician): void {
    if (confirm('Etes-vous sûr de vouloir supprimer ce musicien ?')) {
      this.musicianService.supprimerMusician(m);
      this.appliquerFiltres();
    }
  }

  appliquerFiltres(): void {
    let resultat = this.musicianService.listeMusicians();
    if (this.nomRecherche.trim() !== '') {
      resultat = this.musicianService.rechercherParNom(this.nomRecherche).filter(m => resultat.includes(m));
    }
    if (this.idGenreRecherche != 0) {
      resultat = resultat.filter(m => m.genre?.idGenre == this.idGenreRecherche);
    }
    this.musicians = resultat;
  }

  reinitialiser(): void {
    this.nomRecherche = '';
    this.idGenreRecherche = 0;
    this.musicians = this.musicianService.listeMusicians();
  }
}
