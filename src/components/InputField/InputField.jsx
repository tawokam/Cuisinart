import React from 'react';

export default function InputField({ id, label, placeholder, register, error, type = 'text', onInput }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label" style={{ color: '#000000', fontWeight: '600' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        onInput={onInput} // Accepte la fonction passée
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}
