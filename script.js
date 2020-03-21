const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// Initial count and total set

updateSelectedCount();


// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)
    )

localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
    const selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount 
  total.innerText = selectedSeatsCount * ticketPrice;
    
    
}

// Save Selected movie index and its price
function setMovieData(movieIndex, moviePrice) {

    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selected'));

if (selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
        if(selectedSeats.indexOf(index) > -1 ) {
            seat.classList.add('slected')
        }
    })
}
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
  
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  
    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }
  

// Event Listeners 

// Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount('')
})

// Seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateSelectedCount('');
    }
})


// Refresh Page Listner 

refresh.addEventListener('click', () => {location.reload();})

// Clear Storage Listner 
clear.addEventListener('click', (e) => {
    localStorage.setItem('selectedMovieIndex', null);
    localStorage.setItem('selectedMoviePrice', null);
    localStorage.setItem('selectedSeats', null);

    
    location.reload();
return false;
})