const mainView = `<main class="page">
<section id="garage-page">
<div class="generate-car">
  <div class="create-field">
    <input class="generate-input_text car-name" type="text" placeholder="Car name is ..." autocomplete>
    <input class="generate-input_color car-color" type="color" value="#FFFFFF">
    <button class="button create">CREATE</button>
  </div>
  <div class="update-field">
    <input class="generate-input_text text-update" type="text" disabled="true" placeholder="New car name is ...">
    <input class="generate-input_color color-update" type="color" disabled="true">
    <button class="button update" disabled="true">UPDATE</button>
  </div>
  <div class="controls">
    <button class="button race">RACE</button>
    <button class="button reset">RESET</button>
    <button class="button generate">GENERATE CARS</button>
  </div>
</div>
<div class="garage-container">
  <h2 class="title">GARAGE <span class="count"></span></h2>
  <h3 class="title">Page #<span class="count-page">1</span></h3>

  <div class="car-wrapper"></div>
</div>
</section>
<div class="pagination">
  <button class="button prev">PREV</button>
  <button class="button next">NEXT</button>
</div>

<div class="winner-message"></div>

<section id="winners-page" class="hidden">
  <div class="winners-page-container">
    <h2 class="title">WINNERS <span class="count"></span></h2>
    <h3 class="title">Page #<span class="count-winners_page">1</span></h3>

    <div class="winners-wrapper">
      <table class="winners-table">
        <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time (seconds)</th>
        </tr>
        </thead>
        <tbody class="winners-table_body">
        </tbody>
      </table>
    </div>
  </div>

  <div class="pagination">
    <button class="button prev">PREV</button>
    <button class="button next">NEXT</button>
  </div>
</section>
</main>`;

export default mainView;
