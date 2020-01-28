import React from 'react';
import './styles.css';

export default function DevItem({ dev, index }) {
  return (
    <li className="dev-item" style={{ animationDelay: `${index + 1}00ms` }}>
    <header>
      <img src={dev.avatar_url} alt={dev.name} />
      <div className="user-info">
        <strong>{dev.name}</strong>
        <span>{dev.techs.join(', ')}</span>
      </div>
    </header>
    <p>{dev.bio}</p>
    <a href={`https://github.com/${dev.github_username}`} target="blank">Acessar perfil no GitHub</a>
  </li>
  );
}
