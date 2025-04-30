import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Switch to HashRouter
import CountryInfoPage from './pages/ContryInfo';
import WeatherPage from './pages/Wether';
import CatFactsPage from './pages/CatFact';
import SpaceXPage from './pages/SpaceX';
import NewsPage from './pages/News';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/country-info">Multi API Dashboard</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/country-info">Country Info</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/weather">Weather</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cat-facts">Cat Facts</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/spacex">SpaceX</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/News">News</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="container mt-4">
          <Routes>
            <Route path="/country-info" element={<CountryInfoPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/cat-facts" element={<CatFactsPage />} />
            <Route path="/spacex" element={<SpaceXPage />} />
            <Route path="/News" element={<NewsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
