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

fetchCountries(value).then(data => {
  console.log(data)
   if(data.length <= 10) {
      const listCountries = data.map(res => listCountry(res))
      cardList.innerHTML = listCountries.join(``)
      cardDiv.innerHTML = ``;
   }
   if (data.length === 1) {
      // const markup =   countryCard(responce[0]);
     console.log(countryCard(data[0]));
      cardDiv.innerHTML = countryCard(data[0]);
      cardList.innerHTML = '';
    }
  if(data.length > 10) {
   Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`)
  }
   }).catch(err=> {
       Notiflix.Notify.failure(`Oops, there is no country with that name`);
       cardList.innerHTML =``;
       cardDiv.innerHTML = ``;
       return err
      })
};



