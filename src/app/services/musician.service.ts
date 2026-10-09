import { Injectable } from '@angular/core';
import { Musician } from '../models/musician.model';
import { Genre } from '../models/genre.model';

@Injectable({ providedIn: 'root' })
export class MusicianService {
  genres: Genre[] = [
    { idGenre: 1, nomGenre: 'Classique' },
    { idGenre: 2, nomGenre: 'Jazz' },
    { idGenre: 3, nomGenre: 'Rock' },
    { idGenre: 4, nomGenre: 'Malouf' }
  ];

  musicians: Musician[] = [
    { idMusician: 1, nom: 'Ahmed Ben Ali', instrument: 'Guitare', dateNaissance: new Date('1995-03-12'), genre: this.genres[2] },
    { idMusician: 2, nom: 'Sarra Trabelsi', instrument: 'Piano', dateNaissance: new Date('1998-07-25'), genre: this.genres[0] },
    { idMusician: 3, nom: 'Karim Jlassi', instrument: 'Saxophone', dateNaissance: new Date('2000-01-08'), genre: this.genres[1] },
    { idMusician: 4, nom: 'Mouna Gharbi', instrument: 'Oud', dateNaissance: new Date('1992-11-30'), genre: this.genres[3] }
  ];

  listeMusicians(): Musician[] {
    return this.musicians;
  }

  listeGenres(): Genre[] {
    return this.genres;
  }

  consulterGenre(id: number): Genre {
    return this.genres.find(g => g.idGenre == id)!;
  }

  prochainId(): number {
    return this.musicians.length === 0 ? 1 : Math.max(...this.musicians.map(m => m.idMusician)) + 1;
  }

  ajouterMusician(m: Musician): void {
    this.musicians.push(m);
  }

  supprimerMusician(m: Musician): void {
    const index = this.musicians.indexOf(m);
    if (index > -1) {
      this.musicians.splice(index, 1);
    }
  }

  consulterMusician(id: number): Musician {
    return this.musicians.find(m => m.idMusician == id)!;
  }

  updateMusician(m: Musician): void {
    const index = this.musicians.findIndex(x => x.idMusician == m.idMusician);
    this.musicians[index] = m;
  }

  rechercherParGenre(idGenre: number): Musician[] {
    return this.musicians.filter(m => m.genre?.idGenre == idGenre);
  }

  rechercherParNom(nom: string): Musician[] {
    return this.musicians.filter(m => m.nom.toLowerCase().includes(nom.toLowerCase()));
  }
}
