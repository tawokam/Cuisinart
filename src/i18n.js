import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './langues/en.json'; // Chemin vers ton fichier JSON anglais
import frTranslations from './langues/fr.json'; // Exemple si tu as une autre langue
import mgTranslations from './langues/mg.json';

i18n
  .use(initReactI18next) // passe i18n à react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
      mg: { translation: mgTranslations },
    },
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr', // langue de secours
    interpolation: {
      escapeValue: false, // React échappe déjà
    },
  });

export default i18n;
