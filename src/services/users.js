// src/services/api.js
import { API_URL } from '../store/store';

export async function registerUser(data) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur inscription');
  }
  
  return response.json();
}

// Fonction de connexion
export async function loginUser (data){
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.code === 'SUCCESS') {
      return result; // succès
    } else {
      throw new Error(result.message || 'Erreur inconnue');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw new Error(error.message || 'Erreur de connexion au serveur');
  }
};
