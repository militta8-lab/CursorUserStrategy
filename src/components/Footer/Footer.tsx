import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHoverSupport } from '../../hooks/useHoverSupport';

export const Footer = () => {
  const { t } = useTranslation();
  const buttonHover = useHoverSupport({ scale: 1.05 });

  return (
    <footer 
      className="w-full py-8 relative overflow-hidden bg-white"
      style={{
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Project name and subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <h3 
              className="text-base font-bold text-black"
            >
              {t('common.projectName')}
            </h3>
            <span className="text-black text-xs">-</span>
            <p className="text-black text-xs">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          {/* Right side - Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.button
              {...(buttonHover.whileHover ? { whileHover: buttonHover.whileHover } : {})}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 relative overflow-hidden group border-2"
              style={{
                borderColor: '#f97316',
                background: 'transparent',
                boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)',
              }}
            >
              <span 
                className="relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('hero.buyButton')}
              </span>
              <svg 
                className="w-4 h-4 relative z-10" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                style={{
                  stroke: '#f97316',
                }}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
              <motion.div
                className="absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderColor: '#fb923c',
                  boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
                }}
              />
            </motion.button>
            
            <motion.button
              {...(buttonHover.whileHover ? { whileHover: buttonHover.whileHover } : {})}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 relative overflow-hidden group glass-glow"
              style={{
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 10px rgba(139, 92, 246, 0.1)',
              }}
            >
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="relative z-10">{t('hero.telegramButton')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4 mt-6 text-center text-black text-xs"
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            <span>{new Date().getFullYear()}</span>
            <span>-</span>
            <span>{t('common.projectName')}</span>
            <span>-</span>
            {t('footer.copyright').includes('love') ? (
              <>
                <span>Build with love</span>
                <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>and tonns of coffee</span>
                <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21h20v-2H2v2zm1-18h18v12c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4V3zm2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5H5zm2 2h10v8H7V7z"/>
                </svg>
              </>
            ) : (
              <>
                <span>Создано с любовью</span>
                <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>и тоннами кофе</span>
                <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21h20v-2H2v2zm1-18h18v12c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4V3zm2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5H5zm2 2h10v8H7V7z"/>
                </svg>
              </>
            )}
          </p>
        </motion.div>

        {/* Privacy Policy and Terms of Use links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-4 text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <a
              href="#privacy-policy"
              className="text-black hover:text-gray-600 transition-colors text-xs"
            >
              {t('footer.privacyPolicy')}
            </a>
            <span className="text-black text-xs">|</span>
            <a
              href="#terms-of-use"
              className="text-black hover:text-gray-600 transition-colors text-xs"
            >
              {t('footer.termsOfUse')}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
