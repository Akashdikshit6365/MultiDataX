import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('London');

  const API_KEY = 'aecdd698897da8a26753071c11750f04';

  // Fetch weather data
  const fetchWeather = async (selectedCity) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
    }
    setLoading(false);
  };

  // Fetch suggestions (debounced)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&appid=${API_KEY}&units=metric`)
          .then((res) => {
            setSuggestions(res.data.list || []);
          })
          .catch(() => setSuggestions([]));
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="container py-5" style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
      color: '#333'
    }}>
      <h2 className="text-center mb-4 text-dark">🌤️ Weather Dashboard</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="list-group mt-2">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setCity(suggestion.name);
                  setSearchTerm(suggestion.name);
                  setSuggestions([]);
                }}
              >
                {suggestion.name}, {suggestion.sys.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="spinner-border text-dark" role="status"></div>}

      {weatherData && !loading && (
        <div className="card shadow-lg border-0">
          <div className="card-body text-center">
            <h4 className="card-title">{weatherData.name}, {weatherData.sys.country}</h4>
            <h5 className="mb-3 text-capitalize">
              {weatherData.weather[0].description}
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="weather icon"
                style={{ marginLeft: '10px' }}
              />
            </h5>
            <div className="row">
              <div className="col">
                <p><strong>🌡️ Temp:</strong> {weatherData.main.temp}°C</p>
                <p><strong>💧 Humidity:</strong> {weatherData.main.humidity}%</p>
              </div>
              <div className="col">
                <p><strong>🌬️ Wind:</strong> {weatherData.wind.speed} m/s</p>
                <p><strong>🧭 Pressure:</strong> {weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
