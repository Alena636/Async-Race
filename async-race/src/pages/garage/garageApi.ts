import Methods from '../../types/types';

export const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;

export let countCars = 0;
export const getCars = async (page: number, limit: number = 7) => {
  const resp = await fetch(`${garage}?_page=${page}&_limit=${limit}`, { method: Methods.GET });
  countCars = Number(resp.headers.get('X-Total-count'));
  return resp.json();
};

export const getCar = async (id: number) => {
  const resp = await fetch(`${garage}/${id}`, { method: Methods.GET });
  return resp.json();
};

export const createCar = async (body: object): Promise<void> => {
  await fetch(garage, {
    method: Methods.POST,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${garage}/${id}`, {
    method: Methods.DELETE,
  });
};

export const updateCar = async (body: object, id: number): Promise<void> => {
  await fetch(`${garage}/${id}`, {
    method: Methods.PUT,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
