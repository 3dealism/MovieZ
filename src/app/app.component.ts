import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {MovieService} from './movies/movie.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private movieService: MovieService) {
  }

  searchText!: string;
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;


  sendGenre(genre: string) {
    this.movieService.sendSearchText(genre);
  }

  ngOnInit(): void {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.movieService.searchText$.subscribe(searchInput => {
      this.searchText = searchInput;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  Logout() {
    this.authService.logout();
    console.log('User is ' + this.userIsAuthenticated);
    console.log(this.authService.getIsAuth());
  }
}
