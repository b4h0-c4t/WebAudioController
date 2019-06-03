import React from 'react';
import './css/MusicDetail.css';

const MusicDetail = ({data}) => {
  return (
    <div className="MusicDetail">
      <h2>{data.title}</h2>
      <p>{data.artist}</p>
    </div>
  );
};

export default MusicDetail;
