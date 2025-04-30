import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryInfoPage = () => {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingList, setFetchingList] = useState(true);
  const [error, setError] = useState('');

  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      setFetchingList(true);
      try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = res.data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountryList(sortedCountries);
      } catch (err) {
        console.error('Error fetching country list:', err);
      }
      setFetchingList(false);
    };
    fetchCountries();
  }, []);

  const fetchCountryData = async (countryName) => {
    setLoading(true);
    setData(null);
    setError('');
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      setData(res.data[0]);
    } catch (error) {
      console.error('Error fetching country data:', error);
      setError('Failed to fetch country info. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (e) => {
    const name = e.target.value;
    setSelectedCountry(name);
    if (name) fetchCountryData(name);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">🌍 Country Info</h2>

      <div className="mb-4">
        <label htmlFor="countrySelect" className="form-label fw-semibold">Select a Country:</label>
        <select
          id="countrySelect"
          className="form-select"
          value={selectedCountry}
          onChange={handleSelect}
        >
          <option value="">{fetchingList ? 'Loading countries...' : '-- Choose Country --'}</option>
          {countryList.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="spinner-border text-primary" role="status" />}
      {error && <div className="alert alert-danger">{error}</div>}

      {data && !loading && (
        <div className="card shadow-lg">
          <div className="card-body">
            <div className="text-center mb-4">
              <img
                src={data.flags.svg}
                alt={`${data.name.common} flag`}
                className="img-fluid"
                style={{ maxHeight: '150px' }}
              />
            </div>
            <ul className="list-group">
              <li className="list-group-item"><strong>Name:</strong> {data.name.common}</li>
              <li className="list-group-item"><strong>Capital:</strong> {data.capital?.[0] || 'N/A'}</li>
              <li className="list-group-item"><strong>Region:</strong> {data.region}</li>
              <li className="list-group-item"><strong>Population:</strong> {data.population.toLocaleString()}</li>
              <li className="list-group-item"><strong>Timezones:</strong> {data.timezones?.join(', ')}</li>
              <li className="list-group-item"><strong>Currency:</strong> {
                data.currencies ? Object.values(data.currencies)[0].name : 'N/A'
              }</li>
              <li className="list-group-item"><strong>Languages:</strong> {
                data.languages ? Object.values(data.languages).join(', ') : 'N/A'
              }</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryInfoPage;
