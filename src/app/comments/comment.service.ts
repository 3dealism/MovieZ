import {Comment} from './comment.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

// provides the service on the root level, angular creates only one instance of the service
@Injectable({providedIn: 'root'})

export class CommentService {

  private comments: Comment[] = [];
  private commentsUpdated = new Subject<Comment[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getComments() {
    this.http.get<{ message: string, comments: any }>('http://localhost:3000/api/comments')
      .pipe(map(commentData => {
        return commentData.comments.map((comment: { username: any; content: any; movieId: any; _id: any; }) => {
          return {
            username: comment.username,
            content: comment.content,
            movieId: comment.movieId,
            id: comment._id
          };
        });
      })).subscribe((transformedComments) => {
      this.comments = transformedComments;
      this.commentsUpdated.next([...this.comments]);
    });
  }

  getCommentUpdateListener() {
    return this.commentsUpdated.asObservable();
  }

  getComment(movieId: string) {

    return this.http.get<{
      _id: string,
      username: string,
      content: string,
      movieId: string
    }>('http://localhost:3000/api/comments/' + movieId);
  }

  addComment(id: string, username: string, content: string, movieId: string) {

    const commentData: Comment = {
      id,
      username,
      content,
      movieId
    };
    console.log(commentData);
    this.http.post<{ message: string, comment: Comment }>(
      'http://localhost:3000/api/comments/' + movieId , commentData)
      .subscribe((response => {
        console.log(response);
        // this.router.navigate(['/']);
      }));
  }

  updateComment(id: string, username: string, content: string, movieId: string) {
    let commentData: Comment | FormData;
    commentData = {
        id, username, content, movieId
      };
    this.http.put('http://localhost:3000/api/comments/' + id, commentData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  deleteComment(commentId: string) {
    this.http.delete('http://localhost:3000/api/comments/' + commentId)
      .subscribe(() => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
        this.commentsUpdated.next([...this.comments]);
      });
  }

}
