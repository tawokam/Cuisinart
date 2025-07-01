import React from 'react';

export default function SectionTitle({ text, size = '24px', color = '#000000', align = 'left' }) {
  return (
    <h2
      style={{
        fontSize: size,
        color: color,
        textAlign: align,
        fontWeight: '700',
        marginBottom: '1rem'
      }}
    >
      {text}
    </h2>
  );
}
