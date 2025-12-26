import { useTranslation } from 'react-i18next';

export const Navigation = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-8">
      <button
        onClick={() => scrollToSection('about')}
        className="text-gray-300 hover:text-blue-400 transition-all duration-200 relative group"
      >
        {t('header.nav.about')}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200" />
      </button>
      <button
        onClick={() => scrollToSection('how-it-works')}
        className="text-gray-300 hover:text-blue-400 transition-all duration-200 relative group"
      >
        {t('header.nav.howItWorks')}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200" />
      </button>
      <button
        onClick={() => scrollToSection('tokenomics')}
        className="text-gray-300 hover:text-blue-400 transition-all duration-200 relative group"
      >
        {t('header.nav.tokenomics')}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200" />
      </button>
      <button
        onClick={() => scrollToSection('features')}
        className="text-gray-300 hover:text-blue-400 transition-all duration-200 relative group"
      >
        {t('header.nav.features')}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200" />
      </button>
      <button
        onClick={() => scrollToSection('nft-showcase')}
        className="text-gray-300 hover:text-blue-400 transition-all duration-200 relative group"
      >
        {t('header.nav.nftShowcase')}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200" />
      </button>
    </nav>
  );
};

