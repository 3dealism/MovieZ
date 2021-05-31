import {Rating} from './rating.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthData} from '../auth/auth-data.model';
import {Comment} from '../comments/comment.model';
// import {response} from 'express';
import {Movie} from '../movies/movie.model';

@Injectable({providedIn: 'root'})

export class RatingService {

  constructor(private http: HttpClient, private router: Router) {
  }
  getRating(movieId: string) {
    return this.http.get<{
      _id: string,
      username: string,
      content: string,
      movieId: "aegq3rwt3zrhws"  // string
    }>('http://localhost:3000/api/rating/' + movieId);


  }


  addRating(value: number, movieId: string){
    this.getRating(movieId)
      .subscribe(res =>
      console.log(res))
    ;
    // const RatingData: Rating = { value: value, content: content, movieId: movieId };
  }

  createRating(movieId: string){
    const ratingData: Rating = {
      movieId: movieId,
      voters: 1,
      value: 3,
    };
    this.http.post<{ message: string, rating: Rating }>(
      'http://localhost:3000/api/rating/' + movieId , ratingData)
      .subscribe((res => {
        console.log(res);
        this.router.navigate(['/']);
      }));
  }
}

