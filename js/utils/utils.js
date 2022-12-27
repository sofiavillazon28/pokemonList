export const renderPokemons = (data, pokemon) => {
    const PokemonsContainer = document.getElementById('PokemonsContainer');
    PokemonsContainer.innerHTML = '';

    data.forEach((element) => {
      //const { id, name, status, species, type, gender, origin, location, image } = element;
        const { name, url } = element;
        const id = url.split("/").at(6)
        //console.log(id)
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

        PokemonsContainer.innerHTML += `
            <article class="card pokemon-modal" data-id="${id}" href="#modal"  >
              <div class="card__image">
                  <img src="${imgUrl}" alt="${name}" >
              </div>

              <div class="card__content">
                  
                  <div class="card__content-title box-card">
                      <h3 class="text-primary capital" >${name} </h3>
                      <h4 class="text-alternate">${url}</h4>
                      <br>
                  </div>
              </div>
            </article>`;

        document.querySelectorAll('.pokemon-modal').forEach(pokemon =>{
          pokemon.addEventListener('click',() => {
            var modal = document.getElementById('modal');
            //var modalBtn = document.getElementById('modalBtn');
            
            var id = pokemon.dataset.id
            renderModal(id);
            //modalBtn.addEventListener('click', openModal);

            modal.classList.add('open');
            

          })
        })

        
    });
  };
  

  

  export const fetchReadPokemons = async (page = 0) => {
    var offset = page*20
    var limit = offset+20
    try {
      //const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
      //console.log(data)
        
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
      console.log(data)
        
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
    console.log(data)
    const types= data.types.map(type => type.type.name).join(", ")
    const moves= data.moves.map(move => move.move.name).join(`</div> <div class="tagMove"> `)
    const abilities = data.abilities.map(abilities => abilities.ability.name).join(",")

        ModalContent.innerHTML += `
        
        <article class="card-modal">
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
    
                <div class="f-elements">
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.weight} </h2>
                        <h4 class=" text-alternate">WEIGHT</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${types || "no tiene"}  </h2>
                        <h4 class=" text-alternate">TYPE</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.height} </h2>
                        <h4 class=" text-alternate">HEIGHT</h4>
                    </div>
                </div>
                <div class="divider"> </div>
                <div class="f-elements">
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.order} </h2>
                        <h4 class=" text-alternate">ORDER</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${abilities || "no tiene"}  </h2>
                        <h4 class=" text-alternate">ABILITIES</h4>
                    </div>
                    <div class="w-100 text-center">
                        <h2 class="text-grey capital"> ${data.base_experience || "no tiene"}  </h2>
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

    


    var closeBtn = document.getElementById('overlay');
    closeBtn.addEventListener('click', closeModal);
    
    function closeModal(){
        modal.classList.remove('open');
    }

  }
//function getPokemonImage(name) {
//    let apiUrl = "https://pokeapi.co/api/v2/pokemon/";
//    var img = new Image();
//
//    try {
//        axios.get(apiUrl + name).then(function (response) {
//       //     console.log(response.data);
//            img.src = response.data.sprites.other['official-artwork'].front_default;
//            //img.src = response.data.sprites.front_default;
//            document.getElementById(name).appendChild(img)
//        })  
//    } catch (error) {
//      console.log(error);
//    } finally {
//     //console.log("cargó correctamente");
//    }
//};