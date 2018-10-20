import React from 'react';

const Loading = ({ message }) => (
  <div className="loadingContainer">
    <div className="loading ldgRing" />
    <p>{message}</p>
  </div>
);

export default Loading;
