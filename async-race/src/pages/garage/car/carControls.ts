import carView from '../../../view/carView';
import { CarDesc } from '../../../types/types';
import {
  countCars, createCar, deleteCar, getCar, getCars, updateCar,
} from '../garageApi';
import { generateRandomCar, generateRandomColor } from '../../../util/carRandom';

const carWrapper = <HTMLElement>document.querySelector('.car-wrapper');
const countGarage = <HTMLElement>document.querySelector('.count');
const textUpdateInput = <HTMLInputElement>document.querySelector('.text-update');
const colorUpdateInput = <HTMLInputElement>document.querySelector('.color-update');
const updateBtn = <HTMLButtonElement>document.querySelector('.update');

export let pageNum: number = 1;
export const updateCars = (): void => {
  getCars(pageNum).then((arr: CarDesc[]) => {
    carWrapper.innerHTML = '';
    arr.forEach((el) => {
      const car = `${carView(el.id, el.name, el.color)}`;
      carWrapper.innerHTML += car;
    });
    countGarage.textContent = `(${countCars})`;
  });
};
updateCars();

let carUpdateId: number;
document.addEventListener('click', async (ev) => {
  const button = ev.target as HTMLElement;
  if (button.classList.contains('select')) {
    carUpdateId = Number(button.dataset.select);
    colorUpdateInput.disabled = false;
    textUpdateInput.disabled = false;
    updateBtn.disabled = false;

    getCar(carUpdateId).then((el) => {
      textUpdateInput.value = el.name;
      colorUpdateInput.value = el.color;
    });
  }
  if (button.classList.contains('update')) {
    const nameCarUpdate = textUpdateInput.value;
    const colorCarUpdate = colorUpdateInput.value;
    (updateCar({
      name: nameCarUpdate,
      color: colorCarUpdate,
    }, carUpdateId)).then(() => updateCars());
    textUpdateInput.value = '';
    textUpdateInput.disabled = true;
    colorUpdateInput.disabled = true;
    updateBtn.disabled = true;
  }
  if (button.classList.contains('remove')) {
    const id = Number(button.dataset.remove);
    deleteCar(id).then(() => updateCars());

    // winners
  }
});

const createCarBtn = <HTMLButtonElement>document.querySelector('.create');
const carName = <HTMLInputElement>document.querySelector('.car-name');
const carColor = <HTMLInputElement>document.querySelector('.car-color');
createCarBtn.addEventListener('click', (ev) => {
  const button = ev.target as HTMLElement;
  if (button.classList.contains('create')) {
    const newCarName = carName.value;
    const newCarColor = carColor.value;
    if (newCarName === '') {
      (createCar({
        name: '',
        color: carColor.value,
      })).then(() => updateCars());
    } else {
      (createCar({
        name: newCarName,
        color: newCarColor,
      })).then(() => updateCars());
      carName.value = '';
    }
  }
});

const generateCars = <HTMLButtonElement>document.querySelector('.generate');
generateCars.addEventListener('click', async () => {
  for (let i = 0; i < 100; i += 1) {
    createCar({
      name: generateRandomCar(),
      color: `#${generateRandomColor()}`,
    });
  }
  updateCars();
});

// const resetBtn = <HTMLButtonElement>document.querySelector('.reset');
// const raceBtn = <HTMLButtonElement>document.querySelector('.race');
// function reset() {
//   if (!resetBtn.hasAttribute('disabled')) {
//     resetBtn.setAttribute('disabled', 'disabled');
//     raceBtn.removeAttribute('disabled');
//   }
// }

// reset();

const prev = <HTMLButtonElement>document.querySelector('.prev');
const next = <HTMLButtonElement>document.querySelector('.next');
const countPage = <HTMLSpanElement>document.querySelector('.count-page');
prev.addEventListener('click', () => {
  if (pageNum === 1) {
    prev.setAttribute('disabled', 'disabled');
  } else {
    next.removeAttribute('disabled');
    pageNum -= 1;
    countPage.textContent = `${pageNum}`;
  }
  updateCars();
});

next.addEventListener('click', () => {
  if (pageNum * 7 >= countCars) {
    next.setAttribute('disabled', 'disabled');
  } else {
    prev.removeAttribute('disabled');
    pageNum += 1;
    countPage.textContent = `${pageNum}`;
  }
  updateCars();
});
