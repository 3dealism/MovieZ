export interface Movie{
  id: string;
  title: string;
  director: string;
  genre: string;
  year: string;
  posterPath: string;
  // poster: File | string;
  // ratings: string;
}
export interface Comment{
  id: string;
  username: string;
  content: string;
  movieId: string;
}

