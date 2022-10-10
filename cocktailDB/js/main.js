//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
function makeCall(){
    const input = document.querySelector('input').value
    const img = document.querySelector('img')
    const h2 = document.querySelector('h2')
    const h3 = document.querySelector('h3')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.replace(/  +/g, ' ')}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const {drinks} = data
            img.src = drinks[0].strDrinkThumb;
            h3.innerText = drinks[0].strInstructions
            h2.innerText = drinks[0].strDrink
        })
        .catch(err => {
            console.log(`got some error: ${err}`)
        })
}

const btn = document.querySelector('button')
btn.addEventListener('click', makeCall);