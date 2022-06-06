const page = document.querySelector("#pokedex-page");

const colorTypes = {
  normal: "light",
  fairy: "light",
  fire: "danger",
  grass: "success",
  electric: "warning",
  psychic: "dark",
  ground: "dark",
  rock: "dark",
  ghost: "dark",
  fighting: "dark",
  water: "primary",
  ice: "primary",
  dragon: "secondary",
  bug: "success",
  poison: "success",
};

fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
  .then((response) => {
    return response.json();
  })
  .then(async (data) => {
    const box = document.querySelector("#pokemon-box");
    page.innerHTML = "";

    for (let i = 0; i < data.results.length; i++) {
      box.querySelector("#pokemon-name").innerHTML = data.results[i].name;
      box.querySelector("#pokemon-name").style.textTransform = "capitalize";

      const pokemonImage = await fetch(
        "https://pokeapi.co/api/v2/pokemon-form/" + data.results[i].name
      );
      const image = await pokemonImage.json();

      const pokemonInfo = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + data.results[i].name
      );
      const info = await pokemonInfo.json();
      const boxType = box.querySelector("#pokemon-type");
      boxType.classList = `btn btn-${colorTypes[info.types[0].type.name]}`;
      boxType.innerHTML = info.types[0].type.name;
      boxType.style.textTransform = "capitalize";
      
      box.querySelector("#pokemon-img").src = image.sprites.front_default;
      page.innerHTML += box.outerHTML;
    }
  });
