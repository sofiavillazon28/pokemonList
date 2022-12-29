export const renderPokemons = (data, pokemon) => {
    const PokemonsContainer = document.getElementById('PokemonsContainer');
    PokemonsContainer.innerHTML = '';

    data.forEach(async (element) => {
      //const { id, name, status, species, type, gender, origin, location, image } = element;
        const { name, url } = element;
        const id = url.split("/").at(6)

        const pokemon =  await fetchReadPokemon(id);
        const types= pokemon.types.map(type => type.type.name).join(", ")
        //console.log(id)
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

        PokemonsContainer.innerHTML += `
            <article class="card pokemon-modal" data-id="${id}" href="#modal"  >
              <div class="card__image">
                  <img src="${imgUrl}" alt="${name}" >
              </div>

              <div class="card__content">
                  
                  <div class="card__content-title box-card text-center">
                      <h3 class="text-primary capital" >${name} </h3>
                      <h4 class="text-alternate">${types}</h4>
                      <span class="orderID">N° ${id}</span> 
                      <br>
                  </div>
              </div>
            </article>`;

        document.querySelectorAll('.pokemon-modal').forEach(pokemon =>{
          pokemon.addEventListener('click',() => {
            var modal = document.getElementById('modal');
            
            var id = pokemon.dataset.id
            renderModal(id);

            modal.classList.add('open');
            

          })
        })

        
    });
  };
  

  

  export const fetchReadPokemons = async (page) => {
    var offset = 0
    var limit = offset+20
    try {
      offset = 20 * page
      //const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
      console.log("page en function; "+page)
      return data.results;
      
    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 0);
    }
  };

  export const fetchReadPokemon = async (id) => {
 
    try {
      //const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
      return data;
    
    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 0);
    }
  };


async function renderModal (id){

    const ModalContent = document.getElementById('modal-content');
    ModalContent.innerHTML = '';

    const data =  await fetchReadPokemon(id);
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    
    const types= data.types.map(type => type.type.name).join(", ")
    const moves= data.moves.map(move => move.move.name).join(`</div> <div class="tagMove"> `)
    const abilities = data.abilities.map(abilities => abilities.ability.name).join(",")

        ModalContent.innerHTML += `
        
        <article class="card-modal">
        <div id="closeModal">X</div>
        <div class="card__image-modal " id="${data.name}" >
            <img src="${imgUrl}" alt="${data.name}">
        </div>
    
        <div class="card__content">
    
            <div class="card-modal__content-title box-card">
                <div class="col-12 text-center">
                    <h1 class="text-grey capital">${data.name} </h1>
                    <h4 class="text-alternate capital">${types || "no tiene"} </h4>
                </div>
    
                <div class="divider"> </div>
    
                <div class="r-elements">
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.weight}Kg </h2>
                        <h4 class=" text-alternate">WEIGHT</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${types || "no tiene"}  </h2>
                        <h4 class=" text-alternate">TYPE</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.height}m </h2>
                        <h4 class=" text-alternate">HEIGHT</h4>
                    </div>
                </div>
                <div class="divider"> </div>
                <div class="r-elements">
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.order} </h2>
                        <h4 class=" text-alternate">ORDER</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${abilities || "no tiene"}  </h2>
                        <h4 class=" text-alternate">ABILITIES</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.base_experience || "no tiene"}Exp  </h2>
                        <h4 class=" text-alternate">EXPERIENCE</h4>
                    </div>
                </div>
                <div class="divider"> </div>
                <div class="f-elements">
                    <h3 class="text-alternate">STATS</h3>
                </div>
    
                <div class="stats">
                    <div class="skills-list">
                        <h2 class="skill-name text-grey">Hp (${data.stats[0].base_stat} %)</h2>
                        <div class="skill-percent skill-percent-html" data-percent="${data.stats[0].base_stat}%"></div>
                    </div>
    
                    <div class="skills-list">
                        <h2 class="skill-name text-grey">Attack (${data.stats[1].base_stat}%)</h2>
                        <div class="skill-percent skill-percent-html" data-percent="${data.stats[1].base_stat}%"></div>
                    </div>
                    <div class="skills-list">
                        <h2 class="skill-name text-grey">Defense (${data.stats[2].base_stat}%)</h2>
                        <div class="skill-percent skill-percent-html" data-percent="${data.stats[2].base_stat}%"></div>
                    </div>
                    <div class="skills-list">
                        <h2 class="skill-name text-grey">Special-attack (${data.stats[3].base_stat}%)</h2>
                        <div class="skill-percent skill-percent-html" data-percent="${data.stats[3].base_stat}%"></div>
                    </div>
                    <div class="skills-list">
                        <h2 class="skill-name text-grey">Special-defense (${data.stats[4].base_stat}%)</h2>
                        <div class="skill-percent skill-percent-html" data-percent="${data.stats[4].base_stat}%"></div>
                    </div>
                    <div class="skills-list">
                        <h2 class="skill-name text-grey">Speed (${data.stats[5].base_stat}%)</h2>
                        <div class="skill-percent skill-percent-html" data-percent="${data.stats[5].base_stat}%"></div>
                    </div>

                    <div class="divider"> </div>
                    <div class="f-elements">
                        <h3 class="text-alternate">MOVEMENTS</h3>
                    </div>
                    
                    <div class="tagMove"> ${moves}</div>
                    
                    
                </div>
                <br>
            </div>
            
        </div>
    </article>`;
    
    
    document.querySelectorAll('.skill-percent').forEach(elm =>{
      var perc = elm.dataset.percent
      elm.style.width = perc
    })

    var closeOverlay = document.getElementById('overlay');
    var closeBtn = document.getElementById('closeModal');

    closeOverlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    function closeModal(){
        modal.classList.remove('open');
    }

  }
