import './css/styles.css';
import countryCard from './template/countryHbs.hbs'
import listCountry from './template/listCountry.hbs'
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const formEl = document.querySelector(`#search-box`);
const cardDiv = document.querySelector(`.country-info`);
const cardList = document.querySelector('.country-list')

formEl.addEventListener('input', debounce(onFormSubmit , DEBOUNCE_DELAY));

function onFormSubmit(event) {
  event.preventDefault()
  const value = event.target.value;
  let sanitizer = value.trim();

  if(!sanitizer) {
    cardDiv.innerHTML = ``;
    cardList.innerHTML = ``;
    return
  }

  fetchCountries(value).then(responce => {
    if(responce.length <= 10) {
      const listCountries = responce.map(responce => listCountry(responce))
      cardList.innerHTML = listCountries.join(``)
      cardDiv.innerHTML = ``;
    }
    if (responce.length === 1) {
      const markup =   responce.map(elem => countryCard(elem))
      console.log(markup)
      cardDiv.innerHTML = markup;
      cardList.innerHTML = '';
    }
    if(responce.length > 10) {
      Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`)
    }
  }).catch(err=> {
    Notiflix.Notify.failure(`Oops, there is no country with that name`);
    cardList.innerHTML =``;
    cardDiv.innerHTML = ``;
    return err
  })
};

// function countryTmp(countries) {
//
//       return `<h1 class="country-name">${countries.name.common}</h1>
//     <div class="country-wrapper">
//         <p class="country-capital">Capital: ${countries.capital}</p>
//         <p class="country-population">Population: ${countries.population}</p>
//         <h2 class="country-languages">Languages: ${Object.values(countries.languages).join(', ')} </h2>
//         <div class="country__flag_wrapper">
//             <img src="${countries.flags.svg}" alt="country flag" class="country__flag" width="250">
//         </div>
//     </div>`
// }

