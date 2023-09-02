const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const ButtonBack = document.getElementById('back')
const PokeInfo = document.getElementById('pokeInfo')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="getInfo(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// Aqui eu pego o detalhe de um pokemon espoecífico e coloco e uma div como se fosse outra tela que aparece
// e desaparece, essa tela é como se fosse uma janela com os detalhes e estatísticas de um pokemon específico
// e quando saimos a lista de pokemons anterior aparece
function getInfo(Idpokemon) {
    let showDetail = document.getElementById('DetailPokemon').style.display
    //mostra o detalhe de um pokemon quando se o showDetail for block e esconde quando for none
    // o mesmo se aplica para os outros
    if (showDetail == 'none') {
        pokeApi.getInfoPokemon(Idpokemon).then((pokemons = []) => {
            const newHtml = `
                <div class="pokemonStats ${pokemons.type}">
                    <img class="imgPokemon" src="${pokemons.photo}"
                    alt="${pokemons.name}">
                    <span class="number">#${pokemons.number}</span>
                    <span class="namePokemonStats">${pokemons.name}</span>
                    <div class="grid-stats-pokemon">
                        <div class="grid-item">
                            <span class="PokemonData">Types</span>
                            <ol class="types">
                                ${pokemons.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                        <div class="grid-item">
                            <span class="PokemonData">Abilities</span>
                            <ol class="PokemonData">
                                ${pokemons.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                            </ol>
                        
                        </div>
                        <div class="grid-item">
                            <h3 class="PokemonData">Height</h3>
                            <span class="PokemonData">${pokemons.height}</span>
                        </div>  
                        <div class="grid-item">
                            <h3 class="PokemonData">Weight</h3>
                            <span class="PokemonData">${pokemons.weight}</span>
                        </div>
                        <div class="grid-last-item">
                            <table>
                                <tr>
                                    ${pokemons.statName.map((stat) => `<th class="PokemonData">${stat}</th>`).join('')}
                                </tr>
                                <tr>
                                    ${pokemons.BaseStats.map((base_stat) => `<td class="PokemonData">${base_stat}</td>`).join('')}
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            `
            PokeInfo.innerHTML = newHtml
        })
        document.getElementById('pokemonList').style.display = 'none'
        PokeInfo.style.display = 'block'
        return document.getElementById('DetailPokemon').style.display = 'block'
    }
    if (showDetail == 'block') {
        PokeInfo.style.display = 'none'
        return document.getElementById('DetailPokemon').style.display = 'none'
    }
}

// Carrega mais pokemons
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


// Botão de voltar para a lista de pokemons do começo 
ButtonBack.addEventListener("click", () => {
    document.getElementById('DetailPokemon').style.display = 'none'
    return document.getElementById('pokemonList').style.display = 'grid'
})