/**
 * Client-side encryption module using libsodium (sodium.js)
 * Implements Zero-Knowledge encryption for RIDEWIRE AI Hub
 */

class EncryptionModule {
  constructor() {
    this.sodium = null;
    this.masterKey = null;
    this.initialized = false;
  }

  /**
   * Initialize the encryption module
   * Must be called before using any encryption methods
   */
  async init() {
    try {
      // Import sodium.js (needs to be added to project)
      this.sodium = require('libsodium.js');
      await this.sodium.ready;
      this.initialized = true;
      console.log('Encryption module initialized');
      return true;
    } catch (err) {
      console.error('Failed to initialize encryption:', err);
      return false;
    }
  }

  /**
   * Generate a new master key for the user
   * This should be called during user registration
   * @returns {Object} Master key pair (public and private)
   */
  generateMasterKey() {
    if (!this.initialized) throw new Error('Encryption module not initialized');
    
    const keyPair = this.sodium.crypto_box_keypair();
    return {
      publicKey: this.sodium.to_base64(keyPair.publicKey),
      privateKey: this.sodium.to_base64(keyPair.privateKey)
    };
  }

  /**
   * Derive a session key from master key
   * @param {string} masterPrivateKey - Base64 encoded master private key
   * @param {string} sessionId - Unique session identifier
   * @returns {Object} Session key and salt
   */
  deriveSessionKey(masterPrivateKey, sessionId) {
    if (!this.initialized) throw new Error('Encryption module not initialized');

    const privateKeyBytes = this.sodium.from_base64(masterPrivateKey);
    const salt = this.sodium.randombytes_buf(16);
    
    // Use KDF to derive session key
    const sessionKey = this.sodium.crypto_kdf_derive_from_key(
      32, // Output length
      1,  // Subkey ID
      sessionId.slice(0, 16).padEnd(16, '0'), // Context
      privateKeyBytes
    );

    return {
      sessionKey: this.sodium.to_base64(sessionKey),
      salt: this.sodium.to_base64(salt)
    };
  }

  /**
   * Encrypt a message with a given key
   * @param {string} plaintext - Message to encrypt
   * @param {string} sessionKey - Base64 encoded session key
   * @returns {Object} Encrypted message with nonce and hash
   */
  encryptMessage(plaintext, sessionKey) {
    if (!this.initialized) throw new Error('Encryption module not initialized');

    const key = this.sodium.from_base64(sessionKey);
    const nonce = this.sodium.randombytes_buf(this.sodium.crypto_secretbox_NONCEBYTES);
    
    const ciphertext = this.sodium.crypto_secretbox_easy(
      plaintext,
      nonce,
      key
    );

    // Generate hash for integrity verification
    const hash = this.sodium.crypto_generichash(32, ciphertext);

    return {
      ciphertext: this.sodium.to_base64(ciphertext),
      nonce: this.sodium.to_base64(nonce),
      hash: this.sodium.to_base64(hash)
    };
  }

  /**
   * Decrypt a message with a given key
   * @param {string} ciphertext - Base64 encoded ciphertext
   * @param {string} nonce - Base64 encoded nonce
   * @param {string} sessionKey - Base64 encoded session key
   * @returns {string} Decrypted plaintext
   */
  decryptMessage(ciphertext, nonce, sessionKey) {
    if (!this.initialized) throw new Error('Encryption module not initialized');

    try {
      const key = this.sodium.from_base64(sessionKey);
      const ciphertextBytes = this.sodium.from_base64(ciphertext);
      const nonceBytes = this.sodium.from_base64(nonce);

      const plaintext = this.sodium.crypto_secretbox_open_easy(
        ciphertextBytes,
        nonceBytes,
        key
      );

      return this.sodium.to_string(plaintext);
    } catch (err) {
      console.error('Decryption failed:', err);
      throw new Error('Failed to decrypt message');
    }
  }

  /**
   * Verify message integrity
   * @param {string} ciphertext - Base64 encoded ciphertext
   * @param {string} hash - Base64 encoded hash
   * @returns {boolean} True if hash matches
   */
  verifyIntegrity(ciphertext, hash) {
    if (!this.initialized) throw new Error('Encryption module not initialized');

    const ciphertextBytes = this.sodium.from_base64(ciphertext);
    const computedHash = this.sodium.crypto_generichash(32, ciphertextBytes);
    const providedHash = this.sodium.from_base64(hash);

    return this.sodium.compare(computedHash, providedHash) === 0;
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EncryptionModule;
}
