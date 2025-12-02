import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationKO from './locales/ko/translation.json';
import translationEN from './locales/en/translation.json';
import translationJA from './locales/ja/translation.json';
import translationZH from './locales/zh/translation.json';
import translationDE from './locales/de/translation.json';
import translationES from './locales/es/translation.json';
import translationAR from './locales/ar/translation.json';
import translationIT from './locales/it/translation.json';
import translationFR from './locales/fr/translation.json';

const resources = {
    ko: { translation: translationKO },
    en: { translation: translationEN },
    ja: { translation: translationJA },
    zh: { translation: translationZH },
    de: { translation: translationDE },
    es: { translation: translationES },
    ar: { translation: translationAR },
    it: { translation: translationIT },
    fr: { translation: translationFR },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ko',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
