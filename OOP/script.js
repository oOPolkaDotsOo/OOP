class Movie {
    constructor(id, title, poster) {
      this.id = id;
      this.title = title;
      this.poster = poster;
    }
  }
  
  class Cinema {
    constructor() {
      this.movies = [];
    }
  
    addMovie(movie) {
      this.movies.push(movie);
    }
  
    getMovieById(id) {
      return this.movies.find((movie) => movie.id === id);
    }
  }
  
  const cinema = new Cinema();
  
  cinema.addMovie(new Movie(1, "Movie 1", "movie1-poster.jpg"));
  cinema.addMovie(new Movie(2, "Movie 2", "movie2-poster.jpg"));
  cinema.addMovie(new Movie(3, "Movie 3", "movie3-poster.jpg"));
  
  const movieSelect = document.getElementById("movie-select");
  const moviePoster = document.getElementById("movie-poster");
  
  movieSelect.addEventListener("change", () => {
    const selectedMovieId = parseInt(movieSelect.value);
    if (selectedMovieId !== 0) {
      const selectedMovie = cinema.getMovieById(selectedMovieId);
      moviePoster.src = selectedMovie.poster;
      moviePoster.alt = selectedMovie.title;
      moviePoster.style.display = "block";
    } else {
      moviePoster.style.display = "none";
    }
  });
  
  const seatMap = document.getElementById("seat-map");
  const selectedSeatsDisplay = document.getElementById("selected-seats");
  
  let selectedSeats = [];
  
  seatMap.addEventListener("click", (event) => {
    const seat = event.target.closest(".seat");
    if (seat && !seat.classList.contains("occupied")) {
      seat.classList.toggle("selected");
      const seatNumber = seat.getAttribute("data-seat");
  
      const seatIndex = selectedSeats.indexOf(seatNumber);
      if (seatIndex > -1) {
        selectedSeats.splice(seatIndex, 1);
      } else {
        selectedSeats.push(seatNumber);
      }
  
      updateSelectedSeatsDisplay();
    }
  });
  
  function updateSelectedSeatsDisplay() {
    selectedSeatsDisplay.innerText = selectedSeats.join(", ");
  }
  
  const bookingForm = document.getElementById("booking-form");
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
  
    const ticketContainer = document.getElementById("ticket-container");
    ticketContainer.innerHTML = `
      <h2>Booking Confirmation</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Selected Seats: ${selectedSeats.join(", ")}</p>
      <p>Enjoy the movie!</p>
    `;
  
    selectedSeats = [];
    updateSelectedSeatsDisplay();
  });
  
  const bookButton = document.getElementById("book-btn");
  bookButton.addEventListener("click", () => {
    bookingForm.dispatchEvent(new Event("submit"));
  });
  
  function updateMoviePoster() {
    const movieSelect = document.getElementById("movie-select");
    const selectedMovieId = parseInt(movieSelect.value);
    const moviePoster = document.getElementById("movie-poster");

    if (selectedMovieId !== 0) {
        const selectedMovie = cinema.getMovieById(selectedMovieId);
        moviePoster.src = selectedMovie.poster;
        moviePoster.alt = selectedMovie.title;
        moviePoster.style.display = "block";
    } else {
        moviePoster.style.display = "none";
    }
}