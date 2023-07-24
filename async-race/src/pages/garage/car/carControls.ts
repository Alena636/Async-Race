import carView from '../../../view/carView';
import { CarDesc } from '../../../types/types';
import {
  countCars, deleteCar, getCar, getCars,
} from '../garageApi';

const carWrapper = <HTMLElement>document.querySelector('.car-wrapper');
const countGarage = <HTMLElement>document.querySelector('.count');
const textUpdateInput = <HTMLInputElement>document.querySelector('.text-update');
const colorUpdateInput = <HTMLInputElement>document.querySelector('.color-update');
const updateBtn = <HTMLButtonElement>document.querySelector('.update');

export const pageNum = 1;
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
  if (button.classList.contains('remove')) {
    const id = Number(button.dataset.remove);
    deleteCar(id).then(() => updateCars());

    // winners
  }
});
