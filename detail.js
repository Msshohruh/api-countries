const siteTitle = document.querySelector('title')
const countryImg = document.querySelector('.country-img')
const introTitle = document.querySelector('.intro-title')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currency = document.querySelector('.currency')
const language = document.querySelector('.language')
const darkModeBtn = document.querySelector('.dark-mode-btn')
const btnImg = document.querySelector('.btn-img')

const searchParams = window.location.search
const searchCountry = new URLSearchParams(searchParams).get('q')

const api = `https://restcountries.com/v3.1/name/` + searchCountry

async function fetchApi(url) {
    const req = await fetch(url)
    const data = await req.json()
    showData(data)
}

fetchApi(api)

function showData(country) {
    const data = country[0]
    console.log(data)
    siteTitle.textContent = data.name.common
    countryImg.src = data.flags.svg
    introTitle.textContent = data.name.common
    nativeName.textContent = data.name.official
    population.textContent = data.population
    region.textContent = data.region
    subRegion.textContent = data.subregion
    capital.textContent = data.capital ? data.capital : 'No capital'
    domain.textContent = data.tld
    currency.textContent = Object.keys(data.currencies)
    language.textContent = Object.values(data.languages)
    if (data.borders) {
        const bordersCountries = data.borders
        const ul = document.createElement('ul')
        ul.classList.add('border-countries')
        ul.innerHTML += `
            <li>Border Countries: </li>
        `
        bordersCountries.forEach((borderCountry) => {
            const li = document.createElement('li')
            li.innerHTML += `
            <a href='detail.html?q=${borderCountry}' class="border-country">${borderCountry}</a>
            `
            ul.appendChild(li)
        })
        document.querySelector('.intro-content').appendChild(ul)
    }

}


let darkMode = true
darkModeBtn.addEventListener('click', () => {
    if(darkMode){
        btnImg.src = './img/Light-moon.svg'
        document.body.classList.add('dark-mode')
        darkMode = false
    } else {
        btnImg.src = './img/Dark-moon.svg'
        document.body.classList.remove('dark-mode')
        darkMode = true
    }
})