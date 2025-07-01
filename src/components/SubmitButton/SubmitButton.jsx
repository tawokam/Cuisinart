import React from 'react';

export default function SubmitButton({ label, disabled, loading }) {
  return (
    <button
      type="submit"
      className="btn w-100 fw-bold text-white d-flex justify-content-center align-items-center"
      style={{ backgroundColor: '#006B76', borderColor: '#006B76', height: '45px' }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#005B66')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#006B76')}
      disabled={disabled || loading}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        label
      )}
    </button>
  );
}
