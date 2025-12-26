/**
 * Utility functions for converting TON addresses between different formats
 * 
 * TON addresses can be represented in multiple formats:
 * - Raw format: "0:80d78a35f955a14b679faa887ff4cd5bfc0f43b4a4eea2a7e6927f3701b273c2"
 * - User-friendly (bounceable): "EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi"
 * - User-friendly (non-bounceable): "UQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi"
 * 
 * GetGems uses bounceable user-friendly format (starts with EQ)
 */

/**
 * Calculates CRC16-XModem checksum for TON address
 * Uses polynomial 0x1021 with initial value 0x0000
 * This is the standard CRC16 used by TON blockchain
 * 
 * @param {Uint8Array} data - Address data
 * @returns {number} CRC16 checksum
 */
function calculateCRC16(data: Uint8Array): number {
  let crc = 0x0000; // Initial value for CRC16-XModem
  const polynomial = 0x1021;
  
  for (let i = 0; i < data.length; i++) {
    crc ^= (data[i] << 8);
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ polynomial) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  
  return crc;
}

/**
 * Converts a raw TON address (0:hex) to user-friendly bounceable format (EQ...)
 * Pure browser implementation without external dependencies
 * 
 * @param {string} rawAddress - Raw address in format "workchain:hex"
 * @returns {string} User-friendly bounceable address (EQ...) or original if conversion fails
 */
export function convertToUserFriendly(rawAddress: string): string {
  if (!rawAddress) return rawAddress;
  
  // If already in user-friendly format, return as is
  if (rawAddress.startsWith('EQ') || rawAddress.startsWith('UQ')) {
    return rawAddress;
  }
  
  try {
    // Parse raw format: "0:hex" or "workchain:hex"
    const parts = rawAddress.split(':');
    if (parts.length !== 2) {
      return rawAddress;
    }
    
    const workchain = parseInt(parts[0], 10);
    const hex = parts[1];
    
    // Validate hex string
    if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length !== 64) {
      return rawAddress;
    }
    
    // Convert hex to Uint8Array
    const hashBytes = new Uint8Array(32);
    for (let i = 0; i < 64; i += 2) {
      hashBytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    
    // Create address data with tag: tag (1 byte) + workchain (1 byte) + hash (32 bytes) = 34 bytes
    // Tag 0x11 = bounceable, mainnet
    const addressWithTag = new Uint8Array(34);
    addressWithTag[0] = 0x11; // bounceable, mainnet tag
    addressWithTag[1] = workchain;
    addressWithTag.set(hashBytes, 2);
    
    // Calculate CRC16 checksum from tag + workchain + hash (34 bytes)
    const crc = calculateCRC16(addressWithTag);
    
    // Create full address: tag + workchain + hash (34 bytes) + CRC (2 bytes) = 36 bytes total
    const fullAddress = new Uint8Array(36);
    fullAddress.set(addressWithTag, 0);
    fullAddress[34] = (crc >> 8) & 0xFF;
    fullAddress[35] = crc & 0xFF;
    
    // Convert to string for btoa (handle large arrays safely)
    let binaryString = '';
    for (let i = 0; i < fullAddress.length; i++) {
      binaryString += String.fromCharCode(fullAddress[i]);
    }
    
    // Encode to base64url (without padding)
    const base64 = btoa(binaryString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    // The base64 encoding should start with 'EQ' for bounceable addresses (tag 0x11)
    return base64;
  } catch (error) {
    console.error(`Error converting address ${rawAddress}:`, error);
    return rawAddress;
  }
}


