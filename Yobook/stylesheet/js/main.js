const h2 = document.querySelector('#title'),
      bookCover = document.querySelector('#book-cover'),
      date = document.querySelector('#date'),
      bookReadInfo = document.querySelector('.book-read-info'),
      ispn10 = document.querySelector('#ispn-10'),
      ispn13 = document.querySelector('#ispn-13'),
      authoImg = document.querySelector('#author-img'),
      input = document.querySelector('#input'),
      btn = document.querySelector('#search');
btn.addEventListener('click', getFetch)
function getFetch(e){
  e.preventDefault();
  const choice = input.value
  const url = `https://openlibrary.org/isbn/${choice}.json`

  // fetch(url)
  //     .then(res => res.json()) // parse response as JSON
  //     .then(data => {
  //       console.log(data)
  //       bookReadInfo.innerText = checkTextAvailability(data.subtitle)
  //       h2.innerText = checkTextAvailability(data.title);
  //       date.innerText = data.publish_date;
  //       ispn10.innerText = checkTextAvailability(data.isbn_10)
  //       ispn13.innerText = checkTextAvailability(data.isbn_13)
  //       bookCover.src = `https://covers.openlibrary.org/b/isbn/${choice}-M.jpg`;
  //     })
  //     .catch(err => {
  //         console.log(`error ${err}`)
  //     });
  axios
    .get(url)
    .then(({data}) => {
      console.log(data)
      bookReadInfo.innerText = checkTextAvailability(data.subtitle)
      h2.innerText = checkTextAvailability(data.title);
      date.innerText = data.publish_date;
      ispn10.innerText = checkTextAvailability(data.isbn_10)
      ispn13.innerText = checkTextAvailability(data.isbn_13)
      bookCover.src = `https://covers.openlibrary.org/b/isbn/${choice}-M.jpg`;
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}
const checkTextAvailability = (data) => {
  if(data){
    return data
  }else{
    return ' '
  }
}
