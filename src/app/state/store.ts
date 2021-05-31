import {Movie} from '../movies/movie.model';
import {Store, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';

export interface MovieState {
  movies: Movie[];
  comments: Comment[];
}

export const getInitialState = () => {
  return {
    movies: [],
    comments: []
  };
};

@Injectable({
  providedIn: 'root'
})

@StoreConfig({name: 'movie'})
export class MovieStore extends Store<MovieState> {
  constructor() {
    super(getInitialState());
  }
}
