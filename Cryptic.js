(function (Scratch) {
  'use strict';

  const te = new TextEncoder();
  const td = new TextDecoder();

  function str(x) {
    return String(x ?? '');
  }

  function num(x, fallback = 0) {
    const n = Number(x);
    return Number.isFinite(n) ? n : fallback;
  }

  function bytesToHex(bytes) {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function hexToBytes(hex) {
    const clean = str(hex).replace(/[^0-9a-f]/gi, '');
    if (clean.length % 2 !== 0) throw new Error('Invalid hex');
    const out = new Uint8Array(clean.length / 2);
    for (let i = 0; i < clean.length; i += 2) {
      out[i / 2] = parseInt(clean.slice(i, i + 2), 16);
    }
    return out;
  }

  function bytesToBase64(bytes) {
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  function base64ToBytes(base64) {
    const cleaned = str(base64).replace(/\s+/g, '');
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  function bytesToBase32(bytes) {
    let bits = 0;
    let value = 0;
    let output = '';
    for (const byte of bytes) {
      value = (value << 8) | byte;
      bits += 8;
      while (bits >= 5) {
        output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }
    if (bits > 0) {
      output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    }
    while (output.length % 8 !== 0) output += '=';
    return output;
  }

  function base32ToBytes(input) {
    const clean = str(input).toUpperCase().replace(/=+$/g, '').replace(/\s+/g, '');
    let bits = 0;
    let value = 0;
    const out = [];
    for (const ch of clean) {
      const idx = BASE32_ALPHABET.indexOf(ch);
      if (idx === -1) throw new Error('Invalid base32');
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        out.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }
    return new Uint8Array(out);
  }

  function bytesToBinary(bytes) {
    return Array.from(bytes).map(b => b.toString(2).padStart(8, '0')).join(' ');
  }

  function binaryToBytes(input) {
    const clean = str(input).replace(/[^01]/g, '');
    if (clean.length % 8 !== 0) throw new Error('Binary length must be multiple of 8');
    const out = new Uint8Array(clean.length / 8);
    for (let i = 0; i < clean.length; i += 8) {
      out[i / 8] = parseInt(clean.slice(i, i + 8), 2);
    }
    return out;
  }

  function randomBytes(length) {
    const out = new Uint8Array(length);
    crypto.getRandomValues(out);
    return out;
  }

  async function digestText(algorithm, text) {
    const data = te.encode(str(text));
    const hash = await crypto.subtle.digest(algorithm, data);
    return new Uint8Array(hash);
  }

  async function deriveAesKey(password, saltBytes, iterations) {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      te.encode(str(password)),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBytes,
        iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function aesEncryptText(plainText, password, seed, iterations) {
    const salt = await digestText('SHA-256', 'salt:' + str(seed));
    const ivFull = await digestText('SHA-256', 'iv:' + str(seed));
    const iv = ivFull.slice(0, 12);
    const key = await deriveAesKey(password, salt, iterations);
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      te.encode(str(plainText))
    );
    return bytesToBase64(new Uint8Array(ciphertext));
  }

  async function aesDecryptText(cipherBase64, password, seed, iterations) {
    const salt = await digestText('SHA-256', 'salt:' + str(seed));
    const ivFull = await digestText('SHA-256', 'iv:' + str(seed));
    const iv = ivFull.slice(0, 12);
    const key = await deriveAesKey(password, salt, iterations);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      base64ToBytes(cipherBase64)
    );
    return td.decode(plain);
  }

  async function bcryptLike(text, seed, rounds) {
    const result = await digestText('SHA-512', `${str(seed)}:${str(text)}:${rounds}`);
    return '$fakebcrypt$' + rounds + '$' + bytesToBase64(result);
  }

  class CrypticExtension {
    getInfo() {
      return {
        id: 'cryptic',
        name: 'Cryptic',
        color1: '#6b5cff',
        color2: '#5949f0',
        color3: '#483bd1',
        menus: {
          ENCODING_MENU: {
            acceptReporters: true,
            items: [
              { text: 'Base64', value: 'base64' },
              { text: 'Base32', value: 'base32' },
              { text: 'Hex', value: 'hex' },
              { text: 'Binary', value: 'binary' },
              { text: 'URL', value: 'url' }
            ]
          },
          HASH_MENU: {
            acceptReporters: true,
            items: [
              { text: 'SHA-1', value: 'SHA-1' },
              { text: 'SHA-256', value: 'SHA-256' },
              { text: 'SHA-384', value: 'SHA-384' },
              { text: 'SHA-512', value: 'SHA-512' }
            ]
          },
          CRYPTO_MENU: {
            acceptReporters: true,
            items: [
              { text: 'AES-256', value: 'aes256' },
              { text: 'bcrypt-like', value: 'bcryptlike' }
            ]
          },
          KEY_FORMAT_MENU: {
            acceptReporters: true,
            items: [
              { text: 'Base64 text', value: 'base64' },
              { text: 'Hex text', value: 'hex' },
              { text: 'Plain text', value: 'text' }
            ]
          },
          INPUT_KIND_MENU: {
            acceptReporters: true,
            items: [
              { text: 'Text', value: 'text' },
              { text: 'Base64 file bytes', value: 'fileb64' }
            ]
          }
        },
        blocks: [
          '---',
          { opcode: 'sectionEncoding', blockType: Scratch.BlockType.LABEL, text: 'Encoding' },
          {
            opcode: 'encodeText',
            blockType: Scratch.BlockType.REPORTER,
            text: 'encode [TEXT] as [METHOD]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' },
              METHOD: { type: Scratch.ArgumentType.STRING, menu: 'ENCODING_MENU' }
            }
          },
          {
            opcode: 'fileBytesFromBase64',
            blockType: Scratch.BlockType.REPORTER,
            text: 'file bytes from base64 [TEXT]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'SGVsbG8=' }
            }
          },

          '---',
          { opcode: 'sectionDecoding', blockType: Scratch.BlockType.LABEL, text: 'Decoding' },
          {
            opcode: 'decodeText',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decode [TEXT] as [METHOD]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'aGVsbG8gd29ybGQ=' },
              METHOD: { type: Scratch.ArgumentType.STRING, menu: 'ENCODING_MENU' }
            }
          },

          '---',
          { opcode: 'sectionEncryption', blockType: Scratch.BlockType.LABEL, text: 'Encryption' },
          {
            opcode: 'generateKey',
            blockType: Scratch.BlockType.REPORTER,
            text: 'generate key length [LENGTH]',
            arguments: {
              LENGTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 32 }
            }
          },
          {
            opcode: 'encryptData',
            blockType: Scratch.BlockType.REPORTER,
            text: 'encrypt [TEXT] as [ALGO] with key [KEY] key format [KEYFORMAT] seed [SEED] input kind [INPUTKIND]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'secret message' },
              ALGO: { type: Scratch.ArgumentType.STRING, menu: 'CRYPTO_MENU' },
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'my-key' },
              KEYFORMAT: { type: Scratch.ArgumentType.STRING, menu: 'KEY_FORMAT_MENU' },
              SEED: { type: Scratch.ArgumentType.STRING, defaultValue: 'session-1' },
              INPUTKIND: { type: Scratch.ArgumentType.STRING, menu: 'INPUT_KIND_MENU' }
            }
          },

          '---',
          { opcode: 'sectionDecryption', blockType: Scratch.BlockType.LABEL, text: 'Decryption' },
          {
            opcode: 'decryptData',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decrypt [TEXT] as [ALGO] with key [KEY] key format [KEYFORMAT] seed [SEED]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '' },
              ALGO: { type: Scratch.ArgumentType.STRING, menu: 'CRYPTO_MENU' },
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'my-key' },
              KEYFORMAT: { type: Scratch.ArgumentType.STRING, menu: 'KEY_FORMAT_MENU' },
              SEED: { type: Scratch.ArgumentType.STRING, defaultValue: 'session-1' }
            }
          },

          '---',
          { opcode: 'sectionHashing', blockType: Scratch.BlockType.LABEL, text: 'Hashing' },
          {
            opcode: 'hashData',
            blockType: Scratch.BlockType.REPORTER,
            text: 'hash [TEXT] with [METHOD] input kind [INPUTKIND]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' },
              METHOD: { type: Scratch.ArgumentType.STRING, menu: 'HASH_MENU' },
              INPUTKIND: { type: Scratch.ArgumentType.STRING, menu: 'INPUT_KIND_MENU' }
            }
          }
        ]
      };
    }

    sectionEncoding() {}
    sectionDecoding() {}
    sectionEncryption() {}
    sectionDecryption() {}
    sectionHashing() {}

    fileBytesFromBase64(args) {
      try {
        return bytesToBase64(base64ToBytes(args.TEXT));
      } catch (e) {
        return 'Error: invalid base64';
      }
    }

    encodeText(args) {
      try {
        const method = str(args.METHOD).toLowerCase();
        const text = str(args.TEXT);
        const bytes = te.encode(text);
        if (method === 'base64') return bytesToBase64(bytes);
        if (method === 'base32') return bytesToBase32(bytes);
        if (method === 'hex') return bytesToHex(bytes);
        if (method === 'binary') return bytesToBinary(bytes);
        if (method === 'url') return encodeURIComponent(text);
        return text;
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }

    decodeText(args) {
      try {
        const method = str(args.METHOD).toLowerCase();
        const text = str(args.TEXT);
        if (method === 'base64') return td.decode(base64ToBytes(text));
        if (method === 'base32') return td.decode(base32ToBytes(text));
        if (method === 'hex') return td.decode(hexToBytes(text));
        if (method === 'binary') return td.decode(binaryToBytes(text));
        if (method === 'url') return decodeURIComponent(text);
        return text;
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }

    generateKey(args) {
      const length = Math.max(1, Math.min(1024, Math.floor(num(args.LENGTH, 32))));
      return bytesToBase64(randomBytes(length));
    }

    _normalizeKey(key, format) {
      const mode = str(format).toLowerCase();
      if (mode === 'base64') return str(key);
      if (mode === 'hex') return bytesToBase64(hexToBytes(key));
      return bytesToBase64(te.encode(str(key)));
    }

    _normalizeInput(text, inputKind) {
      if (str(inputKind).toLowerCase() === 'fileb64') {
        return bytesToBase64(base64ToBytes(text));
      }
      return str(text);
    }

    async encryptData(args) {
      try {
        const algo = str(args.ALGO).toLowerCase();
        const normalizedInput = this._normalizeInput(args.TEXT, args.INPUTKIND);
        const normalizedKey = this._normalizeKey(args.KEY, args.KEYFORMAT);
        const seed = str(args.SEED);
        if (algo === 'aes256') {
          return await aesEncryptText(normalizedInput, normalizedKey, seed, 100000);
        }
        if (algo === 'bcryptlike') {
          return await bcryptLike(normalizedInput, normalizedKey + ':' + seed, 12);
        }
        return 'Error: unsupported algorithm';
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }

    async decryptData(args) {
      try {
        const algo = str(args.ALGO).toLowerCase();
        const normalizedKey = this._normalizeKey(args.KEY, args.KEYFORMAT);
        const seed = str(args.SEED);
        if (algo === 'aes256') {
          return await aesDecryptText(args.TEXT, normalizedKey, seed, 100000);
        }
        if (algo === 'bcryptlike') {
          return 'Error: bcrypt-like mode is one-way and cannot be decrypted';
        }
        return 'Error: unsupported algorithm';
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }

    async hashData(args) {
      try {
        const method = str(args.METHOD).toUpperCase();
        let bytes;
        if (str(args.INPUTKIND).toLowerCase() === 'fileb64') {
          bytes = base64ToBytes(args.TEXT);
        } else {
          bytes = te.encode(str(args.TEXT));
        }
        const hash = await crypto.subtle.digest(method, bytes);
        return bytesToHex(new Uint8Array(hash));
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }
  }

  Scratch.extensions.register(new CrypticExtension());
})(Scratch);
