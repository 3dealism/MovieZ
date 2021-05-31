import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MovieAddComponent} from './movies/movie-add/movie-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFileUploadModule} from 'mat-file-upload';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthInterceptor} from './auth/auth-interceptor';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatDialogModule} from '@angular/material/dialog';
import {MovieDetailsComponent} from './movies/movie-details/movie-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PlayerComponent} from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieAddComponent,
    HeaderComponent,
    MovieListComponent,
    LoginComponent,
    SignupComponent,
    MovieDetailsComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    HttpClientModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  exports: [MatDialogModule],
  entryComponents: [
    MovieAddComponent,
    MovieDetailsComponent]

})
export class AppModule {
}
