import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useHoverSupport } from '../../hooks/useHoverSupport';

export const Features = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const cardHover = useHoverSupport({ scale: 1.05, y: -10 });

  const features = [
    {
      key: 'feature1',
      icon: '🔥',
      gradient: 'from-red-500 to-orange-500',
      delay: 0.2,
    },
    {
      key: 'feature2',
      icon: '💎',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.4,
    },
    {
      key: 'feature3',
      icon: '🔍',
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.6,
    },
    {
      key: 'feature4',
      icon: '⚡',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.8,
    },
  ];

  return (
    <section
      id="features"
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
              {t('features.title')}
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const isOrange = index === 0 || index === 2; // Feature 1 and 3 with orange accents
              return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: feature.delay }}
                {...(cardHover.whileHover ? { whileHover: cardHover.whileHover } : {})}
                className={`col-span-12 md:col-span-6 glass-glow rounded-xl p-8 border transition-all duration-300 group relative overflow-hidden ${
                  isOrange 
                    ? 'border-orange-500/30 hover:border-orange-500/60' 
                    : 'border-blue-500/30 hover:border-blue-500/60'
                }`}
                style={{
                  boxShadow: isOrange
                    ? '0 0 25px rgba(249, 115, 22, 0.2), inset 0 0 15px rgba(249, 115, 22, 0.05)'
                    : '0 0 25px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.05)',
                }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isOrange
                      ? 'radial-gradient(circle at center, rgba(249, 115, 22, 0.2) 0%, transparent 70%)'
                      : `radial-gradient(circle at center, ${feature.gradient.includes('red') ? 'rgba(239, 68, 68, 0.2)' : feature.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.2)' : feature.gradient.includes('green') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)'} 0%, transparent 70%)`,
                  }}
                  animate={isVisible ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 
                    className="text-2xl font-bold mb-4 relative z-10"
                    style={{
                      background: isOrange
                        ? 'linear-gradient(135deg, #ffffff 0%, #fb923c 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-black leading-relaxed relative z-10">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

