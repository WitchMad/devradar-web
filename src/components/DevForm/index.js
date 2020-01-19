import React, { useState, useEffect } from 'react';
import './styles.css';

export default function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();


    await onSubmit({
      latitude,
      longitude,
      github_username,
      techs,
    });

    setTechs('');
    setGithub_username('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">
          Usuário do Github
          </label>
        <input
          name="github_username"
          id="github_username"
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
          required
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">
          Tecnologias
          </label>
        <input
          name="techs"
          id="techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
          required />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">
            Latitude
          </label>
          <input
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">
            Longitude
          </label>
          <input
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}
