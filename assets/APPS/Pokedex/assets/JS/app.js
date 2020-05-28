const POKEMON_LIST = document.getElementById("pokemon-list");
const GEN = [1, 807];
const TYPES = {
    "normal": "#A8A77A",
    "fire": "#EE8130",
    "water": "#6390F0",
    "electric": "#F7D02C",
    "grass": "#7AC74C",
    "ice": "#96D9D6",
    "fighting": "#C22E28",
    "poison": "#A33EA1",
    "ground": "#E2BF65",
    "flying": "#A98FF3",
    "psychic": "#F95587",
    "bug": "#A6B91A",
    "rock": "#B6A136",
    "ghost": "#735797",
    "dragon": "#6F35FC",
    "dark": "#705746",
    "steel": "#B7B7CE",
    "fairy": "#D685AD"
}

let out = "";

const fetchPokemon = async gen =>
{
    for (let i = gen[0]; i <= gen[1]; i++)
    {
        await getPokemon(i);
    }
}

const getPokemon = async id =>
{
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const res = await fetch(url);
    const pokemon = await res.json();
    createCard(pokemon);
}

function createCard(data)
{
    let type = "";
    let types = data.types;
    for(let i = 0; i < types.length; i++)
    {
        if(types[i].slot == 1)
        {
            type = types[i].type.name;
        }
    }

    POKEMON_LIST.innerHTML += `<li class="pokemon-card" style="background-color:${TYPES[type]}">
                                <img class="card-image" src="${data.sprites.front_default}"/>
                                <p class="pokemon-number">#${data.id}</p>
                                <p class="pokemon-name">${data.name}</p>
                                <p class="pokemon-type">${type}</li>`;
}

fetchPokemon(GEN);
