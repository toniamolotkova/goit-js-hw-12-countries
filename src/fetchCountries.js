const BASE_URL = 'https://restcountries.eu';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/rest/v2/name/${name}`).then(response => {
    if (response.ok) return response.json()
  }
  );
}

export default { fetchCountries };