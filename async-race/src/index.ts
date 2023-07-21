import pageView from './view/pageView';
import './style.css';

pageView();

const toGarage = <HTMLElement>document.querySelector('.to_garage');
const toWinners = <HTMLElement>document.querySelector('.to_winners');
const garage = <HTMLElement>document.querySelector('#garage-page');
const winners = <HTMLElement>document.querySelector('#winners-page');

toGarage.addEventListener('click', () => {
  winners.classList.add('hidden');
  garage.classList.remove('hidden');
});

toWinners.addEventListener('click', () => {
  garage.classList.add('hidden');
  winners.classList.remove('hidden');
});

console.log('Async-race');
