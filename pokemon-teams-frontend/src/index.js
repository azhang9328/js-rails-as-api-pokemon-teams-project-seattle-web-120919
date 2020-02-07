const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
    getTrainers();
    getPokemons();
})

let main = document.getElementsByTagName("main")[0]

function getTrainers() {
    fetch('http://localhost:3000/trainers/')
    .then(res => res.json())
    .then(data => showTrainers(data))
    .catch(err => console.log(err))
}

function showTrainers(trainers){
  trainers.forEach(trainer => {
      trainerCard(trainer)
  })
}

function trainerCard(trainer){
    let div = document.createElement("div")
    div.className = "card"
    div.trainer_id = trainer.id
    let p = document.createElement("p")
    p.textContent = trainer.name
    let button = document.createElement("button")
    button.textContent = "Add Pokemon"
    button.addEventListener("click", () => {
        addPokemon(trainer)
    })
    let pokemonUl = document.createElement("ul")

    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(pokemonUl)
    main.appendChild(div)
}

function getPokemons() {
    fetch('http://localhost:3000/pokemons/')
    .then(res => res.json())
    .then(data => addPokemonsToTrainers(data))
    .catch(err => console.log(err))
}

function addPokemonsToTrainers(pokemons){
  pokemons.forEach(pokemon => listPokemon(pokemon))
}

function listPokemon(pokemon) {
   let pokemonLi = document.createElement("li")
    pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
    let button = document.createElement("button")
    button.className = 'release'
    button.textContent = "Release"
    button.addEventListener("click", function(){
        releasePokemon(pokemon, pokemonLi)
    })
    pokemonLi.appendChild(button)
    cardArray = document.getElementsByTagName("div")
    for (const card of cardArray) {
        if(card.trainer_id == pokemon.trainer.id) {
            let ul = card.getElementsByTagName("ul")[0]
            ul.appendChild(pokemonLi)
        }
    }
}

function releasePokemon(pokemon, pokemonLi) {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method: "DELETE"
    })
    .then(res => {
        pokemonLi.remove()
    })
}

function addPokemon(trainer) {
    fetch(`http://localhost:3000/pokemons/`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    Accept: "application/json"
                },
        body: JSON.stringify({trainer_id: trainer.id})
    })
    .then(res => res.json())
    .then(data => {
      listPokemon(data)
    })
}