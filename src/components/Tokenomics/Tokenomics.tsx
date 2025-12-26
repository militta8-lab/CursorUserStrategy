import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Tokenomics = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="tokenomics"
      ref={ref}
      className="w-full py-20 md:py-32 relative overflow-hidden bg-white"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-12 md:mb-16">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-black text-white px-8 py-4 rounded-lg"
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {t('tokenomics.title')}
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-12">
            {/* Commission Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-12 md:col-span-6 glass-glow rounded-xl p-8 border border-blue-500/30 hover:border-blue-500/60 transition-all relative overflow-hidden group"
              style={{
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.05)',
              }}
            >
              <h3 className="text-2xl font-bold mb-4 relative z-10" style={{ color: '#60a5fa' }}>
                {t('tokenomics.commission.title')}
              </h3>
              <div className="text-5xl font-bold mb-4 relative z-10" style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t('tokenomics.commission.value')}
              </div>
              <p className="text-black relative z-10">
                {t('tokenomics.commission.description')}
              </p>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>

            {/* Markup Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-12 md:col-span-6 glass-glow rounded-xl p-8 border border-orange-500/30 hover:border-orange-500/60 transition-all relative overflow-hidden group"
              style={{
                boxShadow: '0 0 25px rgba(249, 115, 22, 0.2), inset 0 0 15px rgba(249, 115, 22, 0.05)',
              }}
            >
              <h3 
                className="text-2xl font-bold mb-4 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('tokenomics.markup.title')}
              </h3>
              <div className="text-5xl font-bold mb-4 relative z-10" style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t('tokenomics.markup.value')}
              </div>
              <p className="text-black relative z-10">
                {t('tokenomics.markup.description')}
              </p>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {/* Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="col-span-12 glass-glow rounded-xl p-8 border border-blue-500/30 mb-8 relative overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(59, 130, 246, 0.05)',
            }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              {t('tokenomics.distribution.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-black">
                  {t('tokenomics.distribution.usernamePurchase')}
                </span>
                <span className="text-primary font-bold text-xl">80%</span>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-4 overflow-hidden border border-orange-500/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: '80%' } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #ffffff 0%, #f97316 100%)',
                    boxShadow: '0 0 15px rgba(249, 115, 22, 0.6)',
                  }}
                >
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black">
                  {t('tokenomics.distribution.operations')}
                </span>
                <span className="text-black font-bold text-xl">20%</span>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-4 overflow-hidden border border-slate-600/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: '20%' } : {}}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-full bg-gradient-to-r from-slate-600 to-slate-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Buyback */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="col-span-12 glass-glow rounded-xl p-8 border border-blue-500/40 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              {t('tokenomics.buyback.title')}
            </h3>
            <p className="text-black text-center text-lg max-w-prose mx-auto">
              {t('tokenomics.buyback.description')}
            </p>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

