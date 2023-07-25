import { CarDesc } from '../../../types/types';
import { pageNum } from './carControls';
import { driveEngine, startEngine, stopEngine } from '../engineApi';
import { getCar, getCars } from '../garageApi';
import { createWinner, getAllWinners, updateWinner } from '../../winners/winnersApi';
import { updateWin } from '../../winners/winnersControl';

const raceBtn = <HTMLButtonElement>document.querySelector('.race');
export const winnerMessage = <HTMLElement>document.querySelector('.winner-message');
const controls = <HTMLElement>document.querySelector('.controls');
const resetBtn = <HTMLButtonElement>document.querySelector('.reset');
let raceRes: HTMLElement[] = [];
let timeCar: number;
const info: { [id: number] : CarDesc; } = {};

function addWin(carWin: HTMLElement, timeWin: number) {
  const winId = Number(carWin.dataset.car);
  let timeC = (timeWin / 1000).toFixed(2);
  let winName;
  let win = 1;
  getCar(winId).then((el) => {
    winName = el.name;
    winnerMessage.innerHTML = `${winName} went first (${timeC})!`;
  });
  getAllWinners().then((el: CarDesc[]) => {
    el.forEach((i) => {
      if (Number(i.id) === winId) {
        win = i.wins + 1;
        timeC = (Number(i.time) < Number(timeC) ? i.time : timeC).toString();
      }
    });
  }).then(() => {
    if (win > 1) {
      updateWinner({
        wins: win,
        time: timeC,
      }, winId);
    } else {
      createWinner({
        id: winId,
        wins: win,
        time: timeC,
      });
    }
  }).then(() => updateWin());
  console.log('helasf');
}

function animateCar(car: HTMLElement, distance: number, duration: number) {
  let startTime = 0;
  const animeId = <CarDesc>{};
  function getStep(endTime: number) {
    if (!startTime) {
      startTime = endTime;
    }
    const progress: number = (endTime - startTime) / duration;
    const animation: number = progress * distance;
    car.style.transform = `translateX(${animation}px)`;
    if (progress < 1) {
      animeId.id = window.requestAnimationFrame(getStep);
    }
    if (progress >= 1 && !resetBtn.hasAttribute('disabled')) {
      if (raceRes.length === 0) addWin(car, duration);
      console.log('asff');
      raceRes.push(car);
    }
  }
  animeId.id = window.requestAnimationFrame(getStep);
  return animeId;
}

const start = async (carId: number) => {
  startEngine(carId).then((el) => {
    const velocity = Number(el.velocity);
    const distance = Number(el.distance);
    timeCar = distance / velocity;
    const car = <HTMLElement>document.getElementById(`car-${carId}`);
    const width = document.body.clientWidth - 80;
    const carPosition = (width / 100) * 15;
    const carDistance = width - carPosition;
    info[carId] = animateCar(car, carDistance, timeCar);
    driveEngine(carId).then((e) => {
      if (!e.success) {
        window.cancelAnimationFrame(info[carId].id);
      }
    });
  });
};

export const stop = async (stopId: number) => {
  stopEngine(stopId).then(() => {
    window.cancelAnimationFrame(info[stopId].id);
    const car = <HTMLElement>document.getElementById(`car-${stopId}`);
    car.style.transform = 'translateX(0px)';
  });
};

document.addEventListener('click', async (event) => {
  const button = event.target as HTMLElement;
  if (button.classList.contains('start')) {
    const carId = Number(button.dataset.start);
    start(carId);
    winnerMessage.innerHTML = '';
    const startBtn = <HTMLButtonElement>document.getElementById(`start-${carId}`);
    const stopBtn = <HTMLButtonElement>document.getElementById(`stop-${carId}`);
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled');
  }

  if (button.classList.contains('stop')) {
    const carId = Number(button.dataset.stop);
    stop(carId);
    const startBtn = <HTMLButtonElement>document.getElementById(`start-${carId}`);
    const stopBtn = <HTMLButtonElement>document.getElementById(`stop-${carId}`);
    stopBtn.setAttribute('disabled', 'disabled');
    startBtn.removeAttribute('disabled');
    winnerMessage.innerHTML = '';
  }

  if (button.classList.contains('to_winners')) {
    winnerMessage.innerHTML = '';
  }
});

export const startRace = async (page: number) => {
  getCars(page, 7).then((arr: CarDesc[]) => arr.forEach((el) => start(el.id)));
};

export const stopRace = async (page: number) => {
  getCars(page, 7).then((cars: CarDesc[]) => {
    cars.forEach((el) => stop(el.id));
  });
  raceRes = [];
  winnerMessage.innerHTML = '';
};

export function reset() {
  if (!resetBtn.hasAttribute('disabled')) {
    resetBtn.setAttribute('disabled', 'disabled');
    raceBtn.removeAttribute('disabled');
    raceRes = [];
    winnerMessage.innerHTML = '';
  }
}

controls.addEventListener('click', async (event) => {
  const button = event.target as HTMLElement;
  if (button.classList.contains('race')) {
    startRace(pageNum);
    raceBtn.setAttribute('disabled', 'disabled');
    resetBtn.removeAttribute('disabled');
  }
  if (button.classList.contains('reset')) {
    stopRace(pageNum);
    resetBtn.setAttribute('disabled', 'disabled');
    raceBtn.removeAttribute('disabled');
  }
});
