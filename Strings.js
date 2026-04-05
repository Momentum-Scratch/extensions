(function (Scratch) {
  'use strict';

  class StringsExtension {
    getInfo() {
      return {
        id: 'strings',
        name: 'Strings',
        color1: '#4CAF50',
        color2: '#3E8E41',
        color3: '#2E6E31',

        menus: {
          STARTS_MENU: {
            acceptReporters: true,
            items: [
              { text: 'starts with', value: 'starts' },
              { text: 'not starts with', value: 'notstarts' },
              { text: 'ends with', value: 'ends' },
              { text: 'not ends with', value: 'notends' }
            ]
          },
          CASE_MENU: {
            acceptReporters: true,
            items: [
              { text: 'uppercase', value: 'upper' },
              { text: 'lowercase', value: 'lower' },
              { text: 'titlecase', value: 'title' }
            ]
          },
          CODEC_MENU: {
            acceptReporters: true,
            items: [
              { text: 'Base64', value: 'base64' },
              { text: 'URL', value: 'url' }
            ]
          }
        },

        blocks: [
          // ── Simple reporters / booleans ─────────────────────────
          {
            opcode: 'identityReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: '[VALUE]',
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'foo'
              }
            }
          },

          {
            opcode: 'identityBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VALUE]',
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true
              }
            }
          },

          {
            opcode: 'trueConstant',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'true'
          },

          {
            opcode: 'falseConstant',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'false'
          },

          // ── Random string ───────────────────────────────────────
          {
            opcode: 'randomString',
            blockType: Scratch.BlockType.REPORTER,
            text: 'random string [LEN] lowercase [LOWER] uppercase [UPPER] symbols [SYMBOLS] numbers [NUMBERS]',
            arguments: {
              LEN: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 16
              },
              LOWER: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true
              },
              UPPER: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false
              },
              SYMBOLS: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false
              },
              NUMBERS: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true
              }
            }
          },

          '---',

          // ── Characters ──────────────────────────────────────────
          {
            opcode: 'newlineChar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'new line'
          },
          {
            opcode: 'tabChar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tab character'
          },

          '---',

          // ── Join (2–5 parts) ───────────────────────────────────
          {
            opcode: 'join2',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [A] [B]',
            arguments: {
              A: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' },
              B: { type: Scratch.ArgumentType.STRING, defaultValue: 'banana' }
            }
          },
          {
            opcode: 'join3',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [A] [B] [C]',
            arguments: {
              A: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' },
              B: { type: Scratch.ArgumentType.STRING, defaultValue: 'banana' },
              C: { type: Scratch.ArgumentType.STRING, defaultValue: 'pear' }
            }
          },
          {
            opcode: 'join4',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [A] [B] [C] [D]',
            arguments: {
              A: { type: Scratch.ArgumentType.STRING, defaultValue: 'one' },
              B: { type: Scratch.ArgumentType.STRING, defaultValue: 'two' },
              C: { type: Scratch.ArgumentType.STRING, defaultValue: 'three' },
              D: { type: Scratch.ArgumentType.STRING, defaultValue: 'four' }
            }
          },
          {
            opcode: 'join5',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [A] [B] [C] [D] [E]',
            arguments: {
              A: { type: Scratch.ArgumentType.STRING, defaultValue: 'one' },
              B: { type: Scratch.ArgumentType.STRING, defaultValue: 'two' },
              C: { type: Scratch.ArgumentType.STRING, defaultValue: 'three' },
              D: { type: Scratch.ArgumentType.STRING, defaultValue: 'four' },
              E: { type: Scratch.ArgumentType.STRING, defaultValue: 'five' }
            }
          },

          '---',

          // ── Index / substring / length ──────────────────────────
          {
            opcode: 'indexOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'index of [NEEDLE] in [HAYSTACK]',
            arguments: {
              NEEDLE: { type: Scratch.ArgumentType.STRING, defaultValue: 'world' },
              HAYSTACK: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello world!' }
            }
          },
          {
            opcode: 'lastIndexOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last index of [NEEDLE] in [HAYSTACK]',
            arguments: {
              NEEDLE: { type: Scratch.ArgumentType.STRING, defaultValue: 'world' },
              HAYSTACK: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello world!' }
            }
          },
          {
            opcode: 'reverse',
            blockType: Scratch.BlockType.REPORTER,
            text: 'reverse [TEXT]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello world!' }
            }
          },
          {
            opcode: 'letterOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'letter [INDEX] of [TEXT]',
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' }
            }
          },
          {
            opcode: 'lettersFromTo',
            blockType: Scratch.BlockType.REPORTER,
            text: 'letters from [START] to [END] in [TEXT]',
            arguments: {
              START: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
              END: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello!' }
            }
          },
          {
            opcode: 'lengthOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'length of [TEXT]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' }
            }
          },

          '---',

          // ── Contains / starts/ends ─────────────────────────────
          {
            opcode: 'contains',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[TEXT] contains [SUB]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' },
              SUB: { type: Scratch.ArgumentType.STRING, defaultValue: 'a' }
            }
          },
          {
            opcode: 'startsWithMenu',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[TEXT] [MODE] [SUB]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'abcdef' },
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'STARTS_MENU'
              },
              SUB: { type: Scratch.ArgumentType.STRING, defaultValue: 'abc' }
            }
          },

          '---',

          // ── Replace / regex ─────────────────────────────────────
          {
            opcode: 'replaceAll',
            blockType: Scratch.BlockType.REPORTER,
            text: 'in [TEXT] replace all [FROM] with [TO]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo bar foo' },
              FROM: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' },
              TO: { type: Scratch.ArgumentType.STRING, defaultValue: 'bar' }
            }
          },
          {
            opcode: 'replaceFirst',
            blockType: Scratch.BlockType.REPORTER,
            text: 'in [TEXT] replace first [FROM] with [TO]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'bar bar doo' },
              FROM: { type: Scratch.ArgumentType.STRING, defaultValue: 'bar' },
              TO: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' }
            }
          },
          {
            opcode: 'matchRegex',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'match [TEXT] with regex [PATTERN] [FLAGS]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo bar' },
              PATTERN: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' },
              FLAGS: { type: Scratch.ArgumentType.STRING, defaultValue: 'g' }
            }
          },

          '---',

          // ── Case transform / encode-decode ──────────────────────
          {
            opcode: 'toCase',
            blockType: Scratch.BlockType.REPORTER,
            text: '[TEXT] to [MODE]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' },
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CASE_MENU'
              }
            }
          },
          {
            opcode: 'encode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'encode [TEXT] with method [METHOD]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world!' },
              METHOD: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CODEC_MENU'
              }
            }
          },
          {
            opcode: 'decode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decode [TEXT] with method [METHOD]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'encoded' },
              METHOD: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CODEC_MENU'
              }
            }
          }
        ]
      };
    }

    // ── Simple reporters / booleans ──────────────────────────────
    identityReporter(args) {
      return String(args.VALUE ?? '');
    }

    identityBoolean(args) {
      return !!args.VALUE;
    }

    trueConstant() {
      return true;
    }

    falseConstant() {
      return false;
    }

    // ── Random string ────────────────────────────────────────────
    randomString(args) {
      let length = Number(args.LEN) || 0;
      if (length < 0) length = 0;
      if (length > 1024) length = 1024;

      const useLower = !!args.LOWER;
      const useUpper = !!args.UPPER;
      const useSymbols = !!args.SYMBOLS;
      const useNumbers = !!args.NUMBERS;

      let charset = '';
      if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (useNumbers) charset += '0123456789';
      if (useSymbols) {
        charset += '!@#$%^&*()-_=+[]{};:\'",.<>/?`~|\\';
      }
      if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

      let out = '';
      for (let i = 0; i < length; i++) {
        const idx = Math.floor(Math.random() * charset.length);
        out += charset.charAt(idx);
      }
      return out;
    }

    // ── Characters ───────────────────────────────────────────────
    newlineChar() {
      return '\n';
    }

    tabChar() {
      return '\t';
    }

    // ── Join ─────────────────────────────────────────────────────
    join2(args) {
      return String(args.A ?? '') + String(args.B ?? '');
    }

    join3(args) {
      return (
        String(args.A ?? '') +
        String(args.B ?? '') +
        String(args.C ?? '')
      );
    }

    join4(args) {
      return (
        String(args.A ?? '') +
        String(args.B ?? '') +
        String(args.C ?? '') +
        String(args.D ?? '')
      );
    }

    join5(args) {
      return (
        String(args.A ?? '') +
        String(args.B ?? '') +
        String(args.C ?? '') +
        String(args.D ?? '') +
        String(args.E ?? '')
      );
    }

    // ── Index / substring / length ───────────────────────────────
    indexOf(args) {
      const haystack = String(args.HAYSTACK ?? '');
      const needle = String(args.NEEDLE ?? '');
      const idx = haystack.indexOf(needle);
      return idx < 0 ? 0 : idx + 1; // 1-based; 0 if not found
    }

    lastIndexOf(args) {
      const haystack = String(args.HAYSTACK ?? '');
      const needle = String(args.NEEDLE ?? '');
      const idx = haystack.lastIndexOf(needle);
      return idx < 0 ? 0 : idx + 1;
    }

    reverse(args) {
      const text = String(args.TEXT ?? '');
      return text.split('').reverse().join('');
    }

    letterOf(args) {
      const text = String(args.TEXT ?? '');
      let index = Math.floor(Number(args.INDEX) || 0);
      if (index < 1 || text.length === 0) return '';
      if (index > text.length) index = text.length;
      return text.charAt(index - 1);
    }

    lettersFromTo(args) {
      const text = String(args.TEXT ?? '');
      let start = Math.floor(Number(args.START) || 0);
      let end = Math.floor(Number(args.END) || 0);
      if (text.length === 0) return '';

      if (start < 1) start = 1;
      if (end < 1) end = 1;
      if (start > text.length) start = text.length;
      if (end > text.length) end = text.length;
      if (end < start) [start, end] = [end, start];

      // JS substring end index is exclusive
      return text.substring(start - 1, end);
    }

    lengthOf(args) {
      const text = String(args.TEXT ?? '');
      return text.length;
    }

    // ── Contains / starts/ends ──────────────────────────────────
    contains(args) {
      const text = String(args.TEXT ?? '');
      const sub = String(args.SUB ?? '');
      if (!sub) return false;
      return text.indexOf(sub) !== -1;
    }

    startsWithMenu(args) {
      const text = String(args.TEXT ?? '');
      const sub = String(args.SUB ?? '');
      const mode = String(args.MODE ?? 'starts');

      if (mode === 'starts') {
        return text.startsWith(sub);
      }
      if (mode === 'notstarts') {
        return !text.startsWith(sub);
      }
      if (mode === 'ends') {
        return text.endsWith(sub);
      }
      if (mode === 'notends') {
        return !text.endsWith(sub);
      }
      return false;
    }

    // ── Replace / regex ─────────────────────────────────────────
    replaceAll(args) {
      const text = String(args.TEXT ?? '');
      const from = String(args.FROM ?? '');
      const to = String(args.TO ?? '');
      if (!from) return text;
      // Escape regex special chars for safe global replace
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return text.replace(new RegExp(escaped, 'g'), to);
    }

    replaceFirst(args) {
      const text = String(args.TEXT ?? '');
      const from = String(args.FROM ?? '');
      const to = String(args.TO ?? '');
      if (!from) return text;
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return text.replace(new RegExp(escaped), to);
    }

    matchRegex(args) {
      const text = String(args.TEXT ?? '');
      const pattern = String(args.PATTERN ?? '');
      const flags = String(args.FLAGS ?? '');
      if (!pattern) return false;
      try {
        const re = new RegExp(pattern, flags);
        return re.test(text);
      } catch (e) {
        // Invalid regex -> false
        return false;
      }
    }

    // ── Case / encode-decode ────────────────────────────────────
    toCase(args) {
      const text = String(args.TEXT ?? '');
      const mode = String(args.MODE ?? 'upper');
      if (mode === 'upper') return text.toUpperCase();
      if (mode === 'lower') return text.toLowerCase();
      if (mode === 'title') {
        return text
          .split(/\s+/)
          .map(word =>
            word
              ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              : ''
          )
          .join(' ');
      }
      return text;
    }

    encode(args) {
      const text = String(args.TEXT ?? '');
      const method = String(args.METHOD ?? 'base64');
      try {
        if (method === 'url') {
          return encodeURIComponent(text);
        }
        // default base64
        if (typeof btoa !== 'undefined') {
          return btoa(unescape(encodeURIComponent(text)));
        }
      } catch (_) {}
      return text;
    }

    decode(args) {
      const text = String(args.TEXT ?? '');
      const method = String(args.METHOD ?? 'base64');
      try {
        if (method === 'url') {
          return decodeURIComponent(text);
        }
        // default base64
        if (typeof atob !== 'undefined') {
          return decodeURIComponent(escape(atob(text)));
        }
      } catch (_) {}
      return text;
    }
  }

  Scratch.extensions.register(new StringsExtension());
})(Scratch);
