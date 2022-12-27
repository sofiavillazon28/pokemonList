import { fetchReadPokemons, renderPokemons } from "../utils/utils.js";
import { dataPokemons } from "../data.js"

const search = () => {
  const searchForm = document.getElementById('searchForm');

  const searchPokemons = async (e) => {
    e.preventDefault();
    const name = searchForm.name.value;
    console.log(name)

    if(!name){
      const data = await fetchReadPokemons(0);
      renderPokemons(data);
    }else{
      await fetchReadPokemons(0);

      const data = dataPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()) )
      renderPokemons(data);
    }
    
  };

  searchForm.addEventListener('submit', searchPokemons);
};

export default search;