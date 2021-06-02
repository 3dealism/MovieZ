# The MovieZ App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

## Development server

Run `ng serve` for a dev server and `nodemon server` for the database. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

docker run --rm -it -p 4201:4200 moviez

## Production server

Run `npm start` for a proxy prod server. (In case the backend server is not starting automatically per script run `nodemon server`) Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Instructions / Annotations

The images which are very important in this app are stored in the `backend/images` folder. During image file upload we only store the path of the image file in the db to keep it small and performant.
Only jpgs and pngs are allowed. We kept the whole app in a defined design/style and it should be responsive.
We tested the App with Chrome which is highly recommended, Firefox and Safari too.


## Features
- overall responsive appealing design/style, dynamic and modern
- dark themed
- users can display all movies in the database
- with the search you can filter by anything (e.g. title, director, genre) and display only the movies you want
- with the sidenav you can directly show movies by genre
- users can sign up or log in to be able to manage the movies
  - logged in users can add new movies, edit or delete existing ones
  - they can upload images (type: jpg, jpeg or png)
- logged in users can post comments to selected movies
  - logged in users can log themselves out or are automatically logged out after 1 hour
  - baerer authentification
- on the movie details page movie information data is fetched from
  openmdb and themoviedb API, those are filtered and star rating, the movie plot and the trailer of the movie
  are displayed. 
  - trailers can be directly watched in a popup window and exited by clicking outside of the window
  - it's selfexplainary that only for existing movie titles trailers are gonna be found


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
