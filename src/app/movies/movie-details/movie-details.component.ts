import {Component, Inject, OnInit} from '@angular/core';
import {Comment, Movie} from '../movie.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CommentService} from '../../comments/comment.service';
import {Subscription} from 'rxjs';
import {MovieService} from '../movie.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {PlayerComponent} from '../../player/player.component';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  userIsAuthenticated = false;
  comments: Comment[] = [];
  isLoading = false;
  formComments!: FormGroup;
  private commentsSub!: Subscription;
  private movieId?: string | null;
  private userId?: string | null;
  movie!: Movie;
  arr: any[] = [];
  omdbData: any[] = [];
  imdbId?: string;
  index = -1;
  trailerKey?: string | null;
  trailerData: any[] = [];
  imdbRatings?: string | null;
  plot?: string | null;
  private authListenerSubs!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commentService: CommentService,
    public movieService: MovieService,
    private dialog: MatDialog,
    public route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
  ) {
    this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }


  ngOnInit(): void {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.commentService.getComments();
    this.commentsSub = this.commentService.getCommentUpdateListener().subscribe((comments: Comment[]) => {
      this.isLoading = false;
      this.comments = comments;
    });
    this.formComments = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.movieId = this.data.movieId;
      this.isLoading = true;
      this.movieService.getMovie(this.data.movieId).subscribe(movieData => {
        this.isLoading = false;
        this.movie = {
          id: this.data.movieId,
          title: movieData.title,
          director: movieData.director,
          genre: movieData.genre,
          year: movieData.year,
          posterPath: movieData.posterPath,
        };
        this.getApiData();
      });
    });
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.data);

  }

  onSaveComment() {
    if (this.formComments.invalid) {
      console.log('Form is invalid!!!');
      return;
    }
    this.isLoading = true;
    this.commentService.addComment(
      '',
      this.formComments.value.username,
      this.formComments.value.content,
      this.movieId as string
    );
    this.formComments.reset();
    this.dialog.closeAll();
  }

  onDelete(movieId: string) {
    this.movieService.deleteMovie(movieId);
  }

  onClickItem(index: number) {
    this.index = index;
  }

  watchTrailer(trailerKey: string) {
    this.onTrailerClicked(trailerKey);
    this.getTrailerKey(trailerKey);
  }

  getApiData() {
    fetch('http://www.omdbapi.com/?s=' + this.movie.title + '&apikey=cf9b8912')
      .then(response => {
        console.log(response);
        response.json().then(res => {
          this.omdbData = res.Search;
          this.imdbId = res.Search[0].imdbID;
          console.log('IMDB ID is: ' + this.imdbId);
        }).then(() => {
          fetch('https://api.themoviedb.org/3/movie/' + this.imdbId + '/videos?api_key=08f95dd0e4f40aa9b610fac1711a79d3&language=en-US')
            .then(res2 => {
              console.log('Trailer is: ' + res2);
              res2.json().then(res3 => {
                this.trailerData = res3.results;
                this.trailerKey = res3.results[0].key;
                console.log(this.trailerKey);
              });
            }).then(() => {
            fetch('https://api.themoviedb.org/3/movie/' + this.imdbId + '?api_key=08f95dd0e4f40aa9b610fac1711a79d3')
              .then(res4 => {
                console.log('Voting' + res4);
                res4.json().then(res5 => {
                  this.imdbRatings = res5.vote_average;
                  this.plot = res5.overview;
                  console.log('Ratings: ' + this.imdbRatings);
                  if (this.imdbRatings != null) {
                    this.index = Math.trunc(parseFloat(this.imdbRatings) - 1);
                  }
                });
              });
          });
        });
      });
  }

  onTrailerClicked(trailerKey: string) {
    this.trailerKey = trailerKey;
  }

  getTrailerKey(trailerKey: string) {
    this.dialog.open(PlayerComponent, {
      height: '100%',
      width: '100%',
      data: {
        panelClass: 'popup',
        trailerKey
      }
    });
  }

}

