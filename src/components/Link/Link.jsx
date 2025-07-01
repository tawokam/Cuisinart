import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Link({ message, linkLabel, linkPath }) {
  const navigate = useNavigate();

  return (
    <p className="mt-3 text-center">
      {message}{" "}
      <span
        style={{ color: '#006B76', cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => navigate(linkPath)}
      >
        {linkLabel}
      </span>
    </p>
  );
}
