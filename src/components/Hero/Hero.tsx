import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useMagneticButton } from '../../hooks/useMagneticButton';

export const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Magnetic effects for buttons
  const buyButtonMagnetic = useMagneticButton(0.6, 40);
  const chartButtonMagnetic = useMagneticButton(0.6, 40);
  const telegramButtonMagnetic = useMagneticButton(0.6, 40);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background with futuristic elements */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-white"
      >
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 pt-20 w-full"
      >
        <div className="container">
          <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 px-4 bg-black text-white inline-block px-8 py-4 rounded-lg"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 font-light px-4 text-black"
          >
            {t('hero.subtitle')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-black mb-12 max-w-prose mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ x: buyButtonMagnetic.x, y: buyButtonMagnetic.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              onMouseMove={buyButtonMagnetic.onMouseMove}
              onMouseEnter={buyButtonMagnetic.onMouseEnter}
              onMouseLeave={buyButtonMagnetic.onMouseLeave}
              className="px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 flex items-center gap-2 relative overflow-hidden group border-2"
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
                className="w-5 h-5 relative z-10" 
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ x: chartButtonMagnetic.x, y: chartButtonMagnetic.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              onMouseMove={chartButtonMagnetic.onMouseMove}
              onMouseEnter={chartButtonMagnetic.onMouseEnter}
              onMouseLeave={chartButtonMagnetic.onMouseLeave}
              className="px-6 py-3 rounded-xl text-white font-semibold text-base transition-all duration-300 flex items-center gap-2 relative overflow-hidden group glass-glow"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.1)',
              }}
            >
              <svg className="w-5 h-5 relative z-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="relative z-10">{t('hero.chartButton')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ x: telegramButtonMagnetic.x, y: telegramButtonMagnetic.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              onMouseMove={telegramButtonMagnetic.onMouseMove}
              onMouseEnter={telegramButtonMagnetic.onMouseEnter}
              onMouseLeave={telegramButtonMagnetic.onMouseLeave}
              className="px-6 py-3 rounded-xl text-white font-semibold text-base transition-all duration-300 flex items-center gap-2 relative overflow-hidden group glass-glow"
              style={{
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 10px rgba(139, 92, 246, 0.1)',
              }}
            >
              <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="relative z-10">{t('hero.telegramButton')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

