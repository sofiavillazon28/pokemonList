'use strict';

import search from "./modules/search.js";
import pokemons from "./modules/pokemons.js";

const documentReady = () => {
  pokemons();
  search();
};


document.addEventListener('DOMContentLoaded', documentReady);

    