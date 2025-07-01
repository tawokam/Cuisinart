import React from 'react';

export default function LogoImage({ src = '/logo.jpg', maxWidth = '100px' }) {
  return (
    <img
      src={src}
      alt="Logo Cuisinart"
      style={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '1.5rem',
        maxWidth: maxWidth,
        height: 'auto',
      }}
    />
  );
}
