
const pokeList = document.getElementById('pokemonList')
const loadButton = document.getElementById('load')
const maxPokemons = 1008
const limit = 12
let offset = 0

function convertPokemonToList(pokemon) {
    return ` <li class="poke ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <ol class="stats">
        <li class="type height">Altura: ${pokemon.height / 10}m</li>
        <li class="type weight">Peso: ${pokemon.weight /10}kg</li>
    </ol>

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

    