import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import ENV from '../env.js';

import './css/MusicController.css';

const MusicController = ({ data, dispatcher }) => {
  const getControllRequest = (endpoint) => {
    fetch(`${ENV.API_URL}${endpoint}`)
      .then(res => res.json()
        .then(json => dispatcher.mediaDispatcher({
          is_playing: json.isplaying,
          artist: json.artist,
          title: json.title,
        })));
  };
  const toggle = () => {
    getControllRequest('/api/toggle');
  };
  const prev = () => {
    getControllRequest('/api/prev');
  };
  const next = () => {
    getControllRequest('/api/next');
  };

  const changeVolume = (event, value) => {
    dispatcher.volumeDispatcher(value);
  };
  const changeVolumeRequest = (event, value) => {
    fetch(`${ENV.API_URL}/api/volume?num=${Math.floor(value)}`);
  }

  return (
    <div className="MusicController">
      <div className="ButtonContainer">
        <button className="Button" onClick={prev}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="Button" onClick={toggle}>
          <FontAwesomeIcon icon={ data.is_playing ? faPause : faPlay } />
        </button>
        <button className="Button" onClick={next}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <div className="SliderContainer">
        <Typography id="label">Volume</Typography>
        <Slider
          className="Slider"
          aria-labelledby="label"
          value={data.volume}
          onChange={changeVolume}
          onDragEnd={changeVolumeRequest}
        />
      </div>
    </div>
  );
};

export default MusicController;
