import { motion, useMotionTemplate } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { NFTDisplayItem } from '../../types/nft';
import { useTilt } from '../../hooks/useTilt';

/**
 * Props for NFTCard component
 */
interface NFTCardProps {
  nft: NFTDisplayItem;
}

/**
 * NFTCard component displays a single NFT username with image, name, and price
 * Features hover effects, gradient borders, and links to marketplace
 * 
 * @param {NFTCardProps} props - Component props
 * @param {NFTDisplayItem} props.nft - NFT data to display
 * @returns {JSX.Element} Rendered NFT card component
 */
export const NFTCard = ({ nft }: NFTCardProps) => {
  const { t } = useTranslation();
  // Tilt effect for 3D perspective - increased angle for more noticeable effect
  const tilt = useTilt(22);

  /**
   * Handles click on NFT card to open marketplace in new tab
   */
  const handleClick = () => {
    window.open(nft.saleUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * Handles keyboard navigation (Enter/Space) for accessibility
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Create transform string using MotionValue directly
  const transform = useMotionTemplate`perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{
        scale: { type: 'spring', stiffness: 200, damping: 25 },
        y: { type: 'spring', stiffness: 200, damping: 25 },
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={tilt.onMouseEnter}
      onMouseLeave={tilt.onMouseLeave}
      style={{
        transformStyle: 'preserve-3d' as const,
        transform,
      }}
      className="relative cursor-pointer group"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${nft.username} on ${nft.marketplace}`}
    >
      {/* Card container with glass morphism and glow */}
      <div
        className="glass-glow rounded-xl overflow-hidden border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 relative"
        style={{
          boxShadow: '0 0 20px rgba(249, 115, 22, 0.2), inset 0 0 12px rgba(249, 115, 22, 0.05)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* On Sale Badge */}
        <div className="absolute top-2 right-2 z-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              boxShadow: '0 0 12px rgba(249, 115, 22, 0.6)',
            }}
          >
            ON SALE
          </motion.div>
        </div>

        {/* NFT Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-900/50">
          <img
            src={nft.image}
            alt={nft.username}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"
          />
        </div>

        {/* NFT Info */}
        <div className="px-3 py-2 bg-slate-900/50 backdrop-blur-sm relative">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            {/* Username */}
            <h3
              className="text-sm font-bold mb-1 truncate"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {nft.username}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {/* TON Icon */}
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
                    fill="#0098EA"
                  />
                  <path
                    d="M37.5603 15.6277H18.4386C14.9228 15.6277 12.6944 19.4202 14.4632 22.4861L26.2644 42.9409C27.0345 44.2765 28.9644 44.2765 29.7345 42.9409L41.5381 22.4861C43.3045 19.4251 41.0761 15.6277 37.5627 15.6277H37.5603ZM26.2548 36.8068L23.6847 31.8327L17.4833 20.7414C17.0742 20.0315 17.5795 19.1218 18.4362 19.1218H26.2524V36.8092L26.2548 36.8068ZM38.5108 20.739L32.3118 31.8351L29.7417 36.8068V19.1194H37.5579C38.4146 19.1194 38.9199 20.0291 38.5108 20.739Z"
                    fill="white"
                  />
                </svg>
                <span className="text-white font-semibold text-sm">{nft.price}</span>
              </div>

              {/* View arrow */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-3.5 h-3.5 text-orange"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>

            {/* Marketplace link text */}
            <p className="text-xs text-gray-400 mt-1">
              {t('nftShowcase.goToPage')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

