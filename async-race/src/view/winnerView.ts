import createCarSvg from '../util/carSVG';

const winnerView = (num: number, color: string, name: string, wins:number, bestTime: number) => `<tr">
  <td>${num}</td>
  <td>${createCarSvg(color)}</td>
  <td>${name}</td>
  <td>${wins}</td>
  <td>${bestTime}</td>
</tr>`;

export default winnerView;
