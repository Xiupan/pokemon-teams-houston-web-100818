const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainElement = document.querySelector('main')

const render = () => {
  fetch(TRAINERS_URL)
  .then((r) => {
    return r.json()
  }).then((trainers) => {
    console.log(trainers);

    mainElement.innerHTML = ''

    for (let a = 0; a < trainers.length; a++) {
      const trainerCard = document.createElement('div')
      const trainerName = document.createElement('p')
      const addPokemonButton = document.createElement('button')
      const ul = document.createElement('ul')

      for (let b = 0; b < trainers[a].pokemons.length; b++) {
        const li = document.createElement('li')
        const releaseButton = document.createElement('button')

        li.innerHTML = `${trainers[a].pokemons[b].nickname} (${trainers[a].pokemons[b].species})`

        releaseButton.className = 'release'
        releaseButton.innerHTML = 'Release'

        releaseButton.addEventListener('click', (e) => {
          // console.log('Pokemon released.');
          fetch(`${POKEMONS_URL}/${trainers[a].pokemons[b].id}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({})
          }).then((r)=>{
            return r.json()
          }).then((results)=>{
            // console.log(results);
            render()
          })
        })

        li.appendChild(releaseButton)
        ul.appendChild(li)
      }

      trainerCard.className = 'card'

      trainerName.innerHTML = trainers[a].name
      addPokemonButton.innerHTML = 'Add Pokemon'

      addPokemonButton.addEventListener('click', (e)=>{
        e.preventDefault()
        fetch(POKEMONS_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            trainer_id: trainers[a].id
          })
        }).then((r)=>{
          return r.json()
        }).then((result)=>{
          // console.log(result);
          render()
        })
      })

      trainerCard.appendChild(trainerName)
      trainerCard.appendChild(addPokemonButton)
      trainerCard.appendChild(ul)

      mainElement.appendChild(trainerCard)
    }
  })
}

render()
