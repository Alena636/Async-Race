import { Methods } from '../../types/types';
import { base } from '../garage/garageApi';

const winnersUrl = `${base}/winners`;

export let countWinnners = 0;
export const getAllWinners = async () => {
  const resp = await fetch(`${winnersUrl}`, { method: Methods.GET });
  return resp.json();
};

export const getWinners = async (page: number, limit = 10) => {
  const resp = await fetch(`${winnersUrl}?_page=${page}&_limit=${limit}`, { method: Methods.GET });
  countWinnners = Number(resp.headers.get('X-Total-count'));
  return resp.json();
};

export const getWinner = async (id: number) => (await fetch(`${winnersUrl}/${id}`, { method: Methods.GET })).json();

export const createWinner = async (body: object) => {
  await fetch(winnersUrl, {
    method: Methods.POST,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteWinner = async (id: number) => {
  await fetch(`${winnersUrl}/${id}`, { method: Methods.DELETE });
};

export const updateWinner = async (body: object, id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: Methods.PUT,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
