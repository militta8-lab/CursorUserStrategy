import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { useEffect } from 'react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  // Sync i18n with language state
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleToggle = () => {
    toggleLanguage();
  };

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 transition-colors duration-200 font-medium text-sm uppercase tracking-wide flex items-center gap-2 border border-gray-700"
      aria-label="Switch language"
    >
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="text-white">{language === 'en' ? 'RU' : 'EN'}</span>
    </button>
  );
};

