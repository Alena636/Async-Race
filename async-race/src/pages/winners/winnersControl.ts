import { CarDesc } from '../../types/types';
import winnerView from '../../view/winnerView';
import { getCar } from '../garage/garageApi';
import { countWinnners, getWinners } from './winnersApi';

export let pageNumWin = 1;
let isAscSort = false;
let isTimeSort = false;
const tableBodyWin = <HTMLElement>document.querySelector('.winners-table_body');
const count = <HTMLSpanElement>document.querySelector('.count-winners');
const prevWinBtn = <HTMLButtonElement>document.querySelector('.prev-win');
const nextWinBtn = <HTMLButtonElement>document.querySelector('.next-win');
const countPage = <HTMLElement>document.querySelector('.count-winners_page');
const winsBtn = <HTMLElement>document.querySelector('.wins');
const bestTimeBtn = <HTMLElement>document.querySelector('.best-time');

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

winsBtn.addEventListener('click', () => {
  let numWin = (pageNumWin * 10) - 10;
  getWinners(pageNumWin).then((el: CarDesc[]) => {
    tableBodyWin.innerHTML = '';
    isAscSort = !isAscSort;
    if (isAscSort) {
      el.sort((a, b) => a.wins - b.wins);
    } else {
      el.sort((a, b) => b.wins - a.wins);
    }
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
  });
});

bestTimeBtn.addEventListener('click', () => {
  let numWin = (pageNumWin * 10) - 10;
  getWinners(pageNumWin).then((el: CarDesc[]) => {
    tableBodyWin.innerHTML = '';
    console.log(isTimeSort);
    isTimeSort = !isTimeSort;
    if (isTimeSort) {
      el.sort((a, b) => a.time - b.time);
    } else {
      el.sort((a, b) => b.time - a.time);
    }
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
  });
});

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
