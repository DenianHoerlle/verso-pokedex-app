var fs = require("fs");

async function generateData() {
  let currentPokePosition = 1;
  let lastPokePosition = 151;

  const promises = [];

  while (currentPokePosition < lastPokePosition) {
    promises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokePosition}`).then(
        async data => {
          const { name, types, sprites, stats, abilities, id } =
            await data.json();
          return {
            id,
            name,
            abilities: abilities.map(({ ability }) => ability.name),
            types: types.map(({ type }) => type.name),
            image: sprites.other["official-artwork"].front_default,
            stats: stats.map(({ base_stat, stat }) => ({
              value: base_stat,
              name: stat.name,
            })),
          };
        },
      ),
    );

    currentPokePosition++;
  }

  const allPokemonData = await Promise.all(promises);

  let jsonData = { pokemonList: allPokemonData, count: allPokemonData.length };

  fs.writeFile("data.json", JSON.stringify(jsonData), function (err) {
    if (err) console.log("error", err);
  });
}

generateData();
