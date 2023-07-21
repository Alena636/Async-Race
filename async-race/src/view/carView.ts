import createCarSvg from '../util/carSVG';

const carView = (id: number, name: string, color: string) => `<div class="car-container">
  <div class="car-options">
    <button class="button select" data-select=${id}>Select</button>
    <button class="button remove" data-remove=${id}>Remove</button>
    <p class="car-options_name">${name}</p>
  </div>
  <div class="car-controls">
    <button class="start" id="start-${id}" data-start=${id}>Start</button>
    <button class="stop" id="stop=${id}" data-stop=${id} disabled="true">Stop</button>
  </div>
  <div class="car>
    <div class="car-img" id="car-${id}" data-car=${id}>${createCarSvg(color)}</div>
    <div class="flag"></div>
  </div>
</div>`;

export default carView;
