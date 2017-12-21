/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const CountriesList = __webpack_require__(1);
const CountriesSelect = __webpack_require__(2);
const CountryInfo = __webpack_require__(3);
const Ajax = __webpack_require__(4);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const CountriesList = function () {
  this.countries = [];
}

CountriesList.prototype.setCountries = function (countries) {
  this.countries = countries;
}

module.exports = CountriesList;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const CountriesSelect = function () {
  this.select = document.querySelector('#countries-select');
}

CountriesSelect.prototype.createOption = function (country, index) {
  const option = document.createElement('option');
  option.innerText = country.name;
  option.value = index;
  return option;
}

CountriesSelect.prototype.render = function (countries) {
  countries.forEach(function (country, index) {
    const option = this.createOption(country, index);
    this.select.appendChild(option);
  }.bind(this));
}

module.exports = CountriesSelect;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const CountryInfo = function () {
  this.ul = document.querySelector('#country-info');
}

CountryInfo.prototype.render = function (country) {
  const select = document.querySelector('#countries-select');
  const option = document.createElement('option');
  option.innerText = `${country.name}`;
  select.appendChild(option);
}


CountryInfo.prototype.createListItem = function (label, content) {
  const li = document.createElement('li');
  li.innerText = `${ label }: ${ content }`;
  return li;
}

module.exports = CountryInfo;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Ajax = function (url) {
  this.url = url;
}

Ajax.prototype.get = function (onComplete) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.send();

  request.addEventListener('load', onComplete);
}

module.exports = Ajax;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map