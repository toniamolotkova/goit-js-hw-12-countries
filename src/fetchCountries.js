const BASE_URL = 'https://restcountries.eu';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/rest/v2/name/${name}`).then(response =>
    response.json(),
  );
}

export default { fetchCountries };