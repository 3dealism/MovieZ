import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../movie.model';
import {MovieService} from '../movie.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {HeaderComponent} from '../../header/header.component';
import {MatDialog} from '@angular/material/dialog';
import {MovieDetailsComponent} from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [HeaderComponent]
})

export class MovieListComponent implements OnInit, OnDestroy {

  searchText!: string;
  movies: Movie[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  private moviesSub!: Subscription; // ! for ignoring initialization
  private authStatusSub!: Subscription;
  userId!: string | undefined;
  private movieId!: string | any;

  constructor(public movieService: MovieService, private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.isLoading = true;
    this.movieService.getMovies();
    this.userId = this.authService.getUserId();
    this.moviesSub = this.movieService.getMovieUpdateListener().subscribe((movies: Movie[]) => {
      this.isLoading = false;
      this.movies = movies;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((isAuthenticated: boolean) => {
    this.userIsAuthenticated = isAuthenticated;
    this.userId = this.authService.getUserId();
      });
    this.movieService.searchText$.subscribe(searchInput => {
      this.searchText = searchInput;
     });
  }

  onDelete(movieId: string) {
    this.movieService.deleteMovie(movieId);
  }

  ngOnDestroy() {
    this.moviesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onPosterClicked(movieId: string) {
    this.movieId = movieId;
  }

  getMovieDetails(movieId: string) {
    this.dialog.open(MovieDetailsComponent, {
      height: '100%',
      width: '800px',
      data: {
        movieId
      }
    });
  }

}
