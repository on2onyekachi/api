// grab all element
const form = document.querySelector('[data-form]');
const lists = document.querySelector('[data-lists');
const input = document.querySelector('[data-input');

// local storage class
class Storage{
    static addTostorage(urlListArr){
        let storage = localStorage.setItem('shorternStorage', JSON.stringify(urlListArr))
        return storage
    }
    static getStorage(){
        let storage = localStorage.getItem('shorternStorage') == null ? [] : JSON.parse(localStorage.getItem('shorternStorage'));
        return storage;
    }
}
//empty array
let urlListArr = Storage.getStorage()
 
// data form
form.addEventListener('submit', e => {
    e.preventDefault()
    let id = Math.random();
    if(input.value.trim() == '')return
    const urlList = new Shortner(id, input.value)
    urlList.makeRequest(urlList)
})

// make object instance
class Shortner {
    constructor(id, longUrl){
        this.id = id;
        this.longUrl = longUrl;
        let shortUrl;
    }
    makeRequest(val){
        fetch("https://gotiny.cc/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: `${this.longUrl}` }),
        })
        .then(res => res.json())
        .then(data => {
            this.shortUrl = data[0].code
            urlListArr = [...urlListArr, val]
            UI.displayData();
            UI.clearInput();
            //add to storage
            Storage.addTostorage(urlListArr);
        })
        .catch(err => {
            //handle error if url cant be reached.
            alert('Please pass in a url');
            UI.clearInput();
        })
    }
}
//display list in the DOM
class UI{
    static displayData(){
        let displayData =  urlListArr.map(item => {
            return `
            <div class="list">
                <div class="links" >
                    <a class="short-url" target="_blank" href="https://gotiny.cc/${item.shortUrl}"  >gotiny.cc/${item.shortUrl}</a>
                    <p class="main-url">${item.longUrl}</p>
                </div>
                <span class="copy" onclick="" >copy</span>
                <input type="text" class="copy-input">
                <a class='remove link-btn' target="_blank" href="https://gotiny.cc/${item.shortUrl}" >Check</a>
                <span class="delete" data-id=${item.id} >❌</span>
            </div>
            `;
        }) 
        lists.innerHTML = displayData.join(' ')
    }
    static copyToclip(e) {
        if(e.target.classList.contains('copy')){
            const parent = e.target.parentElement;
            // Select the text field
            const inputField = parent.querySelector('.copy-input');
            const textTocopy = parent.querySelector('.short-url').innerHTML;
            inputField.focus();
            inputField.select();
            inputField.value = `https://${textTocopy}`;
            // Copy the text inside the text field
            navigator.clipboard.writeText(inputField.value);
            e.target.innerHTML = 'Copied'
            let timeOut  = setTimeout(() => {
                e.target.innerHTML = 'Copy'
            }, 4000);
        }
    }
    static clearInput(){
        input.value = ''
    }
    static removeList(e){
        if(e.target.classList.contains('delete')){
            e.target.parentElement.remove()
        }
        let btnId = e.target.dataset.id
        // remove from array
        UI.removeArrayList(btnId)
    }
    static removeArrayList(id){
        urlListArr = urlListArr.filter(item => item.id !== +id)
        Storage.addTostorage(urlListArr)
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    UI.displayData()
    //remove fromm dom
    lists.addEventListener('click',  UI.removeList)
    //copy to clip
    lists.addEventListener('click',  UI.copyToclip)
})