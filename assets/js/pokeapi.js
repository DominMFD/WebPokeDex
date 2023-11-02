

const pokeApi = {}

function convertPokeApiToPokemon(pokeDetail){
    const pokemon =new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    if (pokeDetail.id >= 650) {
        pokemon.image = pokeDetail.sprites.front_default
    } else {
        pokemon.image = pokeDetail.sprites.other.dream_world.front_default;
    }
    
    pokemon.abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)

    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;


    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToPokemon)
}

pokeApi.getPokemons =  (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemons =  (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}

function transformName(name) {
    if (name.length > 10) {
        return `font-size: 1.5rem;`
    } else {
        return `font-size: 2.5rem;`
    }
}
