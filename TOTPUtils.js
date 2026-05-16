(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed.');
    }

    const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const DEFAULT_PERIOD = 30;

    function randomBytes(length) {
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        return bytes;
    }

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

        return output;
    }

    function normalizeBase32(input) {
        return String(input)
            .toUpperCase()
            .replace(/=+$/g, '')
            .replace(/[^A-Z2-7]/g, '');
    }

    function base32ToBytes(base32) {
        const clean = normalizeBase32(base32);
        let bits = 0;
        let value = 0;
        const output = [];

        for (const char of clean) {
            const index = BASE32_ALPHABET.indexOf(char);
            if (index === -1) continue;

            value = (value << 5) | index;
            bits += 5;

            if (bits >= 8) {
                output.push((value >>> (bits - 8)) & 255);
                bits -= 8;
            }
        }

        return new Uint8Array(output);
    }

    async function hmacSha1(keyBytes, messageBytes) {
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyBytes,
            { name: 'HMAC', hash: 'SHA-1' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageBytes);
        return new Uint8Array(signature);
    }

    function counterToBytes(counter) {
        const bytes = new Uint8Array(8);
        let value = BigInt(counter);

        for (let i = 7; i >= 0; i--) {
            bytes[i] = Number(value & 255n);
            value >>= 8n;
        }

        return bytes;
    }

    async function generateTotp(secret, digits = 6, period = DEFAULT_PERIOD, timestampMs = Date.now()) {
        const key = base32ToBytes(secret);
        if (key.length === 0) return '';

        const counter = Math.floor(timestampMs / 1000 / period);
        const hmac = await hmacSha1(key, counterToBytes(counter));
        const offset = hmac[hmac.length - 1] & 0x0f;
        const binary = ((hmac[offset] & 0x7f) << 24) |
            ((hmac[offset + 1] & 0xff) << 16) |
            ((hmac[offset + 2] & 0xff) << 8) |
            (hmac[offset + 3] & 0xff);
        return (binary % (10 ** digits)).toString().padStart(digits, '0');
    }

    function getSecondsRemaining(period = DEFAULT_PERIOD, timestampMs = Date.now()) {
        const nowSeconds = Math.floor(timestampMs / 1000);
        const elapsed = nowSeconds % period;
        const remaining = period - elapsed;
        return remaining === 0 ? period : remaining;
    }

    function makeOtpAuthUri(secret, issuer, account) {
        const cleanSecret = normalizeBase32(secret);
        const safeIssuer = String(issuer || '').trim();
        const safeAccount = String(account || '').trim();
        const label = safeIssuer && safeAccount ? `${safeIssuer}:${safeAccount}` : (safeIssuer || safeAccount);
        const params = new URLSearchParams();

        params.set('secret', cleanSecret);
        if (safeIssuer) params.set('issuer', safeIssuer);
        params.set('algorithm', 'SHA1');
        params.set('digits', '6');
        params.set('period', String(DEFAULT_PERIOD));

        return `otpauth://totp/${encodeURIComponent(label)}?${params.toString()}`;
    }

    function parseOtpAuthUri(uriText) {
        try {
            const uri = new URL(String(uriText));
            if (uri.protocol !== 'otpauth:' || uri.hostname.toLowerCase() !== 'totp') {
                return null;
            }

            const label = decodeURIComponent(uri.pathname.replace(/^\//, ''));
            let issuerFromLabel = '';
            let accountFromLabel = label;

            if (label.includes(':')) {
                const parts = label.split(':');
                issuerFromLabel = parts.shift() || '';
                accountFromLabel = parts.join(':');
            }

            const issuer = uri.searchParams.get('issuer') || issuerFromLabel;
            const account = accountFromLabel;
            const secret = normalizeBase32(uri.searchParams.get('secret') || '');

            return { issuer, account, secret };
        } catch (e) {
            return null;
        }
    }

    class TotpExtension {
        getInfo() {
            return {
                id: 'totputils',
                name: 'TOTP Utils',
                color1: '#0f8b8d',
                color2: '#0a6c6e',
                blocks: [
                    {
                        opcode: 'generateSecret',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'generate TOTP secret'
                    },
                    {
                        opcode: 'getOtpCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get OTP code for secret [SECRET]',
                        arguments: {
                            SECRET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'JBSWY3DPEHPK3PXP'
                            }
                        }
                    },
                    {
                        opcode: 'getTimeRemaining',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'seconds until TOTP changes'
                    },
                    '---',
                    {
                        opcode: 'makeOtpAuthUri',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'make otpauth URI for secret [SECRET] issuer [ISSUER] account [ACCOUNT]',
                        arguments: {
                            SECRET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'JBSWY3DPEHPK3PXP'
                            },
                            ISSUER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Example App'
                            },
                            ACCOUNT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'alice@example.com'
                            }
                        }
                    },
                    {
                        opcode: 'getSecretFromUri',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get secret from otpauth URI [URI]',
                        arguments: {
                            URI: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'otpauth://totp/Example%20App%3Aalice%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example%20App&algorithm=SHA1&digits=6&period=30'
                            }
                        }
                    },
                    {
                        opcode: 'getIssuerFromUri',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get issuer from otpauth URI [URI]',
                        arguments: {
                            URI: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'otpauth://totp/Example%20App%3Aalice%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example%20App&algorithm=SHA1&digits=6&period=30'
                            }
                        }
                    },
                    {
                        opcode: 'getAccountFromUri',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get account from otpauth URI [URI]',
                        arguments: {
                            URI: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'otpauth://totp/Example%20App%3Aalice%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example%20App&algorithm=SHA1&digits=6&period=30'
                            }
                        }
                    }
                ]
            };
        }

        generateSecret() {
            return bytesToBase32(randomBytes(20));
        }

        async getOtpCode(args) {
            return await generateTotp(args.SECRET, 6, DEFAULT_PERIOD, Date.now());
        }

        getTimeRemaining() {
            return getSecondsRemaining(DEFAULT_PERIOD, Date.now());
        }

        makeOtpAuthUri(args) {
            return makeOtpAuthUri(args.SECRET, args.ISSUER, args.ACCOUNT);
        }

        getSecretFromUri(args) {
            const parsed = parseOtpAuthUri(args.URI);
            return parsed ? parsed.secret : '';
        }

        getIssuerFromUri(args) {
            const parsed = parseOtpAuthUri(args.URI);
            return parsed ? parsed.issuer : '';
        }

        getAccountFromUri(args) {
            const parsed = parseOtpAuthUri(args.URI);
            return parsed ? parsed.account : '';
        }
    }

    Scratch.extensions.register(new TotpExtension());
})(Scratch);
