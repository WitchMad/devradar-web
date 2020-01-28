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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDevs() {
      setLoading(true);
      const response = await api.get('/devs');
      setDevs(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000)
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
      {loading ? (
        <h2 className="loadText">Carregando...</h2>
      ) : (
        <>
          <aside>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleSubmit} />
          </aside>
          <main>
            <ul>
              {devs.length !== 0 ? devs.map((dev, index) => (
                <DevItem key={dev._id} dev={dev} index={index} />
              )) : <h2>Nenhum usuário cadastrado</h2>}
            </ul>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
