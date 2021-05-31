import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {MovieAddComponent} from './movies/movie-add/movie-add.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import {MovieDetailsComponent} from './movies/movie-details/movie-details.component';

const routes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'add', component: MovieAddComponent, canActivate: [AuthGuard]},
  {path: 'edit/:movieId', component: MovieAddComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'details/:movieId', component: MovieDetailsComponent},
  {path: 'details', component: MovieDetailsComponent},
  {path: 'comments/:movieId', component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {
}
