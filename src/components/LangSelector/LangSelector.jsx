import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';

export default function LangSelector() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const languages = [
    { code: 'fr', label: 'Français', flag: '/flags/fr.png' },
    { code: 'en', label: 'English', flag: '/flags/en.png' },
    { code: 'mg', label: 'Malagasy', flag: '/flags/mg.png' }
  ];

  useEffect(() => {
    const onLanguageChanged = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n]);

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="mb-3">
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={currentLanguage.flag}
            alt={currentLanguage.label}
            style={{ width: '25px', height: '20px', marginRight: '8px' }}
          />
          {currentLanguage.label}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
              <img
                src={lang.flag}
                alt={lang.label}
                style={{ width: '25px', height: '20px', marginRight: '8px' }}
              />
              {lang.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
