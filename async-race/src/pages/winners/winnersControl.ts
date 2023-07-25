import { CarDesc } from '../../types/types';
import winnerView from '../../view/winnerView';
import { getCar } from '../garage/garageApi';
import { countWinnners, getWinners } from './winnersApi';

export let pageNumWin = 1;
const tableBodyWin = <HTMLElement>document.querySelector('.winners-table_body');
const count = <HTMLSpanElement>document.querySelector('.count-winners');
const prevWinBtn = <HTMLButtonElement>document.querySelector('.prev-win');
const nextWinBtn = <HTMLButtonElement>document.querySelector('.next-win');
const countPage = <HTMLElement>document.querySelector('.count-winners_page');

export const updateWin = () => {
  let numWin = (pageNumWin * 10) - 10;
  getWinners(pageNumWin).then((el: CarDesc[]) => {
    tableBodyWin.innerHTML = '';
    el.forEach((car) => {
      let name = '';
      let color = '';
      getCar(car.id).then((e) => {
        name = e.name;
        color = e.color;
        numWin += 1;

        const winner = `${winnerView(numWin, color, name, car.wins, car.time)}`;
        tableBodyWin.innerHTML += winner;
      });
    });
    count.textContent = `(${countWinnners})`;
  });
};
updateWin();

prevWinBtn.addEventListener('click', () => {
  if (pageNumWin === 1) {
    prevWinBtn.setAttribute('disabled', 'disabled');
  } else {
    nextWinBtn.removeAttribute('disabled');
    pageNumWin -= 1;
    countPage.textContent = `${pageNumWin}`;
  }
  updateWin();
});

nextWinBtn.addEventListener('click', () => {
  if (pageNumWin * 10 >= countWinnners) {
    nextWinBtn.setAttribute('disabled', 'disabled');
  } else {
    prevWinBtn.removeAttribute('disabled');
    pageNumWin += 1;
    countPage.textContent = `${pageNumWin}`;
  }
  updateWin();
});
