import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import es from './es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Get device language and extract base language code
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';

// Determine initial language (support en and es, fallback to en)
const getInitialLanguage = (): string => {
  if (deviceLanguage.startsWith('es')) {
    return 'es';
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
