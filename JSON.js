// Name: JSON
// ID: kokofixJSONS
// Description: Handle objects and arrays with custom typed blocks.
// By: Skyhigh173 <https://scratch.mit.edu/users/Skyhigh173/>
// By: Mio <https://scratch.mit.edu/users/0znzw/>
// By: kokofixcomputers <https://scratch.mit.edu/users/kokofixcomputers>
// License: MIT
// PLEASE NOTE, THIS EXTENSION WILL ONLY RUN ON MOMENTUM, (I MEAN I WON'T STOP YOU FROM TRYING IT SOMEWHERE ELSE)
(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const hasOwn = (obj, property) =>
    Object.prototype.hasOwnProperty.call(obj, property);

  const makeLabel = (text) => ({
    blockType: "label",
    text
  });

  class JSONS {
    getInfo() {
      return {
        id: "kokofixJSONS",
        name: "JSON",
        color1: "#3271D0",
        color2: "#2B62B7",
        color3: "#24539A",
        blocks: [
          makeLabel("Objects"),
          {
            opcode: "newObject",
            blockType: Scratch.BlockType.OBJECT,
            text: "new object"
          },
          {
            opcode: "objectKeys",
            blockType: Scratch.BlockType.ARRAY,
            text: "keys of [OBJ]",
            arguments: {
              OBJ: {
                type: Scratch.ArgumentType.OBJECT
              }
            }
          },
          {
            opcode: "objectValues",
            blockType: Scratch.BlockType.ARRAY,
            text: "values of [OBJ]",
            arguments: {
              OBJ: {
                type: Scratch.ArgumentType.OBJECT
              }
            }
          },
          {
            opcode: "objectEntries",
            blockType: Scratch.BlockType.ARRAY,
            text: "entries of [OBJ]",
            arguments: {
              OBJ: {
                type: Scratch.ArgumentType.OBJECT
              }
            }
          },
          {
            opcode: "valueOfKey",
            blockType: Scratch.BlockType.REPORTER,
            text: "value of [KEY] in [OBJ]",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key"
              },
              OBJ: {
                type: Scratch.ArgumentType.OBJECT
              }
            }
          },
          {
            opcode: "setKey",
            blockType: Scratch.BlockType.OBJECT,
            text: "set [KEY] in [OBJ] to [VALUE]",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key"
              },
              OBJ: {
                type: Scratch.ArgumentType.OBJECT
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value"
              }
            }
          },
          {
            opcode: "deleteKey",
            blockType: Scratch.BlockType.OBJECT,
            text: "delete [KEY] in [OBJ]",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key"
              },
              OBJ: {
                type: Scratch.ArgumentType.OBJECT
              }
            }
          },
          {
            opcode: "hasKey",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[OBJ] has key [KEY]?",
            arguments: {
              OBJ: {
                type: Scratch.ArgumentType.OBJECT
              },
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key"
              }
            }
          },
          {
            opcode: "mergeObjects",
            blockType: Scratch.BlockType.OBJECT,
            text: "merge [A] [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.OBJECT
              },
              B: {
                type: Scratch.ArgumentType.OBJECT
              }
            }
          },

          "---",
          makeLabel("Arrays"),
          {
            opcode: "newArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "new array"
          },
          {
            opcode: "arrayLength",
            blockType: Scratch.BlockType.REPORTER,
            text: "length of [ARR]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "itemOfArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "item [INDEX] of [ARR]",
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "indexOfInArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "index of [ITEM] in [ARR]",
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value"
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "arrayHasValue",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[ARR] contains [ITEM]?",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              },
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value"
              }
            }
          },
          {
            opcode: "addToArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "add [ITEM] to [ARR]",
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value"
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "replaceIndexInArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "replace index [INDEX] in [ARR] with [ITEM]",
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              },
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value"
              }
            }
          },
          {
            opcode: "insertInArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "insert [ITEM] at [INDEX] in [ARR]",
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value"
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "deleteIndexInArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "delete index [INDEX] in [ARR]",
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "sliceArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "items [START] to [END] of [ARR]",
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "reverseArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "reverse [ARR]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "flatArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "flat [ARR] by depth [DEPTH]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              },
              DEPTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "concatArrays",
            blockType: Scratch.BlockType.ARRAY,
            text: "concat [A] [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.ARRAY
              },
              B: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },

          "---",
          makeLabel("JSON Math"),
          {
            opcode: "rangeArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "range from [START] to [END]",
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: "rangeArrayStep",
            blockType: Scratch.BlockType.ARRAY,
            text: "range from [START] to [END] by [STEP]",
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              STEP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "sumArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "sum of [ARR]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "averageArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "average of [ARR]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "minArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "minimum of [ARR]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "maxArray",
            blockType: Scratch.BlockType.REPORTER,
            text: "maximum of [ARR]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },
          {
            opcode: "sortArrayNumeric",
            blockType: Scratch.BlockType.ARRAY,
            text: "sort [ARR] numerically [ORDER]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              },
              ORDER: {
                type: Scratch.ArgumentType.STRING,
                menu: "sort_order"
              }
            }
          },
          {
            opcode: "filterNumericArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "numbers in [ARR]",
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          },

          "---",
          makeLabel("JSON Text"),
          {
            opcode: "parseJson",
            blockType: Scratch.BlockType.REPORTER,
            text: "parse json [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: "stringifyValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "stringify [VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: "isJsonValid",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is json [TEXT] valid?",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },

          "---",
          makeLabel("JSON String Utils"),
          {
            opcode: "splitText",
            blockType: Scratch.BlockType.ARRAY,
            text: 'split [TEXT] by [DELIM]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello world"
              },
              DELIM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: " "
              }
            }
          },
          {
            opcode: "joinArray",
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [ARR] by [DELIM]',
            arguments: {
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              },
              DELIM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ","
              }
            }
          },
          {
            opcode: "trimText",
            blockType: Scratch.BlockType.REPORTER,
            text: "trim [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "  hello world  "
              }
            }
          },
          {
            opcode: "textStartsWith",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[TEXT] starts with [PART]?",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"name":"bob"}'
              },
              PART: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{"
              }
            }
          },
          {
            opcode: "textEndsWith",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[TEXT] ends with [PART]?",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"name":"bob"}'
              },
              PART: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "}"
              }
            }
          },
          {
            opcode: "replaceText",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace [FROM] in [TEXT] with [TO]",
            arguments: {
              FROM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '"'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"name":"bob"}'
              },
              TO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "'"
              }
            }
          },
          {
            opcode: "textBefore",
            blockType: Scratch.BlockType.REPORTER,
            text: "text before [DELIM] in [TEXT]",
            arguments: {
              DELIM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ":"
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key:value"
              }
            }
          },
          {
            opcode: "textAfter",
            blockType: Scratch.BlockType.REPORTER,
            text: "text after [DELIM] in [TEXT]",
            arguments: {
              DELIM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ":"
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key:value"
              }
            }
          },

          "---",
          makeLabel("Lists"),
          {
            opcode: "getListAsArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "get list [LIST] as array",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "get_list"
              }
            }
          },
          {
            opcode: "setListFromArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "set list [LIST] to [ARR]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "get_list"
              },
              ARR: {
                type: Scratch.ArgumentType.ARRAY
              }
            }
          }
        ],
        menus: {
          get_list: {
            acceptReporters: true,
            items: "getLists"
          },
          sort_order: {
            acceptReporters: true,
            items: [
              { text: "ascending", value: "asc" },
              { text: "descending", value: "desc" }
            ]
          }
        }
      };
    }

    getLists() {
      const globalLists = Object.values(
        vm.runtime.getTargetForStage().variables
      ).filter(x => x.type === "list");
      const localLists = vm.editingTarget
        ? Object.values(vm.editingTarget.variables).filter(x => x.type === "list")
        : [];
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      if (uniqueLists.length === 0) {
        return [{ text: "select a list", value: "select a list" }];
      }
      return uniqueLists.map(i => ({
        text: i.name,
        value: i.id
      }));
    }

    lookupList(list, util) {
      const byId = util.target.lookupVariableById(list);
      if (byId && byId.type === "list") return byId;
      const byName = util.target.lookupVariableByNameAndType(list, "list");
      if (byName) return byName;
      return null;
    }

    _cloneObject(obj) {
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
      return { ...obj };
    }

    _cloneArray(arr) {
      if (!Array.isArray(arr)) return [];
      return arr.slice();
    }

    _normalizeObject(value) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            return parsed;
          }
        } catch {
          return {};
        }
      }
      return {};
    }

    _normalizeArray(value) {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        } catch {
          return [];
        }
      }
      return [];
    }

    _normalizeAny(value) {
      if (typeof value !== "string") return value;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    _toListSafeValue(value) {
      if (typeof value === "object" && value !== null) {
        try {
          return JSON.stringify(value);
        } catch {
          return "";
        }
      }
      return value ?? "";
    }

    _toFiniteNumber(value) {
      value = Scratch.Cast.toNumber(value);
      return Number.isFinite(value) ? value : null;
    }

    _numericArray(arr) {
      arr = this._normalizeArray(arr);
      return arr
        .map(value => this._toFiniteNumber(value))
        .filter(value => value !== null);
    }

    newObject() {
      return {};
    }

    objectKeys({ OBJ }) {
      OBJ = this._normalizeObject(OBJ);
      return Object.keys(OBJ);
    }

    objectValues({ OBJ }) {
      OBJ = this._normalizeObject(OBJ);
      return Object.keys(OBJ).map(key => OBJ[key]);
    }

    objectEntries({ OBJ }) {
      OBJ = this._normalizeObject(OBJ);
      return Object.keys(OBJ).map(key => [key, OBJ[key]]);
    }

    valueOfKey({ KEY, OBJ }) {
      OBJ = this._normalizeObject(OBJ);
      return hasOwn(OBJ, KEY) ? (OBJ[KEY] ?? "") : "";
    }

    setKey({ KEY, OBJ, VALUE }) {
      OBJ = this._cloneObject(this._normalizeObject(OBJ));
      OBJ[KEY] = this._normalizeAny(VALUE);
      return OBJ;
    }

    deleteKey({ KEY, OBJ }) {
      OBJ = this._cloneObject(this._normalizeObject(OBJ));
      delete OBJ[KEY];
      return OBJ;
    }

    hasKey({ OBJ, KEY }) {
      OBJ = this._normalizeObject(OBJ);
      return hasOwn(OBJ, KEY);
    }

    mergeObjects({ A, B }) {
      A = this._normalizeObject(A);
      B = this._normalizeObject(B);
      return { ...A, ...B };
    }

    newArray() {
      return [];
    }

    arrayLength({ ARR }) {
      ARR = this._normalizeArray(ARR);
      return ARR.length;
    }

    itemOfArray({ INDEX, ARR }) {
      ARR = this._normalizeArray(ARR);
      INDEX = Scratch.Cast.toNumber(INDEX);
      if (!Number.isFinite(INDEX)) return "";
      return ARR[INDEX] ?? "";
    }

    indexOfInArray({ ITEM, ARR }) {
      ARR = this._normalizeArray(ARR);
      ITEM = this._normalizeAny(ITEM);
      return ARR.indexOf(ITEM);
    }

    arrayHasValue({ ARR, ITEM }) {
      ARR = this._normalizeArray(ARR);
      ITEM = this._normalizeAny(ITEM);
      return ARR.includes(ITEM);
    }

    addToArray({ ITEM, ARR }) {
      ARR = this._cloneArray(this._normalizeArray(ARR));
      ARR.push(this._normalizeAny(ITEM));
      return ARR;
    }

    replaceIndexInArray({ INDEX, ARR, ITEM }) {
      ARR = this._cloneArray(this._normalizeArray(ARR));
      INDEX = Scratch.Cast.toNumber(INDEX);
      if (Number.isFinite(INDEX) && INDEX >= 0) {
        ARR[INDEX] = this._normalizeAny(ITEM);
      }
      return ARR;
    }

    insertInArray({ ITEM, INDEX, ARR }) {
      ARR = this._cloneArray(this._normalizeArray(ARR));
      INDEX = Scratch.Cast.toNumber(INDEX);
      if (!Number.isFinite(INDEX)) INDEX = 0;
      ARR.splice(Math.max(0, INDEX), 0, this._normalizeAny(ITEM));
      return ARR;
    }

    deleteIndexInArray({ INDEX, ARR }) {
      ARR = this._cloneArray(this._normalizeArray(ARR));
      INDEX = Scratch.Cast.toNumber(INDEX);
      if (Number.isFinite(INDEX) && INDEX >= 0) {
        ARR.splice(INDEX, 1);
      }
      return ARR;
    }

    sliceArray({ START, END, ARR }) {
      ARR = this._normalizeArray(ARR);
      START = Scratch.Cast.toNumber(START);
      END = Scratch.Cast.toNumber(END);
      return ARR.slice(START, END);
    }

    reverseArray({ ARR }) {
      ARR = this._cloneArray(this._normalizeArray(ARR));
      ARR.reverse();
      return ARR;
    }

    flatArray({ ARR, DEPTH }) {
      ARR = this._normalizeArray(ARR);
      DEPTH = Scratch.Cast.toNumber(DEPTH);
      if (!Number.isFinite(DEPTH)) DEPTH = 1;
      return ARR.flat(DEPTH);
    }

    concatArrays({ A, B }) {
      A = this._normalizeArray(A);
      B = this._normalizeArray(B);
      return A.concat(B);
    }

    rangeArray({ START, END }) {
      START = Scratch.Cast.toNumber(START);
      END = Scratch.Cast.toNumber(END);

      if (!Number.isFinite(START) || !Number.isFinite(END)) return [];

      START = Math.trunc(START);
      END = Math.trunc(END);

      const result = [];
      const step = START <= END ? 1 : -1;

      for (let i = START; step > 0 ? i <= END : i >= END; i += step) {
        result.push(i);
      }

      return result;
    }

    rangeArrayStep({ START, END, STEP }) {
      START = Scratch.Cast.toNumber(START);
      END = Scratch.Cast.toNumber(END);
      STEP = Scratch.Cast.toNumber(STEP);

      if (!Number.isFinite(START) || !Number.isFinite(END) || !Number.isFinite(STEP)) {
        return [];
      }

      START = Math.trunc(START);
      END = Math.trunc(END);
      STEP = Math.trunc(STEP);

      if (STEP === 0) return [];

      const result = [];

      if (STEP > 0) {
        for (let i = START; i <= END; i += STEP) {
          result.push(i);
        }
      } else {
        for (let i = START; i >= END; i += STEP) {
          result.push(i);
        }
      }

      return result;
    }

    sumArray({ ARR }) {
      const nums = this._numericArray(ARR);
      return nums.reduce((sum, n) => sum + n, 0);
    }

    averageArray({ ARR }) {
      const nums = this._numericArray(ARR);
      if (nums.length === 0) return 0;
      return nums.reduce((sum, n) => sum + n, 0) / nums.length;
    }

    minArray({ ARR }) {
      const nums = this._numericArray(ARR);
      if (nums.length === 0) return "";
      return Math.min(...nums);
    }

    maxArray({ ARR }) {
      const nums = this._numericArray(ARR);
      if (nums.length === 0) return "";
      return Math.max(...nums);
    }

    sortArrayNumeric({ ARR, ORDER }) {
      const nums = this._numericArray(ARR).slice();
      nums.sort((a, b) => a - b);
      if (String(ORDER) === "desc") nums.reverse();
      return nums;
    }

    filterNumericArray({ ARR }) {
      return this._numericArray(ARR);
    }

    parseJson({ TEXT }) {
      try {
        return JSON.parse(TEXT);
      } catch {
        return "";
      }
    }

    stringifyValue({ VALUE }) {
      VALUE = this._normalizeAny(VALUE);
      try {
        return JSON.stringify(VALUE);
      } catch {
        return "";
      }
    }

    isJsonValid({ TEXT }) {
      if (typeof TEXT !== "string") return false;
      try {
        JSON.parse(TEXT);
        return true;
      } catch {
        return false;
      }
    }

    splitText({ TEXT, DELIM }) {
      return String(TEXT).split(String(DELIM));
    }

    joinArray({ ARR, DELIM }) {
      ARR = this._normalizeArray(ARR);
      return ARR.join(String(DELIM));
    }

    trimText({ TEXT }) {
      return String(TEXT).trim();
    }

    textStartsWith({ TEXT, PART }) {
      return String(TEXT).startsWith(String(PART));
    }

    textEndsWith({ TEXT, PART }) {
      return String(TEXT).endsWith(String(PART));
    }

    replaceText({ FROM, TEXT, TO }) {
      return String(TEXT).split(String(FROM)).join(String(TO));
    }

    textBefore({ DELIM, TEXT }) {
      TEXT = String(TEXT);
      DELIM = String(DELIM);
      const i = TEXT.indexOf(DELIM);
      if (i === -1) return "";
      return TEXT.slice(0, i);
    }

    textAfter({ DELIM, TEXT }) {
      TEXT = String(TEXT);
      DELIM = String(DELIM);
      const i = TEXT.indexOf(DELIM);
      if (i === -1) return "";
      return TEXT.slice(i + DELIM.length);
    }

    getListAsArray({ LIST }, util) {
      const listVariable = this.lookupList(LIST, util);
      if (!listVariable) return [];
      return Array.isArray(listVariable.value) ? listVariable.value.slice() : [];
    }

    setListFromArray({ LIST, ARR }, util) {
      const listVariable = this.lookupList(LIST, util);
      if (!listVariable) return;
      ARR = this._normalizeArray(ARR);
      listVariable.value = ARR.map(value => this._toListSafeValue(value));
    }
  }

  Scratch.extensions.register(new JSONS());
})(Scratch);
