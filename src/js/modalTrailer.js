import { getMovieTrailer } from './fetchmoviedata';

// const heroEl = document.querySelector('.hero');
// const youTubePlayerEl = document.querySelector('.iframe-trailer');
// const trailerBackdropEl = document.querySelector('.trailer-modal__backdrop');
// const trailerCloseBtnEl = document.querySelector(
//   '.trailer-modal__button-colse'
// );
// const trailerContainerEl = document.querySelector('.trailer-container');
// const noMovieContainerEl = document.querySelector('.no-movie-container');

// heroEl.addEventListener('click', onTrailerBtnClick);

// async function onTrailerBtnClick(e) {
//   const trailerBtn = e.target;

//   if (trailerBtn.classList.contains('hero__btn')) {
//     //=========================== Start spinner
//     document.body.classList.remove('loaded');
//     //============================
//     showTrailerModal();

//     trailerContainerEl.classList.remove('trailer-is-hidden');
//     noMovieContainerEl.classList.add('trailer-is-hidden');

//     const movieId = trailerBtn.dataset.id;
//     await renderTrailer(movieId);

//     //===================== Stop spinner
//     window.setTimeout(function () {
//       document.body.classList.add('loaded');
//     }, 500);
//     //=====================
//   }
// }

// function showTrailerModal() {
//   document.body.classList.add('show-trailer-modal');
//   window.addEventListener('keydown', onEscPress);
//   trailerBackdropEl.addEventListener('click', onBackdropClick);
//   trailerCloseBtnEl.addEventListener('click', closeModal);
// }

// function onEscPress(e) {
//   if (e.code === 'Escape') {
//     closeModal();
//   }
// }

// function onBackdropClick(e) {
//   const backdrop = e.target;
//   if (backdrop.classList.contains('trailer-modal__backdrop')) {
//     closeModal();
//   }
// }

// function closeModal() {
//   document.body.classList.remove('show-trailer-modal');
//   youTubePlayerEl.src = '';
//   window.removeEventListener('keydown', onEscPress);
//   trailerBackdropEl.removeEventListener('click', onBackdropClick);
//   trailerCloseBtnEl.removeEventListener('click', closeModal);

//   trailerContainerEl.classList.add('trailer-is-hidden');
//   noMovieContainerEl.classList.remove('trailer-is-hidden');
// }

// async function renderTrailer(movieId) {
//   let movieTrailerKey = await getRandomTrailerKey(movieId);

//   youTubePlayerEl.src = `https://www.youtube.com/embed/${movieTrailerKey}`;
// }

// async function getRandomTrailerKey(movieId) {
//   const movieTrailers = await getMovieTrailer(movieId);

//   const min = 0;
//   const max = movieTrailers.results.length;
//   const randomTrailer = Math.floor(Math.random() * (max - min + 1)) + min;

//   const movieTrailerKey = movieTrailers.results[randomTrailer]?.key;

//   if (!movieTrailerKey) {
//     trailerContainerEl.classList.add('trailer-is-hidden');
//     noMovieContainerEl.classList.remove('trailer-is-hidden');
//     return;
//   }

//   return movieTrailerKey;
// }
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero').addEventListener('click', event => {
    const watchTrailerBtn = event.target.closest('.hero__btn');
    if (watchTrailerBtn) {
      const movieId = watchTrailerBtn.getAttribute('data-id');
      loadTrailerById(movieId);
    }
  });

  const modal = document.querySelector('.trailer-modal');
  const trailerElement = modal.querySelector('.trailer-element');
  const closeButton = modal.querySelector('.close-btn__svg');

  async function loadTrailerById(movieId) {
    try {
      const movieTrailer = await getMovieTrailer(movieId);
      const videos = movieTrailer.results;
      if (videos.length > 0) {
        const videoKey = videos[0].key;
        const trailerUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
        showTrailerModal(trailerUrl);
      } else {
        showNoVideoMessage();
      }
    } catch (error) {
      console.error('Request video error', error);
    }

    closeButton.style.display = 'block';
  }

  function showTrailerModal(trailerUrl) {
    trailerElement.setAttribute('src', trailerUrl);
    modal.style.display = 'block';
    modal.classList.remove('hidden');

    const noVideoMsg = modal.querySelector('.no-video-msg');
    noVideoMsg.classList.remove('hidden');
    noVideoMsg.classList.remove('error-msg');

    document.addEventListener('click', handleOutsideClick);
  }

  function showNoVideoMessage() {
    const noVideoMsg = modal.querySelector('.no-video-msg');
    noVideoMsg.classList.remove('hidden');
    noVideoMsg.classList.add('error-msg');
  }

  closeButton.addEventListener('click', closeTrailerModal);

  function closeTrailerModal() {
    trailerElement.setAttribute('src', '');
    modal.style.display = 'none';
    closeButton.style.display = 'none';
    const noVideoMsg = modal.querySelector('.no-video-msg');
    noVideoMsg.classList.add('hidden');
    noVideoMsg.classList.remove('error-msg');
    document.removeEventListener('click', handleOutsideClick);
  }

  function handleOutsideClick(event) {
    if (!modal.contains(event.target)) {
      closeTrailerModal();
    }
  }

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeTrailerModal();
    }
  });
});
