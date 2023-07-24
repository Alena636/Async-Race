import { base } from './garageApi';
import { Methods } from '../../types/types';

const engine = `${base}/engine`;

export const startEngine = async (id: number) => {
  const resp = await fetch(`${engine}?id=${id}&status=started`, { method: Methods.PATCH });
  return resp.json();
};

export const stopEngine = async (id: number) => {
  const resp = await fetch(`${engine}?id=${id}&status=stopped`, { method: Methods.PATCH });
  return resp.json();
};

export const driveEngine = async (id: number) => {
  const resp = await fetch(`${engine}?id=${id}&status=drive`, { method: Methods.PATCH }).catch();
  return resp.status !== 200 ? { success: false } : { ...(await resp.json()) };
};
