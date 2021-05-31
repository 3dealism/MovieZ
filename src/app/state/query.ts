import {Query} from '@datorama/akita';
import {MovieState, MovieStore} from './store';
import {Observable} from 'rxjs';
import {Movie} from '../movies/movie.model';

export class MovieQuery extends Query<MovieState> {
  constructor(private movieStore: MovieStore) {
    super(movieStore);
  }

  getMovies(): Observable<Movie[]> {
    return this.select(state => state.movies);
  }
}
