import { CarDesc } from '../../../types/types';
import { driveEngine, startEngine, stopEngine } from '../engineApi';
// import { getCar } from '../garageApi';

// const winnerMessage = <HTMLElement>document.querySelector('.winner-message');
// function addWin(carWin: HTMLElement, timeWin: number) {
//   const winId = Number(carWin.dataset.car);
//   const time = (timeWin / 1000).toFixed(2);
//   // const win = 1;
//   let winName;
//   getCar(winId).then((el) => {
//     winName = el.name;
//     winnerMessage.innerHTML = `${winName} went first (${time})!`;
//   });
// }

const resetBtn = <HTMLButtonElement>document.querySelector('.reset');
const raceRes: HTMLElement[] = [];
const animateCar = (car: HTMLElement, distance: number, duration: number) => {
  let startTime = 0;
  const animeId = <CarDesc>{};
  const carEl = car;
  function getStep(endTime: number) {
    if (!startTime) {
      startTime = endTime;
    }
    const progress: number = (endTime - startTime) / duration;
    const animation: number = progress * distance;
    carEl.style.transform = `translateX(${animation}px)`;
    if (progress < 1) {
      animeId.id = window.requestAnimationFrame(getStep);
    }
    if (progress >= 1 && resetBtn.hasAttribute('disabled')) {
    //   if (raceRes.length === 0) addWin(carEl, duration);
      raceRes.push(carEl);
    }
  }
  animeId.id = window.requestAnimationFrame(getStep);
  return animeId;
};

let time: number;
const info: { [id: number] : CarDesc; } = {};
const start = async (carId: number) => {
  startEngine(carId).then((el) => {
    const velocity = Number(el.velocity);
    const distance = Number(el.distance);
    time = distance / velocity;
    const car = <HTMLElement>document.getElementById(`car-${carId}`);
    const width = 1320;
    const carPosition = (width / 100) * 15;
    const carDistance = width - carPosition;
    info[carId] = animateCar(car, carDistance, time);
    driveEngine(carId).then((e) => {
      if (!e.success) {
        window.cancelAnimationFrame(info[carId].id);
      }
    });
  });
};

const stop = async (stopId: number) => {
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
  }
});
