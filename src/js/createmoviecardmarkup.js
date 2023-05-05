import { checkAverange } from './checkrateaverage';

export function createMovieCardMarkup(movies) {
  return movies
    .map(movie => {
      const IMAGE_URL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      const year = movie.release_date.slice(0, 4);

      return `
        <li class="movie-gallery__item">
            <div class="movie-gallery__wrap">
                <a href="#" class="movie-gallery__link" data-id='${movie.id}'>
                    <img src="${IMAGE_URL}" alt="${
        movie.original_title
      }" class="movie-gallery__image"/>
			<div class="movie-gallery__thumb">
                <div class="movie-gallery__info">
                <p class="movie-gallery__name">${movie.original_title}</p>
                <p class="movie-gallery__year">${year}</p>
                </div>
                <p class="movie-gallery__range">
                <img src="${checkAverange(movie.vote_average)}" alt="range" />
                </p>
            </div>
                </a>
            </div>
            
        </li>`;
    })
    .join('');
}