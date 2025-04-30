import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpaceXPage = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const res = await axios.get('https://api.spacexdata.com/v4/launches');
        setLaunches(res.data);
      } catch (error) {
        setErrorMsg('🚫 Failed to load SpaceX launches.');
      }
      setLoading(false);
    };

    fetchLaunches();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary">🚀 SpaceX Launches</h2>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {errorMsg && <div className="alert alert-danger text-center">{errorMsg}</div>}

      {!loading && launches.length === 0 && (
        <div className="alert alert-warning text-center">No launches available</div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {launches.map((launch) => {
          const youtubeId = launch.links?.webcast?.split('/')[4];
          const imageUrl = youtubeId
            ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
            : 'https://via.placeholder.com/400x200?text=No+Image';

          return (
            <div key={launch.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={imageUrl}
                  className="card-img-top"
                  alt={launch.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{launch.name}</h5>
                  <p className="card-text">
                    {launch.details ? launch.details.slice(0, 120) + '...' : 'No details available.'}
                  </p>
                  <p className="text-muted mb-0">
                    <strong>Launch Date:</strong>{' '}
                    {new Date(launch.date_utc).toLocaleString()}
                  </p>
                </div>
                <div className="card-footer bg-white text-center">
                  {launch.links?.webcast ? (
                    <a
                      href={launch.links.webcast}
                      className="btn btn-sm btn-outline-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Launch 🚀
                    </a>
                  ) : (
                    <button className="btn btn-sm btn-outline-secondary" disabled>
                      No Webcast Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpaceXPage;
