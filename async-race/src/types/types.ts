export const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type CarDesc = {
  [key: string | number]: number | string,
  id: number,
  name: string,
  color: string,
  wins: number,
  time: number
};
