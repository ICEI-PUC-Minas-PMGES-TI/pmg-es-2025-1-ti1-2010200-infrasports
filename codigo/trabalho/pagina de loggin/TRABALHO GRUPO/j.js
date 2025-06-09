const apiUrl = 'http://localhost:3000/movies';

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('#nav-menu a');

function createMovieCard(movie) {
  const col = document.createElement('div');
  col.className = 'col';

  const card = document.createElement('div');
  card.className = 'card bg-black text-white h-100 border-danger';
  card.style.cursor = 'pointer';

  const img = document.createElement('img');
  img.src = movie.imagem;
  img.alt = movie.titulo + ' Poster';
  img.className = 'card-img-top';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h3');
  title.className = 'card-title text-danger';
  title.textContent = movie.titulo;
  title.style.cursor = 'pointer';
  title.addEventListener('click', (event) => {
      event.stopPropagation();
      window.open(movie.wiki, '_blank', 'noopener,noreferrer');
  });

  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = movie.descricao;

  const rating = document.createElement('p');
  rating.className = 'card-text';
  rating.textContent = '⭐ ' + (movie.avaliacao || 'N/A');

  const button = document.createElement('button');
  button.className = 'btn btn-danger w-100';
  button.textContent = 'Watch Now';

  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(rating);
  cardBody.appendChild(button);

  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  // Add click event to show modal with movie details
  card.addEventListener('click', () => {
      const modalTitle = document.getElementById('modalTitle');
      const modalAuthor = document.getElementById('modalAuthor');
      const modalContent = document.getElementById('modalContent');

      modalTitle.textContent = movie.titulo;
      modalAuthor.textContent = 'Director: ' + movie.autor;
      modalContent.textContent = movie.conteudo;

      const movieDetailModal = new bootstrap.Modal(document.getElementById('movieDetailModal'));
      movieDetailModal.show();
  });

  return col;
}

async function fetchMovies() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erro ao buscar os filmes: ' + response.statusText);
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function renderCatalog() {
  const catalogContainer = document.getElementById('movie-catalog');
  catalogContainer.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'row row-cols-1 row-cols-md-3 g-4';

  const movies = await fetchMovies();

  movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      row.appendChild(movieCard);
  });

  catalogContainer.appendChild(row);
}

function showSection(sectionId) {
  sections.forEach(section => {
      if (section.id === sectionId) {
          section.classList.add('active');
      } else {
          section.classList.remove('active');
      }
  });
}

function createCarouselItem(movie, isActive) {
  const carouselItem = document.createElement('div');
  carouselItem.className = 'carousel-item' + (isActive ? ' active' : '');

  const img = document.createElement('img');
  img.src = movie.imagem;
  img.className = 'd-block w-100';
  img.alt = movie.titulo + ' Poster';
  img.style.maxHeight = '400px';
  img.style.objectFit = 'cover';
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = movie.titulo;
    modalAuthor.textContent = 'Director: ' + movie.autor;
    modalContent.textContent = movie.conteudo;

    const movieDetailModal = new bootstrap.Modal(document.getElementById('movieDetailModal'));
    movieDetailModal.show();
  });

  carouselItem.appendChild(img);
  return carouselItem;
}

async function renderFeaturedCarousel() {
  const carouselInner = document.getElementById('carousel-inner');
  carouselInner.innerHTML = '';

  const movies = await fetchMovies();

  // Use first 3 movies as featured
  const featuredMovies = movies.slice(0, 3);

  featuredMovies.forEach((movie, index) => {
    const carouselItem = createCarouselItem(movie, index === 0);
    carouselInner.appendChild(carouselItem);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderFeaturedCarousel();
  showSection('home');
});
