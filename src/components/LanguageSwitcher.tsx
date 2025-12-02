import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
    { code: 'ar', label: 'العربية' },
    { code: 'it', label: 'Italiano' },
    { code: 'fr', label: 'Français' },
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleSelect = (langCode: string | null) => {
        if (langCode) {
            i18n.changeLanguage(langCode);
        }
    };

    const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

    return (
        <Dropdown onSelect={handleSelect} className="language-switcher ms-3">
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" size="sm">
                {currentLang.label}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {languages.map((lang) => (
                    <Dropdown.Item key={lang.code} eventKey={lang.code} active={i18n.language === lang.code}>
                        {lang.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};
