import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {MovieService} from '../movies/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs!: Subscription;
  userIsAuthenticated = false;


  constructor(private movieService: MovieService) {
  }

  @Output() public sideNavToggle = new EventEmitter();

  searchText!: string;

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  onToggleSidenav = () => {
    this.sideNavToggle.emit();
  }

  sendText() {
    this.movieService.sendSearchText(this.searchText);
  }


}
