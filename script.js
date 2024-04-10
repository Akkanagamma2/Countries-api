const countries_container = document.querySelector('.countries-container')
const countryCard = document.createElement('a');
const filterByRegion = document.querySelector('.fliter-by-region')
const searchInput = document.querySelector('.search-container')
const themeChanger = document.querySelector('.change-theme')
let allCountriesData

fetch('https://restcountries.com/v3.1/all')
.then((res)=>res.json())
.then((data) => {
    renderCountries(data);
    allCountriesData = data
})


filterByRegion.addEventListener('change',() =>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
.then((res)=>res.json())
.then(renderCountries)
})

function renderCountries(data){
    countries_container.innerHTML = ''
    data.forEach(country => {
        const countryCard = document.createElement('a');
        countryCard.href = `country.html?name=${country.name.common}`
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
        <img src="${country.flags.svg}"/>
            <div class="card-content">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>`
            countries_container.append(countryCard);

    });
}

searchInput.addEventListener('input', (e) => {
    // console.log(e.target.value)
    // console.log(allCountriesData)
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value))
    renderCountries(filteredCountries)
})

themeChanger.addEventListener('click',(e)=>{
    const mode = document.querySelector('body').classList.toggle('dark')
    if(mode){
        themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbspLight Mode`
    }else{
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'
    }
})





































// const cardImg = document.createElement('img')
// cardImg.src = 'https://mainfacts.com/media/images/coats_of_arms/er.svg'
// countryCard.append(cardImg)

// const cardContent = document.createElement('div');
// cardContent.classList.add('card-content');
// countryCard.append(cardContent)

// const h3 = document.createElement('h3');
// h3.classList.add('card-title')
// cardContent.append(h3)

// const population = document.createElement('p');
// const popBold = document.createElement('b');
// population.append(popBold);
// cardContent.append(population)

// const region = document.createElement('p');
// const regionBold = document.createElement('b');
// region.append(regionBold);
// cardContent.append(region);

// const capital = document.createElement('p');
// const capitalBold = document.createElement('b');
// capital.append(capitalBold);
// cardContent.append(capital);

