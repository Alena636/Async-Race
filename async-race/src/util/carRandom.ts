import { brands, models } from './carData';

export const generateRandomCar = (): string => {
  const randomBrand = Math.floor(Math.random() * brands.length);
  const randomModel = Math.floor(Math.random() * models.length);
  return `${brands[randomBrand]} ${models[randomModel]}`;
};

export const generateRandomColor = (): string => {
  const colors: (string | number)[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  return Math.floor(Math.random() * colors.length).toString();
};
