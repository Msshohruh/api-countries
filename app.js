const container = document.querySelector('.cards-container')
const darkModeBtn = document.querySelector('.dark-mode-btn')
const btnImg = document.querySelector('.btn-img')
const body = document.querySelector('body')
const form = document.querySelector('form')
const select = document.querySelector('select')
const spinner = document.querySelector('.spinner')
const api = `https://restcountries.com/v3.1/all`
    
    // select.value = 'Filter by Region'
async function fetchApi(api) {
    spinner.classList.remove('hidden')
    const req = await fetch(api)
    const data = await req.json()
    showWeather(data) 
    spinner.classList.add('hidden')
}
fetchApi(api)

function showWeather(dataArray) {
    dataArray.forEach((data)=>{
        const a = document.createElement('a')
        // id="${data.name.common}" class="card-link"
        a.classList.add("card-link")
        a.setAttribute('id', `${data.name.common}`)
        a.setAttribute('data-set', `${data.region}`)
        a.setAttribute('href', `detail.html?q=${data.name.common}`)
        a.innerHTML = 
        `
            <div class="card">
                <img src="${data.flags.png}" class="card-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.name.common}</h5>
                    <p><b>Population: </b>  ${data.population}</p>
                    <p><b>Region: </b>  ${data.region}</p>
                    <p><b>Capital: </b>  ${data.capital ? data.capital : "No capital"}</p>
                </div>
            </div>
        `
        container.appendChild(a)

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

form.addEventListener('input', () => {
    const searchCountry = form.countryName.value.toLowerCase()

    container.childNodes.forEach((country) => {
        if (country.getAttribute('id').toLowerCase().includes(searchCountry)) {
            country.style.display = 'block'
        } else {
            country.style.display = 'none'
        }
    })
        
})

select.addEventListener('change', () => {
    const searchRegion = select.value.toLowerCase()

    container.childNodes.forEach((country) => {
        if (country.getAttribute('data-set').toLowerCase().includes(searchRegion)) {
            country.style.display = 'block'
        } else if(searchRegion == 'all'){
            country.style.display = 'block'
        }
        else {
            country.style.display = 'none'
        }
    })
})