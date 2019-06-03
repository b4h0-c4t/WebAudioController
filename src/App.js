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
  const [total, totalDispatcher] = useState(0);
  const [position, positionDispatcher] = useState(0);
  const [timer_id, timerIdDispatcher] = useState(null);

  useEffect(() => {
    const fetchData = () =>
      fetch(`${ENV.API_URL}/api/status`)
        .then(res => res.json()
          .then(json => {
            volumeDispatcher(parseInt(json.volume));
            mediaDispatcher({
              is_playing: json.isplaying,
              artist: json.artist,
              title: json.title,
              total: json.total,
              position: json.position,
            });
          }));
    fetchData();
  }, []);

  const requestPlayingStatus = () => {
    fetch(`${ENV.API_URL}/api/status`)
      .then(res => res.json()
        .then(json => mediaDispatcher({
          artist: json.artist,
          title: json.title,
          is_playing: json.isplaying,
          total: json.total,
          position: json.position,
        })));
  };

  const mediaDispatcher = ({ artist, title, is_playing, total, position }) => {
    isPlayingDispatcher(is_playing);
    artistDispatcher(artist);
    titleDispatcher(title);
    const splited_total = (new String(total)).split(':');
    const splited_position = (new String(position)).split(':');
    const temp_total = parseInt(splited_total[0]) * 60 + parseInt(splited_total[1]);
    const temp_position = parseInt(splited_position[0]) * 60 + parseInt(splited_position[1]);
    totalDispatcher(temp_total);
    positionDispatcher(temp_position);

    if(timer_id !== null) clearTimeout(timer_id);
    timerIdDispatcher(setTimeout(() => requestPlayingStatus(), (temp_total - temp_position) * 1000 + 1000))
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
