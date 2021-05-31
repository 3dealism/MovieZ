import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieService} from '../movie.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Movie} from '../movie.model';
import {mimeType} from './mime-type.validator';

interface Genre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})

export class MovieAddComponent implements OnInit {

  genres: Genre[] = [
    {value: 'Action', viewValue: 'Action'},
    {value: 'Science-Fiction', viewValue: 'Science-Fiction'},
    {value: 'Comedy', viewValue: 'Comedy'},
    {value: 'Fantasy', viewValue: 'Fantasy'},
    {value: 'Horror', viewValue: 'Horror'},
    {value: 'Animation', viewValue: 'Animation'},
    {value: 'Documentary', viewValue: 'Documentary'},
    {value: 'Drama', viewValue: 'Drama'},
    {value: 'Romance', viewValue: 'Romance'},
    {value: 'Thriller', viewValue: 'Thriller'},
    {value: 'Adult', viewValue: 'Adult'}
  ];

  years: Array<any> = [];
  movie!: Movie;
  isLoading = false;
  form!: FormGroup;
  posterPreview?: string;
  private mode = 'add';
  private movieId?: string | null;

  constructor(
    public movieService: MovieService,
    public route: ActivatedRoute) {

    for (let i = 2020; i >= 1900; i--) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      director: new FormControl(null, {validators: [Validators.required]}),
      genre: new FormControl(null, {validators: [Validators.required]}),
      year: new FormControl(null),
      poster: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movieId')) {
        this.mode = 'edit';
        this.movieId = paramMap.get('movieId') as string;
        this.isLoading = true;
        this.movieService.getMovie(this.movieId).subscribe(movieData => {
          this.isLoading = false;
          this.movie = {
            id: movieData._id,
            title: movieData.title,
            director: movieData.director,
            genre: movieData.genre,
            year: movieData.year,
            posterPath: movieData.posterPath,
          };
          this.form.setValue({
            title: this.movie.title,
            director: this.movie.director,
            genre: this.movie.genre,
            year: this.movie.year,
            poster: this.movie.posterPath
          });
        });
      } else {
        this.mode = 'add';
        this.movieId = null;
      }
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    this.form.patchValue({poster: file});
    this.form.get('poster')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.posterPreview = reader.result as string;
    };
    reader.readAsDataURL(file as File);
  }

  onSaveMovie() {
    if (this.form.invalid) {
      console.log('Form is invalid!!!');
      return;
    }
    this.isLoading = true;
    if (this.mode === 'add') {
      this.movieService.addMovie(
        this.form.value.title,
        this.form.value.director,
        this.form.value.genre,
        this.form.value.year,
        this.form.value.poster
      );
    } else {
      this.movieService.updateMovie(this.movieId as string, this.form.value.title, this.form.value.director,
        this.form.value.genre, this.form.value.year, this.form.value.poster);
    }
    this.form.reset();
  }
}
