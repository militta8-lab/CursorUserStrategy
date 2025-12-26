import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useNFTs } from '../../hooks/useNFTs';
import { NFTCard } from './NFTCard';
import { useState, useCallback, useMemo } from 'react';

// TON wallet address for fetching NFT usernames
const WALLET_ADDRESS = 'UQDjtFLfMaSfNTl_fRUixboWWooMqclQdTmpgBkqULfPjq50';
const ITEMS_PER_PAGE = 8;

/**
 * NFTShowcase component displays a paginated grid of NFT usernames that are on sale
 * Fetches data from TON blockchain and shows 8 NFTs per page
 * Includes manual navigation, loading states, error handling, and empty state
 * 
 * @returns {JSX.Element} Rendered NFT showcase section
 */
export const NFTShowcase = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  
  // Fetch NFTs dynamically from TON blockchain
  // Only shows NFTs that are actually on sale
  const { nfts, isLoading, error } = useNFTs(WALLET_ADDRESS);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(nfts.length / ITEMS_PER_PAGE);

  // Navigation handlers (manual only, no auto-slide)
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const handleGoToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Get current page NFTs - memoized to prevent unnecessary re-renders
  const currentNFTs = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return nfts.slice(startIndex, endIndex);
  }, [nfts, currentPage]);

  return (
    <section
      id="nft-showcase"
      ref={ref}
      className="w-full py-20 md:py-32 relative overflow-hidden bg-white"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <div className="flex justify-center mb-6">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-black text-white px-8 py-4 rounded-lg"
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {t('nftShowcase.title')}
            </h2>
          </div>

          {/* Section Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-black text-center mb-12 max-w-prose mx-auto leading-relaxed"
          >
            {t('nftShowcase.subtitle')}
          </motion.p>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="col-span-12 md:col-span-6 lg:col-span-3 glass-glow rounded-xl overflow-hidden border-2 border-slate-700/50"
                >
                  {/* Skeleton Image */}
                  <div className="aspect-square bg-slate-800/50 animate-pulse" />
                  {/* Skeleton Info */}
                  <div className="p-3 bg-slate-900/50 space-y-2">
                    <div className="h-5 bg-slate-700/50 rounded animate-pulse" />
                    <div className="h-4 bg-slate-700/50 rounded w-2/3 animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-glow rounded-2xl p-8 md:p-12 border border-red-500/30 text-center"
              style={{
                boxShadow: '0 0 25px rgba(239, 68, 68, 0.2), inset 0 0 15px rgba(239, 68, 68, 0.05)',
              }}
            >
              <svg
                className="w-16 h-16 mx-auto mb-4 text-red-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('nftShowcase.error.title')}
              </h3>
              <p className="text-gray-400">
                {t('nftShowcase.error.message')}
              </p>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && nfts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-glow rounded-2xl p-8 md:p-12 border border-blue-500/30 text-center"
              style={{
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.05)',
              }}
            >
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('nftShowcase.empty.title')}
              </h3>
              <p className="text-gray-400">
                {t('nftShowcase.empty.message')}
              </p>
            </motion.div>
          )}

          {/* NFT Grid with Pagination */}
          {!isLoading && !error && nfts.length > 0 && (
            <>
              {/* Info Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mb-8 px-4"
              >
                <div 
                  className="w-full rounded-2xl p-6 md:p-8 space-y-4 bg-gray-50 border border-gray-200"
                  style={{
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Total NFTs Counter */}
                  <p className="text-lg sm:text-xl md:text-2xl text-black font-bold">
                    {t('nftShowcase.totalOnSale', { count: nfts.length })}
                  </p>

                  {/* Wallet Address */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base text-gray-700">
                      {t('nftShowcase.walletLabel')}
                    </span>
                    <a
                      href="https://tonviewer.com/UQDjtFLfMaSfNTl_fRUixboWWooMqclQdTmpgBkqULfPjq50?section=nfts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                        color: '#ffffff',
                        boxShadow: '0 4px 16px rgba(249, 115, 22, 0.5), 0 0 0 2px rgba(249, 115, 22, 0.3)',
                      }}
                    >
                      usernamesstrategy.ton
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  {/* Instructions */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-prose mx-auto">
                    {t('nftShowcase.instructions')}
                  </p>
                </div>
              </motion.div>

              {/* NFT Container with Visual Styling */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="rounded-3xl pt-6 pb-6 px-6 md:pt-8 md:pb-8 md:px-8 relative overflow-hidden bg-white border-2"
                style={{
                  borderColor: 'rgba(249, 115, 22, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(249, 115, 22, 0.1) inset',
                }}
              >
                {/* Animated border glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div
                  className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8"
                  style={{
                    perspective: '1000px',
                  }}
                >
                  {currentNFTs.map((nft) => (
                    <div key={nft.id} className="col-span-12 md:col-span-6 lg:col-span-3">
                      <NFTCard nft={nft} />
                    </div>
                  ))}
                </div>

                {/* Navigation Controls */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-6">
                    {/* Previous Arrow */}
                    <motion.button
                      onClick={handlePrevPage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
                      aria-label="Previous page"
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
                        <path d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>

                    {/* Page Indicators (Dots) */}
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleGoToPage(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          className={`transition-all duration-300 rounded-full ${
                            index === currentPage
                              ? 'w-8 h-3'
                              : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
                          }`}
                          style={
                            index === currentPage
                              ? {
                                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                                  boxShadow: '0 2px 8px rgba(249, 115, 22, 0.5)',
                                }
                              : {}
                          }
                          aria-label={`Go to page ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Next Arrow */}
                    <motion.button
                      onClick={handleNextPage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
                      aria-label="Next page"
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
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </>
          )}

          {/* View All Button */}
          {!isLoading && !error && nfts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <motion.a
                href="https://getgems.io/usernamesstrategy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 relative overflow-hidden group glass-glow"
                style={{
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 10px rgba(139, 92, 246, 0.1)',
                }}
                aria-label={t('nftShowcase.viewAll')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open('https://getgems.io/usernamesstrategy', '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <span className="relative z-10">{t('nftShowcase.viewAll')}</span>
                <svg
                  className="w-4 h-4 relative z-10"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
