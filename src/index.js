import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');

import API from './fetchCountries';
import listTmp from './templates/country-list.hbs';
import countryInfo from './templates/country-card.hbs';

  import { success, error, notice, defaultModules } from '@pnotify/core';


const successMessage = () => success({
  title: 'Success!',
            text: 'Here is an info about country you are looking for',
  delay: 5000,
            addClass: 'notice-pnotify',

});
const noticeMessage =  () =>   notice({
            title: 'Notice',
            text: 'Please enter a more specific query!',
            delay: 4000,
           addClass: 'notice-pnotify',

});

const errorCatch = (err) => {
        error({
     
            title: 'Error',
        text: 'Please enter your query!',
        delay: 4000,
        addClass: 'notice-pnotify',
        type: error,
    }) 
}

const errorMessage = () =>  error({
            title: 'Notice',
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 4000,
            addClass: 'notice-pnotify',
        })

 

const search = document.querySelector('.search-input');
const template = document.querySelector('.template');


search.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
    event.preventDefault();
    template.innerHTML = '';
    const searchQuery = event.target.value;
    API.fetchCountries(searchQuery)
        .then(render)
        .catch(errorCatch)      
    .finally(() => search.value = '')
   
}


function render(country) {
    let markup = '';
    if (country.length === 1) {
        markup = countryInfo(country);
        template.insertAdjacentHTML('beforeend', markup);
        successMessage();
    }
    if (country.length > 1 && country.length <= 10) {
        markup = listTmp(country);
        template.insertAdjacentHTML('beforeend', markup);
        noticeMessage();
    }
    if (country.length > 10) {
        errorMessage();
    }     
}

