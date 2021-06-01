import {Movie} from './movie.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

// provides the service on the root level, angular creates only one instance of the service
@Injectable({providedIn: 'root'})

export class MovieService {

  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();
  private searchTextSource = new Subject<string>();
  searchText$ = this.searchTextSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  sendSearchText(filterText: string) {
    this.searchTextSource.next(filterText);
  }

  getMovies() {
    this.http.get<{ message: string, movies: any }>('http://localhost:3000/api/movies')
      .pipe(map(movieData => {
        return movieData.movies.map((movie: {
          title: any; director: any; genre: any;
          year: any; posterPath: any; _id: any; creator: any;
        }) => {
          return {
            title: movie.title,
            director: movie.director,
            genre: movie.genre,
            year: movie.year,
            posterPath: movie.posterPath,
            id: movie._id,
            creator: movie.creator,
          };
        });
      })).subscribe((transformedMovies) => {
      console.log(transformedMovies);
      this.movies = transformedMovies;
      this.moviesUpdated.next([...this.movies]);
    });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  getMovie(id: string) {

    return this.http.get<{
      _id: string,
      title: string,
      director: string,
      genre: string,
      year: string,
      posterPath: string
    }>('http://localhost:3000/api/movies/' + id);
  }

  addMovie(title: string, director: string, genre: string, year: string, poster: File) {
    const movieData = new FormData();
    movieData.append('title', title);
    movieData.append('director', director);
    movieData.append('genre', genre);
    movieData.append('year', year);
    movieData.append('poster', poster, title);

    this.http.post<{ message: string, movie: Movie }>(
      'http://localhost:3000/api/movies', movieData)
      .subscribe((() => {
        this.router.navigate(['/']);
      }));
  }

  updateMovie(id: string, title: string, director: string, genre: string, year: string, poster: File | string) {
    let movieData: Movie | FormData;
    if (typeof poster === 'object') {
      movieData = new FormData();
      movieData.append('id', id);
      movieData.append('title', title);
      movieData.append('director', director);
      movieData.append('genre', genre);
      movieData.append('year', year);
      movieData.append('poster', poster, title);
    } else {
      movieData = {
        id, title, director, genre, year, posterPath: poster
      };
    }
    this.http.put('http://localhost:3000/api/movies/' + id, movieData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  deleteMovie(movieId: string) {
    this.http.delete('http://localhost:3000/api/movies/' + movieId)
      .subscribe(() => {
        this.movies = this.movies.filter(movie => movie.id !== movieId);
        this.moviesUpdated.next([...this.movies]);
      });
  }

}
