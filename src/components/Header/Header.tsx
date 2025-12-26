import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Navigation } from './Navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useHoverSupport } from '../../hooks/useHoverSupport';

export const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoHover = useHoverSupport({ scale: 1.05 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    // Use requestAnimationFrame for better reliability
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerHeight = 80; // Header height
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - headerHeight;

          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        } else {
          console.warn(`Element with id "${id}" not found`);
        }
      }, 150);
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-glow border-b border-blue-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            {...(logoHover.whileHover ? { whileHover: logoHover.whileHover } : {})}
            className="flex items-center gap-3"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.1)',
              }}
            >
              <span className="relative z-10">US</span>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold text-white">
                {t('common.projectName')}
              </div>
              <div className="text-xs text-gray-400">
                {t('hero.subtitle')}
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <Navigation />
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                {t('header.nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                {t('header.nav.howItWorks')}
              </button>
              <button
                onClick={() => scrollToSection('tokenomics')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                {t('header.nav.tokenomics')}
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                {t('header.nav.features')}
              </button>
              <button
                onClick={() => scrollToSection('nft-showcase')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                {t('header.nav.nftShowcase')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

