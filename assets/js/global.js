onload = () => {

  cards(document.getElementById("search"));
  destaques();
  plataformas();
  publishers();
  document.querySelector("#btn-0").onclick = () => cards(document.getElementById("search"));
  document.querySelector("#btn-1").onclick = () => plataformas();
  document.querySelector("#btn-2").onclick = () => publishers();
  document.querySelector("#btn-searc").onclick = () =>cards(document.getElementById("search"));
  document.querySelector("#limpa").onclick = () => {document.getElementById("search").value = "",cards(document.getElementById("search"))};
};

async function destaques() {
  let data = await fetch(
    `https://api.rawg.io/api/games?page=1&page_size=4&key=3be1b6b57dc14926ac77b609a0cd271b`
  ).then((res) => res.json());
  let result = data.results;
  let str = "";
  for (let i = 0; i < result.length; i++) {
    let destaques = result[i];
    let desc = await fetch(
      `https://api.rawg.io/api/games/${result[i].id}?page=1&page_size=4&key=3be1b6b57dc14926ac77b609a0cd271b`
    ).then((res) => res.json());
    let genres = "";
    let plat = "";
    for (let i = 0; i < desc.genres.length; i++) {
      genres += `${desc.genres[i].name}, `;
    }
    for (let i = 0; i < desc.platforms.length; i++) {
      plat += `${desc.platforms[i].platform.name}, `;
    }
    let descricao = desc.description.replaceAll("<p>", "");
    descricao = descricao.replaceAll("<br />", "");
    descricao = descricao.replaceAll("</p>\n<p>", "");
    descricao = descricao.replaceAll("\n", "");
    descricao = descricao.replaceAll("<p></p>", "");
    descricao = descricao.replaceAll("</p>", "");
    str += `<div class="carousel-item">
        <div class="col-12 col-lg-6 col-sm-12 float-start" style="clear: both;">
            <div class="ratio ratio-16x9">
            <img src="${destaques.background_image}" class="img-fluid" alt="imagem destaque">
            </div>
        </div>
        <div class=" col-12 col-lg-6 col-sm-12 float-end ps-4" id="nopading">
            <article class="descricao">
                <h1>${destaques.name}</h1>
                <p class="textformat"> <b>Sobre: </b>${descricao}</p>
                <p><b>Publisher:</b> ${desc.publishers[0].name}<b class="espaco">Lançamento:</b> ${destaques.released}</p>
                <p><b>Plataformas:</b>${plat}<p><b>Gênero:</b> ${genres}</p>
                <p><b>Avaliação: </b><b class="text-danger">${destaques.ratings[0].percent}%</b></p>
            </article>
        </div>
    </div>`;
  }
  document
    .getElementById("carouselDestaques")
    .insertAdjacentHTML("beforeend", str);
}
var url0 =
  "https://api.rawg.io/api/games?search=&page=1&page_size=4&key=3be1b6b57dc14926ac77b609a0cd271b";
let digitou = false;
async function cards(search) {
  if (search != undefined && search.value != "" && digitou == false) {
    let text = search.value;
    console.log("text: ",text);
    document.querySelector('#cards').innerHTML = ""
    url0 = `https://api.rawg.io/api/games?search=${text}&page=1&page_size=4&key=3be1b6b57dc14926ac77b609a0cd271b`;
    digitou = true;
  }else if(search.value == "" && digitou == true){
    document.querySelector('#cards').innerHTML = ""
    url0 = "https://api.rawg.io/api/games?search=&page=1&page_size=4&key=3be1b6b57dc14926ac77b609a0cd271b";
    digitou = false;
  }
  let str = "";
  let data = await fetch(url0).then((res) => res.json());
  let result = data.results;
  for (let index = 0; index < result.length; index++) {
    const card = result[index];
    str += `<div class="col-12 col-sm-3 col-md-4 col-lg-3">
    <div class="card border border-0">
        <h5 class="card-title fw-bold text-truncate">${card.name}</h5>
        <div class="ratio" style="--bs-aspect-ratio: 50%;">
        <img src="${card.background_image}" class="img-fluid" alt="imagem card">
        </div>
        <h5 class="fs-6">Classificação: <span class="float-end">${card.rating}</span></h5>
        <h5 class="fs-6">Data de lançamento: <span class="float-end">${card.released}</span></h5>
        <div class="card-body">
        <a href="pages/detalhes/index.html?${card.id}"><button type="button" class="btn btn-secondary">Mais detalhes ...</button></a>
        </div>
    </div>
    </div>`;
  }
  url0 = data.next;
  document.getElementById("cards").insertAdjacentHTML("beforeend", str);
}

var url1 = `https://api.rawg.io/api/platforms?page=1&page_size=3&key=3be1b6b57dc14926ac77b609a0cd271b`;
async function plataformas() {
  let data = await fetch(url1).then((res) => res.json());
  let str = "";
  for (let index = 0; index < data.results.length; index++) {
    const plataforma = data.results[index];
    str += ` <div class="col-12 col-sm-4 col-md-4">
    <div class="card border border-0">
        <h5 class="card-title fw-bold">${plataforma.name}</h5>
        <div class="formimg" style="background-image: url('${plataforma.image_background}')">
            
        </div>
        <div class="card-body">
            <p class="card-text">
                <b>Principais jogos</b>
            <ul class="lista">`;
    for (let i = 0; i < 3; i++) {
      str += `<li>${plataforma.games[i].name}</li>`;
    }
    str += `</ul>
            </p>
            <p class="card-text text-end">Mais detalhes ...</p>
        </div>
    </div>
   </div>`;
  }
  url1 = data.next;
  document.getElementById("plata").insertAdjacentHTML("beforeend", str);
}

var url2 = `https://api.rawg.io/api/publishers?page=1&page_size=3&key=3be1b6b57dc14926ac77b609a0cd271b`;
async function publishers() {
  let str = "";
  let data = await fetch(url2).then((res) => res.json());
  for (let i = 0; i < data.results.length; i++) {
    const publi = data.results[i];
    str += ` <div class="col-12 col-sm-4 col-md-4">
    <div class="card border border-0">
        <h5 class="card-title fw-bold">${publi.name}</h5>
        <div class="formimg" style="background-image: url('${publi.image_background}')">
            
        </div>
        <div class="card-body">
            <p class="card-text">
                <b>Principais jogos</b>
            <ul class="lista">`;
    for (let i = 0; i < 3; i++) {
      str += `<li>${publi.games[i].name}</li>`;
    }
    str += `</ul>
            </p>
            <p class="card-text text-end">Mais detalhes ...</p>
        </div>
    </div>
   </div>`;
  }
  url2 = data.next;
  document.getElementById("publi").insertAdjacentHTML("beforeend", str);
}
