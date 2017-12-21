const CountriesList = require('./models/countries_list');
const CountriesSelect = require('./views/countries_select');
const CountryInfo = require('./views/country_info');
const Ajax = require('./helpers/ajax');

const app = function () {
  const countriesList = new CountriesList();
  const countriesSelect = new CountriesSelect();
  const countryInfo = new CountryInfo();

  const url = 'https://restcountries.eu/rest/v2/all';
  const ajax = new Ajax(url);

  ajax.get(function () {
    if (this.status !== 200) return;
    const jsonString = this.responseText;
    const countries = JSON.parse(jsonString);

    countriesList.setCountries(countries);
    countriesSelect.render(countries);
  });

  countriesSelect.select.addEventListener('change', function () {
    const selectedIndex = this.value;
    const selectedCountry = countriesList.countries[selectedIndex];
    countryInfo.render(selectedCountry);
  });
}

document.addEventListener('DOMContentLoaded', app);
