import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CatFactsPage = () => {
  const [catFact, setCatFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fetch on load
  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    setLoading(true);
    setErrorMsg('');
    setCatFact('');
    try {
      const res = await axios.get('https://catfact.ninja/fact');
      setCatFact(res.data.fact);
    } catch (error) {
      setErrorMsg('😿 Failed to load cat fact. Try again!');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4 text-success">🐾 Cat Fact Generator</h2>

      <button
        className="btn btn-outline-success mb-4"
        onClick={fetchCatFact}
        disabled={loading}
      >
        {loading ? 'Fetching...' : '😺 Get a New Cat Fact'}
      </button>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {loading && <div className="spinner-border text-success mb-3" role="status" />}

      {catFact && (
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <p className="card-text fs-5">{catFact}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatFactsPage;
