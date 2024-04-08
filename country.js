const countryName = new URLSearchParams(location.search).get('name')
const countryflag = document.querySelector('.country-details img')
const countryHeader = document.querySelector('.country-content .title')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subregion = document.querySelector(".sub-region")
const capital = document.querySelector(".capital")
const domain = document.querySelector(".domain")
const currency = document.querySelector(".currency")
const language = document.querySelector(".language")
const borderDetails = document.querySelector(".border-details")
const themeChanger = document.querySelector('.change-theme')



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>{
    console.log(country)
    countryflag.src = country.flags.svg
    countryHeader.innerHTML = country.name.common
    if(country.name.nativeName){
        nativeName.innerHTML = Object.values(country.name.nativeName)[0].common
    }else{
        nativeName.innerText = country.name.common
    }
    population.innerText = country.population.toLocaleString("en-IN")
    region.innerText = country.region
    if(country.subregion){
        subregion.innerText = country.subregion
    }
    // if(country.capital){
    //     capital.innerText = country.capital.join(', ')
    // }
    country.capital ? capital.innerText = country.capital.join(', ') : ''
    domain.innerText = country.tld.join(', ')
    if(country.currencies){
        currency.innerText = Object.values(country.currencies).map((currency)=>currency.name)
    }
    country.languages ? language.innerText = Object.values(country.languages).join(', ') : ''
    if(country.borders){
        country.borders.forEach(border => {
            const bordersRef = document.createElement('a')
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=>res.json())
            .then(([borderCountry]) =>{
                console.log(borderCountry.name.common)
                bordersRef.innerText = borderCountry.name.common;
                bordersRef.href = `/country.html?name=${borderCountry.name.common}`
            })

            borderDetails.append(bordersRef)
        });

    }

})


    themeChanger.addEventListener('click',(e)=>{
        const mode = document.querySelector('body').classList.toggle('dark')
        if(mode){
            themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbspLight Mode`
        }else{
            themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'
        }
    })
