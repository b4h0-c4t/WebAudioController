import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import MusicController from './Components/MusicController.js';
import MusicDetail from './Components/MusicDetail.js';
import ENV from './env.js';

const App = () => {
  const [is_playing, isPlayingDispatcher] = useState(false);
  const [volume, volumeDispatcher] = useState(0);
  const [artist, artistDispatcher] = useState('');
  const [title, titleDispatcher] = useState('');
  useEffect(() => {
    const fetchData = async () =>
      fetch(`${ENV.API_URL}/api/status`)
        .then(res => res.json()
          .then(json => {
            isPlayingDispatcher(json.isplaying);
            volumeDispatcher(parseInt(json.volume));
            artistDispatcher(json.artist);
            titleDispatcher(json.title);
          }));
    fetchData();
  }, [])

  const mediaDispatcher = ({ artist, title, is_playing }) => {
    isPlayingDispatcher(is_playing);
    artistDispatcher(artist);
    titleDispatcher(title);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${is_playing ? '' :'animation-none'}`} alt="logo" />
      </header>
      <main>
        <MusicDetail data={{ artist, title }} />
        <MusicController  data={{ is_playing, volume }} dispatcher={{ mediaDispatcher, volumeDispatcher }} />
      </main>
    </div>
  );
}

export default App;
