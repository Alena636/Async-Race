import carView from '../../../view/carView';
import { CarDesc } from '../../../types/types';
import { countCars, getCars } from '../garageApi';

const carWrapper = <HTMLElement>document.querySelector('.car-wrapper');
const countGarage = <HTMLElement>document.querySelector('.count');

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
