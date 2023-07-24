import { brands, models } from './carData';

export const generateRandomCar = (): string => {
  const randomBrand = Math.floor(Math.random() * brands.length);
  const randomModel = Math.floor(Math.random() * models.length);
  return `${brands[randomBrand]} ${models[randomModel]}`;
};

export const generateRandomColor = (): string => Math.floor(Math.random() * 16777215).toString(16);
