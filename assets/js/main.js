
const pokeList = document.getElementById('pokemonList')
const loadButton = document.getElementById('load')
const maxPokemons = 1008
const limit = 12
let offset = 0

function convertPokemonToList(pokemon) {
    return ` <li class="poke ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
        
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
            <img src="${pokemon.image}" alt="${pokemon.name}">
      
    </li>      
  
    
    </div>
     `
}


function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToList).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemons(offset, limit)

loadButton.addEventListener('click', () => {
    offset += limit
    const nextPage = offset + limit

    if (nextPage >= maxPokemons) {
        const newLimit = maxPokemons - offset
        loadPokemons(offset, newLimit)

        loadButton.parentElement.removeChild(loadButton)
    } else {

        loadPokemons(offset, limit)
    }
})

function getPokemon() {
    const pokeName = document.getElementById('pokeInfo').value.toLowerCase()
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .then(convertPokeApiToPokemon)
        .then(pokemon => {
            const pokemonData = `
            <div class="poke ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
               
                <img src="${pokemon.image}" alt="${pokemon.name}" alt="${pokemon.name}">
                  
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                <div class="details">
                    <div class="detail-info">
                        <div class="detail-heigth detailfull ${pokemon.type}">
                          <h5>Altura</h5>
                          <div class="heigth-valor ${pokemon.type}">
                            <span>${pokemon.height / 10} m</span>
                          </div>  
                        </div>
                        <div class="detail-weight detailfull ${pokemon.type}">
                            <h5>Peso</h5>
                            <div class="weight-valor ${pokemon.type}">
                                <span>${pokemon.weight / 10} kg</span>      
                            </div>  
                        </div>   
                    </div>
                    <div class="detail-abilities detailfull ${pokemon.type}">
                        <h5>Habilidades</h5>
                        <div class="abilities-valor ${pokemon.type}">
                            ${pokemon.abilities.map((ability) => `<span>${ability}</span>`).join('')}
                        </div>
                    </div>
                </div>     
            </div> 

            <style>
            .pokemons { 
                list-style: none;
                padding: 0;
                margin: 0 auto;
                display: flex;
            }
            
            .poke {
                display: flex;
                padding: 10px;
                height: 520px;
                width: 300px;
                margin: auto;
                background-size: cover;
                justify-content: space-around;
            }
            
            .poke .name {
                text-align: center;
                color: white;
                margin: 1rem;
                font-weight: 800;
                ${transformName(pokemon.name)}
                text-transform: capitalize;
            }
            
            .poke .number {
                color: black;
                opacity: .4;
                text-align: right;
                font-size: 1.2rem;
            }
            
            .poke img {
                width: 200px;
                align-self: center;
            }
            
            .details {
                height: max-content;
                justify-content: center;
                display: flex;
                flex-direction: column;
                text-shadow: none;
                color: black;
                margin-top: 8px;
                width: 100%;    
                border-radius: 15px;
                gap: 5px;
            }
            
            .detail-info {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-content: start;
                gap: 5px;   
            }
            
            .detailfull {
                justify-content: flex-start;
                align-items: center;
                height: max-content;
                width: 50%;
                display: flex;
                flex-direction: column;
                border-radius: 15px;
                padding: 5px;
                gap:3px;
                text-shadow: none;
                
            }
            
            .detailfull h5 {
                margin: 0;
                height: auto;
            }
            
            .detailfull > div {
                text-align: center;
                width: 100%;
                text-shadow: none;
                background-color: rgba(247, 240, 240, 0.425);
                border-radius: 15px;
                padding: 3px;
                font-size: .9rem;
            }
            
            .detail-abilities {
                width: 100%;
                font-size: .7rem;
            }
            
            .abilities-valor {
                display: flex;
                justify-content: space-around;
                text-transform: uppercase;
                font-size: .7rem;
                padding: 3px;
            }

            .pagination {
                visibility: hidden;
            }
            </style>
            
             `;
            document.getElementById('pokemonList').innerHTML = pokemonData;
            document.getElementById('error').innerHTML = " ";
        })
        .catch(error => {
            document.getElementById('error').innerHTML = "Pokémon não encontrado. Por favor, verifique o nome ou o número digitado.";
            console.error('Error:', error);
        });
 }    
