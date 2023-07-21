const headerView = `<header class="header">
<div class="nav">
  <ul class="nav-list">
    <li class="nav-list__item"><a class="nav-list__link to_garage" href="#garage-page">TO GARAGE</a></li>
    <li class="nav-list__item"><a class="nav-list__link to_winners" href="#winners-page">TO WINNERS</a></li>
  </ul>
</div>
<div class="logo">
  <h1>Async Race</h1>
</div>
</header>`;

const toGarage = <HTMLElement>document.querySelector('.to_garage');
const toWinners = <HTMLElement>document.querySelector('.to_winners');

toGarage.addEventListener('click', () => {
    toWinners.classList.add('hidden');
    toGarage.classList.remove('hidden');
});

toWinners.addEventListener('click', () => {
    toGarage.classList.add('hidden');
    toWinners.classList.add('hidden');
});

export default headerView;
