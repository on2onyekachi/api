//all selectors
const input = document.querySelector('input')
const btn = document.querySelector('button')
const slideShow = document.querySelector('.slideshow-container')
let slides = document.getElementsByClassName("mySlides");

//start index which will increase.
let slideIndex = 0;
//event handler on btn click
btn.addEventListener('click', e => {
    if(input.value.trim() == '')return
    const cocktail = new Cocktail(input.value)
    cocktail.makeCall()
});
//make the class object
class Cocktail{
    constructor(value){
        this.value = value
        this.list;
    }
    //after user enters a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
    makeCall(){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.value.replace(/  +/g, ' ')}`)
            .then(res => res.json())
            .then(data => {
                const {drinks} = data
                if(drinks == null){
                    throw Error('Please use a more descriptive name')
                }
                this.placeInDom(drinks)
            })
            .catch(err => {
                console.log(`got some error: ${err}`)
                alert(err)
            })
    }
    //handle display value in dom
    placeInDom(alData){
        this.list = alData.lengt
        let displayData = alData.map((item, idx) => {
            return `
            <div class="mySlides fade">
                <div class="contianer">
                    <div class="img-container">
                        <img src="${item.strDrinkThumb}">
                    </div>
                    <div class="text-container" >
                        <div class="numbertext"> ${idx + 1}/ ${alData.length}</div>
                        <h2>${item.strDrink}</h2>
                        <p class="text">${item.strInstructions}</p>
                    </div>	
                </div>
            </div>
            `;
        }) 
        slideShow.innerHTML = displayData.join(' ')
        showSlides()
    }
}
//handle the slide show effect
function showSlides() {
    let i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 5000); // Change image every 2 seconds
}