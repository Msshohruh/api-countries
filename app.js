const container = document.querySelector('.cards-container')
const darkModeBtn = document.querySelector('.dark-mode-btn')
const btnImg = document.querySelector('.btn-img')
const body = document.querySelector('body')
const api = `https://restcountries.com/v3.1/all`

fetch(api)
    .then((data) => {
        return data.json()
    })
    .then((newData) => {
        showWeather(newData)    
    })

function showWeather(dataArray) {
    console.log(dataArray)
    dataArray.forEach((data)=>{
        container.innerHTML += `
        <div class="col">
            <div class="card">
                <img src="${data.flags.png}" class="card-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.name.common}</h5>
                    <p><b>Population: </b>  ${data.population}</p>
                    <p><b>Region: </b>  ${data.region}</p>
                    <p><b>Capital: </b>  ${data.capital ? data.capital : 'Dont have a capital'}</p>
                </div>
            </div>
        </div>
        `
    })
}
let darkMode = true
darkModeBtn.addEventListener('click', () => {
    if(darkMode){
        btnImg.src = './img/Light-moon.svg'
        body.classList.add('dark-mode')
        darkMode = false
    } else {
        btnImg.src = './img/Dark-moon.svg'
        body.classList.remove('dark-mode')
        darkMode = true

    }
    
})
