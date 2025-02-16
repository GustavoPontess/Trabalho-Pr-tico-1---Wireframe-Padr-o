const id = location.href.split("?")[1];

onload = () => {
  detalhes();
};

async function detalhes() {
  let game = await fetch(
    `https://api.rawg.io/api/games/${id}?key=3be1b6b57dc14926ac77b609a0cd271b`
  ).then((res) => res.json());
  let screen = await fetch(
    `https://api.rawg.io/api/games/${id}/screenshots?key=3be1b6b57dc14926ac77b609a0cd271b`
  ).then((res) => res.json());
  let screenshots = screen.results;
  let stores = game.stores;
  let genres = "";
  let plat = "";
  let dev = "";
  let publi = "";
  let tag="";
  if(game.esrb_rating != null){
    var rating = game.esrb_rating.name;
  }
  let req = game.platforms;
  for (let i = 0; i < game.genres.length; i++) {
    genres += `${game.genres[i].name}, `;
  }
  for (let i = 0; i < game.platforms.length; i++) {
    plat += `${game.platforms[i].platform.name}, `;
  }
  for (let i = 0; i < game.developers.length; i++) {
    dev += `${game.developers[i].name}, `;
  }
  for (let i = 0; i < game.publishers.length; i++) {
    publi += `${game.publishers[i].name}, `;
  }
  for (let i = 0; i < game.tags.length; i++) {
    tag += `${game.tags[i].name}, `;
  }
  let str = `<div class="col-12 col-sm-8 coluna-um">
  <h1>${game.name}</h1>
  <img src="${game.background_image}" alt="${game.slug}" class="img-fluid img-detalhes">
  <div class="clip pt-3">
  <div class="row g-2">`;
  for (let i = 0; i < 4; i++) {
    str += `
        <div class="col-6">
          <img src="${screenshots[i].image}" class="img-fluid formimg" alt="Imagem de destaque">
        </div>`;
  }
  str += `</div>
  </div>
  <div class="row mt-3">
      <div class="col-12">
          <h5>About</h5>
          <span>${game.description}</span>
      </div>
  </div>
  <div class="row pt-3">
      <div class="col-6">
          <h6>Platforms</h6>
          <p>${plat}</p>
      </div>
      <div class="col-6">
          <h6>Metascore</h6>
          <p>${game.metacritic}</p>
      </div>
  </div>
  <div class="row py-1">
      <div class="col-6">
          <h6>Genre</h6>
          <p>${genres}</p>
      </div>
      <div class="col-6">
          <h6>Release date</h6>
          <p>${game.released}</p>
      </div>
  </div>
  <div class="row py-1">
      <div class="col-6">
          <h6>Developer</h6>
          <p>${dev}</p>
      </div>
      <div class="col-6">
          <h6>Publisher</h6>
          <p>${publi}</p>
      </div>
  </div>
  <div class="row py-1">
      <div class="col-12">
          <h6>Age rating</h6>
          <p>${rating}</p>
      </div>
  </div>
  <div class="row py-1">
      <div class="col-12">
          <h6>Tags</h6>
          <p>${tag}</p>
      </div>
  </div>
  <div class="row py-1">
      <div class="col-12">
          <h6>Website</h6>
          <p class="text-break"><a href="${game.website}">${game.website}</a></p>
      </div>
  </div>`
  for (let i = 0; i < req.length; i++) {
    let recomendado = req[i];
  str+=`<div class="row py-1">
      <div class="col-12">
          <h6>System requirements for ${recomendado.platform.name}</h6>`
          if(recomendado.requirements.recommended!=undefined){
          str+=`<p>${recomendado.requirements.recommended}</p>`
          }
      str+=`</div>
  </div>`};
str +=`</div>
<div class="col-12 col-sm-4 coluna-dois">
  <div class="clips">
      <div class="row g-2">`;
  for (let i = 0; i < 4; i++) {
    str += `
        <div class="col-6">
          <img src="${screenshots[i].image}" class="img-fluid formimg" alt="Imagem de destaque">
        </div>`;
  }
  str += `</div>
  </div>
  <div class="row">
      <div class="col-12">
          <h5>Where to buy</h5>
      </div>
  </div>
  <div class="row g-2 text-center">`;
  for (let i = 0; i < stores.length; i++) {
    let sto = stores[i].store
    str += `
            <div class="col-6">
            <a href="https://${sto.domain}">
                    <button type="button" class="btn btn-secondary w-100">${sto.name}</button>
            </a>
            </div>`;
  }
  str += `</div>
</div>`;
  document.getElementById("detalhes").insertAdjacentHTML("beforeend", str);
}
