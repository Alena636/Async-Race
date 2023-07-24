import './view/pageView';
import './style.css';
import './pages/garage/car/carControls';

const toGarage = <HTMLElement>document.querySelector('.to_garage');
const toWinners = <HTMLElement>document.querySelector('.to_winners');
const garage = <HTMLElement>document.querySelector('#garage-page');
const winners = <HTMLElement>document.querySelector('#winners-page');

toGarage.addEventListener('click', () => {
  winners.classList.add('hidden');
  garage.classList.remove('hidden');
  toGarage.classList.add('active');
  toWinners.classList.remove('active');
});

toWinners.addEventListener('click', () => {
  garage.classList.add('hidden');
  winners.classList.remove('hidden');
  toWinners.classList.toggle('active');
  toGarage.classList.remove('active');
});

console.log('Async-race');
