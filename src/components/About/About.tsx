import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const About = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center px-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
            }}
          >
            {t('about.title')}
          </h2>

          <div className="space-y-6 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('about.description')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-primary-light font-medium"
            >
              {t('about.tokenInfo')}
            </motion.p>
          </div>

          {/* Visual elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-glow rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 relative overflow-hidden group"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.2), inset 0 0 10px rgba(59, 130, 246, 0.05)',
              }}
            >
              <div className="text-3xl font-bold mb-2 relative z-10" style={{ color: '#60a5fa' }}>10%</div>
              <div className="text-gray-300 relative z-10">{t('about.stats.commission')}</div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-glow rounded-xl p-6 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 relative overflow-hidden group"
              style={{
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.2), inset 0 0 10px rgba(249, 115, 22, 0.05)',
              }}
            >
              <div 
                className="text-3xl font-bold mb-2 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >80%</div>
              <div className="text-gray-300 relative z-10">{t('about.stats.toUsernames')}</div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-glow rounded-xl p-6 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 relative overflow-hidden group"
              style={{
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.2), inset 0 0 10px rgba(249, 115, 22, 0.05)',
              }}
            >
              <div 
                className="text-3xl font-bold mb-2 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >25%</div>
              <div className="text-gray-300 relative z-10">{t('about.stats.markup')}</div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

