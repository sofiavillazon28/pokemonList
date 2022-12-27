import { fetchReadPokemons, renderPokemons } from "../utils/utils.js";

const Pokemons = async () => {
  const previousPokemon = document.getElementById('previousPokemon');
  const nextPokemon = document.getElementById('nextPokemon');
  let page = 0;

  previousPokemon.addEventListener('click', async () => {
    const data = await fetchReadPokemons(--page);
    renderPokemons(data);
  });
  
  nextPokemon.addEventListener('click', async () => {
    const data = await fetchReadPokemons(++page);
    renderPokemons(data);
  });
  
  const data = await fetchReadPokemons(page);
  renderPokemons(data);
  
};

export default Pokemons;