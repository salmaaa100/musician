import { Genre } from './genre.model';

export class Musician {
  idMusician: number = 0;
  nom: string = '';
  instrument: string = '';
  dateNaissance: Date = new Date();
  genre?: Genre;
}
