import React, { useState } from 'react';

export default function PasswordField({ id, label, placeholder, register, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3 position-relative">
      <label htmlFor={id} className="form-label" style={{ color: '#000000', fontWeight: '600' }}>
        {label}
      </label>
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...register(id)}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          top: '38px',
          right: '10px',
          border: 'none',
          background: 'transparent',
          padding: 0,
          cursor: 'pointer',
          color: '#006B76',
        }}
        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
      >
        {showPassword ? '👁️' : '🙈'}
      </button>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}
