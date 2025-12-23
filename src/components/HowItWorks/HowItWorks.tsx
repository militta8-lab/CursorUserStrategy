import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const HowItWorks = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const steps = [
    {
      key: 'step1',
      icon: '💰',
      delay: 0.2,
    },
    {
      key: 'step2',
      icon: '🛒',
      delay: 0.4,
    },
    {
      key: 'step3',
      icon: '📈',
      delay: 0.6,
    },
    {
      key: 'step4',
      icon: '🔥',
      delay: 0.8,
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center px-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
            }}
          >
            {t('howItWorks.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const isOrange = index === 1 || index === 3; // Step 2 and 4 with orange accents
              return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: step.delay }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`glass-glow rounded-xl p-6 md:p-8 border transition-all duration-300 relative overflow-hidden group ${
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
                {/* Decorative gradient */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isOrange
                      ? 'radial-gradient(circle at center, rgba(249, 115, 22, 0.2) 0%, transparent 70%)'
                      : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                  }}
                  animate={isVisible ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div 
                    className="text-2xl font-bold mb-2"
                    style={isOrange ? {
                      background: 'linear-gradient(135deg, #ffffff 0%, #fb923c 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    } : {
                      color: '#ffffff',
                    }}
                  >
                    {t(`howItWorks.${step.key}.title`)}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {t(`howItWorks.${step.key}.description`)}
                  </div>
                </div>

                {/* Step number */}
                <div 
                  className="absolute top-4 right-4 text-6xl font-bold"
                  style={{
                    color: isOrange ? 'rgba(249, 115, 22, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  }}
                >
                  {index + 1}
                </div>
              </motion.div>
            )})}
          </div>

          {/* Flow visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 hidden lg:flex items-center justify-center gap-4"
          >
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isVisible ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

