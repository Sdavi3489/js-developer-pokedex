const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    const abilities = pokeDetail.abilities.map((habSlot)=> habSlot.ability.name) // pega cada habilidade
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const statName = pokeDetail.stats.map((statSlot)=> statSlot.stat.name) // pega o nome de cada as estatisticas dos pokemons
    const [stat] = statName
    pokemon.statName = statName
    pokemon.stat = stat

    const BaseStats = pokeDetail.stats.map((statSlot)=> statSlot.base_stat) // pega cada as estatisticas dos pokemons
    const [base_stat] = BaseStats
    pokemon.BaseStats = BaseStats
    pokemon.base_stat = base_stat

    return pokemon
}


// pega o detalhe dos pokemon
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// pega todos os pokemons
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


// pega apenas um pokemon através do id
pokeApi.getInfoPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

