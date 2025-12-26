import { useState, useEffect } from 'react';
import type { NFTResponse, NFTItem, NFTDisplayItem } from '../types/nft';
import { convertToUserFriendly } from '../utils/addressConverter';

/**
 * Custom hook to fetch and manage NFT data from TON blockchain
 * Fetches NFTs for a given wallet address and filters those that are on sale
 * 
 * @param {string} walletAddress - TON wallet address to fetch NFTs from
 * @returns {Object} Object containing NFT data, loading state, and error state
 * @property {NFTDisplayItem[]} nfts - Array of NFT items that are on sale
 * @property {boolean} isLoading - Loading state indicator
 * @property {Error | null} error - Error object if fetch failed
 */
export const useNFTs = (walletAddress: string) => {
  const [nfts, setNfts] = useState<NFTDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!walletAddress) {
      setIsLoading(false);
      return;
    }

    /**
     * Fetches NFT data from TON API
     * Uses tonapi.io endpoint to get account NFTs
     * Tries multiple approaches to find NFTs on sale
     */
    const fetchNFTs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch NFTs with indirect ownership to get those in marketplace contracts
        const apiUrl = `https://tonapi.io/v2/accounts/${walletAddress}/nfts?limit=1000&offset=0&indirect_ownership=true`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
        }

        const data: NFTResponse = await response.json();

        // Filter NFTs that are ACTUALLY on sale
        // Must have sale object with price, and price must be > 0
        const onSaleNFTs = data.nft_items
          .filter((nft: NFTItem) => {
            // Check if NFT has active sale
            if (!nft.sale || !nft.sale.price || !nft.sale.price.value) {
              return false;
            }

            // Check if price is valid and > 0
            const priceValue = nft.sale.price.value;
            const priceInTon = parseFloat(priceValue) / 1e9;
            
            if (priceInTon <= 0 || isNaN(priceInTon)) {
              return false;
            }

            return true;
          })
          .map((nft: NFTItem) => transformNFTForDisplay(nft));

        setNfts(onSaleNFTs);
      } catch (err) {
        console.error('Error fetching NFTs:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, [walletAddress]);

  return { nfts, isLoading, error };
};

/**
 * Transforms raw NFT data from API to simplified display format
 * Extracts username from metadata name, calculates price in TON
 * 
 * @param {NFTItem} nft - Raw NFT item from API
 * @returns {NFTDisplayItem} Simplified NFT data for display
 */
function transformNFTForDisplay(nft: NFTItem): NFTDisplayItem {
  // Extract username from name (usually format: "username.t.me" or "@username")
  const rawName = nft.metadata?.name || 'Unknown';
  const username = extractUsername(rawName);

  // Get best quality image
  const image = getBestImage(nft);

  // Calculate price in TON (API returns in nanotons)
  const priceInNanoTon = nft.sale?.price?.value || '0';
  const priceInTon = parseFloat(priceInNanoTon) / 1e9;
  
  // Format price - show 2 decimal places, or more if needed
  const formattedPrice = priceInTon > 0 
    ? `${priceInTon.toFixed(priceInTon >= 1 ? 2 : 4)} TON`
    : 'Price not available';

  // Determine marketplace and sale URL
  const marketplace = nft.sale?.market?.name || 'Getgems';
  const saleUrl = getSaleUrl(nft, marketplace);

  return {
    id: nft.address,
    name: rawName,
    username,
    image,
    price: formattedPrice,
    priceInTon,
    saleUrl,
    marketplace,
  };
}

/**
 * Extracts username from raw NFT name
 * Handles formats: "username.t.me", "@username", or plain "username"
 * 
 * @param {string} rawName - Raw name from NFT metadata
 * @returns {string} Cleaned username with @ prefix
 */
function extractUsername(rawName: string): string {
  // Remove .t.me suffix if present
  let username = rawName.replace('.t.me', '');
  
  // Remove @ prefix if present, we'll add it back
  username = username.replace('@', '');
  
  // Add @ prefix
  return `@${username}`;
}

/**
 * Gets the best quality image URL from NFT previews or metadata
 * Prefers high resolution previews, falls back to metadata image
 * 
 * @param {NFTItem} nft - NFT item with image data
 * @returns {string} Image URL or placeholder
 */
function getBestImage(nft: NFTItem): string {
  // Try to get high resolution preview
  if (nft.previews && nft.previews.length > 0) {
    const highRes = nft.previews.find(p => p.resolution === '1500x1500' || p.resolution === '500x500');
    if (highRes) return highRes.url;
    return nft.previews[0].url;
  }

  // Fallback to metadata image
  if (nft.metadata.image) {
    return nft.metadata.image;
  }

  // Placeholder gradient image
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(59,130,246);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(139,92,246);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23grad)" /%3E%3C/svg%3E';
}

/**
 * Fixed collection address for Getgems marketplace
 * All Telegram username NFTs on Getgems use this collection address
 */
const GETGEMS_COLLECTION_ADDRESS = 'EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi';

/**
 * Generates marketplace URL for NFT sale page
 * Supports Fragment and Getgems marketplaces
 * 
 * Format for Getgems: https://getgems.io/collection/{COLLECTION_ADDRESS}/{NFT_ADDRESS}
 * Example: https://getgems.io/collection/EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi/EQAAbi2oVug-wYcg7hnYocrckFEpmw4COD6nJphxPI1T7hY7
 * 
 * For Getgems, we use a fixed collection address and only convert the NFT address
 * from raw format (0:hex) to user-friendly format (EQ...)
 * 
 * @param {NFTItem} nft - NFT item with sale data
 * @param {string} marketplace - Marketplace name
 * @returns {string} Full URL to NFT sale page
 */
function getSaleUrl(nft: NFTItem, marketplace: string): string {
  const marketplaceName = (marketplace || '').toLowerCase();
  const username = nft.metadata?.name || '';
  const nftAddressRaw = nft.address;
  
  // Convert NFT address to user-friendly format (EQ...) for Getgems
  const nftAddress = convertToUserFriendly(nftAddressRaw);
  
  // Getgems: Use fixed collection address + NFT address format
  // Format: https://getgems.io/collection/{FIXED_COLLECTION_ADDRESS}/{NFT_ADDRESS}
  if (marketplaceName.includes('getgems') || marketplaceName.includes('get gems') || !marketplaceName.includes('fragment')) {
    // Primary: Use fixed collection address + NFT address
    if (nftAddress) {
      return `https://getgems.io/collection/${GETGEMS_COLLECTION_ADDRESS}/${nftAddress}`;
    }
    
    // Fallback: Use direct NFT link (simpler format)
    return `https://getgems.io/nft/${nftAddress}`;
  }
  
  // Fragment: Use username format
  if (marketplaceName.includes('fragment')) {
    const cleanUsername = username.replace('.t.me', '').replace('@', '').trim();
    if (cleanUsername) {
      return `https://fragment.com/username/${cleanUsername}`;
    }
  }

  // Default: Getgems with fixed collection address
  if (nftAddress) {
    return `https://getgems.io/collection/${GETGEMS_COLLECTION_ADDRESS}/${nftAddress}`;
  }
  
  // Last resort: Direct NFT link
  return `https://getgems.io/nft/${nftAddress}`;
}

