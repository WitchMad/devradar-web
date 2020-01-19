import React, { useEffect, useState } from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const response = await api.post('/devs', {
      github_username: data.github_username,
      techs: data.techs,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit}/>
      </aside>
      <main>
        <ul>
          {devs.length !== 0 ? devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          )) : <h2>Nenhum usuário cadastrado</h2>}
        </ul>
      </main>
    </div>
  );
}

export default App;
