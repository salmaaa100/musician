import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Musician } from '../models/musician.model';
import { Genre } from '../models/genre.model';
import { MusicianService } from '../services/musician.service';

@Component({
  selector: 'app-update-musician',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './update-musician.component.html',
  styleUrl: './update-musician.component.css'
})
export class UpdateMusicianComponent implements OnInit {
  currentMusician = new Musician();
  genres: Genre[];
  idGenreChoisi: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private musicianService: MusicianService
  ) {
    this.genres = musicianService.listeGenres();
  }

  ngOnInit(): void {
    this.currentMusician = this.musicianService.consulterMusician(this.activatedRoute.snapshot.params['id']);
    this.idGenreChoisi = this.currentMusician.genre?.idGenre ?? 1;
  }

  changerDate(valeur: string): void {
    if (valeur) {
      this.currentMusician.dateNaissance = new Date(valeur);
    }
  }

  updateMusician(): void {
    this.currentMusician.genre = this.musicianService.consulterGenre(this.idGenreChoisi);
    this.musicianService.updateMusician(this.currentMusician);
    this.router.navigate(['musicians']);
  }
}
