/**
 * Type definitions for NFT data structures from TON blockchain
 */

/**
 * Represents a single NFT item with sale information
 */
export interface NFTItem {
  address: string;
  index: number;
  owner: {
    address: string;
    is_scam: boolean;
  };
  collection?: {
    address: string;
    name: string;
  };
  verified: boolean;
  metadata: {
    name: string;
    description?: string;
    image?: string;
    attributes?: Array<{
      trait_type: string;
      value: string;
    }>;
  };
  sale?: {
    address: string;
    market: {
      address: string;
      name: string;
    };
    owner?: {
      address: string;
    };
    price: {
      token_name: string;
      value: string;
    };
  };
  previews?: Array<{
    resolution: string;
    url: string;
  }>;
}

/**
 * Response from TON API for account NFTs
 */
export interface NFTResponse {
  nft_items: NFTItem[];
}

/**
 * Simplified NFT data for display in the showcase
 */
export interface NFTDisplayItem {
  id: string;
  name: string;
  username: string;
  image: string;
  price: string;
  priceInTon: number;
  saleUrl: string;
  marketplace: string;
}


