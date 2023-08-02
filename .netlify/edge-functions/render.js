var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props15, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props15)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props15[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key2 in slots) {
    result[key2] = true;
  }
  return result;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function custom_event(type2, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type2, { detail, bubbles, cancelable });
}
function set_current_component(component12) {
  current_component = component12;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component12 = get_current_component();
  return (type2, detail, { cancelable = false } = {}) => {
    const callbacks = component12.$$.callbacks[type2];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type2,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component12, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name2) => {
    if (invalid_attribute_name_character.test(name2))
      return;
    const value = attributes[name2];
    if (value === true)
      str += " " + name2;
    else if (boolean_attributes.has(name2.toLowerCase())) {
      if (value)
        str += " " + name2;
    } else if (value != null) {
      str += ` ${name2}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name2 = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name2)
      continue;
    style_object[name2] = value;
  }
  for (const name2 in style_directive) {
    const value = style_directive[name2];
    if (value) {
      style_object[name2] = value;
    } else {
      delete style_object[name2];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component12, name2) {
  if (!component12 || !component12.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(
      `<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`
    );
  }
  return component12;
}
function create_ssr_component(fn) {
  function $$render(result, props15, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props15, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props15 = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props15, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
var identity, current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    identity = (x) => x;
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports2) {
    "use strict";
    exports2.parse = parse4;
    exports2.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse4(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index12 = 0;
      while (index12 < str.length) {
        var eqIdx = str.indexOf("=", index12);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index12);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index12 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index12, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index12 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name2, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name2)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name2 + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports2, module2) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name2 = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name: name2,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name2 = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name2 = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name: name2, value };
    }
    function parse4(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module2.exports = parse4;
    module2.exports.parse = parse4;
    module2.exports.parseString = parseString2;
    module2.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/tw-join.mjs
function twJoin() {
  var index12 = 0;
  var argument;
  var resolvedValue;
  var string = "";
  while (index12 < arguments.length) {
    if (argument = arguments[index12++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  var resolvedValue;
  var string = "";
  for (var k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var init_tw_join = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/tw-join.mjs"() {
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/class-utils.mjs
function createClassUtils(config) {
  var classMap = createClassMap(config);
  var conflictingClassGroups = config.conflictingClassGroups, _config$conflictingCl = config.conflictingClassGroupModifiers, conflictingClassGroupModifiers = _config$conflictingCl === void 0 ? {} : _config$conflictingCl;
  function getClassGroupId(className) {
    var classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    var conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [].concat(conflicts, conflictingClassGroupModifiers[classGroupId]);
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  var currentClassPart = classParts[0];
  var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  var classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(function(_ref) {
    var validator2 = _ref.validator;
    return validator2(classRest);
  })?.classGroupId;
}
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    var property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  var theme = config.theme, prefix2 = config.prefix;
  var classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix2);
  prefixedClassGroupEntries.forEach(function(_ref2) {
    var classGroupId = _ref2[0], classGroup = _ref2[1];
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(function(classDefinition) {
    if (typeof classDefinition === "string") {
      var classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(function(_ref3) {
      var key2 = _ref3[0], classGroup2 = _ref3[1];
      processClassesRecursively(classGroup2, getPart(classPartObject, key2), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  var currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(function(pathPart) {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix2) {
  if (!prefix2) {
    return classGroupEntries;
  }
  return classGroupEntries.map(function(_ref4) {
    var classGroupId = _ref4[0], classGroup = _ref4[1];
    var prefixedClassGroup = classGroup.map(function(classDefinition) {
      if (typeof classDefinition === "string") {
        return prefix2 + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(function(_ref5) {
          var key2 = _ref5[0], value = _ref5[1];
          return [prefix2 + key2, value];
        }));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
var CLASS_PART_SEPARATOR, arbitraryPropertyRegex;
var init_class_utils = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/class-utils.mjs"() {
    CLASS_PART_SEPARATOR = "-";
    arbitraryPropertyRegex = /^\[(.+)\]$/;
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/lru-cache.mjs
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: function get() {
        return void 0;
      },
      set: function set() {
      }
    };
  }
  var cacheSize = 0;
  var cache = /* @__PURE__ */ new Map();
  var previousCache = /* @__PURE__ */ new Map();
  function update(key2, value) {
    cache.set(key2, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get: function get(key2) {
      var value = cache.get(key2);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key2)) !== void 0) {
        update(key2, value);
        return value;
      }
    },
    set: function set(key2, value) {
      if (cache.has(key2)) {
        cache.set(key2, value);
      } else {
        update(key2, value);
      }
    }
  };
}
var init_lru_cache = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/lru-cache.mjs"() {
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/modifier-utils.mjs
function createSplitModifiers(config) {
  var separator = config.separator || ":";
  var isSeparatorSingleCharacter = separator.length === 1;
  var firstSeparatorCharacter = separator[0];
  var separatorLength = separator.length;
  return function splitModifiers(className) {
    var modifiers = [];
    var bracketDepth = 0;
    var modifierStart = 0;
    var postfixModifierPosition;
    for (var index12 = 0; index12 < className.length; index12++) {
      var currentCharacter = className[index12];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index12, index12 + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index12));
          modifierStart = index12 + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index12;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    var baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    var maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  var sortedModifiers = [];
  var unsortedModifiers = [];
  modifiers.forEach(function(modifier) {
    var isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
  return sortedModifiers;
}
var IMPORTANT_MODIFIER;
var init_modifier_utils = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/modifier-utils.mjs"() {
    IMPORTANT_MODIFIER = "!";
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/config-utils.mjs
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
var init_config_utils = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/config-utils.mjs"() {
    init_class_utils();
    init_lru_cache();
    init_modifier_utils();
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/merge-classlist.mjs
function mergeClassList(classList, configUtils) {
  var splitModifiers = configUtils.splitModifiers, getClassGroupId = configUtils.getClassGroupId, getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
  var classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map(function(originalClassName) {
    var _splitModifiers = splitModifiers(originalClassName), modifiers = _splitModifiers.modifiers, hasImportantModifier = _splitModifiers.hasImportantModifier, baseClassName = _splitModifiers.baseClassName, maybePostfixModifierPosition = _splitModifiers.maybePostfixModifierPosition;
    var classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    var hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    var variantModifier = sortModifiers(modifiers).join(":");
    var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter(function(parsed) {
    if (!parsed.isTailwindClass) {
      return true;
    }
    var modifierId = parsed.modifierId, classGroupId = parsed.classGroupId, hasPostfixModifier = parsed.hasPostfixModifier;
    var classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(function(group) {
      return classGroupsInConflict.add(modifierId + group);
    });
    return true;
  }).reverse().map(function(parsed) {
    return parsed.originalClassName;
  }).join(" ");
}
var SPLIT_CLASSES_REGEX;
var init_merge_classlist = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/merge-classlist.mjs"() {
    init_modifier_utils();
    SPLIT_CLASSES_REGEX = /\s+/;
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/create-tailwind-merge.mjs
function createTailwindMerge() {
  for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
    createConfig[_key] = arguments[_key];
  }
  var configUtils;
  var cacheGet;
  var cacheSet;
  var functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    var firstCreateConfig = createConfig[0], restCreateConfig = createConfig.slice(1);
    var config = restCreateConfig.reduce(function(previousConfig, createConfigCurrent) {
      return createConfigCurrent(previousConfig);
    }, firstCreateConfig());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    var cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    var result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var init_create_tailwind_merge = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/create-tailwind-merge.mjs"() {
    init_config_utils();
    init_merge_classlist();
    init_tw_join();
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/from-theme.mjs
function fromTheme(key2) {
  var themeGetter = function themeGetter2(theme) {
    return theme[key2] || [];
  };
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
var init_from_theme = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/from-theme.mjs"() {
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/validators.mjs
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value) || isArbitraryLength(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, "size", isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryUrl(value) {
  return getIsArbitraryValue(value, "url", isUrl);
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber);
}
function isNumber(value) {
  return !Number.isNaN(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isInteger(value) {
  return isIntegerOnly(value) || getIsArbitraryValue(value, "number", isIntegerOnly);
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isAny() {
  return true;
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function getIsArbitraryValue(value, label, testValue) {
  var result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return result[1] === label;
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value);
}
function isNever() {
  return false;
}
function isUrl(value) {
  return value.startsWith("url(");
}
function isIntegerOnly(value) {
  return Number.isInteger(Number(value));
}
function isShadow(value) {
  return shadowRegex.test(value);
}
var arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, shadowRegex;
var init_validators = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/validators.mjs"() {
    arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    fractionRegex = /^\d+\/\d+$/;
    stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/default-config.mjs
function getDefaultConfig() {
  var colors = fromTheme("colors");
  var spacing = fromTheme("spacing");
  var blur = fromTheme("blur");
  var brightness = fromTheme("brightness");
  var borderColor = fromTheme("borderColor");
  var borderRadius = fromTheme("borderRadius");
  var borderSpacing = fromTheme("borderSpacing");
  var borderWidth = fromTheme("borderWidth");
  var contrast = fromTheme("contrast");
  var grayscale = fromTheme("grayscale");
  var hueRotate = fromTheme("hueRotate");
  var invert = fromTheme("invert");
  var gap = fromTheme("gap");
  var gradientColorStops = fromTheme("gradientColorStops");
  var gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  var inset = fromTheme("inset");
  var margin = fromTheme("margin");
  var opacity = fromTheme("opacity");
  var padding = fromTheme("padding");
  var saturate = fromTheme("saturate");
  var scale = fromTheme("scale");
  var sepia = fromTheme("sepia");
  var skew = fromTheme("skew");
  var space = fromTheme("space");
  var translate = fromTheme("translate");
  var getOverscroll = function getOverscroll2() {
    return ["auto", "contain", "none"];
  };
  var getOverflow = function getOverflow2() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  };
  var getSpacingWithAutoAndArbitrary = function getSpacingWithAutoAndArbitrary2() {
    return ["auto", isArbitraryValue, spacing];
  };
  var getSpacingWithArbitrary = function getSpacingWithArbitrary2() {
    return [isArbitraryValue, spacing];
  };
  var getLengthWithEmpty = function getLengthWithEmpty2() {
    return ["", isLength];
  };
  var getNumberWithAutoAndArbitrary = function getNumberWithAutoAndArbitrary2() {
    return ["auto", isNumber, isArbitraryValue];
  };
  var getPositions = function getPositions2() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  };
  var getLineStyles = function getLineStyles2() {
    return ["solid", "dashed", "dotted", "double", "none"];
  };
  var getBlendModes = function getBlendModes2() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  };
  var getAlign = function getAlign2() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  };
  var getZeroAndEmpty = function getZeroAndEmpty2() {
    return ["", "0", isArbitraryValue];
  };
  var getBreaks = function getBreaks2() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  };
  var getNumber = function getNumber2() {
    return [isNumber, isArbitraryNumber];
  };
  var getNumberAndArbitrary = function getNumberAndArbitrary2() {
    return [isNumber, isArbitraryValue];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [isAny],
      spacing: [isLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmpty(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      "float": [{
        "float": ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [].concat(getPositions(), [isArbitraryValue])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal"].concat(getAlign())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal"].concat(getAlign(), ["baseline"])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [].concat(getAlign(), ["baseline"])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", isArbitraryValue, isLength]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize, isArbitraryValue]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", isArbitraryValue, isLength]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isArbitraryValue, isLength]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [].concat(getLineStyles(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isArbitraryValue, isLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      "break": [{
        "break": ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [].concat(getPositions(), [isArbitraryPosition])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryUrl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [].concat(getLineStyles(), ["hidden"])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [""].concat(getLineStyles())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isArbitraryValue, isLength]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmpty()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var init_default_config = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/default-config.mjs"() {
    init_from_theme();
    init_validators();
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/tw-merge.mjs
var twMerge;
var init_tw_merge = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/tw-merge.mjs"() {
    init_create_tailwind_merge();
    init_default_config();
    twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
  }
});

// node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/tailwind-merge.mjs
var init_tailwind_merge = __esm({
  "node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/tailwind-merge.mjs"() {
    init_tw_merge();
  }
});

// .svelte-kit/output/server/chunks/Indicator.svelte_svelte_type_style_lang.js
function is_void(name2) {
  return void_element_names.test(name2) || name2.toLowerCase() === "!doctype";
}
var void_element_names, Button;
var init_Indicator_svelte_svelte_type_style_lang = __esm({
  ".svelte-kit/output/server/chunks/Indicator.svelte_svelte_type_style_lang.js"() {
    init_ssr();
    init_tailwind_merge();
    void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["pill", "outline", "size", "href", "type", "color", "shadow"]);
      const group = getContext("group");
      let { pill = false } = $$props;
      let { outline = false } = $$props;
      let { size = group ? "sm" : "md" } = $$props;
      let { href = void 0 } = $$props;
      let { type: type2 = "button" } = $$props;
      let { color = group ? outline ? "dark" : "alternative" : "primary" } = $$props;
      let { shadow = false } = $$props;
      const colorClasses = {
        alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus:text-primary-700 dark:focus:text-white dark:hover:text-white",
        blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
        dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
        green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
        light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
        primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
        purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
        red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
        yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
        none: ""
      };
      const coloredFocusClasses = {
        alternative: "focus:ring-gray-200 dark:focus:ring-gray-700",
        blue: "focus:ring-blue-300 dark:focus:ring-blue-800",
        dark: "focus:ring-gray-300 dark:focus:ring-gray-700",
        green: "focus:ring-green-300 dark:focus:ring-green-800",
        light: "focus:ring-gray-200 dark:focus:ring-gray-700",
        primary: "focus:ring-primary-300 dark:focus:ring-primary-800",
        purple: "focus:ring-purple-300 dark:focus:ring-purple-900",
        red: "focus:ring-red-300 dark:focus:ring-red-900",
        yellow: "focus:ring-yellow-300 dark:focus:ring-yellow-900",
        none: ""
      };
      const coloredShadowClasses = {
        alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
        blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
        dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
        green: "shadow-green-500/50 dark:shadow-green-800/80",
        light: "shadow-gray-500/50 dark:shadow-gray-800/80",
        primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
        purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
        red: "shadow-red-500/50 dark:shadow-red-800/80 ",
        yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
        none: ""
      };
      const outlineClasses = {
        alternative: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:bg-gray-900 focus:text-white focus:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
        blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
        dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:bg-gray-900 focus:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
        green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
        light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
        primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
        purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
        red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
        yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
        none: ""
      };
      const sizeClasses = {
        xs: "px-3 py-2 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base"
      };
      const hasBorder = () => outline || color === "alternative" || color === "light";
      let buttonClass;
      if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0)
        $$bindings.pill(pill);
      if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
        $$bindings.outline(outline);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.type === void 0 && $$bindings.type && type2 !== void 0)
        $$bindings.type(type2);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
        $$bindings.shadow(shadow);
      buttonClass = twMerge(
        "text-center font-medium",
        group ? "focus:ring-2" : "focus:ring-4",
        group && "focus:z-10",
        group || "focus:outline-none",
        "inline-flex items-center justify-center " + sizeClasses[size],
        outline ? outlineClasses[color] : colorClasses[color],
        color === "alternative" && (group ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-700"),
        outline && color === "dark" && (group ? "dark:text-white dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
        coloredFocusClasses[color],
        hasBorder() && group && "border-l-0 first:border-l",
        group ? pill && "first:rounded-l-full last:rounded-r-full" || "first:rounded-l-lg last:rounded-r-lg" : pill && "rounded-full" || "rounded-lg",
        shadow && "shadow-lg",
        shadow && coloredShadowClasses[color],
        $$props.disabled && "cursor-not-allowed opacity-50",
        $$props.class
      );
      return `${((tag) => {
        return tag ? `<${href ? "a" : "button"}${spread(
          [
            {
              type: escape_attribute_value(href ? void 0 : type2)
            },
            { href: escape_attribute_value(href) },
            escape_object($$restProps),
            {
              class: escape_attribute_value(buttonClass)
            },
            {
              role: escape_attribute_value(href ? "button" : void 0)
            }
          ],
          {}
        )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "button")} `;
    });
  }
});

// .svelte-kit/output/server/chunks/CloseButton.js
var Frame, ToolbarButton, CloseButton;
var init_CloseButton = __esm({
  ".svelte-kit/output/server/chunks/CloseButton.js"() {
    init_ssr();
    init_Indicator_svelte_svelte_type_style_lang();
    init_tailwind_merge();
    Frame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "tag",
        "color",
        "rounded",
        "border",
        "shadow",
        "transition",
        "params",
        "node",
        "use",
        "options",
        "role"
      ]);
      const null_transition = () => ({ duration: 0 });
      const noop2 = () => {
      };
      setContext("background", true);
      let { tag = $$restProps.href ? "a" : "div" } = $$props;
      let { color = "default" } = $$props;
      let { rounded = false } = $$props;
      let { border = false } = $$props;
      let { shadow = false } = $$props;
      let { transition = null_transition } = $$props;
      let { params = {} } = $$props;
      let { node = void 0 } = $$props;
      let { use = noop2 } = $$props;
      let { options: options2 = {} } = $$props;
      let { role = void 0 } = $$props;
      const bgColors = {
        gray: "bg-gray-50 dark:bg-gray-800",
        red: "bg-red-50 dark:bg-gray-800",
        yellow: "bg-yellow-50 dark:bg-gray-800 ",
        green: "bg-green-50 dark:bg-gray-800 ",
        indigo: "bg-indigo-50 dark:bg-gray-800 ",
        purple: "bg-purple-50 dark:bg-gray-800 ",
        pink: "bg-pink-50 dark:bg-gray-800 ",
        blue: "bg-blue-50 dark:bg-gray-800 ",
        light: "bg-gray-50 dark:bg-gray-700",
        dark: "bg-gray-50 dark:bg-gray-800",
        default: "bg-white dark:bg-gray-800",
        dropdown: "bg-white dark:bg-gray-700",
        navbar: "bg-white dark:bg-gray-900",
        navbarUl: "bg-gray-50 dark:bg-gray-800",
        form: "bg-gray-50 dark:bg-gray-700",
        primary: "bg-primary-50 dark:bg-gray-800 ",
        orange: "bg-orange-50 dark:bg-orange-800",
        none: ""
      };
      const textColors = {
        gray: "text-gray-800 dark:text-gray-300",
        red: "text-red-800 dark:text-red-400",
        yellow: "text-yellow-800 dark:text-yellow-300",
        green: "text-green-800 dark:text-green-400",
        indigo: "text-indigo-800 dark:text-indigo-400",
        purple: "text-purple-800 dark:text-purple-400",
        pink: "text-pink-800 dark:text-pink-400",
        blue: "text-blue-800 dark:text-blue-400",
        light: "text-gray-700 dark:text-gray-300",
        dark: "text-gray-700 dark:text-gray-300",
        default: "text-gray-500 dark:text-gray-400",
        dropdown: "text-gray-700 dark:text-gray-200",
        navbar: "text-gray-700 dark:text-gray-200",
        navbarUl: "text-gray-700 dark:text-gray-400",
        form: "text-gray-900 dark:text-white",
        primary: "text-primary-800 dark:text-primary-400",
        orange: "text-orange-800 dark:text-orange-400",
        none: ""
      };
      const borderColors = {
        gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
        red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
        yellow: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
        green: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
        indigo: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
        purple: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
        pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
        blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
        light: "border-gray-500 divide-gray-500",
        dark: "border-gray-500 divide-gray-500",
        default: "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
        dropdown: "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
        navbar: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        navbarUl: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
        primary: "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
        orange: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
        none: ""
      };
      let divClass;
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
        $$bindings.rounded(rounded);
      if ($$props.border === void 0 && $$bindings.border && border !== void 0)
        $$bindings.border(border);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
        $$bindings.shadow(shadow);
      if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
        $$bindings.transition(transition);
      if ($$props.params === void 0 && $$bindings.params && params !== void 0)
        $$bindings.params(params);
      if ($$props.node === void 0 && $$bindings.node && node !== void 0)
        $$bindings.node(node);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0)
        $$bindings.options(options2);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      color = color ?? "default";
      {
        setContext("color", color);
      }
      divClass = twMerge(bgColors[color], textColors[color], rounded && "rounded-lg", border && "border", borderColors[color], shadow && "shadow-md", $$props.class);
      return `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            escape_object($$restProps),
            { class: escape_attribute_value(divClass) },
            { role: escape_attribute_value(role) }
          ],
          {}
        )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)} `;
    });
    ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["color", "name", "ariaLabel", "size", "href"]);
      const background = getContext("background");
      let { color = "default" } = $$props;
      let { name: name2 = void 0 } = $$props;
      let { ariaLabel = void 0 } = $$props;
      let { size = "md" } = $$props;
      let { href = void 0 } = $$props;
      const colors = {
        dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
        gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
        red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
        yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
        green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
        indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
        purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
        pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
        blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
        primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
        default: "focus:ring-gray-400"
      };
      const sizing = {
        xs: "m-0.5 rounded-sm focus:ring-1 p-0.5",
        sm: "m-0.5 rounded focus:ring-1 p-0.5",
        md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
        lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
      };
      let buttonClass;
      const svgSizes = {
        xs: "w-3 h-3",
        sm: "w-3.5 h-3.5",
        md: "w-5 h-5",
        lg: "w-5 h-5"
      };
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
        $$bindings.name(name2);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      buttonClass = twMerge(
        "focus:outline-none whitespace-normal",
        sizing[size],
        colors[color],
        color === "default" && (background ? "hover:bg-gray-100 dark:hover:bg-gray-600" : "hover:bg-gray-100 dark:hover:bg-gray-700"),
        $$props.class
      );
      return `${href ? `<a${spread(
        [
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          },
          {
            "aria-label": escape_attribute_value(ariaLabel ?? name2)
          }
        ],
        {}
      )}>${name2 ? `<span class="sr-only">${escape(name2)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</a>` : `<button${spread(
        [
          { type: "button" },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          },
          {
            "aria-label": escape_attribute_value(ariaLabel ?? name2)
          }
        ],
        {}
      )}>${name2 ? `<span class="sr-only">${escape(name2)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</button>`} `;
    });
    CloseButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["name"]);
      let { name: name2 = "Close" } = $$props;
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
        $$bindings.name(name2);
      return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: name2 }, $$restProps, { class: twMerge("ml-auto", $$props.class) }), {}, {
        default: ({ svgSize }) => {
          return `<svg${add_attribute("class", svgSize, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
        }
      })} `;
    });
  }
});

// .svelte-kit/output/server/chunks/Modal.js
function clampSize(s2) {
  return s2 && s2 === "xs" ? "sm" : s2 === "xl" ? "lg" : s2;
}
var Wrapper, Input, Modal;
var init_Modal = __esm({
  ".svelte-kit/output/server/chunks/Modal.js"() {
    init_ssr();
    init_Indicator_svelte_svelte_type_style_lang();
    init_tailwind_merge();
    init_CloseButton();
    Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
      let { tag = "div" } = $$props;
      let { show } = $$props;
      let { use = () => {
      } } = $$props;
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      if ($$props.show === void 0 && $$bindings.show && show !== void 0)
        $$bindings.show(show);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      return `${show ? `${((tag$1) => {
        return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
    });
    Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let _size;
      let $$restProps = compute_rest_props($$props, ["type", "value", "size", "defaultClass", "color", "floatClass"]);
      let $$slots = compute_slots(slots);
      let { type: type2 = "text" } = $$props;
      let { value = void 0 } = $$props;
      let { size = void 0 } = $$props;
      let { defaultClass = "block w-full disabled:cursor-not-allowed disabled:opacity-50" } = $$props;
      let { color = "base" } = $$props;
      let { floatClass = "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400" } = $$props;
      const borderClasses = {
        base: "border-gray-300 dark:border-gray-600",
        tinted: "border-gray-300 dark:border-gray-500",
        green: "border-green-500 dark:border-green-400",
        red: "border-red-500 dark:border-red-400"
      };
      const ringClasses = {
        base: "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500",
        green: "focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500",
        red: "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
      };
      const colorClasses = {
        base: "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
        tinted: "bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400",
        green: "bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700",
        red: "bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700"
      };
      let background = getContext("background");
      let group = getContext("group");
      const textSizes = {
        sm: "sm:text-xs",
        md: "text-sm",
        lg: "sm:text-base"
      };
      const leftPadding = { sm: "pl-9", md: "pl-10", lg: "pl-11" };
      const rightPadding = { sm: "pr-9", md: "pr-10", lg: "pr-11" };
      const inputPadding = { sm: "p-2", md: "p-2.5", lg: "p-3" };
      let inputClass;
      if ($$props.type === void 0 && $$bindings.type && type2 !== void 0)
        $$bindings.type(type2);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
        $$bindings.defaultClass(defaultClass);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.floatClass === void 0 && $$bindings.floatClass && floatClass !== void 0)
        $$bindings.floatClass(floatClass);
      _size = size || clampSize(group?.size) || "md";
      {
        {
          const _color = color === "base" && background ? "tinted" : color;
          inputClass = twMerge([
            defaultClass,
            $$slots.left && leftPadding[_size] || $$slots.right && rightPadding[_size] || inputPadding[_size],
            ringClasses[color],
            colorClasses[_color],
            borderClasses[_color],
            textSizes[_size],
            group || "rounded-lg",
            group && "first:rounded-l-lg last:rounded-r-lg",
            group && "border-l-0 first:border-l last:border-r",
            $$props.class
          ]);
        }
      }
      return `${validate_component(Wrapper, "Wrapper").$$render(
        $$result,
        {
          class: "relative w-full",
          show: $$slots.left || $$slots.right
        },
        {},
        {
          default: () => {
            return `${$$slots.left ? `<div class="${escape(twMerge(floatClass, $$props.classLeft), true) + " left-0 pl-2.5 pointer-events-none"}">${slots.left ? slots.left({}) : ``}</div>` : ``} ${slots.default ? slots.default({
              props: { ...$$restProps, class: inputClass }
            }) : ` <input${spread(
              [
                escape_object($$restProps),
                escape_object({ type: type2 }),
                {
                  class: escape_attribute_value(inputClass)
                }
              ],
              {}
            )}${add_attribute("value", value, 0)}> `} ${$$slots.right ? `<div class="${escape(twMerge(floatClass, $$props.classRight), true) + " right-0 pr-2.5"}">${slots.right ? slots.right({}) : ``}</div>` : ``}`;
          }
        }
      )} `;
    });
    Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "open",
        "title",
        "size",
        "placement",
        "autoclose",
        "permanent",
        "backdropClass",
        "defaultClass",
        "outsideclose"
      ]);
      let $$slots = compute_slots(slots);
      let { open = false } = $$props;
      let { title = "" } = $$props;
      let { size = "md" } = $$props;
      let { placement = "center" } = $$props;
      let { autoclose = false } = $$props;
      let { permanent = false } = $$props;
      let { backdropClass = "bg-gray-900 bg-opacity-50 dark:bg-opacity-80" } = $$props;
      let { defaultClass = "relative flex flex-col mx-auto" } = $$props;
      let { outsideclose = false } = $$props;
      const dispatch = createEventDispatcher();
      const getPlacementClasses = () => {
        switch (placement) {
          case "top-left":
            return ["justify-start", "items-start"];
          case "top-center":
            return ["justify-center", "items-start"];
          case "top-right":
            return ["justify-end", "items-start"];
          case "center-left":
            return ["justify-start", "items-center"];
          case "center":
            return ["justify-center", "items-center"];
          case "center-right":
            return ["justify-end", "items-center"];
          case "bottom-left":
            return ["justify-start", "items-end"];
          case "bottom-center":
            return ["justify-center", "items-end"];
          case "bottom-right":
            return ["justify-end", "items-end"];
          default:
            return ["justify-center", "items-center"];
        }
      };
      const sizes = {
        xs: "max-w-md",
        sm: "max-w-lg",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-7xl"
      };
      let frameClass;
      let backdropCls = twMerge(backdropClass, $$props.classBackdrop);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.autoclose === void 0 && $$bindings.autoclose && autoclose !== void 0)
        $$bindings.autoclose(autoclose);
      if ($$props.permanent === void 0 && $$bindings.permanent && permanent !== void 0)
        $$bindings.permanent(permanent);
      if ($$props.backdropClass === void 0 && $$bindings.backdropClass && backdropClass !== void 0)
        $$bindings.backdropClass(backdropClass);
      if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
        $$bindings.defaultClass(defaultClass);
      if ($$props.outsideclose === void 0 && $$bindings.outsideclose && outsideclose !== void 0)
        $$bindings.outsideclose(outsideclose);
      {
        dispatch(open ? "open" : "hide");
      }
      frameClass = twMerge(defaultClass, "w-full", $$props.class);
      return `${open ? ` <div${add_attribute("class", twMerge("fixed inset-0 z-40", backdropCls), 0)}></div>   <div${add_attribute("class", twMerge("fixed top-0 left-0 right-0 h-modal md:inset-0 md:h-full z-50 w-full p-4 flex", ...getPlacementClasses()), 0)} tabindex="-1" aria-modal="true" role="dialog"><div class="${"flex relative " + escape(sizes[size], true) + " w-full max-h-full"}"> ${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { rounded: true }, { shadow: true }, $$restProps, { class: frameClass }), {}, {
        default: () => {
          return ` ${$$slots.header || title ? `${validate_component(Frame, "Frame").$$render(
            $$result,
            {
              color: $$restProps.color,
              class: "flex justify-between items-center p-4 rounded-t border-b"
            },
            {},
            {
              default: () => {
                return `${slots.header ? slots.header({}) : ` <h3 class="${"text-xl font-semibold " + escape($$restProps.color ? "" : "text-gray-900 dark:text-white", true) + " p-0"}">${escape(title)}</h3> `} ${!permanent ? `${validate_component(CloseButton, "CloseButton").$$render(
                  $$result,
                  {
                    name: "Close modal",
                    color: $$restProps.color
                  },
                  {},
                  {}
                )}` : ``}`;
              }
            }
          )}` : `${!permanent ? `${validate_component(CloseButton, "CloseButton").$$render(
            $$result,
            {
              name: "Close modal",
              class: "absolute top-3 right-2.5",
              color: $$restProps.color
            },
            {},
            {}
          )}` : ``}`}  <div${add_attribute("class", twMerge("p-6 space-y-6 flex-1 overflow-y-auto overscroll-contain", $$props.bodyClass), 0)} role="document">${slots.default ? slots.default({}) : ``}</div>  ${$$slots.footer ? `${validate_component(Frame, "Frame").$$render(
            $$result,
            {
              color: $$restProps.color,
              class: "flex items-center p-6 space-x-2 rounded-b border-t"
            },
            {},
            {
              default: () => {
                return `${slots.footer ? slots.footer({}) : ``}`;
              }
            }
          )}` : ``}`;
        }
      })}</div></div>` : ``} `;
    });
  }
});

// .svelte-kit/output/server/chunks/CldImage.js
function parseUrl(src) {
  var _a, _b, _c, _d;
  if (typeof src !== "string") {
    throw new Error(`Failed to parse URL: Invalid src of type ${typeof src}`);
  }
  const hasVersion = REGEX_VERSION.test(src);
  if (!hasVersion) {
    throw new Error(`Invalid src: Does not include version (Ex: /v1234/)`);
  }
  const [baseUrlWithExtension, queryString] = src.split("?");
  const formatMatches = baseUrlWithExtension.match(REGEX_FORMAT);
  let baseUrl = baseUrlWithExtension;
  let format;
  if (formatMatches !== null) {
    format = `${formatMatches[0]}`;
    baseUrl = baseUrlWithExtension.replace(new RegExp(`${format}$`), "");
  }
  const results = baseUrl.match(REGEX_URL);
  const transformations = (_b = (_a = results == null ? void 0 : results.groups) == null ? void 0 : _a.transformations) == null ? void 0 : _b.split("/").filter((t) => !!t);
  const parts = {
    ...results == null ? void 0 : results.groups,
    format,
    seoSuffix: void 0,
    transformations: transformations || [],
    queryParams: {},
    version: ((_c = results == null ? void 0 : results.groups) == null ? void 0 : _c.version) ? parseInt(results.groups.version.replace("v", "")) : void 0
  };
  if (queryString) {
    parts.queryParams = queryString.split("&").reduce((prev, curr) => {
      const [key2, value] = curr.split("=");
      prev[key2] = value;
      return prev;
    }, {});
  }
  if (parts.assetType && ASSET_TYPES_SEO.includes(parts.assetType)) {
    const publicIdParts = ((_d = parts.publicId) == null ? void 0 : _d.split("/")) || [];
    parts.seoSuffix = publicIdParts.pop();
    parts.publicId = publicIdParts.join("/");
  }
  return parts;
}
function getTransformations(src) {
  const { transformations = [] } = parseUrl(src) || {};
  return transformations.map((t) => t.split(","));
}
function testColorIsHex(value) {
  if (typeof value !== "string")
    return false;
  return !!value.startsWith("#");
}
function convertColorHexToRgb(value) {
  return `rgb:${value.replace("#", "")}`;
}
function encodeBase64(value) {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }
}
function objectHasKey(obj, key2) {
  return Object.prototype.hasOwnProperty.call(obj, key2);
}
function sortByKey(array2 = [], key2, type2 = "asc") {
  function compare(a, b) {
    let keyA = a[key2];
    let keyB = b[key2];
    if (typeof keyA === "string") {
      keyA = keyA.toLowerCase();
    }
    if (typeof keyB === "string") {
      keyB = keyB.toLowerCase();
    }
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  }
  let newArray = [...array2];
  if (typeof key2 !== "string")
    return newArray;
  newArray = newArray.sort(compare);
  if (type2 === "desc") {
    return newArray.reverse();
  }
  return newArray;
}
function isObject(a) {
  if (typeof a !== "object" || a instanceof Array) {
    return false;
  } else {
    return true;
  }
}
function createUnsupportedError(message) {
  return new UnsupportedError(message);
}
function qualifierToJson() {
  return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
}
function mapToSortedArray(map, flags2) {
  const array2 = Array.from(map.entries());
  flags2.forEach((flag) => {
    array2.push(["fl", flag]);
  });
  return array2.sort().map((v) => v[1]);
}
function actionToJson() {
  var _a, _b, _c;
  const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
  const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
  if (sourceTransformationError && sourceTransformationError instanceof Error) {
    return { error: sourceTransformationError };
  }
  if (actionModelIsNotEmpty) {
    return this._actionModel;
  }
  return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
}
function prepareColor(color) {
  if (color) {
    return color.match(/^#/) ? `rgb:${color.substr(1)}` : color;
  } else {
    return color;
  }
}
function isErrorObject(obj) {
  const errorObj = obj;
  return "error" in errorObj && !!errorObj.error;
}
function lossy() {
  return new FlagQualifier("lossy");
}
function preserveTransparency() {
  return new FlagQualifier("preserve_transparency");
}
function progressive(mode) {
  return new FlagQualifier("progressive", mode);
}
function objectFlip(obj) {
  const result = {};
  Object.keys(obj).forEach((key2) => {
    result[obj[key2]] = key2;
  });
  return result;
}
function isUrl2(publicID) {
  return publicID.match(/^https?:\//);
}
function isFileName(publicID) {
  return publicID.indexOf("/") < 0;
}
function publicIDContainsVersion(publicID) {
  return publicID.match(/^v[0-9]+/);
}
function getUrlPrefix(cloudName, urlConfig) {
  const secure = urlConfig.secure;
  const privateCDN = urlConfig.privateCdn;
  const cname = urlConfig.cname;
  const secureDistribution = urlConfig.secureDistribution;
  if (!secure && !cname) {
    return `http://res.cloudinary.com/${cloudName}`;
  }
  if (secure && !secureDistribution && privateCDN) {
    return `https://${cloudName}-res.cloudinary.com`;
  }
  if (secure && !secureDistribution) {
    return `https://res.cloudinary.com/${cloudName}`;
  }
  if (secure && secureDistribution && privateCDN) {
    return `https://${secureDistribution}`;
  }
  if (secure && secureDistribution) {
    return `https://${secureDistribution}/${cloudName}`;
  }
  if (!secure && cname) {
    return `http://${cname}/${cloudName}`;
  } else {
    return "ERROR";
  }
}
function handleAssetType(assetType) {
  if (!assetType) {
    return "image";
  }
  return assetType;
}
function handleDeliveryType(deliveryType) {
  if (!deliveryType) {
    return "upload";
  }
  return deliveryType;
}
function getUrlVersion(publicID, version2, forceVersion) {
  const shouldForceVersion = forceVersion !== false;
  if (version2) {
    return `v${version2}`;
  }
  if (publicIDContainsVersion(publicID) || isUrl2(publicID) || isFileName(publicID)) {
    return "";
  }
  return shouldForceVersion ? "v1" : "";
}
function stringPad(value, _targetLength, _padString) {
  let targetLength = _targetLength >> 0;
  let padString = String(typeof _padString !== "undefined" ? _padString : " ");
  if (value.length > targetLength) {
    return String(value);
  } else {
    targetLength = targetLength - value.length;
    if (targetLength > padString.length) {
      padString += repeatStringNumTimes(padString, targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(value);
  }
}
function repeatStringNumTimes(string, _times) {
  let times = _times;
  let repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}
function reverseVersion(semVer) {
  if (semVer.split(".").length < 2) {
    throw new Error("invalid semVer, must have at least two segments");
  }
  return semVer.split(".").reverse().map((segment) => {
    const asNumber = +segment;
    if (isNaN(asNumber) || asNumber < 0) {
      throw "Invalid version number provided";
    }
    return stringPad(segment, 2, "0");
  }).join(".");
}
function encodeVersion(semVer) {
  let strResult = "";
  const parts = semVer.split(".").length;
  const paddedStringLength = parts * 6;
  const paddedReversedSemver = reverseVersion(semVer);
  const num2 = parseInt(paddedReversedSemver.split(".").join(""));
  let paddedBinary = num2.toString(2);
  paddedBinary = stringPad(paddedBinary, paddedStringLength, "0");
  if (paddedBinary.length % 6 !== 0) {
    throw "Version must be smaller than 43.21.26)";
  }
  paddedBinary.match(/.{1,6}/g).forEach((bitString) => {
    strResult += base64Map[bitString];
  });
  return strResult;
}
function getAnalyticsOptions(options2) {
  const analyticsOptions = {
    sdkSemver: options2.sdkSemver,
    techVersion: options2.techVersion,
    sdkCode: options2.sdkCode,
    product: options2.product,
    feature: "0"
  };
  if (options2.accessibility) {
    analyticsOptions.feature = "D";
  }
  if (options2.lazyload) {
    analyticsOptions.feature = "C";
  }
  if (options2.responsive) {
    analyticsOptions.feature = "A";
  }
  if (options2.placeholder) {
    analyticsOptions.feature = "B";
  }
  return analyticsOptions;
}
function getNodeVersion() {
  const failedVersion = "0.0.0";
  if (typeof window !== "undefined") {
    return failedVersion;
  } else {
    try {
      return process.versions.node || failedVersion;
    } catch (e) {
      return failedVersion;
    }
  }
}
function ensureShapeOfTrackedProperties(trackedAnalytics) {
  const defaults = {
    techVersion: getNodeVersion(),
    sdkCode: "T",
    sdkSemver: packageVersion.split("-")[0],
    product: "A",
    responsive: false,
    placeholder: false,
    lazyload: false,
    accessibility: false
  };
  if (!trackedAnalytics) {
    return defaults;
  } else {
    return Object.assign(Object.assign({}, defaults), trackedAnalytics);
  }
}
function getSDKAnalyticsSignature(_trackedAnalytics) {
  const trackedAnalytics = ensureShapeOfTrackedProperties(_trackedAnalytics);
  const analyticsOptions = getAnalyticsOptions(trackedAnalytics);
  try {
    const twoPartVersion = removePatchFromSemver(analyticsOptions.techVersion);
    const encodedSDKVersion = encodeVersion(analyticsOptions.sdkSemver);
    const encodedTechVersion = encodeVersion(twoPartVersion);
    const featureCode = analyticsOptions.feature;
    const SDKCode = analyticsOptions.sdkCode;
    const product = analyticsOptions.product;
    const algoVersion = "B";
    return `${algoVersion}${product}${SDKCode}${encodedSDKVersion}${encodedTechVersion}${featureCode}`;
  } catch (e) {
    return "E";
  }
}
function removePatchFromSemver(semVerStr) {
  const parts = semVerStr.split(".");
  return `${parts[0]}.${parts[1]}`;
}
function normalizeNumberParameter(param) {
  if (typeof param !== "string")
    return param;
  return parseInt(param);
}
function plugin(props15) {
  const { cldAsset, options: options2 } = props15;
  const {
    width: defaultWidth,
    height: defaultHeight,
    widthResize: defaultWidthResize,
    crop = "limit"
  } = options2;
  const overrides = {
    width: void 0
  };
  let height = normalizeNumberParameter(defaultHeight);
  let width = normalizeNumberParameter(defaultWidth);
  let widthResize = normalizeNumberParameter(defaultWidthResize);
  let transformationString = "";
  if (width) {
    transformationString = `c_${crop},w_${width}`;
  }
  if (!options2.gravity && cropsGravityAuto.includes(crop)) {
    options2.gravity = "auto";
  }
  if (!["limit"].includes(crop)) {
    transformationString = `${transformationString},h_${height}`;
  }
  if (options2.gravity) {
    if (options2.gravity === "auto" && !cropsGravityAuto.includes(crop)) {
      console.warn(`Auto gravity can only be used with crop modes: ${cropsGravityAuto.join(", ")}. Not applying gravity.`);
    } else {
      transformationString = `${transformationString},g_${options2.gravity}`;
    }
  }
  if (options2.zoom) {
    if (options2.zoom === "auto" && !cropsWithZoom.includes(crop)) {
      console.warn(`Zoom can only be used with crop modes: ${cropsWithZoom.join(", ")}. Not applying zoom.`);
    } else {
      transformationString = `${transformationString},z_${options2.zoom}`;
    }
  }
  cldAsset.effect(transformationString);
  if (width && widthResize && widthResize < width) {
    overrides.width = widthResize;
  }
  return {
    options: overrides
  };
}
function constructTransformation({ prefix: prefix2, qualifier, value, converters }) {
  let transformation = "";
  if (prefix2) {
    transformation = `${prefix2}_`;
  }
  let transformationValue = value;
  converters == null ? void 0 : converters.forEach(({ test, convert }) => {
    if (!test(transformationValue))
      return;
    transformationValue = convert(transformationValue);
  });
  if (transformationValue === true || transformationValue === "true") {
    return `${transformation}${qualifier}`;
  }
  if (typeof transformationValue === "string" || typeof transformationValue === "number") {
    if (prefix2) {
      return `${transformation}${qualifier}:${transformationValue}`;
    } else {
      return `${qualifier}_${transformationValue}`;
    }
  }
}
function plugin2(props15) {
  const { cldAsset, options: options2 } = props15;
  const transformationStrings = constructTransformationString({
    effects,
    options: options2
  });
  transformationStrings.filter((t) => !!t).forEach((transformation) => cldAsset.effect(transformation));
  if (Array.isArray(options2 == null ? void 0 : options2.effects)) {
    options2 == null ? void 0 : options2.effects.forEach((effectsSet) => {
      const transformationString = constructTransformationString({
        effects,
        options: effectsSet
      }).filter((t) => !!t).join(",");
      cldAsset.effect(transformationString);
    });
  }
  function constructTransformationString({ effects: effects2, options: options22 }) {
    return Object.keys(effects2).map((key2) => {
      const { prefix: prefix2, qualifier, converters } = effects2[key2];
      return constructTransformation({
        qualifier,
        prefix: prefix2,
        value: options22 == null ? void 0 : options22[key2],
        converters
      });
    });
  }
  return {};
}
function plugin3(props15) {
  const { cldAsset, options: options2 } = props15;
  const { flags: flags2 = [] } = options2;
  if (Array.isArray(flags2) && flags2.length > 0) {
    flags2.forEach((flag) => {
      if (!supportedFlags.includes(flag))
        return;
      cldAsset.addFlag(flag);
    });
  } else if (typeof flags2 === "object") {
    Object.entries(flags2).forEach(([qualifier, value]) => {
      if (!supportedFlags.includes(qualifier))
        return;
      cldAsset.addTransformation(`fl_${qualifier}:${value}`);
    });
  }
  return {};
}
function plugin4(props15) {
  const { cldAsset, options: options2 } = props15;
  const { fillBackground } = options2;
  if (fillBackground === true) {
    const properties = [
      "b_gen_fill",
      `ar_${options2.width}:${options2.height}`,
      `w_${options2.width}`,
      `c_${defaultCrop}`
    ];
    cldAsset.addTransformation(properties.join(","));
  } else if (typeof fillBackground === "object") {
    const { crop = defaultCrop, gravity, prompt } = fillBackground;
    const properties = [
      `ar_${options2.width}:${options2.height}`,
      `w_${options2.width}`,
      `c_${crop}`
    ];
    if (typeof prompt === "string") {
      properties.unshift(`b_gen_fill:${prompt}`);
    } else {
      properties.unshift(`b_gen_fill`);
    }
    if (typeof gravity === "string") {
      properties.push(`g_${gravity}`);
    }
    cldAsset.addTransformation(properties.join(","));
  }
  return {};
}
function plugin5(props15) {
  const { cldAsset, options: options2 } = props15;
  const { sanitize = true } = options2;
  const shouldApplySanitizer = sanitize && (options2.format === "svg" || cldAsset.publicID.endsWith(".svg"));
  if (shouldApplySanitizer) {
    cldAsset.effect("fl_sanitize");
  }
  return {};
}
function plugin6(props15) {
  const { cldAsset, options: options2 } = props15;
  const { text: text22, overlays = [] } = options2;
  const type2 = "overlay";
  const typeQualifier = "l";
  if (Array.isArray(overlays)) {
    overlays.forEach(applyOverlay);
  }
  if (typeof text22 === "string") {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        text: text22
      }
    });
  } else if (typeof text22 === "object") {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        ...text22
      }
    });
  }
  function applyOverlay({ publicId, url, position: position2, text: text3, effects: layerEffects = [], appliedEffects = [], ...options22 }) {
    var _a;
    const hasPublicId = typeof publicId === "string";
    const hasUrl = typeof url === "string";
    const hasText = typeof text3 === "object" || typeof text3 === "string";
    const hasPosition = typeof position2 === "object";
    if (!hasPublicId && !hasUrl && !hasText) {
      console.warn(`An ${type2} is missing Public ID, URL, or Text`);
      return;
    }
    let layerTransformation;
    if (hasText) {
      layerTransformation = `${typeQualifier}_text`;
    } else if (hasPublicId) {
      layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ":")}`;
    } else if (hasUrl) {
      layerTransformation = `${typeQualifier}_fetch:${encodeBase64(url)}`;
    }
    const primary2 = [];
    const applied = [];
    Object.keys(options22).forEach((key2) => {
      if (!objectHasKey(primary, key2))
        return;
      const { qualifier, converters } = primary[key2];
      const transformation = constructTransformation({
        qualifier,
        value: options22[key2],
        converters
      });
      if (transformation) {
        primary2.push(transformation);
      }
    });
    layerEffects.forEach((effect) => {
      Object.keys(effect).forEach((key2) => {
        const { qualifier, prefix: prefix2, converters } = primary[key2] || effects[key2] || {};
        const transformation = constructTransformation({
          qualifier,
          prefix: prefix2,
          value: effect[key2],
          converters
        });
        if (transformation) {
          primary2.push(transformation);
        }
      });
    });
    appliedEffects.forEach((effect) => {
      Object.keys(effect).forEach((key2) => {
        const { qualifier, prefix: prefix2, converters } = primary[key2] || effects[key2] || {};
        const transformation = constructTransformation({
          qualifier,
          prefix: prefix2,
          value: effect[key2],
          converters
        });
        if (transformation) {
          applied.push(transformation);
        }
      });
    });
    if (hasText) {
      if (typeof text3 === "string") {
        text3 = {
          ...DEFAULT_TEXT_OPTIONS,
          text: text3
        };
      }
      const textTransformations = [];
      if (typeof text3 === "object") {
        const textOptions = Object.keys(text3).filter((key2) => objectHasKey(text2, key2)).map((key2) => {
          const value = text3 && objectHasKey(text3, key2) && text3[key2];
          return {
            ...text2[key2],
            key: key2,
            value,
            order: text2[key2].order || 99
          };
        });
        const sortedTextOptions = sortByKey(textOptions, "order");
        for (const textOption of sortedTextOptions) {
          const { key: key2, value, qualifier, location: location2, converters } = textOption;
          let textValue = value;
          converters == null ? void 0 : converters.forEach(({ test, convert }) => {
            if (!test(value))
              return;
            textValue = convert(value);
          });
          if (location2 === "primary") {
            primary2.push(`${qualifier}_${textValue}`);
          } else if (qualifier === "self") {
            textTransformations.push(key2);
          } else if (qualifier) {
            textTransformations.push(`${qualifier}_${textValue}`);
          } else {
            textTransformations.push(textValue);
          }
        }
      }
      const specialCharacters = {
        ".": "%2E",
        ",": "%2C",
        "/": "%2F"
      };
      let layerText = (text3 == null ? void 0 : text3.text) || "";
      if (typeof layerText === "string") {
        (_a = Object.keys(specialCharacters)) == null ? void 0 : _a.forEach((character) => {
          layerText = layerText == null ? void 0 : layerText.replace(character, specialCharacters[character]);
        });
      }
      layerTransformation = `${layerTransformation}:${textTransformations.join("_")}:${layerText}`;
    }
    if (hasPosition) {
      Object.keys(position2).forEach((key2) => {
        if (!objectHasKey(position, key2))
          return;
        const { qualifier, converters } = position[key2];
        const transformation = constructTransformation({
          qualifier,
          value: position2[key2],
          converters
        });
        if (transformation) {
          applied.push(transformation);
        }
      });
    }
    if (primary2.length > 0) {
      layerTransformation = `${layerTransformation},${primary2.join(",")}`;
    }
    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(",")}`;
    }
    cldAsset.addTransformation(layerTransformation);
  }
  return {};
}
function plugin7(props15) {
  const { cldAsset, options: options2 } = props15;
  let { transformations = [] } = options2;
  if (!Array.isArray(transformations)) {
    transformations = [transformations];
  }
  transformations.forEach((transformation) => {
    cldAsset.addTransformation(`t_${transformation}`);
  });
  return {};
}
function plugin8(props15) {
  const { cldAsset, options: options2 } = props15;
  const { rawTransformations = [] } = options2;
  rawTransformations.forEach((transformation) => {
    cldAsset.addTransformation(transformation);
  });
  return {};
}
function plugin9(props15) {
  const { cldAsset, options: options2 } = props15;
  const { removeBackground = false } = options2;
  if (removeBackground) {
    cldAsset.effect("e_background_removal");
  }
  return {};
}
function plugin10(props15) {
  const { cldAsset, options: options2 } = props15;
  const { seoSuffix } = options2;
  if (typeof seoSuffix === "string") {
    if (options2.deliveryType === "fetch") {
      console.warn("SEO suffix is not supported with a delivery type of fetch");
    } else {
      cldAsset.setSuffix(seoSuffix);
    }
  }
  return {};
}
function plugin11(props15) {
  const { cldAsset, options: options2 } = props15;
  const { underlay, underlays = [] } = options2;
  const typeQualifier = "u";
  if (Array.isArray(underlays)) {
    underlays.forEach(applyUnderlay);
  }
  if (typeof underlay === "string") {
    const underlayOptions = {
      publicId: underlay,
      crop: "fill",
      width: "1.0",
      height: "1.0",
      flags: ["relative"]
    };
    applyUnderlay(underlayOptions);
  }
  function applyUnderlay({ publicId, type: type2, position: position2, effects: layerEffects = [], flags: flags2 = [], ...options22 }) {
    const hasPublicId = typeof publicId === "string";
    const hasPosition = typeof position2 === "object";
    if (!hasPublicId) {
      console.warn(`An ${type2} is missing a Public ID`);
      return;
    }
    let layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ":")}`;
    const primary2 = [];
    const applied = [];
    Object.keys(options22).forEach((key2) => {
      if (!objectHasKey(primary, key2))
        return;
      const { qualifier } = primary[key2];
      primary2.push(`${qualifier}_${options22[key2]}`);
    });
    layerEffects.forEach((effect) => {
      Object.keys(effect).forEach((key2) => {
        if (!objectHasKey(primary, key2))
          return;
        const { qualifier } = primary[key2];
        primary2.push(`${qualifier}_${effect[key2]}`);
      });
    });
    if (hasPosition) {
      Object.keys(position2).forEach((key2) => {
        if (!objectHasKey(position, key2))
          return;
        const { qualifier } = position[key2];
        applied.push(`${qualifier}_${position2[key2]}`);
      });
    }
    flags2.forEach((key2) => {
      if (!objectHasKey(flags, key2))
        return;
      const { qualifier, prefix: prefix2 } = flags[key2];
      primary2.push(`${prefix2}_${qualifier}`);
    });
    layerTransformation = `${layerTransformation},${primary2.join(",")}`;
    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(",")}`;
    }
    cldAsset.addTransformation(layerTransformation);
  }
  return {};
}
function plugin12(props15) {
  const { cldAsset, options: options2 } = props15;
  const { version: version2 } = options2;
  if (typeof version2 === "string" || typeof version2 === "number") {
    cldAsset.setVersion(`${version2}`.replace("v", ""));
  }
  return {};
}
function plugin13(props15) {
  const { cldAsset, options: options2 } = props15;
  Object.keys(options2).forEach((key2) => {
    if (!objectHasKey(video, key2))
      return;
    const { prefix: prefix2, qualifier, converters } = video[key2];
    const transformation = constructTransformation({
      prefix: prefix2,
      qualifier,
      value: options2[key2],
      converters
    });
    cldAsset.addTransformation(transformation);
  });
  return {};
}
function plugin14(props15) {
  const { cldAsset, options: options2 } = props15;
  const { zoompan = false } = options2;
  const overrides = {
    format: void 0
  };
  if (zoompan === true) {
    cldAsset.effect("e_zoompan");
  } else if (typeof zoompan === "string") {
    if (zoompan === "loop") {
      cldAsset.effect("e_zoompan");
      cldAsset.effect("e_loop");
    } else {
      cldAsset.effect(`e_zoompan:${zoompan}`);
    }
  } else if (typeof zoompan === "object") {
    let zoompanEffect = "e_zoompan";
    if (typeof zoompan.options === "string") {
      zoompanEffect = `${zoompanEffect}${zoompan.options}`;
    }
    cldAsset.effect(zoompanEffect);
    let loopEffect;
    if (zoompan.loop === true) {
      loopEffect = "e_loop";
    } else if (typeof zoompan.loop === "string") {
      loopEffect = `e_loop${zoompan.loop}`;
    }
    if (loopEffect) {
      cldAsset.effect(loopEffect);
    }
  }
  if (zoompan !== false) {
    overrides.format = "gif";
  }
  return {
    options: overrides
  };
}
function constructCloudinaryUrl({ options: options2, config, analytics }) {
  const cld = new Cloudinary(config);
  if (typeof (options2 == null ? void 0 : options2.src) !== "string") {
    throw Error(`Failed to construct Cloudinary URL: Missing source (src) in options`);
  }
  if (!(options2 == null ? void 0 : options2.assetType)) {
    options2.assetType = "image";
  }
  const propsCheck = [];
  transformationPlugins.forEach(({ props: props15 = [] }) => {
    props15.forEach((prop) => {
      if (propsCheck.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      propsCheck.push(prop);
    });
  });
  const parsedOptions = {
    seoSuffix: void 0,
    version: void 0
  };
  let publicId;
  if (typeof options2.src === "string" && /^https?:\/\//.test(options2.src)) {
    try {
      const parts = parseUrl(options2.src);
      publicId = parts == null ? void 0 : parts.publicId;
      parsedOptions.seoSuffix = parts == null ? void 0 : parts.seoSuffix;
      parsedOptions.version = parts == null ? void 0 : parts.version;
    } catch (e) {
    }
  }
  if (!publicId) {
    publicId = options2.src;
  }
  Object.keys(parsedOptions).forEach((key2) => {
    if (objectHasKey(options2, key2))
      return;
    options2[key2] = parsedOptions[key2];
  });
  let cldAsset = void 0;
  if (["image", "images"].includes(options2.assetType)) {
    cldAsset = cld.image(publicId);
  } else if (["video", "videos"].includes(options2.assetType)) {
    cldAsset = cld.video(publicId);
  }
  if (typeof cldAsset === "undefined") {
    throw new Error("Invalid asset type.");
  }
  transformationPlugins.forEach(({ plugin: plugin15, assetTypes: assetTypes15, props: props15 }) => {
    const supportedAssetType = typeof (options2 == null ? void 0 : options2.assetType) !== "undefined" && assetTypes15.includes(options2 == null ? void 0 : options2.assetType);
    if (!supportedAssetType) {
      const optionsKeys = Object.keys(options2);
      const attemptedUse = props15.map((prop) => optionsKeys.includes(prop)).filter((isUsed) => !!isUsed).length > 0;
      if (attemptedUse) {
        console.warn(`One of the following props [${props15.join(", ")}] was used with an unsupported asset type [${options2 == null ? void 0 : options2.assetType}]`);
      }
      return;
    }
    const results = plugin15({
      cldAsset,
      options: options2
    });
    const { options: pluginOptions } = results || { options: void 0 };
    if ((pluginOptions == null ? void 0 : pluginOptions.format) && options2) {
      options2.format = pluginOptions.format;
    }
    if ((pluginOptions == null ? void 0 : pluginOptions.width) && options2) {
      options2.resize = {
        width: pluginOptions == null ? void 0 : pluginOptions.width
      };
    }
  });
  if (options2 == null ? void 0 : options2.resize) {
    const { width, crop = "scale" } = options2.resize;
    cldAsset.effect(`c_${crop},w_${width}`);
  }
  cldAsset.setDeliveryType((options2 == null ? void 0 : options2.deliveryType) || "upload");
  if ((options2 == null ? void 0 : options2.format) !== "default") {
    cldAsset.format((options2 == null ? void 0 : options2.format) || "auto");
  }
  if ((options2 == null ? void 0 : options2.quality) !== "default") {
    cldAsset.quality((options2 == null ? void 0 : options2.quality) || "auto");
  }
  return cldAsset.toURL({
    trackedAnalytics: analytics
  });
}
function getImageCdnForUrl(url) {
  return getImageCdnForUrlByDomain(url) || getImageCdnForUrlByPath(url);
}
function getImageCdnForUrlByDomain(url) {
  if (typeof url === "string" && !url.startsWith("https://")) {
    return false;
  }
  const { hostname } = toUrl(url);
  if (cdnDomains.has(hostname)) {
    return cdnDomains.get(hostname);
  }
  for (const [subdomain, cdn] of cdnSubdomains) {
    if (hostname.endsWith(`.${subdomain}`)) {
      return cdn;
    }
  }
  return false;
}
function getImageCdnForUrlByPath(url) {
  const { pathname } = toUrl(url);
  for (const [prefix2, cdn] of Object.entries(paths)) {
    if (pathname.startsWith(prefix2)) {
      return cdn;
    }
  }
  return false;
}
function getDirective(key2) {
  let keyArray = Object.keys(OBJECT_TO_DIRECTIVES_MAP);
  let directive = keyArray.find((k) => OBJECT_TO_DIRECTIVES_MAP[k] === key2) || "";
  return directive;
}
function getParameterArray(url) {
  let url_string = url.toString();
  let paramArray = [];
  if (url_string) {
    let splitURL = url_string.split("imgeng=");
    if (splitURL.length > 1) {
      paramArray = splitURL[1].split("/");
    }
  }
  return paramArray;
}
function getBaseUrl(url) {
  let url_string = url.toString();
  let baseUrl = "";
  if (url_string) {
    let splitURL = url_string.split("imgeng=");
    if (splitURL.length > 1) {
      baseUrl = splitURL[0].slice(0, -1);
    } else
      baseUrl = url_string;
  }
  return baseUrl;
}
function build_IE_directives(directives) {
  return Object.entries(directives).reduce((acc, [k, v]) => {
    return acc + maybe_create_directive(k, v);
  }, "");
}
function build_IE_query_string(directives_string) {
  if (directives_string && directives_string !== "") {
    return `imgeng=${directives_string}`;
  }
  return "";
}
function maybe_create_directive(directive, value) {
  let translated_directive = OBJECT_TO_DIRECTIVES_MAP[directive];
  if (translated_directive && (value || value === 0)) {
    return `/${translated_directive}_${value}`;
  }
  return "";
}
function getDirectives(paramArray) {
  let directives = {};
  paramArray.forEach((para) => {
    let keyValue = para.split("_");
    if (keyValue.length > 1) {
      let key2 = keyValue[0];
      let value = keyValue[1];
      let directiveKey = getDirective(key2);
      if (directiveKey) {
        directives[directiveKey] = value;
      }
    }
  });
  return directives;
}
function getDelegatedCdn(url, cdn) {
  if (!(cdn in delegators)) {
    return false;
  }
  const maybeDelegate = delegators[cdn];
  if (!maybeDelegate) {
    return false;
  }
  return maybeDelegate(url);
}
function getCanonicalCdnForUrl(url, defaultCdn) {
  const cdn = getImageCdnForUrl(url) || defaultCdn;
  if (!cdn) {
    return false;
  }
  const maybeDelegated = getDelegatedCdn(url, cdn);
  if (maybeDelegated) {
    return maybeDelegated;
  }
  return { cdn, url };
}
function transformProps({
  src,
  width,
  height,
  priority,
  layout = "constrained",
  aspectRatio,
  cdn,
  transformer,
  objectFit = "cover",
  background,
  breakpoints,
  ...props15
}) {
  const canonical = getCanonicalCdnForUrl(src, cdn);
  let url = src;
  if (canonical) {
    url = canonical.url;
    transformer || (transformer = getTransformer(canonical.cdn));
  }
  width = width && Number(width) || void 0;
  height = height && Number(height) || void 0;
  if (priority) {
    props15.loading || (props15.loading = "eager");
    props15.fetchpriority || (props15.fetchpriority = "high");
  } else {
    props15.loading || (props15.loading = "lazy");
    props15.decoding || (props15.decoding = "async");
  }
  if (props15.alt === "") {
    props15.role || (props15.role = "presentation");
  }
  if (aspectRatio) {
    if (width) {
      if (height) {
        console.error(
          "Ignoring aspectRatio because width and height are both set"
        );
      } else {
        height = width / aspectRatio;
      }
    } else if (height) {
      width = height * aspectRatio;
    } else if (layout !== "fullWidth") {
      console.error(
        "When aspectRatio is set, either width or height must also be set"
      );
    }
  } else if (width && height) {
    aspectRatio = width / height;
  } else if (layout !== "fullWidth") {
    console.error("Either aspectRatio or both width and height must be set");
  }
  if (transformer && background === "auto") {
    const lowResHeight = aspectRatio ? Math.round(LOW_RES_WIDTH * aspectRatio) : void 0;
    const lowResImage = transformer({
      url,
      width: LOW_RES_WIDTH,
      height: lowResHeight
    });
    if (lowResImage) {
      background = lowResImage.toString();
    }
  }
  const styleProps = {
    width,
    height,
    aspectRatio,
    layout,
    objectFit,
    background
  };
  if (transformer) {
    props15.sizes || (props15.sizes = getSizes(width, layout));
    props15.style = {
      ...getStyle(styleProps),
      ...props15.style
    };
    props15.srcset = getSrcSet({
      src: url,
      width,
      height,
      aspectRatio,
      layout,
      breakpoints,
      transformer,
      cdn
    });
    const transformed = transformer({ url, width, height });
    if (transformed) {
      url = transformed;
    }
    if (layout === "fullWidth" || layout === "constrained") {
      width = void 0;
      height = void 0;
    }
  }
  return {
    ...props15,
    src: url.toString(),
    width,
    height
  };
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
function getCldImageUrl(options2, config, analytics) {
  return constructCloudinaryUrl({
    options: options2,
    config: Object.assign({
      cloud: {
        cloudName: "simple-reads-books"
      }
    }, config),
    analytics: Object.assign({
      sdkCode: SVELTE_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: SVELTE_CLOUDINARY_VERSION,
      techVersion: SVELTE_VERSION,
      product: "B"
    }, analytics)
  });
}
var globals, REGEX_VERSION, REGEX_FORMAT, REGEX_URL, ASSET_TYPES_SEO, Config, Config$1, ALLOWED_URL_CONFIG, URLConfig, URLConfig$1, QualifierValue, UnsupportedError, QualifierModel, Qualifier, FlagQualifier, ActionModel, Action, BackgroundColor, RawAction, FormatQualifier, ACTION_TYPE_TO_CROP_MODE_MAP, ACTION_TYPE_TO_DELIVERY_MODE_MAP, ACTION_TYPE_TO_EFFECT_MODE_MAP, ACTION_TYPE_TO_QUALITY_MODE_MAP, ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP, CHROMA_VALUE_TO_CHROMA_MODEL_ENUM, COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP, DELIVERY_MODE_TO_ACTION_TYPE_MAP, DeliveryAction, ProgressiveQualifier, DeliveryFormatAction, Transformation, ImageTransformation, VideoTransformation, chars3, base64Map, num, packageVersion, SEO_TYPES, CloudinaryFile, CloudinaryTransformable, CloudinaryImage, CloudinaryVideo, Cloudinary, __defProp2, __export2, cropping_exports, cropsGravityAuto, cropsWithZoom, props, assetTypes, effects_exports, convertersColors, primary, position, text2, effects, flags, video, props2, assetTypes2, flags_exports, props3, assetTypes3, supportedFlags, fill_background_exports, props4, assetTypes4, defaultCrop, sanitize_exports, props5, assetTypes5, overlays_exports, props6, assetTypes6, DEFAULT_TEXT_OPTIONS, named_transformations_exports, props7, assetTypes7, raw_transformations_exports, props8, assetTypes8, remove_background_exports, props9, assetTypes9, seo_exports, props10, assetTypes10, underlays_exports, props11, assetTypes11, version_exports, props12, assetTypes12, video_exports, props13, assetTypes13, zoompan_exports, props14, assetTypes14, transformationPlugins, domains, subdomains, paths, roundIfNumeric, setParamIfDefined, setParamIfUndefined, getNumericParam, toRelativeUrl, toUrl, cdnDomains, cdnSubdomains, transform$g, transform$f, transform$e, shopifyRegex, parse$3, generate$4, transform$d, transform$c, cloudinaryRegex, parseTransforms$1, formatUrl$1, parse$2, generate$3, transform$b, cloudflareRegex, parseTransforms, formatUrl, parse$1, generate$2, transform$a, transform$9, storyBlokAssets, storyBlokImg2, splitFilters, generateFilters, parse3, generate$1, transform$8, transform$7, delegateUrl, generate, transform$6, transform$5, transform$4, transform$3, transform$2, OBJECT_TO_DIRECTIVES_MAP, transform$1, transform, delegators, getTransformer, getSizes, pixelate, getStyle, DEFAULT_RESOLUTIONS, LOW_RES_WIDTH, getBreakpoints, getSrcSet, dist, objToString, parsers, createParser, _createParser, camelToKebab, snakeToKebab, distExports, styleToCss, Image, name, version$1, description, type, module, main, files, exports, engines, types, repository, keywords, author, license, bugs, homepage, dependencies, devDependencies, scripts, sveltePkg, version, metadata, SVELTE_CLOUDINARY_ANALYTICS_ID, SVELTE_CLOUDINARY_VERSION, SVELTE_VERSION, Object_1, CldImage;
var init_CldImage = __esm({
  ".svelte-kit/output/server/chunks/CldImage.js"() {
    init_ssr();
    globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
      // @ts-ignore Node typings have this
      global
    );
    REGEX_VERSION = /\/v\d+\//;
    REGEX_FORMAT = /\.(ai|avif|gif|png|webp|bmp|bw|djvu|dng|ps|ept|eps|eps3|fbx|flif|gif|glb|gltf|heif|heic|ico|indd|jpg|jpe|jpeg|jp2|wdp|jxr|hdp|obj|pdf|ply|png|psd|arw|cr2|svg|tga|tif|tiff|u3ma|usdz|webp|3g2|3gp|avi|flv|m3u8|ts|m2ts|mts|mov|mkv|mp4|mpeg|mpd|mxf|ogv|webm|wmv)$/i;
    REGEX_URL = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|images|video|videos|raw|files)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)?\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?\/?)*\/)*(?<version>v\d+|\w{1,2})\/(?<publicId>[^\s]+)$/;
    ASSET_TYPES_SEO = ["images", "videos", "files"];
    Config = class {
      filterOutNonSupportedKeys(userProvidedConfig, validKeys) {
        const obj = /* @__PURE__ */ Object.create({});
        if (isObject(userProvidedConfig)) {
          Object.keys(userProvidedConfig).forEach((key2) => {
            if (validKeys.indexOf(key2) >= 0) {
              obj[key2] = userProvidedConfig[key2];
            } else {
              console.warn("Warning - unsupported key provided to configuration: ", key2);
            }
          });
          return obj;
        } else {
          return /* @__PURE__ */ Object.create({});
        }
      }
    };
    Config$1 = Config;
    ALLOWED_URL_CONFIG = [
      "cname",
      "secureDistribution",
      "privateCdn",
      "signUrl",
      "longUrlSignature",
      "shorten",
      "useRootPath",
      "secure",
      "forceVersion",
      "analytics",
      "queryParams"
    ];
    URLConfig = class _URLConfig extends Config$1 {
      /**
       * @param {IURLConfig} userURLConfig
       */
      constructor(userURLConfig) {
        super();
        const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
        Object.assign(this, {
          secure: true
        }, urlConfig);
      }
      extend(userURLConfig) {
        const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
        return new _URLConfig(Object.assign({}, this, urlConfig));
      }
      /**
       * @param {string} value Sets the cname
       */
      setCname(value) {
        this.cname = value;
        return this;
      }
      /**
       * @param {string} value Sets the secureDistribution
       */
      setSecureDistribution(value) {
        this.secureDistribution = value;
        return this;
      }
      /**
       * @param {boolean} value Sets whether to use a private CDN (Removes cloudName from URL)
       */
      setPrivateCdn(value) {
        this.privateCdn = value;
        return this;
      }
      /**
       * @param value Sets whether or not to sign the URL
       */
      setSignUrl(value) {
        this.signUrl = value;
        return this;
      }
      /**
       * @param value Sets whether or not to use a long signature
       */
      setLongUrlSignature(value) {
        this.longUrlSignature = value;
        return this;
      }
      /**
       * @param value Sets whether or not to shorten the URL
       */
      setShorten(value) {
        this.shorten = value;
        return this;
      }
      /**
       * @param value Sets whether or not to use a root path
       */
      setUseRootPath(value) {
        this.useRootPath = value;
        return this;
      }
      /**
       * @param value Sets whether or not to deliver the asset through https
       */
      setSecure(value) {
        this.secure = value;
        return this;
      }
      /**
       * @param value Sets whether to force a version in the URL
       */
      setForceVersion(value) {
        this.forceVersion = value;
        return this;
      }
      /**
       * @param params Sets additional params
       */
      setQueryParams(params) {
        this.queryParams = params;
        return this;
      }
    };
    URLConfig$1 = URLConfig;
    QualifierValue = class {
      /**
       *
       * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
       */
      constructor(qualifierValue) {
        this.values = [];
        this.delimiter = ":";
        if (this.hasValue(qualifierValue)) {
          this.addValue(qualifierValue);
        }
      }
      /**
       * @description Joins the provided values with the provided delimiter
       */
      toString() {
        return this.values.join(this.delimiter);
      }
      /**
       * @description Checks if the provided argument has a value
       * @param {any} v
       * @private
       * @return {boolean}
       */
      hasValue(v) {
        return typeof v !== "undefined" && v !== null && v !== "";
      }
      /**
       * @desc Adds a value for the this qualifier instance
       * @param {any} value
       * @return {this}
       */
      addValue(value) {
        if (Array.isArray(value)) {
          this.values = this.values.concat(value);
        } else {
          this.values.push(value);
        }
        this.values = this.values.filter((v) => this.hasValue(v));
        return this;
      }
      /**
       * @description Sets the delimiter for this instance
       * @param delimiter
       */
      setDelimiter(delimiter) {
        this.delimiter = delimiter;
        return this;
      }
    };
    UnsupportedError = class extends Error {
      constructor(message = "Unsupported") {
        super(message);
      }
    };
    QualifierModel = class {
      constructor() {
        this._qualifierModel = {};
      }
      toJson() {
        return qualifierToJson.apply(this);
      }
    };
    Qualifier = class extends QualifierModel {
      constructor(key2, qualifierValue) {
        super();
        this.delimiter = "_";
        this.key = key2;
        if (qualifierValue instanceof QualifierValue) {
          this.qualifierValue = qualifierValue;
        } else {
          this.qualifierValue = new QualifierValue();
          this.qualifierValue.addValue(qualifierValue);
        }
      }
      toString() {
        const { key: key2, delimiter, qualifierValue } = this;
        return `${key2}${delimiter}${qualifierValue.toString()}`;
      }
      addValue(value) {
        this.qualifierValue.addValue(value);
        return this;
      }
    };
    FlagQualifier = class extends Qualifier {
      constructor(flagType, flagValue) {
        let qualifierValue;
        if (flagValue) {
          qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(":");
        } else {
          qualifierValue = flagType;
        }
        super("fl", qualifierValue);
        this.flagValue = flagValue;
      }
      toString() {
        return super.toString().replace(/\./, "%2E");
      }
      getFlagValue() {
        return this.flagValue;
      }
    };
    ActionModel = class {
      constructor() {
        this._actionModel = {};
      }
      toJson() {
        return actionToJson.apply(this);
      }
    };
    Action = class extends ActionModel {
      constructor() {
        super(...arguments);
        this.qualifiers = /* @__PURE__ */ new Map();
        this.flags = [];
        this.delimiter = ",";
        this.actionTag = "";
      }
      prepareQualifiers() {
      }
      /**
       * @description Returns the custom name tag that was given to this action
       * @return {string}
       */
      getActionTag() {
        return this.actionTag;
      }
      /**
       * @description Sets the custom name tag for this action
       * @return {this}
       */
      setActionTag(tag) {
        this.actionTag = tag;
        return this;
      }
      /**
       * @description Calls toString() on all child qualifiers (implicitly by using .join()).
       * @return {string}
       */
      toString() {
        this.prepareQualifiers();
        return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
      }
      /**
       * @description Adds the parameter to the action.
       * @param {SDK.Qualifier} qualifier
       * @return {this}
       */
      addQualifier(qualifier) {
        if (typeof qualifier === "string") {
          const [key2, value] = qualifier.toLowerCase().split("_");
          if (key2 === "fl") {
            this.flags.push(new FlagQualifier(value));
          } else {
            this.qualifiers.set(key2, new Qualifier(key2, value));
          }
        } else {
          this.qualifiers.set(qualifier.key, qualifier);
        }
        return this;
      }
      /**
       * @description Adds a flag to the current action.
       * @param {Qualifiers.Flag} flag
       * @return {this}
       */
      addFlag(flag) {
        if (typeof flag === "string") {
          this.flags.push(new FlagQualifier(flag));
        } else {
          if (flag instanceof FlagQualifier) {
            this.flags.push(flag);
          }
        }
        return this;
      }
      addValueToQualifier(qualifierKey, qualifierValue) {
        this.qualifiers.get(qualifierKey).addValue(qualifierValue);
        return this;
      }
    };
    BackgroundColor = class extends Action {
      constructor(color) {
        super();
        this.addQualifier(new Qualifier("b", new QualifierValue(color).setDelimiter("_")));
      }
    };
    RawAction = class {
      constructor(raw) {
        this.raw = raw;
      }
      toString() {
        return this.raw;
      }
      toJson() {
        return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
      }
    };
    FormatQualifier = class extends QualifierValue {
      constructor(val) {
        super(val);
        this.val = val;
      }
      getValue() {
        return this.val;
      }
    };
    ACTION_TYPE_TO_CROP_MODE_MAP = {
      limitFit: "limit",
      limitFill: "lfill",
      minimumFit: "mfit",
      thumbnail: "thumb",
      limitPad: "lpad",
      minimumPad: "mpad"
    };
    ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
      colorSpace: "cs",
      dpr: "dpr",
      density: "dn",
      defaultImage: "d",
      format: "f",
      quality: "q"
    };
    ACTION_TYPE_TO_EFFECT_MODE_MAP = {
      redEye: "redeye",
      advancedRedEye: "adv_redeye",
      oilPaint: "oil_paint",
      unsharpMask: "unsharp_mask",
      makeTransparent: "make_transparent"
    };
    ACTION_TYPE_TO_QUALITY_MODE_MAP = {
      autoBest: "auto:best",
      autoEco: "auto:eco",
      autoGood: "auto:good",
      autoLow: "auto:low",
      jpegminiHigh: "jpegmini:1",
      jpegminiMedium: "jpegmini:2",
      jpegminiBest: "jpegmini:0"
    };
    ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
      fullHd: "full_hd",
      fullHdWifi: "full_hd_wifi",
      fullHdLean: "full_hd_lean",
      hdLean: "hd_lean"
    };
    CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
      444: "CHROMA_444",
      420: "CHROMA_420"
    };
    COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
      "noCmyk": "no_cmyk",
      "keepCmyk": "keep_cmyk",
      "tinySrgb": "tinysrgb",
      "srgbTrueColor": "srgb:truecolor"
    };
    objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
    objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
    objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
    DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
    objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
    objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
    objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);
    DeliveryAction = class extends Action {
      /**
       * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
       * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
       * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
       * @see Visit {@link Actions.Delivery|Delivery} for an example
       */
      constructor(deliveryKey, deliveryType, modelProperty) {
        super();
        this._actionModel = {};
        let deliveryTypeValue;
        if (deliveryType instanceof FormatQualifier) {
          deliveryTypeValue = deliveryType.getValue();
        } else {
          deliveryTypeValue = deliveryType;
        }
        this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
        this._actionModel[modelProperty] = deliveryTypeValue;
        this.addQualifier(new Qualifier(deliveryKey, deliveryType));
      }
    };
    ProgressiveQualifier = class extends FlagQualifier {
      constructor(mode) {
        super("progressive", mode);
      }
    };
    DeliveryFormatAction = class extends DeliveryAction {
      constructor(deliveryKey, deliveryType) {
        super(deliveryKey, deliveryType, "formatType");
      }
      /**
       * @description Uses lossy compression when delivering animated GIF files.
       * @return {this}
       */
      lossy() {
        this._actionModel.lossy = true;
        this.addFlag(lossy());
        return this;
      }
      /**
       * @description Uses progressive compression when delivering JPG file format.
       * @return {this}
       */
      progressive(mode) {
        if (mode instanceof ProgressiveQualifier) {
          this._actionModel.progressive = { mode: mode.getFlagValue() };
          this.addFlag(mode);
        } else {
          this._actionModel.progressive = { mode };
          this.addFlag(progressive(mode));
        }
        return this;
      }
      /**
       * @description Ensures that images with a transparency channel are delivered in PNG format.
       */
      preserveTransparency() {
        this._actionModel.preserveTransparency = true;
        this.addFlag(preserveTransparency());
        return this;
      }
      static fromJson(actionModel) {
        const { formatType, lossy: lossy2, progressive: progressive2, preserveTransparency: preserveTransparency2 } = actionModel;
        let result;
        if (formatType) {
          result = new this("f", formatType);
        } else {
          result = new this("f");
        }
        if (progressive2) {
          if (progressive2.mode) {
            result.progressive(progressive2.mode);
          } else {
            result.progressive();
          }
        }
        lossy2 && result.lossy();
        preserveTransparency2 && result.preserveTransparency();
        return result;
      }
    };
    Transformation = class _Transformation {
      constructor() {
        this.actions = [];
      }
      /**
       * @param {SDK.Action | string} action
       * @return {this}
       */
      addAction(action) {
        let actionToAdd;
        if (typeof action === "string") {
          if (action.indexOf("/") >= 0) {
            throw "addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead";
          } else {
            actionToAdd = new RawAction(action);
          }
        } else {
          actionToAdd = action;
        }
        this.actions.push(actionToAdd);
        return this;
      }
      /**
       * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
       * @param {string | SDK.Transformation} tx
       * @example
       * import {Transformation} from "@cloudinary/url-gen";
       *
       * const transformation = new Transformation();
       * transformation.addTransformation('w_100/w_200/w_300');
       * @return {this}
       */
      addTransformation(tx) {
        if (tx instanceof _Transformation) {
          this.actions = this.actions.concat(tx.actions);
        } else {
          this.actions.push(new RawAction(tx));
        }
        return this;
      }
      /**
       * @return {string}
       */
      toString() {
        return this.actions.map((action) => {
          return action.toString();
        }).filter((a) => a).join("/");
      }
      /**
       * @description Delivers an animated GIF.
       * @param {AnimatedAction} animatedAction
       * @return {this}
       */
      animated(animatedAction) {
        return this.addAction(animatedAction);
      }
      /**
       * @description Adds a border around the image.
       * @param {Border} borderAction
       * @return {this}
       */
      border(borderAction) {
        return this.addAction(borderAction);
      }
      /**
       * @description Adjusts the shape of the delivered image. </br>
       * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
       * @param {IReshape} reshapeAction
       * @return {this}
       */
      reshape(reshapeAction) {
        return this.addAction(reshapeAction);
      }
      /**
       * @description Resize the asset using provided resize action
       * @param {ResizeSimpleAction} resizeAction
       * @return {this}
       */
      resize(resizeAction) {
        return this.addAction(resizeAction);
      }
      /**
       * @desc An alias to Action Delivery.quality
       * @param {string|number} quality
       * @return {this}
       */
      quality(quality) {
        this.addAction(new DeliveryFormatAction("q", quality));
        return this;
      }
      /**
       * @desc An alias to Action Delivery.format
       * @param {string} format
       * @return {this}
       */
      format(format) {
        this.addAction(new DeliveryFormatAction("f", format));
        return this;
      }
      /**
       * @description Rounds the specified corners of an image.
       * @param roundCornersAction
       * @return {this}
       */
      roundCorners(roundCornersAction) {
        return this.addAction(roundCornersAction);
      }
      /**
       * @description Adds an overlay over the base image.
       * @param {LayerAction} overlayAction
       * @return {this}
       */
      overlay(overlayAction) {
        return this.addAction(overlayAction);
      }
      /**
       * @description Adds an underlay under the base image.
       * @param {LayerAction} underlayAction
       * @return {this}
       */
      underlay(underlayAction) {
        underlayAction.setLayerType("u");
        return this.addAction(underlayAction);
      }
      /**
       * @description Defines an new user variable.
       * @param {VariableAction} variableAction
       * @return {this}
       */
      addVariable(variableAction) {
        return this.addAction(variableAction);
      }
      /**
       * @description Specifies a condition to be met before applying a transformation.
       * @param {ConditionalAction} conditionAction
       * @return {this}
       */
      conditional(conditionAction) {
        return this.addAction(conditionAction);
      }
      /**
       * @description Applies a filter or an effect on an asset.
       * @param {SimpleEffectAction} effectAction
       * @return {this}
       */
      effect(effectAction) {
        return this.addAction(effectAction);
      }
      /**
       * @description Applies adjustment effect on an asset.
       * @param action
       * @return {this}
       */
      adjust(action) {
        return this.addAction(action);
      }
      /**
       * @description Rotates the asset by the given angle.
       * @param {RotateAction} rotateAction
       * @return {this}
       */
      rotate(rotateAction) {
        return this.addAction(rotateAction);
      }
      /**
       * @description Applies a pre-defined named transformation of the given name.
       * @param {NamedTransformation} namedTransformation
       * @return {this}
       */
      namedTransformation(namedTransformation) {
        return this.addAction(namedTransformation);
      }
      /**
       * @description Applies delivery action.
       * @param deliveryAction
       * @return {this}
       */
      delivery(deliveryAction) {
        return this.addAction(deliveryAction);
      }
      /**
       * @description Sets the color of the background.
       * @param {Qualifiers.Color} color
       * @return {this}
       */
      backgroundColor(color) {
        return this.addAction(new BackgroundColor(prepareColor(color)));
      }
      /**
       * @description Adds a layer in a Photoshop document.
       * @param action
       * @return {this}
       */
      psdTools(action) {
        return this.addAction(action);
      }
      /**
       * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
       * @param action
       * @return {this}
       */
      extract(action) {
        return this.addAction(action);
      }
      /**
       * @description Adds a flag as a separate action.
       * @param {Qualifiers.Flag | string} flagQualifier
       * @return {this}
       */
      addFlag(flagQualifier) {
        const action = new Action();
        let flagToAdd = flagQualifier;
        if (typeof flagQualifier === "string") {
          flagToAdd = new FlagQualifier(flagQualifier);
        }
        action.addQualifier(flagToAdd);
        return this.addAction(action);
      }
      /**
       * @description Inject a custom function into the image transformation pipeline.
       * @return {this}
       */
      customFunction(customFunction) {
        return this.addAction(customFunction);
      }
      /**
       * Transcodes the video (or audio) to another format.
       * @param {Action} action
       * @return {this}
       */
      transcode(action) {
        return this.addAction(action);
      }
      /**
       * Applies the specified video edit action.
       *
       * @param {videoEditType} action
       * @return {this}
       */
      videoEdit(action) {
        return this.addAction(action);
      }
      toJson() {
        const actions = [];
        for (const action of this.actions) {
          const json2 = action.toJson();
          if (isErrorObject(json2)) {
            return json2;
          }
          actions.push(json2);
        }
        return { actions };
      }
    };
    ImageTransformation = class extends Transformation {
    };
    VideoTransformation = class extends Transformation {
    };
    chars3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    base64Map = {};
    num = 0;
    chars3.split("").forEach((char) => {
      let key2 = num.toString(2);
      key2 = stringPad(key2, 6, "0");
      base64Map[key2] = char;
      num++;
    });
    packageVersion = "1.11.0";
    SEO_TYPES = {
      "image/upload": "images",
      "image/private": "private_images",
      "image/authenticated": "authenticated_images",
      "raw/upload": "files",
      "video/upload": "videos"
    };
    CloudinaryFile = class {
      constructor(publicID, cloudConfig = {}, urlConfig) {
        this.setPublicID(publicID);
        this.setCloudConfig(cloudConfig);
        this.setURLConfig(urlConfig);
      }
      /**
       * @description Sets the URL Config for this asset
       * @param urlConfig
       * @return {this}
       */
      setURLConfig(urlConfig) {
        this.urlConfig = new URLConfig$1(urlConfig);
        return this;
      }
      /**
       * @description Sets the Cloud Config for this asset
       * @param urlConfig
       * @return {this}
       */
      setCloudConfig(cloudConfig) {
        this.cloudName = cloudConfig.cloudName;
        this.apiKey = cloudConfig.apiKey;
        this.apiSecret = cloudConfig.apiSecret;
        this.authToken = cloudConfig.authToken;
        return this;
      }
      /**
       * @description Sets the public ID of the asset.
       * @param {string} publicID The public ID of the asset.
       * @return {this}
       */
      setPublicID(publicID) {
        this.publicID = publicID ? publicID.toString() : "";
        return this;
      }
      /**
       * @description Sets the delivery type of the asset.
       * @param {DELIVERY_TYPE | string} newType The type of the asset.
       * @return {this}
       */
      setDeliveryType(newType) {
        this.deliveryType = newType;
        return this;
      }
      /**
       * @description Sets the URL SEO suffix of the asset.
       * @param {string} newSuffix The SEO suffix.
       * @return {this}
       */
      setSuffix(newSuffix) {
        this.suffix = newSuffix;
        return this;
      }
      /**
       * @description Sets the signature of the asset.
       * @param {string} signature The signature.
       * @return {this}
       */
      setSignature(signature) {
        this.signature = signature;
        return this;
      }
      /**
       * @description Sets the version of the asset.
       * @param {string} newVersion The version of the asset.
       * @return {this}
       */
      setVersion(newVersion) {
        if (newVersion) {
          this.version = newVersion;
        }
        return this;
      }
      /**
       * @description Sets the asset type.
       * @param {string} newType The type of the asset.
       * @return {this}
       */
      setAssetType(newType) {
        if (newType) {
          this.assetType = newType;
        }
        return this;
      }
      sign() {
        return this;
      }
      /**
       * @description Serializes to URL string
       * @param overwriteOptions
       */
      toURL(overwriteOptions = {}) {
        return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
      }
      /**
       * @description Validate various options before attempting to create a URL
       * The function will throw in case a violation
       * @throws Validation errors
       */
      validateAssetForURLCreation() {
        if (typeof this.cloudName === "undefined") {
          throw "You must supply a cloudName when initializing the asset";
        }
        const suffixContainsDot = this.suffix && this.suffix.indexOf(".") >= 0;
        const suffixContainsSlash = this.suffix && this.suffix.indexOf("/") >= 0;
        if (suffixContainsDot || suffixContainsSlash) {
          throw "`suffix`` should not include . or /";
        }
      }
      /**
       * @description return an SEO friendly name for a combination of asset/delivery, some examples:
       * * image/upload -> images
       * * video/upload -> videos
       * If no match is found, return `{asset}/{delivery}`
       */
      getResourceType() {
        const assetType = handleAssetType(this.assetType);
        const deliveryType = handleDeliveryType(this.deliveryType);
        const hasSuffix = !!this.suffix;
        const regularSEOType = `${assetType}/${deliveryType}`;
        const shortSEOType = SEO_TYPES[`${assetType}/${deliveryType}`];
        const useRootPath = this.urlConfig.useRootPath;
        const shorten = this.urlConfig.shorten;
        if (useRootPath) {
          if (regularSEOType === "image/upload") {
            return "";
          } else {
            throw new Error(`useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ${regularSEOType} instead`);
          }
        }
        if (shorten && regularSEOType === "image/upload") {
          return "iu";
        }
        if (hasSuffix) {
          if (shortSEOType) {
            return shortSEOType;
          } else {
            throw new Error(`URL Suffix only supported for ${Object.keys(SEO_TYPES).join(", ")}, Provided: ${regularSEOType} instead`);
          }
        }
        return regularSEOType;
      }
      getSignature() {
        if (this.signature) {
          return `s--${this.signature}--`;
        } else {
          return "";
        }
      }
      /**
       *
       * @description Creates a fully qualified CloudinaryURL
       * @return {string} CloudinaryURL
       * @throws Validation Errors
       */
      createCloudinaryURL(transformation, trackedAnalytics) {
        if (!this.publicID) {
          return "";
        }
        this.validateAssetForURLCreation();
        const prefix2 = getUrlPrefix(this.cloudName, this.urlConfig);
        const transformationString = transformation ? transformation.toString() : "";
        const version2 = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
        const publicID = this.publicID.replace(/,/g, "%2C");
        const url = [prefix2, this.getResourceType(), this.getSignature(), transformationString, version2, publicID, this.suffix].filter((a) => a).join("/");
        if (typeof transformation === "string") {
          return url;
        } else {
          const safeURL = encodeURI(url).replace(/\?/g, "%3F").replace(/=/g, "%3D");
          const queryParams = new URLSearchParams(this.urlConfig.queryParams);
          if (this.urlConfig.analytics !== false && !publicID.includes("?")) {
            queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
          }
          const queryParamsString = queryParams.toString();
          if (queryParamsString) {
            return `${safeURL}?${queryParamsString}`;
          } else {
            return safeURL;
          }
        }
      }
    };
    CloudinaryTransformable = class extends CloudinaryFile {
      constructor(publicID, cloudConfig, urlConfig, transformation) {
        super(publicID, cloudConfig, urlConfig);
        this.transformation = transformation;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Animated} animated
       * @return {this}
       */
      animated(animated) {
        this.transformation.animated(animated);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Border} border
       * @return {this}
       */
      border(border) {
        this.transformation.border(border);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Reshape} reshape
       * @return {this}
       */
      reshape(reshape) {
        this.transformation.reshape(reshape);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Resize} resize
       * @return {this}
       */
      resize(resize) {
        this.transformation.resize(resize);
        return this;
      }
      /**
       * @desc An alias to Action Delivery.quality
       * @param {string|number} quality
       * @return {this}
       */
      quality(quality) {
        this.addAction(new DeliveryFormatAction("q", quality));
        return this;
      }
      /**
       * @desc An alias to Action Delivery.format
       * @param {string} format
       * @return {this}
       */
      format(format) {
        this.addAction(new DeliveryFormatAction("f", format));
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.RoundCorners} roundCorners
       * @return {this}
       */
      roundCorners(roundCorners) {
        this.transformation.roundCorners(roundCorners);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @return {this}
       */
      overlay(overlayAction) {
        this.transformation.overlay(overlayAction);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Variable} variableAction
       * @return {this}
       */
      addVariable(variableAction) {
        this.transformation.addVariable(variableAction);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Condition} conditionalAction
       * @return {this}
       */
      conditional(conditionalAction) {
        this.transformation.conditional(conditionalAction);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Effect} effect
       * @return {this}
       */
      effect(effect) {
        this.transformation.effect(effect);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Adjust} action
       * @return {this}
       */
      adjust(action) {
        this.transformation.adjust(action);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Rotate} rotate
       * @return {this}
       */
      rotate(rotate) {
        this.transformation.rotate(rotate);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.NamedTransformation} namedTransformation
       * @return {this}
       */
      namedTransformation(namedTransformation) {
        this.transformation.namedTransformation(namedTransformation);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Delivery} deliveryAction
       * @return {this}
       */
      delivery(deliveryAction) {
        this.transformation.delivery(deliveryAction);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Qualifiers.color} color
       * @return {this}
       */
      backgroundColor(color) {
        this.transformation.backgroundColor(color);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.PSDTools} action
       * @return {this}
       */
      psdTools(action) {
        this.transformation.psdTools(action);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Extract} action
       * @return {this}
       */
      extract(action) {
        this.transformation.extract(action);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Qualifiers.Flag | string} flagQualifier
       * @return {this}
       */
      addFlag(flagQualifier) {
        this.transformation.addFlag(flagQualifier);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.CustomFunction} customFunction
       * @return {this}
       */
      customFunction(customFunction) {
        this.transformation.customFunction(customFunction);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {SDK.Action | string} action
       * @return {this}
       */
      addAction(action) {
        this.transformation.addAction(action);
        return this;
      }
      /**
       * @description Extend your transformation with another transformation
       * @param { string | SDK.Transformation } tx
       */
      addTransformation(tx) {
        this.transformation.addTransformation(tx);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @return {string}
       */
      toString() {
        return this.transformation.toString();
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @return {this}
       */
      underlay(underlayAction) {
        this.transformation.underlay(underlayAction);
        return this;
      }
      toURL(overwriteOptions = {}) {
        return this.createCloudinaryURL(this.transformation, overwriteOptions === null || overwriteOptions === void 0 ? void 0 : overwriteOptions.trackedAnalytics);
      }
    };
    CloudinaryImage = class extends CloudinaryTransformable {
      constructor(publicID, cloudConfig, urlConfig) {
        super(publicID, cloudConfig, urlConfig, new ImageTransformation());
      }
    };
    CloudinaryVideo = class extends CloudinaryTransformable {
      constructor(publicID, cloudConfig, urlConfig) {
        super(publicID, cloudConfig, urlConfig, new VideoTransformation());
        this.assetType = "video";
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.Transcode} action
       * @return {this}
       */
      transcode(action) {
        this.transformation.transcode(action);
        return this;
      }
      /**
       * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
       * @param {Actions.VideoEdit} action
       * @return {this}
       */
      videoEdit(action) {
        this.transformation.videoEdit(action);
        return this;
      }
    };
    Cloudinary = class {
      constructor(cloudinaryConfig) {
        if (cloudinaryConfig) {
          this.cloudinaryConfig = cloudinaryConfig;
        }
      }
      image(publicID) {
        return new CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
      }
      video(publicID) {
        return new CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
      }
      setConfig(cloudinaryConfig) {
        this.cloudinaryConfig = cloudinaryConfig;
        return this;
      }
      getConfig() {
        return this.cloudinaryConfig;
      }
      extendConfig() {
      }
    };
    __defProp2 = Object.defineProperty;
    __export2 = (target, all) => {
      for (var name2 in all)
        __defProp2(target, name2, { get: all[name2], enumerable: true });
    };
    cropping_exports = {};
    __export2(cropping_exports, {
      assetTypes: () => assetTypes,
      normalizeNumberParameter: () => normalizeNumberParameter,
      plugin: () => plugin,
      props: () => props
    });
    cropsGravityAuto = ["crop", "fill", "lfill", "fill_pad", "thumb"];
    cropsWithZoom = ["crop", "thumb"];
    props = [
      "crop",
      "gravity",
      "zoom"
    ];
    assetTypes = ["image", "images", "video", "videos"];
    effects_exports = {};
    __export2(effects_exports, {
      assetTypes: () => assetTypes2,
      plugin: () => plugin2,
      props: () => props2
    });
    convertersColors = [
      {
        test: testColorIsHex,
        convert: convertColorHexToRgb
      }
    ];
    primary = {
      aspectRatio: {
        qualifier: "ar"
      },
      crop: {
        qualifier: "c"
      },
      gravity: {
        qualifier: "g"
      },
      height: {
        qualifier: "h"
      },
      width: {
        qualifier: "w"
      }
    };
    position = {
      angle: {
        qualifier: "a"
      },
      gravity: {
        qualifier: "g"
      },
      x: {
        qualifier: "x"
      },
      y: {
        qualifier: "y"
      }
    };
    text2 = {
      alignment: {
        qualifier: false,
        order: 6
      },
      antialias: {
        qualifier: "antialias"
      },
      border: {
        qualifier: "bo",
        location: "primary"
      },
      color: {
        qualifier: "co",
        location: "primary",
        converters: convertersColors
      },
      fontFamily: {
        qualifier: false,
        order: 1
      },
      fontSize: {
        qualifier: false,
        order: 2
      },
      fontStyle: {
        qualifier: false,
        order: 4
      },
      fontWeight: {
        qualifier: false,
        order: 3
      },
      hinting: {
        qualifier: "hinting"
      },
      letterSpacing: {
        qualifier: "letter_spacing"
      },
      lineSpacing: {
        qualifier: "line_spacing"
      },
      stroke: {
        qualifier: "self",
        order: 7
      },
      textDecoration: {
        qualifier: false,
        order: 5
      }
    };
    effects = {
      art: {
        prefix: "e",
        qualifier: "art"
      },
      autoBrightness: {
        prefix: "e",
        qualifier: "auto_brightness"
      },
      autoColor: {
        prefix: "e",
        qualifier: "auto_color"
      },
      autoContrast: {
        prefix: "e",
        qualifier: "auto_contrast"
      },
      assistColorblind: {
        prefix: "e",
        qualifier: "assist_colorblind"
      },
      background: {
        qualifier: "b"
      },
      blackwhite: {
        prefix: "e",
        qualifier: "blackwhite"
      },
      blur: {
        prefix: "e",
        qualifier: "blur"
      },
      blurFaces: {
        prefix: "e",
        qualifier: "blur_faces"
      },
      blurRegion: {
        prefix: "e",
        qualifier: "blur_region"
      },
      border: {
        qualifier: "bo"
      },
      brightness: {
        prefix: "e",
        qualifier: "brightness"
      },
      brightnessHSB: {
        prefix: "e",
        qualifier: "brightness_hsb"
      },
      cartoonify: {
        prefix: "e",
        qualifier: "cartoonify"
      },
      color: {
        qualifier: "co",
        converters: convertersColors
      },
      colorize: {
        prefix: "e",
        qualifier: "colorize"
      },
      contrast: {
        prefix: "e",
        qualifier: "contrast"
      },
      distort: {
        prefix: "e",
        qualifier: "distort"
      },
      fillLight: {
        prefix: "e",
        qualifier: "fill_light"
      },
      gamma: {
        prefix: "e",
        qualifier: "gamma"
      },
      gradientFade: {
        prefix: "e",
        qualifier: "gradient_fade"
      },
      grayscale: {
        prefix: "e",
        qualifier: "grayscale"
      },
      improve: {
        prefix: "e",
        qualifier: "improve"
      },
      multiply: {
        prefix: "e",
        qualifier: "multiply"
      },
      negate: {
        prefix: "e",
        qualifier: "negate"
      },
      oilPaint: {
        prefix: "e",
        qualifier: "oil_paint"
      },
      opacity: {
        qualifier: "o"
      },
      outline: {
        prefix: "e",
        qualifier: "outline"
      },
      overlay: {
        prefix: "e",
        qualifier: "overlay"
      },
      pixelate: {
        prefix: "e",
        qualifier: "pixelate"
      },
      pixelateFaces: {
        prefix: "e",
        qualifier: "pixelate_faces"
      },
      pixelateRegion: {
        prefix: "e",
        qualifier: "pixelate_region"
      },
      radius: {
        qualifier: "r"
      },
      redeye: {
        prefix: "e",
        qualifier: "redeye"
      },
      replaceColor: {
        prefix: "e",
        qualifier: "replace_color"
      },
      saturation: {
        prefix: "e",
        qualifier: "saturation"
      },
      screen: {
        prefix: "e",
        qualifier: "screen"
      },
      sepia: {
        prefix: "e",
        qualifier: "sepia"
      },
      shadow: {
        prefix: "e",
        qualifier: "shadow"
      },
      sharpen: {
        prefix: "e",
        qualifier: "sharpen"
      },
      shear: {
        prefix: "e",
        qualifier: "shear"
      },
      simulateColorblind: {
        prefix: "e",
        qualifier: "simulate_colorblind"
      },
      tint: {
        prefix: "e",
        qualifier: "tint"
      },
      trim: {
        prefix: "e",
        qualifier: "trim"
      },
      unsharpMask: {
        prefix: "e",
        qualifier: "unsharp_mask"
      },
      vectorize: {
        prefix: "e",
        qualifier: "vectorize"
      },
      vibrance: {
        prefix: "e",
        qualifier: "vibrance"
      },
      vignette: {
        prefix: "e",
        qualifier: "vignette"
      }
    };
    flags = {
      animated: {
        prefix: "fl",
        qualifier: "animated"
      },
      anyFormat: {
        prefix: "fl",
        qualifier: "any_format"
      },
      apng: {
        prefix: "fl",
        qualifier: "apng"
      },
      attachment: {
        prefix: "fl",
        qualifier: "attachment"
      },
      awebp: {
        prefix: "fl",
        qualifier: "awebp"
      },
      clip: {
        prefix: "fl",
        qualifier: "clip"
      },
      clipEvenodd: {
        prefix: "fl",
        qualifier: "clip_evenodd"
      },
      cutter: {
        prefix: "fl",
        qualifier: "cutter"
      },
      draco: {
        prefix: "fl",
        qualifier: "draco"
      },
      forceIcc: {
        prefix: "fl",
        qualifier: "force_icc"
      },
      forceStrip: {
        prefix: "fl",
        qualifier: "force_strip"
      },
      getinfo: {
        prefix: "fl",
        qualifier: "getinfo"
      },
      group4: {
        prefix: "fl",
        qualifier: "group4"
      },
      hlsv3: {
        prefix: "fl",
        qualifier: "hlsv3"
      },
      ignoreAspectRatio: {
        prefix: "fl",
        qualifier: "ignore_aspect_ratio"
      },
      ignoreMaskChannels: {
        prefix: "fl",
        qualifier: "ignore_mask_channels"
      },
      immutableCache: {
        prefix: "fl",
        qualifier: "immutable_cache"
      },
      keepAttribution: {
        prefix: "fl",
        qualifier: "keep_attribution"
      },
      keepDar: {
        prefix: "fl",
        qualifier: "keep_dar"
      },
      keepIptc: {
        prefix: "fl",
        qualifier: "keep_iptc"
      },
      layerApply: {
        prefix: "fl",
        qualifier: "layer_apply"
      },
      lossy: {
        prefix: "fl",
        qualifier: "lossy"
      },
      mono: {
        prefix: "fl",
        qualifier: "mono"
      },
      noOverflow: {
        prefix: "fl",
        qualifier: "no_overflow"
      },
      noStream: {
        prefix: "fl",
        qualifier: "no_stream"
      },
      png8: {
        prefix: "fl",
        qualifier: "png8"
      },
      png24: {
        prefix: "fl",
        qualifier: "png24"
      },
      png32: {
        prefix: "fl",
        qualifier: "png32"
      },
      preserveTransparency: {
        prefix: "fl",
        qualifier: "preserve_transparency"
      },
      progressive: {
        prefix: "fl",
        qualifier: "progressive"
      },
      rasterize: {
        prefix: "fl",
        qualifier: "rasterize"
      },
      regionRelative: {
        prefix: "fl",
        qualifier: "region_relative"
      },
      relative: {
        prefix: "fl",
        qualifier: "relative",
        location: "primary"
      },
      replaceImage: {
        prefix: "fl",
        qualifier: "replace_image"
      },
      sanitize: {
        prefix: "fl",
        qualifier: "sanitize"
      },
      splice: {
        prefix: "fl",
        qualifier: "splice"
      },
      streamingAttachment: {
        prefix: "fl",
        qualifier: "streaming_attachment"
      },
      stripProfile: {
        prefix: "fl",
        qualifier: "strip_profile"
      },
      textDisallowOverflow: {
        prefix: "fl",
        qualifier: "text_disallow_overflow"
      },
      textNoTrim: {
        prefix: "fl",
        qualifier: "text_no_trim"
      },
      tif8Lzw: {
        prefix: "fl",
        qualifier: "tif8_lzw"
      },
      tiled: {
        prefix: "fl",
        qualifier: "tiled"
      },
      truncateTs: {
        prefix: "fl",
        qualifier: "truncate_ts"
      },
      waveform: {
        prefix: "fl",
        qualifier: "waveform"
      }
    };
    video = {
      streamingProfile: {
        qualifier: "sp",
        location: "primary"
      }
    };
    props2 = [...Object.keys(effects), "effects"];
    assetTypes2 = ["image", "images", "video", "videos"];
    flags_exports = {};
    __export2(flags_exports, {
      assetTypes: () => assetTypes3,
      plugin: () => plugin3,
      props: () => props3
    });
    props3 = ["flags"];
    assetTypes3 = ["image", "images", "video", "videos"];
    supportedFlags = Object.entries(flags).map(([_, { qualifier }]) => qualifier);
    fill_background_exports = {};
    __export2(fill_background_exports, {
      assetTypes: () => assetTypes4,
      plugin: () => plugin4,
      props: () => props4
    });
    props4 = ["fillBackground"];
    assetTypes4 = ["image", "images"];
    defaultCrop = "pad";
    sanitize_exports = {};
    __export2(sanitize_exports, {
      assetTypes: () => assetTypes5,
      plugin: () => plugin5,
      props: () => props5
    });
    props5 = ["sanitize"];
    assetTypes5 = ["image", "images"];
    overlays_exports = {};
    __export2(overlays_exports, {
      DEFAULT_TEXT_OPTIONS: () => DEFAULT_TEXT_OPTIONS,
      assetTypes: () => assetTypes6,
      plugin: () => plugin6,
      props: () => props6
    });
    props6 = ["text", "overlays"];
    assetTypes6 = ["image", "images", "video", "videos"];
    DEFAULT_TEXT_OPTIONS = {
      color: "black",
      fontFamily: "Arial",
      fontSize: 200,
      fontWeight: "bold"
    };
    named_transformations_exports = {};
    __export2(named_transformations_exports, {
      assetTypes: () => assetTypes7,
      plugin: () => plugin7,
      props: () => props7
    });
    props7 = ["transformations"];
    assetTypes7 = ["image", "images", "video", "videos"];
    raw_transformations_exports = {};
    __export2(raw_transformations_exports, {
      assetTypes: () => assetTypes8,
      plugin: () => plugin8,
      props: () => props8
    });
    props8 = ["rawTransformations"];
    assetTypes8 = ["image", "images", "video", "videos"];
    remove_background_exports = {};
    __export2(remove_background_exports, {
      assetTypes: () => assetTypes9,
      plugin: () => plugin9,
      props: () => props9
    });
    props9 = ["removeBackground"];
    assetTypes9 = ["image", "images"];
    seo_exports = {};
    __export2(seo_exports, {
      assetTypes: () => assetTypes10,
      plugin: () => plugin10,
      props: () => props10
    });
    props10 = ["seoSuffix"];
    assetTypes10 = ["image", "images", "video", "videos"];
    underlays_exports = {};
    __export2(underlays_exports, {
      assetTypes: () => assetTypes11,
      plugin: () => plugin11,
      props: () => props11
    });
    props11 = ["underlay", "underlays"];
    assetTypes11 = ["image", "images", "video", "videos"];
    version_exports = {};
    __export2(version_exports, {
      assetTypes: () => assetTypes12,
      plugin: () => plugin12,
      props: () => props12
    });
    props12 = ["version"];
    assetTypes12 = ["image", "images", "video", "videos"];
    video_exports = {};
    __export2(video_exports, {
      assetTypes: () => assetTypes13,
      plugin: () => plugin13,
      props: () => props13
    });
    props13 = [...Object.keys(video)];
    assetTypes13 = ["video", "videos"];
    zoompan_exports = {};
    __export2(zoompan_exports, {
      assetTypes: () => assetTypes14,
      plugin: () => plugin14,
      props: () => props14
    });
    props14 = ["zoompan"];
    assetTypes14 = ["image", "images"];
    transformationPlugins = [
      remove_background_exports,
      raw_transformations_exports,
      cropping_exports,
      effects_exports,
      fill_background_exports,
      flags_exports,
      overlays_exports,
      sanitize_exports,
      named_transformations_exports,
      seo_exports,
      underlays_exports,
      version_exports,
      video_exports,
      zoompan_exports
    ];
    domains = {
      "images.ctfassets.net": "contentful",
      "cdn.builder.io": "builder.io",
      "images.prismic.io": "imgix",
      "www.datocms-assets.com": "imgix",
      "cdn.sanity.io": "imgix",
      "images.unsplash.com": "imgix",
      "cdn.shopify.com": "shopify",
      "s7d1.scene7.com": "scene7",
      "ip.keycdn.com": "keycdn",
      "assets.caisy.io": "bunny",
      "images.contentstack.io": "contentstack"
    };
    subdomains = {
      "imgix.net": "imgix",
      "files.wordpress.com": "wordpress",
      "b-cdn.net": "bunny",
      "storyblok.com": "storyblok",
      "kc-usercontent.com": "kontent.ai",
      "cloudinary.com": "cloudinary",
      "kxcdn.com": "keycdn",
      "imgeng.in": "imageengine"
    };
    paths = {
      "/cdn-cgi/image/": "cloudflare",
      "/_next/image": "nextjs",
      "/_next/static": "nextjs",
      "/_vercel/image": "vercel",
      "/is/image": "scene7"
    };
    roundIfNumeric = (value) => {
      if (!value) {
        return value;
      }
      const num2 = Number(value);
      return isNaN(num2) ? value : Math.round(num2);
    };
    setParamIfDefined = (url, key2, value, deleteExisting, roundValue) => {
      if (value) {
        if (roundValue) {
          value = roundIfNumeric(value);
        }
        url.searchParams.set(key2, value.toString());
      } else if (deleteExisting) {
        url.searchParams.delete(key2);
      }
    };
    setParamIfUndefined = (url, key2, value) => {
      if (!url.searchParams.has(key2)) {
        url.searchParams.set(key2, value.toString());
      }
    };
    getNumericParam = (url, key2) => {
      const value = Number(url.searchParams.get(key2));
      return isNaN(value) ? void 0 : value;
    };
    toRelativeUrl = (url) => {
      const { pathname, search } = url;
      return `${pathname}${search}`;
    };
    toUrl = (url, base2) => {
      return typeof url === "string" ? new URL(url, base2 ?? "http://n/") : url;
    };
    cdnDomains = new Map(Object.entries(domains));
    cdnSubdomains = Object.entries(subdomains);
    transform$g = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "w", width, true, true);
      setParamIfDefined(url, "h", height, true, true);
      setParamIfDefined(url, "fm", format);
      setParamIfUndefined(url, "fit", "fill");
      return url;
    };
    transform$f = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "width", width, true, true);
      setParamIfDefined(url, "height", height, true, true);
      setParamIfDefined(url, "format", format);
      if (width && height) {
        setParamIfUndefined(url, "fit", "cover");
        setParamIfUndefined(url, "sharp", "true");
      }
      return url;
    };
    transform$e = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "w", width, true, true);
      setParamIfDefined(url, "h", height, true, true);
      setParamIfUndefined(url, "fit", "min");
      if (format) {
        url.searchParams.set("fm", format);
        const fm = url.searchParams.get("auto");
        if (fm === "format") {
          url.searchParams.delete("auto");
        } else if (fm?.includes("format")) {
          url.searchParams.set("auto", fm.split(",").filter((s2) => s2 !== "format").join(","));
        }
      } else {
        url.searchParams.delete("fm");
        if (!url.searchParams.get("auto")?.includes("format")) {
          url.searchParams.append("auto", "format");
        }
      }
      return url;
    };
    shopifyRegex = /(.+?)(?:_(?:(pico|icon|thumb|small|compact|medium|large|grande|original|master)|(\d*)x(\d*)))?(?:_crop_([a-z]+))?(\.[a-zA-Z]+)(\.png|\.jpg|\.webp|\.avif)?$/;
    parse$3 = (imageUrl) => {
      const url = toUrl(imageUrl);
      const match = url.pathname.match(shopifyRegex);
      if (!match) {
        throw new Error("Invalid Shopify URL");
      }
      const [, path, size, width, height, crop, extension, format] = match;
      url.pathname = `${path}${extension}`;
      const widthString = width ? width : url.searchParams.get("width");
      const heightString = height ? height : url.searchParams.get("height");
      url.searchParams.delete("width");
      url.searchParams.delete("height");
      return {
        base: url.toString(),
        width: Number(widthString) || void 0,
        height: Number(heightString) || void 0,
        format: format ? format.slice(1) : void 0,
        params: { crop, size },
        cdn: "shopify"
      };
    };
    generate$4 = ({ base: base2, width, height, format, params }) => {
      const url = toUrl(base2);
      setParamIfDefined(url, "width", width, true, true);
      setParamIfDefined(url, "height", height, true, true);
      setParamIfDefined(url, "crop", params?.crop);
      setParamIfDefined(url, "format", format);
      return url;
    };
    transform$d = ({ url: originalUrl, width, height }) => {
      const parsed = parse$3(originalUrl);
      if (!parsed) {
        return;
      }
      const props15 = {
        ...parsed,
        width,
        height
      };
      return generate$4(props15);
    };
    transform$c = ({ url: originalUrl, width, height }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "w", width, true, true);
      setParamIfDefined(url, "h", height, true, true);
      setParamIfUndefined(url, "crop", "1");
      return url;
    };
    cloudinaryRegex = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<idAndFormat>[^\s]+)$/g;
    parseTransforms$1 = (transformations) => {
      return transformations ? Object.fromEntries(transformations.split(",").map((t) => t.split("_"))) : {};
    };
    formatUrl$1 = ({ host, cloudName, assetType, deliveryType, signature, transformations = {}, version: version2, id, format }) => {
      if (format) {
        transformations.f = format;
      }
      const transformString = Object.entries(transformations).map(([key2, value]) => `${key2}_${value}`).join(",");
      const pathSegments = [
        host,
        cloudName,
        assetType,
        deliveryType,
        signature,
        transformString,
        version2,
        id
      ].filter(Boolean).join("/");
      return `https://${pathSegments}`;
    };
    parse$2 = (imageUrl) => {
      const url = toUrl(imageUrl);
      const matches = [...url.toString().matchAll(cloudinaryRegex)];
      if (!matches.length) {
        throw new Error("Invalid Cloudinary URL");
      }
      const group = matches[0].groups || {};
      const { transformations: transformString = "", idAndFormat, ...baseParams } = group;
      delete group.idAndFormat;
      const lastDotIndex = idAndFormat.lastIndexOf(".");
      const id = lastDotIndex < 0 ? idAndFormat : idAndFormat.slice(0, lastDotIndex);
      const originalFormat = lastDotIndex < 0 ? void 0 : idAndFormat.slice(lastDotIndex + 1);
      const { w, h, f, ...transformations } = parseTransforms$1(transformString);
      const format = f && f !== "auto" ? f : originalFormat;
      const base2 = formatUrl$1({ ...baseParams, id, transformations });
      return {
        base: base2,
        width: Number(w) || void 0,
        height: Number(h) || void 0,
        format,
        cdn: "cloudinary",
        params: {
          ...group,
          id: group.deliveryType === "fetch" ? idAndFormat : id,
          format,
          transformations
        }
      };
    };
    generate$3 = ({ base: base2, width, height, format, params }) => {
      var _a;
      const parsed = parse$2(base2.toString());
      const props15 = {
        transformations: {},
        ...parsed.params,
        ...params,
        format: format || "auto"
      };
      if (width) {
        props15.transformations.w = roundIfNumeric(width).toString();
      }
      if (height) {
        props15.transformations.h = roundIfNumeric(height).toString();
      }
      (_a = props15.transformations).c || (_a.c = "lfill");
      return formatUrl$1(props15);
    };
    transform$b = ({ url: originalUrl, width, height, format = "auto" }) => {
      const parsed = parse$2(originalUrl);
      if (!parsed) {
        throw new Error("Invalid Cloudinary URL");
      }
      if (parsed.params?.assetType !== "image") {
        throw new Error("Cloudinary transformer only supports images");
      }
      if (parsed.params?.signature) {
        throw new Error("Cloudinary transformer does not support signed URLs");
      }
      const props15 = {
        ...parsed,
        width,
        height,
        format
      };
      return generate$3(props15);
    };
    cloudflareRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/image\/(?<transformations>[^\/]+)\/(?<path>.*)$/g;
    parseTransforms = (transformations) => Object.fromEntries(transformations.split(",").map((t) => t.split("=")));
    formatUrl = ({ host, transformations = {}, path }) => {
      const transformString = Object.entries(transformations).map(([key2, value]) => `${key2}=${value}`).join(",");
      const pathSegments = [
        host,
        "cdn-cgi",
        "image",
        transformString,
        path
      ].join("/");
      return `https://${pathSegments}`;
    };
    parse$1 = (imageUrl) => {
      const url = toUrl(imageUrl);
      const matches = [...url.toString().matchAll(cloudflareRegex)];
      if (!matches.length) {
        throw new Error("Invalid Cloudflare URL");
      }
      const group = matches[0].groups || {};
      const { transformations: transformString, ...baseParams } = group;
      const { width, height, f, ...transformations } = parseTransforms(transformString);
      formatUrl({ ...baseParams, transformations });
      return {
        base: url.toString(),
        width: Number(width) || void 0,
        height: Number(height) || void 0,
        format: f,
        cdn: "cloudflare",
        params: { ...group, transformations }
      };
    };
    generate$2 = ({ base: base2, width, height, format, params }) => {
      var _a;
      const parsed = parse$1(base2.toString());
      const props15 = {
        transformations: {},
        ...parsed.params,
        ...params
      };
      if (width) {
        props15.transformations.width = width?.toString();
      }
      if (height) {
        props15.transformations.height = height?.toString();
      }
      if (format) {
        props15.transformations.f = format;
      }
      (_a = props15.transformations).fit || (_a.fit = "cover");
      return new URL(formatUrl(props15));
    };
    transform$a = ({ url: originalUrl, width, height, format = "auto" }) => {
      const parsed = parse$1(originalUrl);
      if (!parsed) {
        throw new Error("Invalid Cloudflare URL");
      }
      const props15 = {
        ...parsed,
        width,
        height,
        format
      };
      return generate$2(props15);
    };
    transform$9 = ({ url: originalUrl, width, height }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "width", width, true, true);
      if (width && height) {
        setParamIfUndefined(url, "aspect_ratio", `${width}:${height}`);
      }
      return url;
    };
    storyBlokAssets = /(?<id>\/f\/\d+\/\d+x\d+\/\w+\/[^\/]+)\/?(?<modifiers>m\/?(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?)?$/g;
    storyBlokImg2 = /^(?<modifiers>\/(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?\/?)?(?<id>\/f\/.+)$/g;
    splitFilters = (filters) => {
      if (!filters) {
        return {};
      }
      return Object.fromEntries(filters.split(":").map((filter) => {
        if (!filter)
          return [];
        const [key2, value] = filter.split("(");
        return [key2, value.replace(")", "")];
      }));
    };
    generateFilters = (filters) => {
      if (!filters) {
        return void 0;
      }
      const filterItems = Object.entries(filters).map(([key2, value]) => `${key2}(${value ?? ""})`);
      if (filterItems.length === 0) {
        return void 0;
      }
      return `filters:${filterItems.join(":")}`;
    };
    parse3 = (imageUrl) => {
      const url = toUrl(imageUrl);
      const regex = url.hostname === "img2.storyblok.com" ? storyBlokImg2 : storyBlokAssets;
      const [matches] = url.pathname.matchAll(regex);
      if (!matches || !matches.groups) {
        throw new Error("Invalid Storyblok URL");
      }
      const { id, crop, width, height, filters, flipx, flipy } = matches.groups;
      const { format, ...filterMap } = splitFilters(filters);
      if (url.hostname === "img2.storyblok.com") {
        url.hostname = "a.storyblok.com";
      }
      return {
        base: url.origin + id,
        width: Number(width) || void 0,
        height: Number(height) || void 0,
        format,
        params: {
          crop,
          filters: filterMap,
          flipx,
          flipy
        },
        cdn: "storyblok"
      };
    };
    generate$1 = ({ base: base2, width = 0, height = 0, format, params = {} }) => {
      const { crop, filters, flipx = "", flipy = "" } = params;
      const size = `${flipx}${width}x${flipy}${height}`;
      return new URL([base2, "m", crop, size, generateFilters(filters), format].filter(Boolean).join("/"));
    };
    transform$8 = ({ url: originalUrl, width, height, format }) => {
      const parsed = parse3(originalUrl);
      if (!parsed) {
        return;
      }
      if (format) {
        if (!parsed.params) {
          parsed.params = { filters: {} };
        }
        if (!parsed.params.filters) {
          parsed.params.filters = {};
        }
        parsed.params.filters.format = format;
      }
      return generate$1({
        ...parsed,
        width,
        height
      });
    };
    transform$7 = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "w", width, true, true);
      setParamIfDefined(url, "h", height, true, true);
      setParamIfDefined(url, "fm", format, true);
      if (width && height) {
        setParamIfUndefined(url, "fit", "crop");
      }
      return url;
    };
    delegateUrl = (url) => {
      const parsed = toUrl(url);
      const source = parsed.searchParams.get("url");
      if (!source || !source.startsWith("http")) {
        return false;
      }
      const cdn = getImageCdnForUrlByDomain(source);
      if (!cdn) {
        return false;
      }
      return {
        cdn,
        url: source
      };
    };
    generate = ({ base: base2, width, params: { quality = 75, root = "_vercel" } = {} }) => {
      const url = new URL("http://n");
      url.pathname = `/${root}/image`;
      url.searchParams.set("url", base2.toString());
      setParamIfDefined(url, "w", width, false, true);
      setParamIfUndefined(url, "q", quality);
      return toRelativeUrl(url);
    };
    transform$6 = ({ url, width, cdn }) => {
      const parsedUrl = toUrl(url);
      const isNextImage = parsedUrl.pathname.startsWith("/_next/image") || parsedUrl.pathname.startsWith("/_vercel/image");
      const src = isNextImage ? parsedUrl.searchParams.get("url") : url.toString();
      if (!src) {
        return void 0;
      }
      setParamIfDefined(parsedUrl, "w", width, true, true);
      if (isNextImage) {
        if (parsedUrl.hostname === "n") {
          return toRelativeUrl(parsedUrl);
        }
        return parsedUrl.toString();
      }
      return generate({
        base: src,
        width,
        params: { root: cdn === "nextjs" ? "_next" : "_vercel" }
      });
    };
    transform$5 = (params) => transform$6({ ...params, cdn: "nextjs" });
    transform$4 = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "wid", width, true, true);
      setParamIfDefined(url, "hei", height, true, true);
      setParamIfDefined(url, "fmt", format, true);
      setParamIfDefined(url, "qlt", getNumericParam(url, "qlt"), true);
      setParamIfDefined(url, "scl", getNumericParam(url, "scl"), true);
      setParamIfUndefined(url, "fit", "crop");
      if (!width && !height) {
        setParamIfUndefined(url, "scl", 1);
      }
      return url;
    };
    transform$3 = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "width", width, true, true);
      setParamIfDefined(url, "height", height, true, true);
      setParamIfDefined(url, "format", format, true);
      setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
      setParamIfUndefined(url, "enlarge", 0);
      return url;
    };
    transform$2 = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "width", width, true, true);
      setParamIfDefined(url, "height", height, true, true);
      setParamIfDefined(url, "format", format);
      setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
      return url;
    };
    OBJECT_TO_DIRECTIVES_MAP = {
      width: "w",
      height: "h",
      autoWidthWithFallback: "w_auto",
      auto_width_fallback: "w_auto",
      scaleToScreenWidth: "pc",
      scale_to_screen_width: "pc",
      crop: "cr",
      outputFormat: "f",
      format: "f",
      fit: "m",
      fitMethod: "m",
      compression: "cmpr",
      sharpness: "s",
      rotate: "r",
      inline: "in",
      keepMeta: "meta",
      keep_meta: "meta",
      noOptimization: "pass",
      no_optimization: "pass",
      force_download: "dl",
      max_device_pixel_ratio: "maxdpr",
      maxDevicePixelRatio: "maxdpr"
    };
    transform$1 = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      const src = getBaseUrl(url);
      let directives = {};
      const param = url.toString() === src ? [] : getParameterArray(url);
      if (param.length) {
        directives = getDirectives(param);
      }
      if (width)
        directives["width"] = width;
      if (height)
        directives["height"] = height;
      if (format)
        directives["format"] = format;
      if (!directives.hasOwnProperty("fit")) {
        directives = { ...directives, "fit": "cropbox" };
      }
      let directives_string = build_IE_directives(directives);
      let query_string = build_IE_query_string(directives_string);
      let query_prefix = query_string === "" ? "" : src.includes("?") ? "&" : "?";
      return `${src}${query_prefix}${query_string}`;
    };
    transform = ({ url: originalUrl, width, height, format }) => {
      const url = toUrl(originalUrl);
      setParamIfDefined(url, "width", width, true, true);
      setParamIfDefined(url, "height", height, true, true);
      setParamIfDefined(url, "format", format);
      if (!url.searchParams.has("format")) {
        setParamIfUndefined(url, "auto", "webp");
      }
      if (width && height) {
        setParamIfUndefined(url, "fit", "crop");
      }
      return url;
    };
    delegators = {
      vercel: delegateUrl,
      nextjs: delegateUrl
    };
    getTransformer = (cdn) => ({
      imgix: transform$e,
      contentful: transform$g,
      "builder.io": transform$f,
      shopify: transform$d,
      wordpress: transform$c,
      cloudinary: transform$b,
      bunny: transform$9,
      storyblok: transform$8,
      cloudflare: transform$a,
      vercel: transform$6,
      nextjs: transform$5,
      scene7: transform$4,
      "kontent.ai": transform$7,
      keycdn: transform$3,
      directus: transform$2,
      imageengine: transform$1,
      contentstack: transform
    })[cdn];
    getSizes = (width, layout) => {
      if (!width || !layout) {
        return void 0;
      }
      switch (layout) {
        case `constrained`:
          return `(min-width: ${width}px) ${width}px, 100vw`;
        case `fixed`:
          return `${width}px`;
        case `fullWidth`:
          return `100vw`;
        default:
          return void 0;
      }
    };
    pixelate = (value) => value || value === 0 ? `${value}px` : void 0;
    getStyle = ({
      width,
      height,
      aspectRatio,
      layout,
      objectFit = "cover",
      background
    }) => {
      const styleEntries = [
        ["object-fit", objectFit]
      ];
      if (background?.startsWith("https:") || background?.startsWith("http:") || background?.startsWith("data:")) {
        styleEntries.push(["background-image", `url(${background})`]);
        styleEntries.push(["background-size", "cover"]);
        styleEntries.push(["background-repeat", "no-repeat"]);
      } else {
        styleEntries.push(["background", background]);
      }
      if (layout === "fixed") {
        styleEntries.push(["width", pixelate(width)]);
        styleEntries.push(["height", pixelate(height)]);
      }
      if (layout === "constrained") {
        styleEntries.push(["max-width", pixelate(width)]);
        styleEntries.push(["max-height", pixelate(height)]);
        styleEntries.push([
          "aspect-ratio",
          aspectRatio ? `${aspectRatio}` : void 0
        ]);
        styleEntries.push(["width", "100%"]);
      }
      if (layout === "fullWidth") {
        styleEntries.push(["width", "100%"]);
        styleEntries.push([
          "aspect-ratio",
          aspectRatio ? `${aspectRatio}` : void 0
        ]);
        styleEntries.push(["height", pixelate(height)]);
      }
      return Object.fromEntries(
        styleEntries.filter(([, value]) => value)
      );
    };
    DEFAULT_RESOLUTIONS = [
      6016,
      // 6K
      5120,
      // 5K
      4480,
      // 4.5K
      3840,
      // 4K
      3200,
      // QHD+
      2560,
      // WQXGA
      2048,
      // QXGA
      1920,
      // 1080p
      1668,
      // Various iPads
      1280,
      // 720p
      1080,
      // iPhone 6-8 Plus
      960,
      // older horizontal phones
      828,
      // iPhone XR/11
      750,
      // iPhone 6-8
      640
      // older and lower-end phones
    ];
    LOW_RES_WIDTH = 24;
    getBreakpoints = ({
      width,
      layout
    }) => {
      if (layout === "fullWidth") {
        return DEFAULT_RESOLUTIONS;
      }
      if (!width) {
        return [];
      }
      const doubleWidth = width * 2;
      if (layout === "fixed") {
        return [width, doubleWidth];
      }
      if (layout === "constrained") {
        return [
          // Always include the image at 1x and 2x the specified width
          width,
          doubleWidth,
          // Filter out any resolutions that are larger than the double-res image
          ...DEFAULT_RESOLUTIONS.filter((w) => w < doubleWidth)
        ];
      }
      return [];
    };
    getSrcSet = ({
      src,
      width,
      layout = "constrained",
      height,
      aspectRatio,
      breakpoints,
      cdn,
      transformer
    }) => {
      const canonical = getCanonicalCdnForUrl(src, cdn);
      if (!canonical) {
        return;
      }
      transformer || (transformer = getTransformer(canonical.cdn));
      if (!transformer) {
        return;
      }
      breakpoints || (breakpoints = getBreakpoints({ width, layout }));
      return breakpoints.sort((a, b) => a - b).map((bp) => {
        let transformedHeight;
        if (height && aspectRatio) {
          transformedHeight = Math.round(bp / aspectRatio);
        }
        const transformed = transformer({
          url: canonical.url,
          width: bp,
          height: transformedHeight
        });
        if (transformed) {
          return `${transformed.toString()} ${bp}w`;
        }
        return "";
      }).join(",\n");
    };
    dist = { exports: {} };
    objToString = {};
    parsers = {};
    createParser = {};
    (function(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2["default"] = void 0;
      function createParser2(matcher, replacer) {
        const regex = RegExp(matcher, "g");
        return (string) => {
          if (typeof string !== "string") {
            throw new TypeError("expected an argument of type string, but got ".concat(typeof styleObj));
          }
          if (!string.match(regex)) {
            return string;
          }
          return string.replace(regex, replacer);
        };
      }
      var _default = createParser2;
      exports2["default"] = _default;
    })(createParser);
    Object.defineProperty(parsers, "__esModule", {
      value: true
    });
    parsers.snakeToKebab = parsers.camelToKebab = void 0;
    _createParser = _interopRequireDefault(createParser);
    camelToKebab = (0, _createParser["default"])(/[A-Z]/, (match) => "-".concat(match.toLowerCase()));
    parsers.camelToKebab = camelToKebab;
    snakeToKebab = (0, _createParser["default"])(/_/, () => "-");
    parsers.snakeToKebab = snakeToKebab;
    (function(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2["default"] = void 0;
      var _parsers = parsers;
      function objToString2(styleObj2, parser = _parsers.camelToKebab) {
        if (!styleObj2 || typeof styleObj2 !== "object" || Array.isArray(styleObj2)) {
          throw new TypeError("expected an argument of type object, but got ".concat(typeof styleObj2));
        }
        const lines = Object.keys(styleObj2).map((property) => "".concat(parser(property), ": ").concat(styleObj2[property], ";"));
        return lines.join("\n");
      }
      var _default = objToString2;
      exports2["default"] = _default;
    })(objToString);
    (function(module2, exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      Object.defineProperty(exports2, "createParser", {
        enumerable: true,
        get: function get() {
          return _createParser2["default"];
        }
      });
      exports2.parsers = exports2["default"] = void 0;
      var _objToString = _interopRequireDefault2(objToString);
      var _createParser2 = _interopRequireDefault2(createParser);
      var parsers$1 = _interopRequireWildcard(parsers);
      exports2.parsers = parsers$1;
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key2 in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key2)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key2) : {};
                if (desc.get || desc.set) {
                  Object.defineProperty(newObj, key2, desc);
                } else {
                  newObj[key2] = obj[key2];
                }
              }
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      }
      function _interopRequireDefault2(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys = Object.keys(source);
          if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }
          ownKeys.forEach(function(key2) {
            _defineProperty(target, key2, source[key2]);
          });
        }
        return target;
      }
      function _defineProperty(obj, key2, value) {
        if (key2 in obj) {
          Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key2] = value;
        }
        return obj;
      }
      var _default = _objToString["default"];
      exports2["default"] = _default;
      module2.exports = _objToString["default"];
      module2.exports.createParser = _createParser2["default"];
      module2.exports.parsers = _objectSpread({}, parsers$1);
    })(dist, dist.exports);
    distExports = dist.exports;
    styleToCss = /* @__PURE__ */ getDefaultExportFromCjs(distExports);
    Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let parentStyle;
      let props15;
      let alt;
      let styleObj2;
      let transformedProps;
      let style;
      ({ style: parentStyle, ...props15 } = $$props);
      ({ alt, style: styleObj2, ...transformedProps } = transformProps({ ...props15, style: {} }));
      style = [styleToCss(styleObj2), parentStyle].filter(Boolean).join(";");
      return `<img${spread(
        [
          { alt: escape_attribute_value(alt) },
          { style: escape_attribute_value(style) },
          escape_object(transformedProps)
        ],
        {}
      )}>`;
    });
    name = "svelte";
    version$1 = "4.1.1";
    description = "Cybernetically enhanced web apps";
    type = "module";
    module = "src/runtime/index.js";
    main = "src/runtime/index.js";
    files = [
      "src",
      "!src/**/tsconfig.json",
      "types",
      "compiler.*",
      "register.js",
      "index.d.ts",
      "store.d.ts",
      "animate.d.ts",
      "transition.d.ts",
      "easing.d.ts",
      "motion.d.ts",
      "action.d.ts",
      "elements.d.ts",
      "README.md"
    ];
    exports = {
      "./package.json": "./package.json",
      ".": {
        types: "./types/index.d.ts",
        browser: {
          "default": "./src/runtime/index.js"
        },
        "default": "./src/runtime/ssr.js"
      },
      "./compiler": {
        types: "./types/index.d.ts",
        require: "./compiler.cjs",
        "default": "./src/compiler/index.js"
      },
      "./action": {
        types: "./types/index.d.ts"
      },
      "./animate": {
        types: "./types/index.d.ts",
        "default": "./src/runtime/animate/index.js"
      },
      "./easing": {
        types: "./types/index.d.ts",
        "default": "./src/runtime/easing/index.js"
      },
      "./internal": {
        "default": "./src/runtime/internal/index.js"
      },
      "./motion": {
        types: "./types/index.d.ts",
        "default": "./src/runtime/motion/index.js"
      },
      "./store": {
        types: "./types/index.d.ts",
        "default": "./src/runtime/store/index.js"
      },
      "./internal/disclose-version": {
        "default": "./src/runtime/internal/disclose-version/index.js"
      },
      "./transition": {
        types: "./types/index.d.ts",
        "default": "./src/runtime/transition/index.js"
      },
      "./elements": {
        types: "./elements.d.ts"
      }
    };
    engines = {
      node: ">=16"
    };
    types = "types/index.d.ts";
    repository = {
      type: "git",
      url: "https://github.com/sveltejs/svelte.git",
      directory: "packages/svelte"
    };
    keywords = [
      "UI",
      "framework",
      "templates",
      "templating"
    ];
    author = "Rich Harris";
    license = "MIT";
    bugs = {
      url: "https://github.com/sveltejs/svelte/issues"
    };
    homepage = "https://svelte.dev";
    dependencies = {
      "@ampproject/remapping": "^2.2.1",
      "@jridgewell/sourcemap-codec": "^1.4.15",
      "@jridgewell/trace-mapping": "^0.3.18",
      acorn: "^8.9.0",
      "aria-query": "^5.3.0",
      "axobject-query": "^3.2.1",
      "code-red": "^1.0.3",
      "css-tree": "^2.3.1",
      "estree-walker": "^3.0.3",
      "is-reference": "^3.0.1",
      "locate-character": "^3.0.0",
      "magic-string": "^0.30.0",
      periscopic: "^3.1.0"
    };
    devDependencies = {
      "@playwright/test": "^1.35.1",
      "@rollup/plugin-commonjs": "^24.1.0",
      "@rollup/plugin-json": "^6.0.0",
      "@rollup/plugin-node-resolve": "^15.1.0",
      "@sveltejs/eslint-config": "^6.0.4",
      "@types/aria-query": "^5.0.1",
      "@types/estree": "^1.0.1",
      "@types/node": "^14.18.51",
      agadoo: "^3.0.0",
      "dts-buddy": "^0.1.7",
      esbuild: "^0.18.11",
      "happy-dom": "^9.20.3",
      jsdom: "^21.1.2",
      kleur: "^4.1.5",
      rollup: "^3.26.2",
      "source-map": "^0.7.4",
      "tiny-glob": "^0.2.9",
      typescript: "^5.1.3",
      vitest: "^0.33.0"
    };
    scripts = {
      format: "prettier . --cache --plugin-search-dir=. --write",
      check: "tsc --noEmit",
      test: 'vitest run && echo "manually check that there are no type errors in test/types by opening the files in there"',
      build: "rollup -c && pnpm types",
      "generate:version": "node ./scripts/generate-version.js",
      dev: "rollup -cw",
      posttest: "agadoo src/internal/index.js",
      types: "node ./scripts/generate-dts.js",
      lint: 'prettier . --cache --plugin-search-dir=. --check && eslint "{src,test}/**/*.{ts,js}" --cache'
    };
    sveltePkg = {
      name,
      version: version$1,
      description,
      type,
      module,
      main,
      files,
      exports,
      engines,
      types,
      repository,
      keywords,
      author,
      license,
      bugs,
      homepage,
      dependencies,
      devDependencies,
      scripts
    };
    version = "1.0.3";
    metadata = {
      version
    };
    SVELTE_CLOUDINARY_ANALYTICS_ID = "E";
    SVELTE_CLOUDINARY_VERSION = metadata.version.split("-")[0];
    SVELTE_VERSION = `${sveltePkg.version.split(".")[0]}.0.0`;
    ({ Object: Object_1 } = globals);
    CldImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let alt;
      let src;
      let width;
      let height;
      let config;
      let imageProps;
      const CLD_OPTIONS = ["config", "deliveryType", "preserveTransformations"];
      transformationPlugins.forEach(({ props: props15 = [] }) => {
        props15.forEach((prop) => {
          if (CLD_OPTIONS.includes(prop)) {
            throw new Error(`Option ${prop} already exists!`);
          }
          CLD_OPTIONS.push(prop);
        });
      });
      const cldOptions = {};
      CLD_OPTIONS.forEach((key2) => {
        if ($$props[key2]) {
          cldOptions[key2] = $$props[key2] || void 0;
        }
      });
      if ($$props.preserveTransformations) {
        try {
          const transformations = getTransformations(imageProps.src).map((t) => t.join(","));
          cldOptions.rawTransformations = [...transformations.flat(), ...$$props.rawTransformations || []];
        } catch (e) {
          console.warn(`Failed to preserve transformations: ${e.message}`);
        }
      }
      ({ alt, src, width, height, config } = $$props);
      imageProps = {
        alt,
        src,
        width: typeof width === "string" ? parseInt(width) : width,
        height: typeof height === "string" ? parseInt(height) : height
      };
      {
        if (imageProps) {
          Object.keys($$props).filter((key2) => !CLD_OPTIONS.includes(key2)).forEach((key2) => {
            imageProps[key2] = $$props[key2];
          });
        }
      }
      return `${imageProps.src ? `${validate_component(Image, "Image").$$render(
        $$result,
        Object_1.assign({}, imageProps, { cdn: "cloudinary" }, {
          transformer: ({ width: width2 }) => {
            const options2 = {
              ...imageProps,
              ...cldOptions,
              // Without, get a "never" type error on options.width
              width: imageProps.width
            };
            options2.width = typeof options2.width === "string" ? parseInt(options2.width) : options2.width;
            options2.height = typeof options2.height === "string" ? parseInt(options2.height) : options2.height;
            if (typeof width2 === "number" && typeof options2.width === "number" && width2 !== options2.width) {
              options2.widthResize = width2;
            }
            return getCldImageUrl(options2, config);
          }
        }),
        {},
        {}
      )}` : ``}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
var ButtonGroup, Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, Navbar, NavBrand, Menu, NavHamburger, NavLi, NavUl, MAX_PAGE_WIDTH, OVERFLOW_ANIMATION_TIME, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_stores();
    init_Indicator_svelte_svelte_type_style_lang();
    init_tailwind_merge();
    init_Modal();
    init_CloseButton();
    init_CldImage();
    ButtonGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "divClass"]);
      let { size = "md" } = $$props;
      let { divClass = "inline-flex rounded-lg shadow-sm" } = $$props;
      setContext("group", { size });
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
        $$bindings.divClass(divClass);
      return `<div${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge(divClass, $$props.class))
          },
          { role: "group" }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</div> `;
    });
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["footerType"]);
      let { footerType = "default" } = $$props;
      let footerClass = twMerge(footerType === "sitemap" && "bg-gray-800", footerType === "socialmedia" && "p-4 bg-white sm:p-6 dark:bg-gray-800", footerType === "logo" && "p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800", footerType === "default" && "p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800", $$props.class);
      if ($$props.footerType === void 0 && $$bindings.footerType && footerType !== void 0)
        $$bindings.footerType(footerType);
      return `<footer${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(footerClass)
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</footer> `;
    });
    FooterBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["aClass", "spanClass", "imgClass", "href", "src", "alt", "name", "target"]);
      let { aClass = "flex items-center" } = $$props;
      let { spanClass = "self-center text-2xl font-semibold whitespace-nowrap dark:text-white" } = $$props;
      let { imgClass = "mr-3 h-8" } = $$props;
      let { href = "" } = $$props;
      let { src = "" } = $$props;
      let { alt = "" } = $$props;
      let { name: name2 = "" } = $$props;
      let { target = void 0 } = $$props;
      let aCls = twMerge(aClass, $$props.classA);
      let spanCls = twMerge(spanClass, $$props.classSpan);
      let imgCls = twMerge(imgClass, $$props.classImg);
      if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0)
        $$bindings.aClass(aClass);
      if ($$props.spanClass === void 0 && $$bindings.spanClass && spanClass !== void 0)
        $$bindings.spanClass(spanClass);
      if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
        $$bindings.imgClass(imgClass);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
        $$bindings.alt(alt);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
        $$bindings.name(name2);
      if ($$props.target === void 0 && $$bindings.target && target !== void 0)
        $$bindings.target(target);
      return `${href ? `<a${spread(
        [
          escape_object($$restProps),
          { href: escape_attribute_value(href) },
          { target: escape_attribute_value(target) },
          { class: escape_attribute_value(aCls) }
        ],
        {}
      )}><img${add_attribute("src", src, 0)}${add_attribute("class", imgCls, 0)}${add_attribute("alt", alt, 0)}> <span${add_attribute("class", spanCls, 0)}>${escape(name2)}</span> ${slots.default ? slots.default({}) : ``}</a>` : `<img${spread(
        [
          escape_object($$restProps),
          { src: escape_attribute_value(src) },
          { class: escape_attribute_value(imgCls) },
          { alt: escape_attribute_value(alt) }
        ],
        {}
      )}>`} `;
    });
    FooterCopyright = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["spanClass", "aClass", "year", "href", "by", "target", "copyrightMessage"]);
      let { spanClass = "block text-sm text-gray-500 sm:text-center dark:text-gray-400" } = $$props;
      let { aClass = "hover:underline" } = $$props;
      let { year = (/* @__PURE__ */ new Date()).getFullYear() } = $$props;
      let { href = "" } = $$props;
      let { by = "" } = $$props;
      let { target = void 0 } = $$props;
      let { copyrightMessage = "All Rights Reserved." } = $$props;
      let spanCls = twMerge(spanClass, $$props.classSpan);
      let aCls = twMerge(aClass, $$props.classA);
      if ($$props.spanClass === void 0 && $$bindings.spanClass && spanClass !== void 0)
        $$bindings.spanClass(spanClass);
      if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0)
        $$bindings.aClass(aClass);
      if ($$props.year === void 0 && $$bindings.year && year !== void 0)
        $$bindings.year(year);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.by === void 0 && $$bindings.by && by !== void 0)
        $$bindings.by(by);
      if ($$props.target === void 0 && $$bindings.target && target !== void 0)
        $$bindings.target(target);
      if ($$props.copyrightMessage === void 0 && $$bindings.copyrightMessage && copyrightMessage !== void 0)
        $$bindings.copyrightMessage(copyrightMessage);
      return `<span${add_attribute("class", spanCls, 0)}>\xA9 ${escape(year)} ${href ? `<a${spread(
        [
          escape_object($$restProps),
          { href: escape_attribute_value(href) },
          { target: escape_attribute_value(target) },
          { class: escape_attribute_value(aCls) }
        ],
        {}
      )}>${escape(by)}</a>` : `<span class="ml-1">${escape(by)}</span>`} ${escape(copyrightMessage)}</span> `;
    });
    FooterIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "ariaLabel", "aClass", "target"]);
      let { href = "" } = $$props;
      let { ariaLabel = "" } = $$props;
      let { aClass = "text-gray-500 hover:text-gray-900 dark:hover:text-white" } = $$props;
      let { target = void 0 } = $$props;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0)
        $$bindings.aClass(aClass);
      if ($$props.target === void 0 && $$bindings.target && target !== void 0)
        $$bindings.target(target);
      return `${href ? `<a${spread(
        [
          escape_object($$restProps),
          { href: escape_attribute_value(href) },
          { target: escape_attribute_value(target) },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          {
            class: escape_attribute_value(twMerge(aClass, $$props.class))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a>` : `${slots.default ? slots.default({}) : ``}`} `;
    });
    FooterLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["liClass", "aClass", "href", "target"]);
      let { liClass = "mr-4 last:mr-0 md:mr-6" } = $$props;
      let { aClass = "hover:underline" } = $$props;
      let { href = "" } = $$props;
      let { target = void 0 } = $$props;
      let liCls = twMerge(liClass, $$props.classLi);
      let aCls = twMerge(aClass, $$props.classA);
      if ($$props.liClass === void 0 && $$bindings.liClass && liClass !== void 0)
        $$bindings.liClass(liClass);
      if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0)
        $$bindings.aClass(aClass);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.target === void 0 && $$bindings.target && target !== void 0)
        $$bindings.target(target);
      return `<li${add_attribute("class", liCls, 0)}><a${spread(
        [
          escape_object($$restProps),
          { href: escape_attribute_value(href) },
          { class: escape_attribute_value(aCls) },
          { target: escape_attribute_value(target) }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a></li> `;
    });
    FooterLinkGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { ulClass = "text-gray-600 dark:text-gray-400" } = $$props;
      if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0)
        $$bindings.ulClass(ulClass);
      return `<ul${add_attribute("class", twMerge(ulClass, $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</ul> `;
    });
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["navClass", "navDivClass", "fluid"]);
      let { navClass = "px-2 sm:px-4 py-2.5 w-full" } = $$props;
      let { navDivClass = "mx-auto flex flex-wrap justify-between items-center " } = $$props;
      let { fluid = false } = $$props;
      let hidden = true;
      let toggle = () => {
        hidden = !hidden;
      };
      if ($$props.navClass === void 0 && $$bindings.navClass && navClass !== void 0)
        $$bindings.navClass(navClass);
      if ($$props.navDivClass === void 0 && $$bindings.navDivClass && navDivClass !== void 0)
        $$bindings.navDivClass(navDivClass);
      if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0)
        $$bindings.fluid(fluid);
      {
        {
          $$restProps.color = $$restProps.color ?? "navbar";
        }
      }
      return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { tag: "nav" }, $$restProps, { class: twMerge(navClass, $$props.class) }), {}, {
        default: () => {
          return `<div${add_attribute("class", twMerge(navDivClass, $$props.classNavDiv, fluid && "w-full" || "container"), 0)}>${slots.default ? slots.default({ hidden, toggle }) : ``}</div>`;
        }
      })} `;
    });
    NavBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href"]);
      let { href = "" } = $$props;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      return `<a${spread(
        [
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("flex items-center", $$props.class))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a> `;
    });
    Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
      let { size = "24" } = $$props;
      let { color = "currentColor" } = $$props;
      let { variation = "outline" } = $$props;
      let { ariaLabel = "bars 3" } = $$props;
      let viewBox;
      let svgpath;
      let svgoutline = `<path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
      let svgsolid = `<path fill="${color}" clip-rule="evenodd" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path> `;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0)
        $$bindings.variation(variation);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      {
        switch (variation) {
          case "outline":
            svgpath = svgoutline;
            viewBox = "0 0 24 24";
            break;
          case "solid":
            svgpath = svgsolid;
            viewBox = "0 0 24 24";
            break;
          default:
            svgpath = svgoutline;
            viewBox = "0 0 24 24";
        }
      }
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { role: "button" },
          { tabindex: "0" },
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          {
            class: escape_attribute_value($$props.class)
          },
          escape_object($$restProps),
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          { fill: "none" },
          { viewBox: escape_attribute_value(viewBox) },
          { "stroke-width": "2" }
        ],
        {}
      )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg> `;
    });
    NavHamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["btnClass", "menuClass"]);
      let { btnClass = "ml-3 md:hidden" } = $$props;
      let { menuClass = "h-6 w-6 shrink-0" } = $$props;
      if ($$props.btnClass === void 0 && $$bindings.btnClass && btnClass !== void 0)
        $$bindings.btnClass(btnClass);
      if ($$props.menuClass === void 0 && $$bindings.menuClass && menuClass !== void 0)
        $$bindings.menuClass(menuClass);
      return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: "Open main menu" }, $$restProps, { class: twMerge(btnClass, $$props.class) }), {}, {
        default: () => {
          return `${validate_component(Menu, "Menu").$$render(
            $$result,
            {
              class: twMerge(menuClass, $$props.classMenu)
            },
            {},
            {}
          )}`;
        }
      })} `;
    });
    NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "active", "activeClass", "nonActiveClass"]);
      let { href = "" } = $$props;
      let { active = false } = $$props;
      let { activeClass = void 0 } = $$props;
      let { nonActiveClass = void 0 } = $$props;
      const context = getContext("navbar") ?? {};
      let liClass;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.active === void 0 && $$bindings.active && active !== void 0)
        $$bindings.active(active);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
        $$bindings.activeClass(activeClass);
      if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
        $$bindings.nonActiveClass(nonActiveClass);
      liClass = twMerge(
        "block py-2 pr-4 pl-3 md:p-0 rounded md:border-0",
        active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
        $$props.class
      );
      return `<li>${((tag) => {
        return tag ? `<${href ? "a" : "div"}${spread(
          [
            {
              role: escape_attribute_value(href ? void 0 : "link")
            },
            { href: escape_attribute_value(href) },
            escape_object($$restProps),
            { class: escape_attribute_value(liClass) }
          ],
          {}
        )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "div")}</li> `;
    });
    NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["divClass", "ulClass", "hidden", "slideParams", "activeClass", "nonActiveClass"]);
      let { divClass = "w-full md:block md:w-auto" } = $$props;
      let { ulClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium" } = $$props;
      let { hidden = true } = $$props;
      let { slideParams = {
        delay: 250,
        duration: 500,
        easing: quintOut
      } } = $$props;
      let { activeClass = "text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent" } = $$props;
      let { nonActiveClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" } = $$props;
      setContext("navbar", { activeClass, nonActiveClass });
      let _divClass;
      let _ulClass;
      if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
        $$bindings.divClass(divClass);
      if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0)
        $$bindings.ulClass(ulClass);
      if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
        $$bindings.hidden(hidden);
      if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0)
        $$bindings.slideParams(slideParams);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
        $$bindings.activeClass(activeClass);
      if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
        $$bindings.nonActiveClass(nonActiveClass);
      _divClass = twMerge(divClass, $$props.class);
      _ulClass = twMerge(
        ulClass,
        // 'divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700',
        $$props.classUl
      );
      return `${!hidden ? `<div${spread(
        [
          escape_object($$restProps),
          { class: escape_attribute_value(_divClass) },
          { role: "button" },
          { tabindex: "0" }
        ],
        {}
      )}>${validate_component(Frame, "Frame").$$render(
        $$result,
        {
          tag: "ul",
          border: true,
          rounded: true,
          color: "navbarUl",
          class: _ulClass
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}</div>` : `<div${spread(
        [
          escape_object($$restProps),
          { class: escape_attribute_value(_divClass) },
          { hidden: hidden || null }
        ],
        {}
      )}><ul${add_attribute("class", _ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`} `;
    });
    MAX_PAGE_WIDTH = 1440;
    OVERFLOW_ANIMATION_TIME = 2e3;
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let headerClass;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let emailSubscribeModal = false;
      let hideOverflow = true;
      setTimeout(
        () => {
          hideOverflow = false;
        },
        OVERFLOW_ANIMATION_TIME
      );
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        headerClass = hideOverflow ? "w-full relative overflow-hidden relative" : "w-full relative overflow-visible relative";
        $$rendered = `${$$result.head += `<!-- HEAD_svelte-8bssk7_START --><meta name="description" content="bunny garden animals nature squirrel frog vegetables woods spring summer children books picture book"><meta property="og:title" content="bunny garden animals nature squirrel frog vegetables woods spring summer children books picture book"><meta property="og:description" content="Simple Reads Books and Hunnie Bunny's Garden"><meta property="og:image" content="https://res.cloudinary.com/simple-reads-books/image/upload/c_limit,w_2880/f_auto/q_auto/banner?_a=BBEHUxAE0"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="My Page Title"><meta name="twitter:description" content="This is a description of my page for SEO purposes."><meta name="twitter:image" content="https://res.cloudinary.com/simple-reads-books/image/upload/c_limit,w_2880/f_auto/q_auto/banner?_a=BBEHUxAE0"><script async src="https://www.googletagmanager.com/gtag/js?id=" data-svelte-h="svelte-2zhiaz"><\/script><script data-svelte-h="svelte-1n42iur">window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-9YTEE5C1YT');<\/script><!-- HEAD_svelte-8bssk7_END -->`, ""} <div id="page-container"><div id="header-container" class="m-auto max-w-screen-xl w-full overflow-hidden">   <header${add_attribute("class", headerClass, 0)}${add_attribute("style", $page.error && "visibility: hidden; height: 0", 0)}>${validate_component(Navbar, "Navbar").$$render(
          $$result,
          {
            color: "form",
            navClass: "w-full md:absolute md:bg-transparent bg-[#FF5A1F] text-white p-3",
            navDivClass: "mx-auto flex flex-wrap justify-between items-center max-w-screen-xl animate-flipInX",
            class: "max-w-screen-xl"
          },
          {},
          {
            default: ({ hidden, toggle }) => {
              return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/" }, {}, {
                default: () => {
                  return `<div class="md:hidden flex flex-row justify-center items-center min-w-min">${validate_component(CldImage, "CldImage").$$render(
                    $$result,
                    {
                      width: 128,
                      height: "100%",
                      aspectRatio: 128 / 104,
                      src: "logo",
                      class: "mr-3 !w-12 sm:!w-16",
                      alt: "logo",
                      loading: "eager"
                    },
                    {},
                    {}
                  )} <span class="self-center whitespace-nowrap sm dark:text-white font-[Itim] text-md sm:text-lg" data-svelte-h="svelte-afkk7p">Simple Reads Books</span></div>`;
                }
              })} ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})} ${validate_component(NavUl, "NavUl").$$render(
                $$result,
                {
                  hidden,
                  nonActiveClass: "md:text-white md:font-bold",
                  activeClass: "font-extrabold text-white underline bg-green-400 md:bg-transparent",
                  ulClass: "flex flex-col p-3 mt-3 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium bg-gray-100 md:bg-transparent",
                  divClass: "w-full md:block md:w-auto md:bg-black md:bg-opacity-[.15] md:rounded-full md:mr-2 md:mt-2 md:[transform:perspective(250px)_translateZ(0)_rotateX(5deg)]",
                  color: "green"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(NavLi, "NavLi").$$render(
                      $$result,
                      {
                        href: "/home",
                        active: $page.url.pathname.includes("home") || $page.url.pathname === "/",
                        nonActiveClass: "md:hover:transform md:hover:scale-125 md:text-white md:font-bold",
                        activeClass: "bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
                      },
                      {},
                      {
                        default: () => {
                          return `<span data-svelte-h="svelte-19qdaju">Welcome</span>`;
                        }
                      }
                    )} ${validate_component(NavLi, "NavLi").$$render(
                      $$result,
                      {
                        href: "/about",
                        active: $page.url.pathname.includes("about"),
                        class: "hover:font-bolder",
                        nonActiveClass: "md:hover:transform md:hover:scale-125 md:text-white md:font-bold",
                        activeClass: "bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
                      },
                      {},
                      {
                        default: () => {
                          return `<span data-svelte-h="svelte-1poeibp">About</span>`;
                        }
                      }
                    )} ${validate_component(NavLi, "NavLi").$$render(
                      $$result,
                      {
                        href: "/products",
                        active: $page.url.pathname.includes("products"),
                        nonActiveClass: "md:hover:transform md:hover:scale-125 md:text-white md:font-bold",
                        activeClass: "bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
                      },
                      {},
                      {
                        default: () => {
                          return `<span data-svelte-h="svelte-ont76m">Books &amp; Products</span>`;
                        }
                      }
                    )} ${validate_component(NavLi, "NavLi").$$render(
                      $$result,
                      {
                        href: "/contact",
                        nonActiveClass: "md:hover:transform md:hover:scale-125 md:text-white md:font-bold",
                        activeClass: "bg-primary-500 md:hover:transform md:hover:scale-125 text-white md:bg-transparent md:font-extrabold md:underline"
                      },
                      {},
                      {
                        default: () => {
                          return `<span data-svelte-h="svelte-1mqhoa6">Contact</span>`;
                        }
                      }
                    )}`;
                  }
                }
              )}`;
            }
          }
        )} ${validate_component(CldImage, "CldImage").$$render(
          $$result,
          {
            src: "banner",
            width: MAX_PAGE_WIDTH * 2,
            aspectRatio: 338 / 100,
            height: "100%",
            alt: "Simple Reads Books Banner",
            sizes: "100vw",
            class: "max-w-screen-2xl m-auto",
            loading: "eager"
          },
          {},
          {}
        )} ${validate_component(CldImage, "CldImage").$$render(
          $$result,
          {
            src: "hunnie-bunnie-peering-over",
            width: 450,
            aspectRatio: 7 / 5,
            height: "100%",
            alt: "Hunnie Bunny Peering Over",
            class: "absolute bottom-[-9px] right-[-5px] sm:bottom-[-12px] md:bottom-[-22px] md:right-[-10px] lg:bottom-[-22px] lg:right-[-5px] h-16 sm:h-20 md:h-40 lg:h-40 animate-slideUp !w-fit"
          },
          {},
          {}
        )} ${validate_component(CldImage, "CldImage").$$render(
          $$result,
          {
            src: "hunnie-bunnie-reading",
            width: 450,
            aspectRatio: 7 / 5,
            height: "100%",
            alt: "Hunnie Bunny Reading",
            class: "absolute hidden sm:block sm:left-[-4%] md:left-[-3%] left-[-4%] bottom-[0px] rotate-3 sm:h-[100px] md:h-[140px] h-[80px] animate-slideInFromLeft !w-fit"
          },
          {},
          {}
        )}</header> ${$page.error ? `${slots.default ? slots.default({}) : ``}` : `<main>${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render(
          $$result,
          {
            footerType: "socialmedia",
            class: "bg-[#420063]"
          },
          {},
          {
            default: () => {
              return `<div class="m-auto max-w-screen-xl"><div class="grid grid-flow-row grid-cols-12 sm:items-center sm:justify-between gap-4 mb-2">${validate_component(FooterBrand, "FooterBrand").$$render(
                $$result,
                {
                  href: "/",
                  src: "https://res.cloudinary.com/simple-reads-books/image/upload/w_128,h_104,f_webp,q_auto/SRBooksLogo_uyvnpj.png",
                  alt: "Simple Reads Books",
                  name: "Simple Reads Books",
                  class: "text-white",
                  spanClass: "text-white text-md md:text-xl font-[Itim] whitespace-nowrap hidden sm:block",
                  imgClass: "h-10 pr-3 sm:w-20 h-fit",
                  aClass: "flex flex-row items-center min-w-[fit-content] mr-3 col-span-3 hidden sm:flex"
                },
                {},
                {}
              )} ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render(
                $$result,
                {
                  ulClass: "flex flex-wrap items-center mb-6 text-xs sm:text-sm lg:text-base text-white sm:mb-0 dark:text-gray-400 min-w-[fit-content] justify-center sm:justify-end md:justify-center col-start-1 sm:col-start-4 col-end-13 md:col-end-10 h-full"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(FooterLink, "FooterLink").$$render($$result, { href: "/terms" }, {}, {
                      default: () => {
                        return `Terms &amp; Conditions`;
                      }
                    })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { href: "/privacy" }, {}, {
                      default: () => {
                        return `Privacy Policy`;
                      }
                    })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { href: "/", aClass: "hidden" }, {}, {
                      default: () => {
                        return `Reviews`;
                      }
                    })}`;
                  }
                }
              )} <div class="w-full rounded-xl col-start-1 md:col-start-10 col-end-13" role="button" tabindex="0"><p class="text-white text-xs pb-1 bg-transparent" data-svelte-h="svelte-1edl2a2">Subscribe for e-mail updates!</p> ${validate_component(ButtonGroup, "ButtonGroup").$$render($$result, { class: "rounded-none w-full" }, {}, {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "email",
                      id: "EMAIL",
                      name: "EMAIL",
                      placeholder: "name@gmail.com",
                      size: "sm",
                      class: "!rounded-none !rounded-tl !rounded-bl"
                    },
                    {},
                    {
                      left: () => {
                        return `<svg slot="left" aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>`;
                      }
                    }
                  )} ${validate_component(Button, "Button").$$render($$result, { color: "primary", size: "xs" }, {}, {
                    default: () => {
                      return `Subscribe`;
                    }
                  })}`;
                }
              })}</div></div>  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"> <div class="flex flex-col sm:flex-row items-center justify-center sm:items-center sm:justify-between">${validate_component(FooterCopyright, "FooterCopyright").$$render(
                $$result,
                {
                  href: "/",
                  by: "Simple Reads Books, Inc.",
                  spanClass: "text-xs text-white italic"
                },
                {},
                {}
              )} <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0 text-white">${validate_component(FooterIcon, "FooterIcon").$$render(
                $$result,
                {
                  href: "https://facebook.com/deborah.martin.3154",
                  target: "_blank",
                  class: "text-white hover:text-primary-500"
                },
                {},
                {
                  default: () => {
                    return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path></svg>`;
                  }
                }
              )} ${validate_component(FooterIcon, "FooterIcon").$$render(
                $$result,
                {
                  href: "https://instagram.com/debbiemartin064",
                  target: "_blank",
                  class: "text-white hover:text-primary-500"
                },
                {},
                {
                  default: () => {
                    return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg>`;
                  }
                }
              )} ${validate_component(FooterIcon, "FooterIcon").$$render(
                $$result,
                {
                  href: "https://twitter.com/DeborahCMartin",
                  target: "_blank",
                  class: "text-white hover:text-primary-500"
                },
                {},
                {
                  default: () => {
                    return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>`;
                  }
                }
              )}</div></div></div>`;
            }
          }
        )}`}</div> ${validate_component(Modal, "Modal").$$render(
          $$result,
          {
            class: "w-fit h-fit pt-10",
            autoclose: true,
            open: emailSubscribeModal
          },
          {
            open: ($$value) => {
              emailSubscribeModal = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `<iframe title="email subscribe" width="540" height="540" src="https://cb8831b5.sibforms.com/serve/MUIFAAlGMe78lSVFkIYUCGSb2MNQDS5_DdlDLsckCsxmqSUdh2yo0ZkJsUu0II_U0BSAwsPnzkxTmUW5kLyZmIr2EWtSk4V1sDYqKe4yV6xBlyPnFMqIPrjlvJqZBx_7Smqhxr1q_30uur1_-joez43hUw1ucLcu_zp7FnrJn1zJZ8B3qgCIMxPaxlhAKZvLSeaEh3O0Qlumw18x" allowfullscreen style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;" class="-mx-10"></iframe>`;
            }
          }
        )}</div>`;
      } while (!$$settled);
      $$unsubscribe_page();
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.19ae10cf.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/stores.36d1c324.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/Modal.33e41680.js", "_app/immutable/chunks/CloseButton.c40e06a6.js", "_app/immutable/chunks/index.d0fa776d.js", "_app/immutable/chunks/CldImage.0f5e97b0.js"];
    stylesheets = ["_app/immutable/assets/0.9a83828b.css", "_app/immutable/assets/Indicator.1d121e74.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/ButtonBack.js
var ButtonBack;
var init_ButtonBack = __esm({
  ".svelte-kit/output/server/chunks/ButtonBack.js"() {
    init_ssr();
    init_Indicator_svelte_svelte_type_style_lang();
    ButtonBack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Button, "Button").$$render(
        $$result,
        {
          class: "bg-primary-500 text-white mt-[24px]",
          size: "lg"
        },
        {},
        {
          default: () => {
            return `<svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path></svg>
	Go back`;
          }
        }
      )}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_error.svelte.js"() {
    init_ssr();
    init_stores();
    init_ButtonBack();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-1mxau7w_START --><script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" data-svelte-h="svelte-16ujy84"><\/script>${$$result.title = `<title>Uh oh</title>`, ""}<!-- HEAD_svelte-1mxau7w_END -->`, ""} <section class="bg-white dark:bg-gray-900 h-[100vh] flex flex-col items-center">${$page?.error?.message !== "Not Found" ? `<h1 class="rounded-sm shadow p-5 w-full text-center bold bg-red-500 text-white">Error: ${escape($page?.error?.message)}</h1>` : ``} <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 my-auto h-[100%] flex items-center"><div class="mx-auto max-w-screen-sm text-center"><lottie-player src="https://lottie.host/5824a45e-3640-4d4f-8085-c82b1a40ca91/4RT9fuVtBk.json" background="#fff" speed="1" class="sm:w-[600px] sm:h-[600px]" loop autoplay direction="1" mode="normal"></lottie-player> <h1 class="mb-4 text-2xl font-extrabold text-red-600 dark:text-red-500" data-svelte-h="svelte-moli4v">Page Not Found</h1> <p class="mb-10 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white" data-svelte-h="svelte-oui917">Uh oh! That page doesn\u2019t exist \u{1F632}</p> ${validate_component(ButtonBack, "ButtonBack").$$render($$result, {}, {}, {})}</div></div></section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.7218b3e2.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/stores.36d1c324.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/chunks/ButtonBack.ec23fa3b.js", "_app/immutable/chunks/navigation.f585b75f.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/spread.8a54911c.js"];
    stylesheets2 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts2 = [];
  }
});

// node_modules/.pnpm/csvtojson@2.0.10/node_modules/csvtojson/browser/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/csvtojson@2.0.10/node_modules/csvtojson/browser/browser.js"(exports2, module2) {
    module2.exports = function(t) {
      var e = {};
      function r(n) {
        if (e[n])
          return e[n].exports;
        var i = e[n] = { i: n, l: false, exports: {} };
        return t[n].call(i.exports, i, i.exports, r), i.l = true, i.exports;
      }
      return r.m = t, r.c = e, r.d = function(t2, e2, n) {
        r.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n });
      }, r.r = function(t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, r.t = function(t2, e2) {
        if (1 & e2 && (t2 = r(t2)), 8 & e2)
          return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
          return t2;
        var n = /* @__PURE__ */ Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
          for (var i in t2)
            r.d(n, i, function(e3) {
              return t2[e3];
            }.bind(null, i));
        return n;
      }, r.n = function(t2) {
        var e2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return r.d(e2, "a", e2), e2;
      }, r.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, r.p = "", r(r.s = 32);
    }([function(t, e) {
      var r;
      r = function() {
        return this;
      }();
      try {
        r = r || Function("return this")() || (0, eval)("this");
      } catch (t2) {
        "object" == typeof window && (r = window);
      }
      t.exports = r;
    }, function(t, e, r) {
      "use strict";
      var n = r(6), i = Object.keys || function(t2) {
        var e2 = [];
        for (var r2 in t2)
          e2.push(r2);
        return e2;
      };
      t.exports = f;
      var o = r(5);
      o.inherits = r(2);
      var s2 = r(23), a = r(14);
      o.inherits(f, s2);
      for (var u = i(a.prototype), c = 0; c < u.length; c++) {
        var l = u[c];
        f.prototype[l] || (f.prototype[l] = a.prototype[l]);
      }
      function f(t2) {
        if (!(this instanceof f))
          return new f(t2);
        s2.call(this, t2), a.call(this, t2), t2 && false === t2.readable && (this.readable = false), t2 && false === t2.writable && (this.writable = false), this.allowHalfOpen = true, t2 && false === t2.allowHalfOpen && (this.allowHalfOpen = false), this.once("end", h);
      }
      function h() {
        this.allowHalfOpen || this._writableState.ended || n.nextTick(p, this);
      }
      function p(t2) {
        t2.end();
      }
      Object.defineProperty(f.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
        return this._writableState.highWaterMark;
      } }), Object.defineProperty(f.prototype, "destroyed", { get: function() {
        return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
      }, set: function(t2) {
        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t2, this._writableState.destroyed = t2);
      } }), f.prototype._destroy = function(t2, e2) {
        this.push(null), this.end(), n.nextTick(e2, t2);
      };
    }, function(t, e) {
      "function" == typeof Object.create ? t.exports = function(t2, e2) {
        t2.super_ = e2, t2.prototype = Object.create(e2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } });
      } : t.exports = function(t2, e2) {
        t2.super_ = e2;
        var r = function() {
        };
        r.prototype = e2.prototype, t2.prototype = new r(), t2.prototype.constructor = t2;
      };
    }, function(t, e, r) {
      "use strict";
      (function(t2) {
        var n = r(38), i = r(39), o = r(40);
        function s2() {
          return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function a(t3, e2) {
          if (s2() < e2)
            throw new RangeError("Invalid typed array length");
          return u.TYPED_ARRAY_SUPPORT ? (t3 = new Uint8Array(e2)).__proto__ = u.prototype : (null === t3 && (t3 = new u(e2)), t3.length = e2), t3;
        }
        function u(t3, e2, r2) {
          if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
            return new u(t3, e2, r2);
          if ("number" == typeof t3) {
            if ("string" == typeof e2)
              throw new Error("If encoding is specified then the first argument must be a string");
            return f(this, t3);
          }
          return c(this, t3, e2, r2);
        }
        function c(t3, e2, r2, n2) {
          if ("number" == typeof e2)
            throw new TypeError('"value" argument must not be a number');
          return "undefined" != typeof ArrayBuffer && e2 instanceof ArrayBuffer ? function(t4, e3, r3, n3) {
            if (e3.byteLength, r3 < 0 || e3.byteLength < r3)
              throw new RangeError("'offset' is out of bounds");
            if (e3.byteLength < r3 + (n3 || 0))
              throw new RangeError("'length' is out of bounds");
            return e3 = void 0 === r3 && void 0 === n3 ? new Uint8Array(e3) : void 0 === n3 ? new Uint8Array(e3, r3) : new Uint8Array(e3, r3, n3), u.TYPED_ARRAY_SUPPORT ? (t4 = e3).__proto__ = u.prototype : t4 = h(t4, e3), t4;
          }(t3, e2, r2, n2) : "string" == typeof e2 ? function(t4, e3, r3) {
            if ("string" == typeof r3 && "" !== r3 || (r3 = "utf8"), !u.isEncoding(r3))
              throw new TypeError('"encoding" must be a valid string encoding');
            var n3 = 0 | d(e3, r3), i2 = (t4 = a(t4, n3)).write(e3, r3);
            return i2 !== n3 && (t4 = t4.slice(0, i2)), t4;
          }(t3, e2, r2) : function(t4, e3) {
            if (u.isBuffer(e3)) {
              var r3 = 0 | p(e3.length);
              return 0 === (t4 = a(t4, r3)).length ? t4 : (e3.copy(t4, 0, 0, r3), t4);
            }
            if (e3) {
              if ("undefined" != typeof ArrayBuffer && e3.buffer instanceof ArrayBuffer || "length" in e3)
                return "number" != typeof e3.length || function(t5) {
                  return t5 != t5;
                }(e3.length) ? a(t4, 0) : h(t4, e3);
              if ("Buffer" === e3.type && o(e3.data))
                return h(t4, e3.data);
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }(t3, e2);
        }
        function l(t3) {
          if ("number" != typeof t3)
            throw new TypeError('"size" argument must be a number');
          if (t3 < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function f(t3, e2) {
          if (l(e2), t3 = a(t3, e2 < 0 ? 0 : 0 | p(e2)), !u.TYPED_ARRAY_SUPPORT)
            for (var r2 = 0; r2 < e2; ++r2)
              t3[r2] = 0;
          return t3;
        }
        function h(t3, e2) {
          var r2 = e2.length < 0 ? 0 : 0 | p(e2.length);
          t3 = a(t3, r2);
          for (var n2 = 0; n2 < r2; n2 += 1)
            t3[n2] = 255 & e2[n2];
          return t3;
        }
        function p(t3) {
          if (t3 >= s2())
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s2().toString(16) + " bytes");
          return 0 | t3;
        }
        function d(t3, e2) {
          if (u.isBuffer(t3))
            return t3.length;
          if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t3) || t3 instanceof ArrayBuffer))
            return t3.byteLength;
          "string" != typeof t3 && (t3 = "" + t3);
          var r2 = t3.length;
          if (0 === r2)
            return 0;
          for (var n2 = false; ; )
            switch (e2) {
              case "ascii":
              case "latin1":
              case "binary":
                return r2;
              case "utf8":
              case "utf-8":
              case void 0:
                return N(t3).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * r2;
              case "hex":
                return r2 >>> 1;
              case "base64":
                return H(t3).length;
              default:
                if (n2)
                  return N(t3).length;
                e2 = ("" + e2).toLowerCase(), n2 = true;
            }
        }
        function _(t3, e2, r2) {
          var n2 = t3[e2];
          t3[e2] = t3[r2], t3[r2] = n2;
        }
        function v(t3, e2, r2, n2, i2) {
          if (0 === t3.length)
            return -1;
          if ("string" == typeof r2 ? (n2 = r2, r2 = 0) : r2 > 2147483647 ? r2 = 2147483647 : r2 < -2147483648 && (r2 = -2147483648), r2 = +r2, isNaN(r2) && (r2 = i2 ? 0 : t3.length - 1), r2 < 0 && (r2 = t3.length + r2), r2 >= t3.length) {
            if (i2)
              return -1;
            r2 = t3.length - 1;
          } else if (r2 < 0) {
            if (!i2)
              return -1;
            r2 = 0;
          }
          if ("string" == typeof e2 && (e2 = u.from(e2, n2)), u.isBuffer(e2))
            return 0 === e2.length ? -1 : y(t3, e2, r2, n2, i2);
          if ("number" == typeof e2)
            return e2 &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i2 ? Uint8Array.prototype.indexOf.call(t3, e2, r2) : Uint8Array.prototype.lastIndexOf.call(t3, e2, r2) : y(t3, [e2], r2, n2, i2);
          throw new TypeError("val must be string, number or Buffer");
        }
        function y(t3, e2, r2, n2, i2) {
          var o2, s3 = 1, a2 = t3.length, u2 = e2.length;
          if (void 0 !== n2 && ("ucs2" === (n2 = String(n2).toLowerCase()) || "ucs-2" === n2 || "utf16le" === n2 || "utf-16le" === n2)) {
            if (t3.length < 2 || e2.length < 2)
              return -1;
            s3 = 2, a2 /= 2, u2 /= 2, r2 /= 2;
          }
          function c2(t4, e3) {
            return 1 === s3 ? t4[e3] : t4.readUInt16BE(e3 * s3);
          }
          if (i2) {
            var l2 = -1;
            for (o2 = r2; o2 < a2; o2++)
              if (c2(t3, o2) === c2(e2, -1 === l2 ? 0 : o2 - l2)) {
                if (-1 === l2 && (l2 = o2), o2 - l2 + 1 === u2)
                  return l2 * s3;
              } else
                -1 !== l2 && (o2 -= o2 - l2), l2 = -1;
          } else
            for (r2 + u2 > a2 && (r2 = a2 - u2), o2 = r2; o2 >= 0; o2--) {
              for (var f2 = true, h2 = 0; h2 < u2; h2++)
                if (c2(t3, o2 + h2) !== c2(e2, h2)) {
                  f2 = false;
                  break;
                }
              if (f2)
                return o2;
            }
          return -1;
        }
        function m(t3, e2, r2, n2) {
          r2 = Number(r2) || 0;
          var i2 = t3.length - r2;
          n2 ? (n2 = Number(n2)) > i2 && (n2 = i2) : n2 = i2;
          var o2 = e2.length;
          if (o2 % 2 != 0)
            throw new TypeError("Invalid hex string");
          n2 > o2 / 2 && (n2 = o2 / 2);
          for (var s3 = 0; s3 < n2; ++s3) {
            var a2 = parseInt(e2.substr(2 * s3, 2), 16);
            if (isNaN(a2))
              return s3;
            t3[r2 + s3] = a2;
          }
          return s3;
        }
        function g(t3, e2, r2, n2) {
          return V(N(e2, t3.length - r2), t3, r2, n2);
        }
        function b(t3, e2, r2, n2) {
          return V(function(t4) {
            for (var e3 = [], r3 = 0; r3 < t4.length; ++r3)
              e3.push(255 & t4.charCodeAt(r3));
            return e3;
          }(e2), t3, r2, n2);
        }
        function w(t3, e2, r2, n2) {
          return b(t3, e2, r2, n2);
        }
        function E(t3, e2, r2, n2) {
          return V(H(e2), t3, r2, n2);
        }
        function C(t3, e2, r2, n2) {
          return V(function(t4, e3) {
            for (var r3, n3, i2, o2 = [], s3 = 0; s3 < t4.length && !((e3 -= 2) < 0); ++s3)
              n3 = (r3 = t4.charCodeAt(s3)) >> 8, i2 = r3 % 256, o2.push(i2), o2.push(n3);
            return o2;
          }(e2, t3.length - r2), t3, r2, n2);
        }
        function x(t3, e2, r2) {
          return 0 === e2 && r2 === t3.length ? n.fromByteArray(t3) : n.fromByteArray(t3.slice(e2, r2));
        }
        function j(t3, e2, r2) {
          r2 = Math.min(t3.length, r2);
          for (var n2 = [], i2 = e2; i2 < r2; ) {
            var o2, s3, a2, u2, c2 = t3[i2], l2 = null, f2 = c2 > 239 ? 4 : c2 > 223 ? 3 : c2 > 191 ? 2 : 1;
            if (i2 + f2 <= r2)
              switch (f2) {
                case 1:
                  c2 < 128 && (l2 = c2);
                  break;
                case 2:
                  128 == (192 & (o2 = t3[i2 + 1])) && (u2 = (31 & c2) << 6 | 63 & o2) > 127 && (l2 = u2);
                  break;
                case 3:
                  o2 = t3[i2 + 1], s3 = t3[i2 + 2], 128 == (192 & o2) && 128 == (192 & s3) && (u2 = (15 & c2) << 12 | (63 & o2) << 6 | 63 & s3) > 2047 && (u2 < 55296 || u2 > 57343) && (l2 = u2);
                  break;
                case 4:
                  o2 = t3[i2 + 1], s3 = t3[i2 + 2], a2 = t3[i2 + 3], 128 == (192 & o2) && 128 == (192 & s3) && 128 == (192 & a2) && (u2 = (15 & c2) << 18 | (63 & o2) << 12 | (63 & s3) << 6 | 63 & a2) > 65535 && u2 < 1114112 && (l2 = u2);
              }
            null === l2 ? (l2 = 65533, f2 = 1) : l2 > 65535 && (l2 -= 65536, n2.push(l2 >>> 10 & 1023 | 55296), l2 = 56320 | 1023 & l2), n2.push(l2), i2 += f2;
          }
          return function(t4) {
            var e3 = t4.length;
            if (e3 <= S)
              return String.fromCharCode.apply(String, t4);
            for (var r3 = "", n3 = 0; n3 < e3; )
              r3 += String.fromCharCode.apply(String, t4.slice(n3, n3 += S));
            return r3;
          }(n2);
        }
        e.Buffer = u, e.SlowBuffer = function(t3) {
          return +t3 != t3 && (t3 = 0), u.alloc(+t3);
        }, e.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== t2.TYPED_ARRAY_SUPPORT ? t2.TYPED_ARRAY_SUPPORT : function() {
          try {
            var t3 = new Uint8Array(1);
            return t3.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } }, 42 === t3.foo() && "function" == typeof t3.subarray && 0 === t3.subarray(1, 1).byteLength;
          } catch (t4) {
            return false;
          }
        }(), e.kMaxLength = s2(), u.poolSize = 8192, u._augment = function(t3) {
          return t3.__proto__ = u.prototype, t3;
        }, u.from = function(t3, e2, r2) {
          return c(null, t3, e2, r2);
        }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, { value: null, configurable: true })), u.alloc = function(t3, e2, r2) {
          return function(t4, e3, r3, n2) {
            return l(e3), e3 <= 0 ? a(t4, e3) : void 0 !== r3 ? "string" == typeof n2 ? a(t4, e3).fill(r3, n2) : a(t4, e3).fill(r3) : a(t4, e3);
          }(null, t3, e2, r2);
        }, u.allocUnsafe = function(t3) {
          return f(null, t3);
        }, u.allocUnsafeSlow = function(t3) {
          return f(null, t3);
        }, u.isBuffer = function(t3) {
          return !(null == t3 || !t3._isBuffer);
        }, u.compare = function(t3, e2) {
          if (!u.isBuffer(t3) || !u.isBuffer(e2))
            throw new TypeError("Arguments must be Buffers");
          if (t3 === e2)
            return 0;
          for (var r2 = t3.length, n2 = e2.length, i2 = 0, o2 = Math.min(r2, n2); i2 < o2; ++i2)
            if (t3[i2] !== e2[i2]) {
              r2 = t3[i2], n2 = e2[i2];
              break;
            }
          return r2 < n2 ? -1 : n2 < r2 ? 1 : 0;
        }, u.isEncoding = function(t3) {
          switch (String(t3).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return true;
            default:
              return false;
          }
        }, u.concat = function(t3, e2) {
          if (!o(t3))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t3.length)
            return u.alloc(0);
          var r2;
          if (void 0 === e2)
            for (e2 = 0, r2 = 0; r2 < t3.length; ++r2)
              e2 += t3[r2].length;
          var n2 = u.allocUnsafe(e2), i2 = 0;
          for (r2 = 0; r2 < t3.length; ++r2) {
            var s3 = t3[r2];
            if (!u.isBuffer(s3))
              throw new TypeError('"list" argument must be an Array of Buffers');
            s3.copy(n2, i2), i2 += s3.length;
          }
          return n2;
        }, u.byteLength = d, u.prototype._isBuffer = true, u.prototype.swap16 = function() {
          var t3 = this.length;
          if (t3 % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var e2 = 0; e2 < t3; e2 += 2)
            _(this, e2, e2 + 1);
          return this;
        }, u.prototype.swap32 = function() {
          var t3 = this.length;
          if (t3 % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var e2 = 0; e2 < t3; e2 += 4)
            _(this, e2, e2 + 3), _(this, e2 + 1, e2 + 2);
          return this;
        }, u.prototype.swap64 = function() {
          var t3 = this.length;
          if (t3 % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var e2 = 0; e2 < t3; e2 += 8)
            _(this, e2, e2 + 7), _(this, e2 + 1, e2 + 6), _(this, e2 + 2, e2 + 5), _(this, e2 + 3, e2 + 4);
          return this;
        }, u.prototype.toString = function() {
          var t3 = 0 | this.length;
          return 0 === t3 ? "" : 0 === arguments.length ? j(this, 0, t3) : function(t4, e2, r2) {
            var n2 = false;
            if ((void 0 === e2 || e2 < 0) && (e2 = 0), e2 > this.length)
              return "";
            if ((void 0 === r2 || r2 > this.length) && (r2 = this.length), r2 <= 0)
              return "";
            if ((r2 >>>= 0) <= (e2 >>>= 0))
              return "";
            for (t4 || (t4 = "utf8"); ; )
              switch (t4) {
                case "hex":
                  return T(this, e2, r2);
                case "utf8":
                case "utf-8":
                  return j(this, e2, r2);
                case "ascii":
                  return R(this, e2, r2);
                case "latin1":
                case "binary":
                  return k(this, e2, r2);
                case "base64":
                  return x(this, e2, r2);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return P(this, e2, r2);
                default:
                  if (n2)
                    throw new TypeError("Unknown encoding: " + t4);
                  t4 = (t4 + "").toLowerCase(), n2 = true;
              }
          }.apply(this, arguments);
        }, u.prototype.equals = function(t3) {
          if (!u.isBuffer(t3))
            throw new TypeError("Argument must be a Buffer");
          return this === t3 || 0 === u.compare(this, t3);
        }, u.prototype.inspect = function() {
          var t3 = "", r2 = e.INSPECT_MAX_BYTES;
          return this.length > 0 && (t3 = this.toString("hex", 0, r2).match(/.{2}/g).join(" "), this.length > r2 && (t3 += " ... ")), "<Buffer " + t3 + ">";
        }, u.prototype.compare = function(t3, e2, r2, n2, i2) {
          if (!u.isBuffer(t3))
            throw new TypeError("Argument must be a Buffer");
          if (void 0 === e2 && (e2 = 0), void 0 === r2 && (r2 = t3 ? t3.length : 0), void 0 === n2 && (n2 = 0), void 0 === i2 && (i2 = this.length), e2 < 0 || r2 > t3.length || n2 < 0 || i2 > this.length)
            throw new RangeError("out of range index");
          if (n2 >= i2 && e2 >= r2)
            return 0;
          if (n2 >= i2)
            return -1;
          if (e2 >= r2)
            return 1;
          if (e2 >>>= 0, r2 >>>= 0, n2 >>>= 0, i2 >>>= 0, this === t3)
            return 0;
          for (var o2 = i2 - n2, s3 = r2 - e2, a2 = Math.min(o2, s3), c2 = this.slice(n2, i2), l2 = t3.slice(e2, r2), f2 = 0; f2 < a2; ++f2)
            if (c2[f2] !== l2[f2]) {
              o2 = c2[f2], s3 = l2[f2];
              break;
            }
          return o2 < s3 ? -1 : s3 < o2 ? 1 : 0;
        }, u.prototype.includes = function(t3, e2, r2) {
          return -1 !== this.indexOf(t3, e2, r2);
        }, u.prototype.indexOf = function(t3, e2, r2) {
          return v(this, t3, e2, r2, true);
        }, u.prototype.lastIndexOf = function(t3, e2, r2) {
          return v(this, t3, e2, r2, false);
        }, u.prototype.write = function(t3, e2, r2, n2) {
          if (void 0 === e2)
            n2 = "utf8", r2 = this.length, e2 = 0;
          else if (void 0 === r2 && "string" == typeof e2)
            n2 = e2, r2 = this.length, e2 = 0;
          else {
            if (!isFinite(e2))
              throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            e2 |= 0, isFinite(r2) ? (r2 |= 0, void 0 === n2 && (n2 = "utf8")) : (n2 = r2, r2 = void 0);
          }
          var i2 = this.length - e2;
          if ((void 0 === r2 || r2 > i2) && (r2 = i2), t3.length > 0 && (r2 < 0 || e2 < 0) || e2 > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
          n2 || (n2 = "utf8");
          for (var o2 = false; ; )
            switch (n2) {
              case "hex":
                return m(this, t3, e2, r2);
              case "utf8":
              case "utf-8":
                return g(this, t3, e2, r2);
              case "ascii":
                return b(this, t3, e2, r2);
              case "latin1":
              case "binary":
                return w(this, t3, e2, r2);
              case "base64":
                return E(this, t3, e2, r2);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return C(this, t3, e2, r2);
              default:
                if (o2)
                  throw new TypeError("Unknown encoding: " + n2);
                n2 = ("" + n2).toLowerCase(), o2 = true;
            }
        }, u.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };
        var S = 4096;
        function R(t3, e2, r2) {
          var n2 = "";
          r2 = Math.min(t3.length, r2);
          for (var i2 = e2; i2 < r2; ++i2)
            n2 += String.fromCharCode(127 & t3[i2]);
          return n2;
        }
        function k(t3, e2, r2) {
          var n2 = "";
          r2 = Math.min(t3.length, r2);
          for (var i2 = e2; i2 < r2; ++i2)
            n2 += String.fromCharCode(t3[i2]);
          return n2;
        }
        function T(t3, e2, r2) {
          var n2 = t3.length;
          (!e2 || e2 < 0) && (e2 = 0), (!r2 || r2 < 0 || r2 > n2) && (r2 = n2);
          for (var i2 = "", o2 = e2; o2 < r2; ++o2)
            i2 += U(t3[o2]);
          return i2;
        }
        function P(t3, e2, r2) {
          for (var n2 = t3.slice(e2, r2), i2 = "", o2 = 0; o2 < n2.length; o2 += 2)
            i2 += String.fromCharCode(n2[o2] + 256 * n2[o2 + 1]);
          return i2;
        }
        function O(t3, e2, r2) {
          if (t3 % 1 != 0 || t3 < 0)
            throw new RangeError("offset is not uint");
          if (t3 + e2 > r2)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function A(t3, e2, r2, n2, i2, o2) {
          if (!u.isBuffer(t3))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e2 > i2 || e2 < o2)
            throw new RangeError('"value" argument is out of bounds');
          if (r2 + n2 > t3.length)
            throw new RangeError("Index out of range");
        }
        function F(t3, e2, r2, n2) {
          e2 < 0 && (e2 = 65535 + e2 + 1);
          for (var i2 = 0, o2 = Math.min(t3.length - r2, 2); i2 < o2; ++i2)
            t3[r2 + i2] = (e2 & 255 << 8 * (n2 ? i2 : 1 - i2)) >>> 8 * (n2 ? i2 : 1 - i2);
        }
        function L(t3, e2, r2, n2) {
          e2 < 0 && (e2 = 4294967295 + e2 + 1);
          for (var i2 = 0, o2 = Math.min(t3.length - r2, 4); i2 < o2; ++i2)
            t3[r2 + i2] = e2 >>> 8 * (n2 ? i2 : 3 - i2) & 255;
        }
        function M(t3, e2, r2, n2, i2, o2) {
          if (r2 + n2 > t3.length)
            throw new RangeError("Index out of range");
          if (r2 < 0)
            throw new RangeError("Index out of range");
        }
        function B(t3, e2, r2, n2, o2) {
          return o2 || M(t3, 0, r2, 4), i.write(t3, e2, r2, n2, 23, 4), r2 + 4;
        }
        function D(t3, e2, r2, n2, o2) {
          return o2 || M(t3, 0, r2, 8), i.write(t3, e2, r2, n2, 52, 8), r2 + 8;
        }
        u.prototype.slice = function(t3, e2) {
          var r2, n2 = this.length;
          if (t3 = ~~t3, e2 = void 0 === e2 ? n2 : ~~e2, t3 < 0 ? (t3 += n2) < 0 && (t3 = 0) : t3 > n2 && (t3 = n2), e2 < 0 ? (e2 += n2) < 0 && (e2 = 0) : e2 > n2 && (e2 = n2), e2 < t3 && (e2 = t3), u.TYPED_ARRAY_SUPPORT)
            (r2 = this.subarray(t3, e2)).__proto__ = u.prototype;
          else {
            var i2 = e2 - t3;
            r2 = new u(i2, void 0);
            for (var o2 = 0; o2 < i2; ++o2)
              r2[o2] = this[o2 + t3];
          }
          return r2;
        }, u.prototype.readUIntLE = function(t3, e2, r2) {
          t3 |= 0, e2 |= 0, r2 || O(t3, e2, this.length);
          for (var n2 = this[t3], i2 = 1, o2 = 0; ++o2 < e2 && (i2 *= 256); )
            n2 += this[t3 + o2] * i2;
          return n2;
        }, u.prototype.readUIntBE = function(t3, e2, r2) {
          t3 |= 0, e2 |= 0, r2 || O(t3, e2, this.length);
          for (var n2 = this[t3 + --e2], i2 = 1; e2 > 0 && (i2 *= 256); )
            n2 += this[t3 + --e2] * i2;
          return n2;
        }, u.prototype.readUInt8 = function(t3, e2) {
          return e2 || O(t3, 1, this.length), this[t3];
        }, u.prototype.readUInt16LE = function(t3, e2) {
          return e2 || O(t3, 2, this.length), this[t3] | this[t3 + 1] << 8;
        }, u.prototype.readUInt16BE = function(t3, e2) {
          return e2 || O(t3, 2, this.length), this[t3] << 8 | this[t3 + 1];
        }, u.prototype.readUInt32LE = function(t3, e2) {
          return e2 || O(t3, 4, this.length), (this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16) + 16777216 * this[t3 + 3];
        }, u.prototype.readUInt32BE = function(t3, e2) {
          return e2 || O(t3, 4, this.length), 16777216 * this[t3] + (this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3]);
        }, u.prototype.readIntLE = function(t3, e2, r2) {
          t3 |= 0, e2 |= 0, r2 || O(t3, e2, this.length);
          for (var n2 = this[t3], i2 = 1, o2 = 0; ++o2 < e2 && (i2 *= 256); )
            n2 += this[t3 + o2] * i2;
          return n2 >= (i2 *= 128) && (n2 -= Math.pow(2, 8 * e2)), n2;
        }, u.prototype.readIntBE = function(t3, e2, r2) {
          t3 |= 0, e2 |= 0, r2 || O(t3, e2, this.length);
          for (var n2 = e2, i2 = 1, o2 = this[t3 + --n2]; n2 > 0 && (i2 *= 256); )
            o2 += this[t3 + --n2] * i2;
          return o2 >= (i2 *= 128) && (o2 -= Math.pow(2, 8 * e2)), o2;
        }, u.prototype.readInt8 = function(t3, e2) {
          return e2 || O(t3, 1, this.length), 128 & this[t3] ? -1 * (255 - this[t3] + 1) : this[t3];
        }, u.prototype.readInt16LE = function(t3, e2) {
          e2 || O(t3, 2, this.length);
          var r2 = this[t3] | this[t3 + 1] << 8;
          return 32768 & r2 ? 4294901760 | r2 : r2;
        }, u.prototype.readInt16BE = function(t3, e2) {
          e2 || O(t3, 2, this.length);
          var r2 = this[t3 + 1] | this[t3] << 8;
          return 32768 & r2 ? 4294901760 | r2 : r2;
        }, u.prototype.readInt32LE = function(t3, e2) {
          return e2 || O(t3, 4, this.length), this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16 | this[t3 + 3] << 24;
        }, u.prototype.readInt32BE = function(t3, e2) {
          return e2 || O(t3, 4, this.length), this[t3] << 24 | this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3];
        }, u.prototype.readFloatLE = function(t3, e2) {
          return e2 || O(t3, 4, this.length), i.read(this, t3, true, 23, 4);
        }, u.prototype.readFloatBE = function(t3, e2) {
          return e2 || O(t3, 4, this.length), i.read(this, t3, false, 23, 4);
        }, u.prototype.readDoubleLE = function(t3, e2) {
          return e2 || O(t3, 8, this.length), i.read(this, t3, true, 52, 8);
        }, u.prototype.readDoubleBE = function(t3, e2) {
          return e2 || O(t3, 8, this.length), i.read(this, t3, false, 52, 8);
        }, u.prototype.writeUIntLE = function(t3, e2, r2, n2) {
          t3 = +t3, e2 |= 0, r2 |= 0, n2 || A(this, t3, e2, r2, Math.pow(2, 8 * r2) - 1, 0);
          var i2 = 1, o2 = 0;
          for (this[e2] = 255 & t3; ++o2 < r2 && (i2 *= 256); )
            this[e2 + o2] = t3 / i2 & 255;
          return e2 + r2;
        }, u.prototype.writeUIntBE = function(t3, e2, r2, n2) {
          t3 = +t3, e2 |= 0, r2 |= 0, n2 || A(this, t3, e2, r2, Math.pow(2, 8 * r2) - 1, 0);
          var i2 = r2 - 1, o2 = 1;
          for (this[e2 + i2] = 255 & t3; --i2 >= 0 && (o2 *= 256); )
            this[e2 + i2] = t3 / o2 & 255;
          return e2 + r2;
        }, u.prototype.writeUInt8 = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), this[e2] = 255 & t3, e2 + 1;
        }, u.prototype.writeUInt16LE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : F(this, t3, e2, true), e2 + 2;
        }, u.prototype.writeUInt16BE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : F(this, t3, e2, false), e2 + 2;
        }, u.prototype.writeUInt32LE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2 + 3] = t3 >>> 24, this[e2 + 2] = t3 >>> 16, this[e2 + 1] = t3 >>> 8, this[e2] = 255 & t3) : L(this, t3, e2, true), e2 + 4;
        }, u.prototype.writeUInt32BE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : L(this, t3, e2, false), e2 + 4;
        }, u.prototype.writeIntLE = function(t3, e2, r2, n2) {
          if (t3 = +t3, e2 |= 0, !n2) {
            var i2 = Math.pow(2, 8 * r2 - 1);
            A(this, t3, e2, r2, i2 - 1, -i2);
          }
          var o2 = 0, s3 = 1, a2 = 0;
          for (this[e2] = 255 & t3; ++o2 < r2 && (s3 *= 256); )
            t3 < 0 && 0 === a2 && 0 !== this[e2 + o2 - 1] && (a2 = 1), this[e2 + o2] = (t3 / s3 >> 0) - a2 & 255;
          return e2 + r2;
        }, u.prototype.writeIntBE = function(t3, e2, r2, n2) {
          if (t3 = +t3, e2 |= 0, !n2) {
            var i2 = Math.pow(2, 8 * r2 - 1);
            A(this, t3, e2, r2, i2 - 1, -i2);
          }
          var o2 = r2 - 1, s3 = 1, a2 = 0;
          for (this[e2 + o2] = 255 & t3; --o2 >= 0 && (s3 *= 256); )
            t3 < 0 && 0 === a2 && 0 !== this[e2 + o2 + 1] && (a2 = 1), this[e2 + o2] = (t3 / s3 >> 0) - a2 & 255;
          return e2 + r2;
        }, u.prototype.writeInt8 = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), t3 < 0 && (t3 = 255 + t3 + 1), this[e2] = 255 & t3, e2 + 1;
        }, u.prototype.writeInt16LE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : F(this, t3, e2, true), e2 + 2;
        }, u.prototype.writeInt16BE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : F(this, t3, e2, false), e2 + 2;
        }, u.prototype.writeInt32LE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8, this[e2 + 2] = t3 >>> 16, this[e2 + 3] = t3 >>> 24) : L(this, t3, e2, true), e2 + 4;
        }, u.prototype.writeInt32BE = function(t3, e2, r2) {
          return t3 = +t3, e2 |= 0, r2 || A(this, t3, e2, 4, 2147483647, -2147483648), t3 < 0 && (t3 = 4294967295 + t3 + 1), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : L(this, t3, e2, false), e2 + 4;
        }, u.prototype.writeFloatLE = function(t3, e2, r2) {
          return B(this, t3, e2, true, r2);
        }, u.prototype.writeFloatBE = function(t3, e2, r2) {
          return B(this, t3, e2, false, r2);
        }, u.prototype.writeDoubleLE = function(t3, e2, r2) {
          return D(this, t3, e2, true, r2);
        }, u.prototype.writeDoubleBE = function(t3, e2, r2) {
          return D(this, t3, e2, false, r2);
        }, u.prototype.copy = function(t3, e2, r2, n2) {
          if (r2 || (r2 = 0), n2 || 0 === n2 || (n2 = this.length), e2 >= t3.length && (e2 = t3.length), e2 || (e2 = 0), n2 > 0 && n2 < r2 && (n2 = r2), n2 === r2)
            return 0;
          if (0 === t3.length || 0 === this.length)
            return 0;
          if (e2 < 0)
            throw new RangeError("targetStart out of bounds");
          if (r2 < 0 || r2 >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (n2 < 0)
            throw new RangeError("sourceEnd out of bounds");
          n2 > this.length && (n2 = this.length), t3.length - e2 < n2 - r2 && (n2 = t3.length - e2 + r2);
          var i2, o2 = n2 - r2;
          if (this === t3 && r2 < e2 && e2 < n2)
            for (i2 = o2 - 1; i2 >= 0; --i2)
              t3[i2 + e2] = this[i2 + r2];
          else if (o2 < 1e3 || !u.TYPED_ARRAY_SUPPORT)
            for (i2 = 0; i2 < o2; ++i2)
              t3[i2 + e2] = this[i2 + r2];
          else
            Uint8Array.prototype.set.call(t3, this.subarray(r2, r2 + o2), e2);
          return o2;
        }, u.prototype.fill = function(t3, e2, r2, n2) {
          if ("string" == typeof t3) {
            if ("string" == typeof e2 ? (n2 = e2, e2 = 0, r2 = this.length) : "string" == typeof r2 && (n2 = r2, r2 = this.length), 1 === t3.length) {
              var i2 = t3.charCodeAt(0);
              i2 < 256 && (t3 = i2);
            }
            if (void 0 !== n2 && "string" != typeof n2)
              throw new TypeError("encoding must be a string");
            if ("string" == typeof n2 && !u.isEncoding(n2))
              throw new TypeError("Unknown encoding: " + n2);
          } else
            "number" == typeof t3 && (t3 &= 255);
          if (e2 < 0 || this.length < e2 || this.length < r2)
            throw new RangeError("Out of range index");
          if (r2 <= e2)
            return this;
          var o2;
          if (e2 >>>= 0, r2 = void 0 === r2 ? this.length : r2 >>> 0, t3 || (t3 = 0), "number" == typeof t3)
            for (o2 = e2; o2 < r2; ++o2)
              this[o2] = t3;
          else {
            var s3 = u.isBuffer(t3) ? t3 : N(new u(t3, n2).toString()), a2 = s3.length;
            for (o2 = 0; o2 < r2 - e2; ++o2)
              this[o2 + e2] = s3[o2 % a2];
          }
          return this;
        };
        var I = /[^+\/0-9A-Za-z-_]/g;
        function U(t3) {
          return t3 < 16 ? "0" + t3.toString(16) : t3.toString(16);
        }
        function N(t3, e2) {
          var r2;
          e2 = e2 || 1 / 0;
          for (var n2 = t3.length, i2 = null, o2 = [], s3 = 0; s3 < n2; ++s3) {
            if ((r2 = t3.charCodeAt(s3)) > 55295 && r2 < 57344) {
              if (!i2) {
                if (r2 > 56319) {
                  (e2 -= 3) > -1 && o2.push(239, 191, 189);
                  continue;
                }
                if (s3 + 1 === n2) {
                  (e2 -= 3) > -1 && o2.push(239, 191, 189);
                  continue;
                }
                i2 = r2;
                continue;
              }
              if (r2 < 56320) {
                (e2 -= 3) > -1 && o2.push(239, 191, 189), i2 = r2;
                continue;
              }
              r2 = 65536 + (i2 - 55296 << 10 | r2 - 56320);
            } else
              i2 && (e2 -= 3) > -1 && o2.push(239, 191, 189);
            if (i2 = null, r2 < 128) {
              if ((e2 -= 1) < 0)
                break;
              o2.push(r2);
            } else if (r2 < 2048) {
              if ((e2 -= 2) < 0)
                break;
              o2.push(r2 >> 6 | 192, 63 & r2 | 128);
            } else if (r2 < 65536) {
              if ((e2 -= 3) < 0)
                break;
              o2.push(r2 >> 12 | 224, r2 >> 6 & 63 | 128, 63 & r2 | 128);
            } else {
              if (!(r2 < 1114112))
                throw new Error("Invalid code point");
              if ((e2 -= 4) < 0)
                break;
              o2.push(r2 >> 18 | 240, r2 >> 12 & 63 | 128, r2 >> 6 & 63 | 128, 63 & r2 | 128);
            }
          }
          return o2;
        }
        function H(t3) {
          return n.toByteArray(function(t4) {
            if ((t4 = function(t5) {
              return t5.trim ? t5.trim() : t5.replace(/^\s+|\s+$/g, "");
            }(t4).replace(I, "")).length < 2)
              return "";
            for (; t4.length % 4 != 0; )
              t4 += "=";
            return t4;
          }(t3));
        }
        function V(t3, e2, r2, n2) {
          for (var i2 = 0; i2 < n2 && !(i2 + r2 >= e2.length || i2 >= t3.length); ++i2)
            e2[i2 + r2] = t3[i2];
          return i2;
        }
      }).call(this, r(0));
    }, function(t, e) {
      var r, n, i = t.exports = {};
      function o() {
        throw new Error("setTimeout has not been defined");
      }
      function s2() {
        throw new Error("clearTimeout has not been defined");
      }
      function a(t2) {
        if (r === setTimeout)
          return setTimeout(t2, 0);
        if ((r === o || !r) && setTimeout)
          return r = setTimeout, setTimeout(t2, 0);
        try {
          return r(t2, 0);
        } catch (e2) {
          try {
            return r.call(null, t2, 0);
          } catch (e3) {
            return r.call(this, t2, 0);
          }
        }
      }
      !function() {
        try {
          r = "function" == typeof setTimeout ? setTimeout : o;
        } catch (t2) {
          r = o;
        }
        try {
          n = "function" == typeof clearTimeout ? clearTimeout : s2;
        } catch (t2) {
          n = s2;
        }
      }();
      var u, c = [], l = false, f = -1;
      function h() {
        l && u && (l = false, u.length ? c = u.concat(c) : f = -1, c.length && p());
      }
      function p() {
        if (!l) {
          var t2 = a(h);
          l = true;
          for (var e2 = c.length; e2; ) {
            for (u = c, c = []; ++f < e2; )
              u && u[f].run();
            f = -1, e2 = c.length;
          }
          u = null, l = false, function(t3) {
            if (n === clearTimeout)
              return clearTimeout(t3);
            if ((n === s2 || !n) && clearTimeout)
              return n = clearTimeout, clearTimeout(t3);
            try {
              n(t3);
            } catch (e3) {
              try {
                return n.call(null, t3);
              } catch (e4) {
                return n.call(this, t3);
              }
            }
          }(t2);
        }
      }
      function d(t2, e2) {
        this.fun = t2, this.array = e2;
      }
      function _() {
      }
      i.nextTick = function(t2) {
        var e2 = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r2 = 1; r2 < arguments.length; r2++)
            e2[r2 - 1] = arguments[r2];
        c.push(new d(t2, e2)), 1 !== c.length || l || a(p);
      }, d.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, i.title = "browser", i.browser = true, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = _, i.addListener = _, i.once = _, i.off = _, i.removeListener = _, i.removeAllListeners = _, i.emit = _, i.prependListener = _, i.prependOnceListener = _, i.listeners = function(t2) {
        return [];
      }, i.binding = function(t2) {
        throw new Error("process.binding is not supported");
      }, i.cwd = function() {
        return "/";
      }, i.chdir = function(t2) {
        throw new Error("process.chdir is not supported");
      }, i.umask = function() {
        return 0;
      };
    }, function(t, e, r) {
      (function(t2) {
        function r2(t3) {
          return Object.prototype.toString.call(t3);
        }
        e.isArray = function(t3) {
          return Array.isArray ? Array.isArray(t3) : "[object Array]" === r2(t3);
        }, e.isBoolean = function(t3) {
          return "boolean" == typeof t3;
        }, e.isNull = function(t3) {
          return null === t3;
        }, e.isNullOrUndefined = function(t3) {
          return null == t3;
        }, e.isNumber = function(t3) {
          return "number" == typeof t3;
        }, e.isString = function(t3) {
          return "string" == typeof t3;
        }, e.isSymbol = function(t3) {
          return "symbol" == typeof t3;
        }, e.isUndefined = function(t3) {
          return void 0 === t3;
        }, e.isRegExp = function(t3) {
          return "[object RegExp]" === r2(t3);
        }, e.isObject = function(t3) {
          return "object" == typeof t3 && null !== t3;
        }, e.isDate = function(t3) {
          return "[object Date]" === r2(t3);
        }, e.isError = function(t3) {
          return "[object Error]" === r2(t3) || t3 instanceof Error;
        }, e.isFunction = function(t3) {
          return "function" == typeof t3;
        }, e.isPrimitive = function(t3) {
          return null === t3 || "boolean" == typeof t3 || "number" == typeof t3 || "string" == typeof t3 || "symbol" == typeof t3 || void 0 === t3;
        }, e.isBuffer = t2.isBuffer;
      }).call(this, r(3).Buffer);
    }, function(t, e, r) {
      "use strict";
      (function(e2) {
        !e2.version || 0 === e2.version.indexOf("v0.") || 0 === e2.version.indexOf("v1.") && 0 !== e2.version.indexOf("v1.8.") ? t.exports = { nextTick: function(t2, r2, n, i) {
          if ("function" != typeof t2)
            throw new TypeError('"callback" argument must be a function');
          var o, s2, a = arguments.length;
          switch (a) {
            case 0:
            case 1:
              return e2.nextTick(t2);
            case 2:
              return e2.nextTick(function() {
                t2.call(null, r2);
              });
            case 3:
              return e2.nextTick(function() {
                t2.call(null, r2, n);
              });
            case 4:
              return e2.nextTick(function() {
                t2.call(null, r2, n, i);
              });
            default:
              for (o = new Array(a - 1), s2 = 0; s2 < o.length; )
                o[s2++] = arguments[s2];
              return e2.nextTick(function() {
                t2.apply(null, o);
              });
          }
        } } : t.exports = e2;
      }).call(this, r(4));
    }, function(t, e, r) {
      var n = r(3), i = n.Buffer;
      function o(t2, e2) {
        for (var r2 in t2)
          e2[r2] = t2[r2];
      }
      function s2(t2, e2, r2) {
        return i(t2, e2, r2);
      }
      i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, e), e.Buffer = s2), o(i, s2), s2.from = function(t2, e2, r2) {
        if ("number" == typeof t2)
          throw new TypeError("Argument must not be a number");
        return i(t2, e2, r2);
      }, s2.alloc = function(t2, e2, r2) {
        if ("number" != typeof t2)
          throw new TypeError("Argument must be a number");
        var n2 = i(t2);
        return void 0 !== e2 ? "string" == typeof r2 ? n2.fill(e2, r2) : n2.fill(e2) : n2.fill(0), n2;
      }, s2.allocUnsafe = function(t2) {
        if ("number" != typeof t2)
          throw new TypeError("Argument must be a number");
        return i(t2);
      }, s2.allocUnsafeSlow = function(t2) {
        if ("number" != typeof t2)
          throw new TypeError("Argument must be a number");
        return n.SlowBuffer(t2);
      };
    }, function(t, e, r) {
      var n = r(17)(Object, "create");
      t.exports = n;
    }, function(t, e, r) {
      var n = r(31);
      t.exports = function(t2, e2) {
        for (var r2 = t2.length; r2--; )
          if (n(t2[r2][0], e2))
            return r2;
        return -1;
      };
    }, function(t, e, r) {
      var n = r(96);
      t.exports = function(t2, e2) {
        var r2 = t2.__data__;
        return n(e2) ? r2["string" == typeof e2 ? "string" : "hash"] : r2.map;
      };
    }, function(t, e, r) {
      (function(t2) {
        var n = void 0 !== t2 && t2 || "undefined" != typeof self && self || window, i = Function.prototype.apply;
        function o(t3, e2) {
          this._id = t3, this._clearFn = e2;
        }
        e.setTimeout = function() {
          return new o(i.call(setTimeout, n, arguments), clearTimeout);
        }, e.setInterval = function() {
          return new o(i.call(setInterval, n, arguments), clearInterval);
        }, e.clearTimeout = e.clearInterval = function(t3) {
          t3 && t3.close();
        }, o.prototype.unref = o.prototype.ref = function() {
        }, o.prototype.close = function() {
          this._clearFn.call(n, this._id);
        }, e.enroll = function(t3, e2) {
          clearTimeout(t3._idleTimeoutId), t3._idleTimeout = e2;
        }, e.unenroll = function(t3) {
          clearTimeout(t3._idleTimeoutId), t3._idleTimeout = -1;
        }, e._unrefActive = e.active = function(t3) {
          clearTimeout(t3._idleTimeoutId);
          var e2 = t3._idleTimeout;
          e2 >= 0 && (t3._idleTimeoutId = setTimeout(function() {
            t3._onTimeout && t3._onTimeout();
          }, e2));
        }, r(35), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t2 && t2.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t2 && t2.clearImmediate || this && this.clearImmediate;
      }).call(this, r(0));
    }, function(t, e) {
      function r() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
      }
      function n(t2) {
        return "function" == typeof t2;
      }
      function i(t2) {
        return "object" == typeof t2 && null !== t2;
      }
      function o(t2) {
        return void 0 === t2;
      }
      t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(t2) {
        if (!function(t3) {
          return "number" == typeof t3;
        }(t2) || t2 < 0 || isNaN(t2))
          throw TypeError("n must be a positive number");
        return this._maxListeners = t2, this;
      }, r.prototype.emit = function(t2) {
        var e2, r2, s2, a, u, c;
        if (this._events || (this._events = {}), "error" === t2 && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
          if ((e2 = arguments[1]) instanceof Error)
            throw e2;
          var l = new Error('Uncaught, unspecified "error" event. (' + e2 + ")");
          throw l.context = e2, l;
        }
        if (o(r2 = this._events[t2]))
          return false;
        if (n(r2))
          switch (arguments.length) {
            case 1:
              r2.call(this);
              break;
            case 2:
              r2.call(this, arguments[1]);
              break;
            case 3:
              r2.call(this, arguments[1], arguments[2]);
              break;
            default:
              a = Array.prototype.slice.call(arguments, 1), r2.apply(this, a);
          }
        else if (i(r2))
          for (a = Array.prototype.slice.call(arguments, 1), s2 = (c = r2.slice()).length, u = 0; u < s2; u++)
            c[u].apply(this, a);
        return true;
      }, r.prototype.addListener = function(t2, e2) {
        var s2;
        if (!n(e2))
          throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t2, n(e2.listener) ? e2.listener : e2), this._events[t2] ? i(this._events[t2]) ? this._events[t2].push(e2) : this._events[t2] = [this._events[t2], e2] : this._events[t2] = e2, i(this._events[t2]) && !this._events[t2].warned && (s2 = o(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && s2 > 0 && this._events[t2].length > s2 && (this._events[t2].warned = true, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t2].length), "function" == typeof console.trace && console.trace()), this;
      }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(t2, e2) {
        if (!n(e2))
          throw TypeError("listener must be a function");
        var r2 = false;
        function i2() {
          this.removeListener(t2, i2), r2 || (r2 = true, e2.apply(this, arguments));
        }
        return i2.listener = e2, this.on(t2, i2), this;
      }, r.prototype.removeListener = function(t2, e2) {
        var r2, o2, s2, a;
        if (!n(e2))
          throw TypeError("listener must be a function");
        if (!this._events || !this._events[t2])
          return this;
        if (s2 = (r2 = this._events[t2]).length, o2 = -1, r2 === e2 || n(r2.listener) && r2.listener === e2)
          delete this._events[t2], this._events.removeListener && this.emit("removeListener", t2, e2);
        else if (i(r2)) {
          for (a = s2; a-- > 0; )
            if (r2[a] === e2 || r2[a].listener && r2[a].listener === e2) {
              o2 = a;
              break;
            }
          if (o2 < 0)
            return this;
          1 === r2.length ? (r2.length = 0, delete this._events[t2]) : r2.splice(o2, 1), this._events.removeListener && this.emit("removeListener", t2, e2);
        }
        return this;
      }, r.prototype.removeAllListeners = function(t2) {
        var e2, r2;
        if (!this._events)
          return this;
        if (!this._events.removeListener)
          return 0 === arguments.length ? this._events = {} : this._events[t2] && delete this._events[t2], this;
        if (0 === arguments.length) {
          for (e2 in this._events)
            "removeListener" !== e2 && this.removeAllListeners(e2);
          return this.removeAllListeners("removeListener"), this._events = {}, this;
        }
        if (n(r2 = this._events[t2]))
          this.removeListener(t2, r2);
        else if (r2)
          for (; r2.length; )
            this.removeListener(t2, r2[r2.length - 1]);
        return delete this._events[t2], this;
      }, r.prototype.listeners = function(t2) {
        return this._events && this._events[t2] ? n(this._events[t2]) ? [this._events[t2]] : this._events[t2].slice() : [];
      }, r.prototype.listenerCount = function(t2) {
        if (this._events) {
          var e2 = this._events[t2];
          if (n(e2))
            return 1;
          if (e2)
            return e2.length;
        }
        return 0;
      }, r.listenerCount = function(t2, e2) {
        return t2.listenerCount(e2);
      };
    }, function(t, e, r) {
      (e = t.exports = r(23)).Stream = e, e.Readable = e, e.Writable = r(14), e.Duplex = r(1), e.Transform = r(27), e.PassThrough = r(45);
    }, function(t, e, r) {
      "use strict";
      (function(e2, n, i) {
        var o = r(6);
        function s2(t2) {
          var e3 = this;
          this.next = null, this.entry = null, this.finish = function() {
            !function(t3, e4, r2) {
              var n2 = t3.entry;
              for (t3.entry = null; n2; ) {
                var i2 = n2.callback;
                e4.pendingcb--, i2(void 0), n2 = n2.next;
              }
              e4.corkedRequestsFree ? e4.corkedRequestsFree.next = t3 : e4.corkedRequestsFree = t3;
            }(e3, t2);
          };
        }
        t.exports = m;
        var a, u = !e2.browser && ["v0.10", "v0.9."].indexOf(e2.version.slice(0, 5)) > -1 ? n : o.nextTick;
        m.WritableState = y;
        var c = r(5);
        c.inherits = r(2);
        var l, f = { deprecate: r(44) }, h = r(24), p = r(7).Buffer, d = i.Uint8Array || function() {
        }, _ = r(25);
        function v() {
        }
        function y(t2, e3) {
          a = a || r(1), t2 = t2 || {};
          var n2 = e3 instanceof a;
          this.objectMode = !!t2.objectMode, n2 && (this.objectMode = this.objectMode || !!t2.writableObjectMode);
          var i2 = t2.highWaterMark, c2 = t2.writableHighWaterMark, l2 = this.objectMode ? 16 : 16384;
          this.highWaterMark = i2 || 0 === i2 ? i2 : n2 && (c2 || 0 === c2) ? c2 : l2, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
          var f2 = false === t2.decodeStrings;
          this.decodeStrings = !f2, this.defaultEncoding = t2.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = function(t3) {
            !function(t4, e4) {
              var r2 = t4._writableState, n3 = r2.sync, i3 = r2.writecb;
              if (function(t5) {
                t5.writing = false, t5.writecb = null, t5.length -= t5.writelen, t5.writelen = 0;
              }(r2), e4)
                !function(t5, e5, r3, n4, i4) {
                  --e5.pendingcb, r3 ? (o.nextTick(i4, n4), o.nextTick(x, t5, e5), t5._writableState.errorEmitted = true, t5.emit("error", n4)) : (i4(n4), t5._writableState.errorEmitted = true, t5.emit("error", n4), x(t5, e5));
                }(t4, r2, n3, e4, i3);
              else {
                var s3 = E(r2);
                s3 || r2.corked || r2.bufferProcessing || !r2.bufferedRequest || w(t4, r2), n3 ? u(b, t4, r2, s3, i3) : b(t4, r2, s3, i3);
              }
            }(e3, t3);
          }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = false, this.errorEmitted = false, this.bufferedRequestCount = 0, this.corkedRequestsFree = new s2(this);
        }
        function m(t2) {
          if (a = a || r(1), !(l.call(m, this) || this instanceof a))
            return new m(t2);
          this._writableState = new y(t2, this), this.writable = true, t2 && ("function" == typeof t2.write && (this._write = t2.write), "function" == typeof t2.writev && (this._writev = t2.writev), "function" == typeof t2.destroy && (this._destroy = t2.destroy), "function" == typeof t2.final && (this._final = t2.final)), h.call(this);
        }
        function g(t2, e3, r2, n2, i2, o2, s3) {
          e3.writelen = n2, e3.writecb = s3, e3.writing = true, e3.sync = true, r2 ? t2._writev(i2, e3.onwrite) : t2._write(i2, o2, e3.onwrite), e3.sync = false;
        }
        function b(t2, e3, r2, n2) {
          r2 || function(t3, e4) {
            0 === e4.length && e4.needDrain && (e4.needDrain = false, t3.emit("drain"));
          }(t2, e3), e3.pendingcb--, n2(), x(t2, e3);
        }
        function w(t2, e3) {
          e3.bufferProcessing = true;
          var r2 = e3.bufferedRequest;
          if (t2._writev && r2 && r2.next) {
            var n2 = e3.bufferedRequestCount, i2 = new Array(n2), o2 = e3.corkedRequestsFree;
            o2.entry = r2;
            for (var a2 = 0, u2 = true; r2; )
              i2[a2] = r2, r2.isBuf || (u2 = false), r2 = r2.next, a2 += 1;
            i2.allBuffers = u2, g(t2, e3, true, e3.length, i2, "", o2.finish), e3.pendingcb++, e3.lastBufferedRequest = null, o2.next ? (e3.corkedRequestsFree = o2.next, o2.next = null) : e3.corkedRequestsFree = new s2(e3), e3.bufferedRequestCount = 0;
          } else {
            for (; r2; ) {
              var c2 = r2.chunk, l2 = r2.encoding, f2 = r2.callback;
              if (g(t2, e3, false, e3.objectMode ? 1 : c2.length, c2, l2, f2), r2 = r2.next, e3.bufferedRequestCount--, e3.writing)
                break;
            }
            null === r2 && (e3.lastBufferedRequest = null);
          }
          e3.bufferedRequest = r2, e3.bufferProcessing = false;
        }
        function E(t2) {
          return t2.ending && 0 === t2.length && null === t2.bufferedRequest && !t2.finished && !t2.writing;
        }
        function C(t2, e3) {
          t2._final(function(r2) {
            e3.pendingcb--, r2 && t2.emit("error", r2), e3.prefinished = true, t2.emit("prefinish"), x(t2, e3);
          });
        }
        function x(t2, e3) {
          var r2 = E(e3);
          return r2 && (function(t3, e4) {
            e4.prefinished || e4.finalCalled || ("function" == typeof t3._final ? (e4.pendingcb++, e4.finalCalled = true, o.nextTick(C, t3, e4)) : (e4.prefinished = true, t3.emit("prefinish")));
          }(t2, e3), 0 === e3.pendingcb && (e3.finished = true, t2.emit("finish"))), r2;
        }
        c.inherits(m, h), y.prototype.getBuffer = function() {
          for (var t2 = this.bufferedRequest, e3 = []; t2; )
            e3.push(t2), t2 = t2.next;
          return e3;
        }, function() {
          try {
            Object.defineProperty(y.prototype, "buffer", { get: f.deprecate(function() {
              return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
          } catch (t2) {
          }
        }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (l = Function.prototype[Symbol.hasInstance], Object.defineProperty(m, Symbol.hasInstance, { value: function(t2) {
          return !!l.call(this, t2) || this === m && t2 && t2._writableState instanceof y;
        } })) : l = function(t2) {
          return t2 instanceof this;
        }, m.prototype.pipe = function() {
          this.emit("error", new Error("Cannot pipe, not readable"));
        }, m.prototype.write = function(t2, e3, r2) {
          var n2 = this._writableState, i2 = false, s3 = !n2.objectMode && function(t3) {
            return p.isBuffer(t3) || t3 instanceof d;
          }(t2);
          return s3 && !p.isBuffer(t2) && (t2 = function(t3) {
            return p.from(t3);
          }(t2)), "function" == typeof e3 && (r2 = e3, e3 = null), s3 ? e3 = "buffer" : e3 || (e3 = n2.defaultEncoding), "function" != typeof r2 && (r2 = v), n2.ended ? function(t3, e4) {
            var r3 = new Error("write after end");
            t3.emit("error", r3), o.nextTick(e4, r3);
          }(this, r2) : (s3 || function(t3, e4, r3, n3) {
            var i3 = true, s4 = false;
            return null === r3 ? s4 = new TypeError("May not write null values to stream") : "string" == typeof r3 || void 0 === r3 || e4.objectMode || (s4 = new TypeError("Invalid non-string/buffer chunk")), s4 && (t3.emit("error", s4), o.nextTick(n3, s4), i3 = false), i3;
          }(this, n2, t2, r2)) && (n2.pendingcb++, i2 = function(t3, e4, r3, n3, i3, o2) {
            if (!r3) {
              var s4 = function(t4, e5, r4) {
                return t4.objectMode || false === t4.decodeStrings || "string" != typeof e5 || (e5 = p.from(e5, r4)), e5;
              }(e4, n3, i3);
              n3 !== s4 && (r3 = true, i3 = "buffer", n3 = s4);
            }
            var a2 = e4.objectMode ? 1 : n3.length;
            e4.length += a2;
            var u2 = e4.length < e4.highWaterMark;
            if (u2 || (e4.needDrain = true), e4.writing || e4.corked) {
              var c2 = e4.lastBufferedRequest;
              e4.lastBufferedRequest = { chunk: n3, encoding: i3, isBuf: r3, callback: o2, next: null }, c2 ? c2.next = e4.lastBufferedRequest : e4.bufferedRequest = e4.lastBufferedRequest, e4.bufferedRequestCount += 1;
            } else
              g(t3, e4, false, a2, n3, i3, o2);
            return u2;
          }(this, n2, s3, t2, e3, r2)), i2;
        }, m.prototype.cork = function() {
          this._writableState.corked++;
        }, m.prototype.uncork = function() {
          var t2 = this._writableState;
          t2.corked && (t2.corked--, t2.writing || t2.corked || t2.finished || t2.bufferProcessing || !t2.bufferedRequest || w(this, t2));
        }, m.prototype.setDefaultEncoding = function(t2) {
          if ("string" == typeof t2 && (t2 = t2.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t2 + "").toLowerCase()) > -1))
            throw new TypeError("Unknown encoding: " + t2);
          return this._writableState.defaultEncoding = t2, this;
        }, Object.defineProperty(m.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
          return this._writableState.highWaterMark;
        } }), m.prototype._write = function(t2, e3, r2) {
          r2(new Error("_write() is not implemented"));
        }, m.prototype._writev = null, m.prototype.end = function(t2, e3, r2) {
          var n2 = this._writableState;
          "function" == typeof t2 ? (r2 = t2, t2 = null, e3 = null) : "function" == typeof e3 && (r2 = e3, e3 = null), null !== t2 && void 0 !== t2 && this.write(t2, e3), n2.corked && (n2.corked = 1, this.uncork()), n2.ending || n2.finished || function(t3, e4, r3) {
            e4.ending = true, x(t3, e4), r3 && (e4.finished ? o.nextTick(r3) : t3.once("finish", r3)), e4.ended = true, t3.writable = false;
          }(this, n2, r2);
        }, Object.defineProperty(m.prototype, "destroyed", { get: function() {
          return void 0 !== this._writableState && this._writableState.destroyed;
        }, set: function(t2) {
          this._writableState && (this._writableState.destroyed = t2);
        } }), m.prototype.destroy = _.destroy, m.prototype._undestroy = _.undestroy, m.prototype._destroy = function(t2, e3) {
          this.end(), e3(t2);
        };
      }).call(this, r(4), r(11).setImmediate, r(0));
    }, function(t, e, r) {
      (function(e2, r2, n) {
        t.exports = function t2(e3, r3, n2) {
          function i(s3, a) {
            if (!r3[s3]) {
              if (!e3[s3]) {
                var u = "function" == typeof _dereq_ && _dereq_;
                if (!a && u)
                  return u(s3, true);
                if (o)
                  return o(s3, true);
                var c = new Error("Cannot find module '" + s3 + "'");
                throw c.code = "MODULE_NOT_FOUND", c;
              }
              var l = r3[s3] = { exports: {} };
              e3[s3][0].call(l.exports, function(t3) {
                return i(e3[s3][1][t3] || t3);
              }, l, l.exports, t2, e3, r3, n2);
            }
            return r3[s3].exports;
          }
          for (var o = "function" == typeof _dereq_ && _dereq_, s2 = 0; s2 < n2.length; s2++)
            i(n2[s2]);
          return i;
        }({ 1: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(t3) {
            var e4 = t3._SomePromiseArray;
            function r4(t4) {
              var r5 = new e4(t4), n2 = r5.promise();
              return r5.setHowMany(1), r5.setUnwrap(), r5.init(), n2;
            }
            t3.any = function(t4) {
              return r4(t4);
            }, t3.prototype.any = function() {
              return r4(this);
            };
          };
        }, {}], 2: [function(t2, r3, n2) {
          "use strict";
          var i;
          try {
            throw new Error();
          } catch (t3) {
            i = t3;
          }
          var o = t2("./schedule"), s2 = t2("./queue"), a = t2("./util");
          function u() {
            this._customScheduler = false, this._isTickUsed = false, this._lateQueue = new s2(16), this._normalQueue = new s2(16), this._haveDrainedQueues = false, this._trampolineEnabled = true;
            var t3 = this;
            this.drainQueues = function() {
              t3._drainQueues();
            }, this._schedule = o;
          }
          function c(t3, e3, r4) {
            this._lateQueue.push(t3, e3, r4), this._queueTick();
          }
          function l(t3, e3, r4) {
            this._normalQueue.push(t3, e3, r4), this._queueTick();
          }
          function f(t3) {
            this._normalQueue._pushOne(t3), this._queueTick();
          }
          u.prototype.setScheduler = function(t3) {
            var e3 = this._schedule;
            return this._schedule = t3, this._customScheduler = true, e3;
          }, u.prototype.hasCustomScheduler = function() {
            return this._customScheduler;
          }, u.prototype.enableTrampoline = function() {
            this._trampolineEnabled = true;
          }, u.prototype.disableTrampolineIfNecessary = function() {
            a.hasDevTools && (this._trampolineEnabled = false);
          }, u.prototype.haveItemsQueued = function() {
            return this._isTickUsed || this._haveDrainedQueues;
          }, u.prototype.fatalError = function(t3, r4) {
            r4 ? (e2.stderr.write("Fatal " + (t3 instanceof Error ? t3.stack : t3) + "\n"), e2.exit(2)) : this.throwLater(t3);
          }, u.prototype.throwLater = function(t3, e3) {
            if (1 === arguments.length && (e3 = t3, t3 = function() {
              throw e3;
            }), "undefined" != typeof setTimeout)
              setTimeout(function() {
                t3(e3);
              }, 0);
            else
              try {
                this._schedule(function() {
                  t3(e3);
                });
              } catch (t4) {
                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
              }
          }, a.hasDevTools ? (u.prototype.invokeLater = function(t3, e3, r4) {
            this._trampolineEnabled ? c.call(this, t3, e3, r4) : this._schedule(function() {
              setTimeout(function() {
                t3.call(e3, r4);
              }, 100);
            });
          }, u.prototype.invoke = function(t3, e3, r4) {
            this._trampolineEnabled ? l.call(this, t3, e3, r4) : this._schedule(function() {
              t3.call(e3, r4);
            });
          }, u.prototype.settlePromises = function(t3) {
            this._trampolineEnabled ? f.call(this, t3) : this._schedule(function() {
              t3._settlePromises();
            });
          }) : (u.prototype.invokeLater = c, u.prototype.invoke = l, u.prototype.settlePromises = f), u.prototype._drainQueue = function(t3) {
            for (; t3.length() > 0; ) {
              var e3 = t3.shift();
              if ("function" == typeof e3) {
                var r4 = t3.shift(), n3 = t3.shift();
                e3.call(r4, n3);
              } else
                e3._settlePromises();
            }
          }, u.prototype._drainQueues = function() {
            this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = true, this._drainQueue(this._lateQueue);
          }, u.prototype._queueTick = function() {
            this._isTickUsed || (this._isTickUsed = true, this._schedule(this.drainQueues));
          }, u.prototype._reset = function() {
            this._isTickUsed = false;
          }, r3.exports = u, r3.exports.firstLineError = i;
        }, { "./queue": 26, "./schedule": 29, "./util": 36 }], 3: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(t3, e4, r4, n2) {
            var i = false, o = function(t4, e5) {
              this._reject(e5);
            }, s2 = function(t4, e5) {
              e5.promiseRejectionQueued = true, e5.bindingPromise._then(o, o, null, this, t4);
            }, a = function(t4, e5) {
              0 == (50397184 & this._bitField) && this._resolveCallback(e5.target);
            }, u = function(t4, e5) {
              e5.promiseRejectionQueued || this._reject(t4);
            };
            t3.prototype.bind = function(o2) {
              i || (i = true, t3.prototype._propagateFrom = n2.propagateFromFunction(), t3.prototype._boundValue = n2.boundValueFunction());
              var c = r4(o2), l = new t3(e4);
              l._propagateFrom(this, 1);
              var f = this._target();
              if (l._setBoundTo(c), c instanceof t3) {
                var h = { promiseRejectionQueued: false, promise: l, target: f, bindingPromise: c };
                f._then(e4, s2, void 0, l, h), c._then(a, u, void 0, l, h), l._setOnCancel(c);
              } else
                l._resolveCallback(f);
              return l;
            }, t3.prototype._setBoundTo = function(t4) {
              void 0 !== t4 ? (this._bitField = 2097152 | this._bitField, this._boundTo = t4) : this._bitField = -2097153 & this._bitField;
            }, t3.prototype._isBound = function() {
              return 2097152 == (2097152 & this._bitField);
            }, t3.bind = function(e5, r5) {
              return t3.resolve(r5).bind(e5);
            };
          };
        }, {}], 4: [function(t2, e3, r3) {
          "use strict";
          var n2;
          "undefined" != typeof Promise && (n2 = Promise);
          var i = t2("./promise")();
          i.noConflict = function() {
            try {
              Promise === i && (Promise = n2);
            } catch (t3) {
            }
            return i;
          }, e3.exports = i;
        }, { "./promise": 22 }], 5: [function(t2, e3, r3) {
          "use strict";
          var n2 = Object.create;
          if (n2) {
            var i = n2(null), o = n2(null);
            i[" size"] = o[" size"] = 0;
          }
          e3.exports = function(e4) {
            var r4 = t2("./util"), n3 = r4.canEvaluate;
            function i2(t3) {
              return function(t4, n4) {
                var i3;
                if (null != t4 && (i3 = t4[n4]), "function" != typeof i3) {
                  var o3 = "Object " + r4.classString(t4) + " has no method '" + r4.toString(n4) + "'";
                  throw new e4.TypeError(o3);
                }
                return i3;
              }(t3, this.pop()).apply(t3, this);
            }
            function o2(t3) {
              return t3[this];
            }
            function s2(t3) {
              var e5 = +this;
              return e5 < 0 && (e5 = Math.max(0, e5 + t3.length)), t3[e5];
            }
            r4.isIdentifier, e4.prototype.call = function(t3) {
              var e5 = [].slice.call(arguments, 1);
              return e5.push(t3), this._then(i2, void 0, void 0, e5, void 0);
            }, e4.prototype.get = function(t3) {
              var e5;
              if ("number" == typeof t3)
                e5 = s2;
              else if (n3) {
                var r5 = (void 0)(t3);
                e5 = null !== r5 ? r5 : o2;
              } else
                e5 = o2;
              return this._then(e5, void 0, void 0, t3, void 0);
            };
          };
        }, { "./util": 36 }], 6: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i) {
            var o = t2("./util"), s2 = o.tryCatch, a = o.errorObj, u = e4._async;
            e4.prototype.break = e4.prototype.cancel = function() {
              if (!i.cancellation())
                return this._warn("cancellation is disabled");
              for (var t3 = this, e5 = t3; t3._isCancellable(); ) {
                if (!t3._cancelBy(e5)) {
                  e5._isFollowing() ? e5._followee().cancel() : e5._cancelBranched();
                  break;
                }
                var r5 = t3._cancellationParent;
                if (null == r5 || !r5._isCancellable()) {
                  t3._isFollowing() ? t3._followee().cancel() : t3._cancelBranched();
                  break;
                }
                t3._isFollowing() && t3._followee().cancel(), t3._setWillBeCancelled(), e5 = t3, t3 = r5;
              }
            }, e4.prototype._branchHasCancelled = function() {
              this._branchesRemainingToCancel--;
            }, e4.prototype._enoughBranchesHaveCancelled = function() {
              return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
            }, e4.prototype._cancelBy = function(t3) {
              return t3 === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), true) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), true));
            }, e4.prototype._cancelBranched = function() {
              this._enoughBranchesHaveCancelled() && this._cancel();
            }, e4.prototype._cancel = function() {
              this._isCancellable() && (this._setCancelled(), u.invoke(this._cancelPromises, this, void 0));
            }, e4.prototype._cancelPromises = function() {
              this._length() > 0 && this._settlePromises();
            }, e4.prototype._unsetOnCancel = function() {
              this._onCancelField = void 0;
            }, e4.prototype._isCancellable = function() {
              return this.isPending() && !this._isCancelled();
            }, e4.prototype.isCancellable = function() {
              return this.isPending() && !this.isCancelled();
            }, e4.prototype._doInvokeOnCancel = function(t3, e5) {
              if (o.isArray(t3))
                for (var r5 = 0; r5 < t3.length; ++r5)
                  this._doInvokeOnCancel(t3[r5], e5);
              else if (void 0 !== t3)
                if ("function" == typeof t3) {
                  if (!e5) {
                    var n3 = s2(t3).call(this._boundValue());
                    n3 === a && (this._attachExtraTrace(n3.e), u.throwLater(n3.e));
                  }
                } else
                  t3._resultCancelled(this);
            }, e4.prototype._invokeOnCancel = function() {
              var t3 = this._onCancel();
              this._unsetOnCancel(), u.invoke(this._doInvokeOnCancel, this, t3);
            }, e4.prototype._invokeInternalOnCancel = function() {
              this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), true), this._unsetOnCancel());
            }, e4.prototype._resultCancelled = function() {
              this.cancel();
            };
          };
        }, { "./util": 36 }], 7: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4) {
            var r4 = t2("./util"), n2 = t2("./es5").keys, i = r4.tryCatch, o = r4.errorObj;
            return function(t3, s2, a) {
              return function(u) {
                var c = a._boundValue();
                t:
                  for (var l = 0; l < t3.length; ++l) {
                    var f = t3[l];
                    if (f === Error || null != f && f.prototype instanceof Error) {
                      if (u instanceof f)
                        return i(s2).call(c, u);
                    } else if ("function" == typeof f) {
                      var h = i(f).call(c, u);
                      if (h === o)
                        return h;
                      if (h)
                        return i(s2).call(c, u);
                    } else if (r4.isObject(u)) {
                      for (var p = n2(f), d = 0; d < p.length; ++d) {
                        var _ = p[d];
                        if (f[_] != u[_])
                          continue t;
                      }
                      return i(s2).call(c, u);
                    }
                  }
                return e4;
              };
            };
          };
        }, { "./es5": 13, "./util": 36 }], 8: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(t3) {
            var e4 = false, r4 = [];
            function n2() {
              this._trace = new n2.CapturedTrace(i());
            }
            function i() {
              var t4 = r4.length - 1;
              if (t4 >= 0)
                return r4[t4];
            }
            return t3.prototype._promiseCreated = function() {
            }, t3.prototype._pushContext = function() {
            }, t3.prototype._popContext = function() {
              return null;
            }, t3._peekContext = t3.prototype._peekContext = function() {
            }, n2.prototype._pushContext = function() {
              void 0 !== this._trace && (this._trace._promiseCreated = null, r4.push(this._trace));
            }, n2.prototype._popContext = function() {
              if (void 0 !== this._trace) {
                var t4 = r4.pop(), e5 = t4._promiseCreated;
                return t4._promiseCreated = null, e5;
              }
              return null;
            }, n2.CapturedTrace = null, n2.create = function() {
              if (e4)
                return new n2();
            }, n2.deactivateLongStackTraces = function() {
            }, n2.activateLongStackTraces = function() {
              var r5 = t3.prototype._pushContext, o = t3.prototype._popContext, s2 = t3._peekContext, a = t3.prototype._peekContext, u = t3.prototype._promiseCreated;
              n2.deactivateLongStackTraces = function() {
                t3.prototype._pushContext = r5, t3.prototype._popContext = o, t3._peekContext = s2, t3.prototype._peekContext = a, t3.prototype._promiseCreated = u, e4 = false;
              }, e4 = true, t3.prototype._pushContext = n2.prototype._pushContext, t3.prototype._popContext = n2.prototype._popContext, t3._peekContext = t3.prototype._peekContext = i, t3.prototype._promiseCreated = function() {
                var t4 = this._peekContext();
                t4 && null == t4._promiseCreated && (t4._promiseCreated = this);
              };
            }, n2;
          };
        }, {}], 9: [function(t2, r3, n2) {
          "use strict";
          r3.exports = function(r4, n3) {
            var i, o, s2, a = r4._getDomain, u = r4._async, c = t2("./errors").Warning, l = t2("./util"), f = l.canAttachTrace, h = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, p = /\((?:timers\.js):\d+:\d+\)/, d = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, _ = null, v = null, y = false, m = !(0 == l.env("BLUEBIRD_DEBUG")), g = !(0 == l.env("BLUEBIRD_WARNINGS") || !m && !l.env("BLUEBIRD_WARNINGS")), b = !(0 == l.env("BLUEBIRD_LONG_STACK_TRACES") || !m && !l.env("BLUEBIRD_LONG_STACK_TRACES")), w = 0 != l.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (g || !!l.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
            r4.prototype.suppressUnhandledRejections = function() {
              var t3 = this._target();
              t3._bitField = -1048577 & t3._bitField | 524288;
            }, r4.prototype._ensurePossibleRejectionHandled = function() {
              if (0 == (524288 & this._bitField)) {
                this._setRejectionIsUnhandled();
                var t3 = this;
                setTimeout(function() {
                  t3._notifyUnhandledRejection();
                }, 1);
              }
            }, r4.prototype._notifyUnhandledRejectionIsHandled = function() {
              q("rejectionHandled", i, void 0, this);
            }, r4.prototype._setReturnedNonUndefined = function() {
              this._bitField = 268435456 | this._bitField;
            }, r4.prototype._returnedNonUndefined = function() {
              return 0 != (268435456 & this._bitField);
            }, r4.prototype._notifyUnhandledRejection = function() {
              if (this._isRejectionUnhandled()) {
                var t3 = this._settledValue();
                this._setUnhandledRejectionIsNotified(), q("unhandledRejection", o, t3, this);
              }
            }, r4.prototype._setUnhandledRejectionIsNotified = function() {
              this._bitField = 262144 | this._bitField;
            }, r4.prototype._unsetUnhandledRejectionIsNotified = function() {
              this._bitField = -262145 & this._bitField;
            }, r4.prototype._isUnhandledRejectionNotified = function() {
              return (262144 & this._bitField) > 0;
            }, r4.prototype._setRejectionIsUnhandled = function() {
              this._bitField = 1048576 | this._bitField;
            }, r4.prototype._unsetRejectionIsUnhandled = function() {
              this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
            }, r4.prototype._isRejectionUnhandled = function() {
              return (1048576 & this._bitField) > 0;
            }, r4.prototype._warn = function(t3, e3, r5) {
              return U(t3, e3, r5 || this);
            }, r4.onPossiblyUnhandledRejection = function(t3) {
              var e3 = a();
              o = "function" == typeof t3 ? null === e3 ? t3 : l.domainBind(e3, t3) : void 0;
            }, r4.onUnhandledRejectionHandled = function(t3) {
              var e3 = a();
              i = "function" == typeof t3 ? null === e3 ? t3 : l.domainBind(e3, t3) : void 0;
            };
            var E = function() {
            };
            r4.longStackTraces = function() {
              if (u.haveItemsQueued() && !J.longStackTraces)
                throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
              if (!J.longStackTraces && Y()) {
                var t3 = r4.prototype._captureStackTrace, e3 = r4.prototype._attachExtraTrace;
                J.longStackTraces = true, E = function() {
                  if (u.haveItemsQueued() && !J.longStackTraces)
                    throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                  r4.prototype._captureStackTrace = t3, r4.prototype._attachExtraTrace = e3, n3.deactivateLongStackTraces(), u.enableTrampoline(), J.longStackTraces = false;
                }, r4.prototype._captureStackTrace = D, r4.prototype._attachExtraTrace = I, n3.activateLongStackTraces(), u.disableTrampolineIfNecessary();
              }
            }, r4.hasLongStackTraces = function() {
              return J.longStackTraces && Y();
            };
            var C = function() {
              try {
                if ("function" == typeof CustomEvent) {
                  var t3 = new CustomEvent("CustomEvent");
                  return l.global.dispatchEvent(t3), function(t4, e3) {
                    var r5 = new CustomEvent(t4.toLowerCase(), { detail: e3, cancelable: true });
                    return !l.global.dispatchEvent(r5);
                  };
                }
                return "function" == typeof Event ? (t3 = new Event("CustomEvent"), l.global.dispatchEvent(t3), function(t4, e3) {
                  var r5 = new Event(t4.toLowerCase(), { cancelable: true });
                  return r5.detail = e3, !l.global.dispatchEvent(r5);
                }) : ((t3 = document.createEvent("CustomEvent")).initCustomEvent("testingtheevent", false, true, {}), l.global.dispatchEvent(t3), function(t4, e3) {
                  var r5 = document.createEvent("CustomEvent");
                  return r5.initCustomEvent(t4.toLowerCase(), false, true, e3), !l.global.dispatchEvent(r5);
                });
              } catch (t4) {
              }
              return function() {
                return false;
              };
            }(), x = l.isNode ? function() {
              return e2.emit.apply(e2, arguments);
            } : l.global ? function(t3) {
              var e3 = "on" + t3.toLowerCase(), r5 = l.global[e3];
              return !!r5 && (r5.apply(l.global, [].slice.call(arguments, 1)), true);
            } : function() {
              return false;
            };
            function j(t3, e3) {
              return { promise: e3 };
            }
            var S = { promiseCreated: j, promiseFulfilled: j, promiseRejected: j, promiseResolved: j, promiseCancelled: j, promiseChained: function(t3, e3, r5) {
              return { promise: e3, child: r5 };
            }, warning: function(t3, e3) {
              return { warning: e3 };
            }, unhandledRejection: function(t3, e3, r5) {
              return { reason: e3, promise: r5 };
            }, rejectionHandled: j }, R = function(t3) {
              var e3 = false;
              try {
                e3 = x.apply(null, arguments);
              } catch (t4) {
                u.throwLater(t4), e3 = true;
              }
              var r5 = false;
              try {
                r5 = C(t3, S[t3].apply(null, arguments));
              } catch (t4) {
                u.throwLater(t4), r5 = true;
              }
              return r5 || e3;
            };
            function k() {
              return false;
            }
            function T(t3, e3, r5) {
              var n4 = this;
              try {
                t3(e3, r5, function(t4) {
                  if ("function" != typeof t4)
                    throw new TypeError("onCancel must be a function, got: " + l.toString(t4));
                  n4._attachCancellationCallback(t4);
                });
              } catch (t4) {
                return t4;
              }
            }
            function P(t3) {
              if (!this._isCancellable())
                return this;
              var e3 = this._onCancel();
              void 0 !== e3 ? l.isArray(e3) ? e3.push(t3) : this._setOnCancel([e3, t3]) : this._setOnCancel(t3);
            }
            function O() {
              return this._onCancelField;
            }
            function A(t3) {
              this._onCancelField = t3;
            }
            function F() {
              this._cancellationParent = void 0, this._onCancelField = void 0;
            }
            function L(t3, e3) {
              if (0 != (1 & e3)) {
                this._cancellationParent = t3;
                var r5 = t3._branchesRemainingToCancel;
                void 0 === r5 && (r5 = 0), t3._branchesRemainingToCancel = r5 + 1;
              }
              0 != (2 & e3) && t3._isBound() && this._setBoundTo(t3._boundTo);
            }
            r4.config = function(t3) {
              if ("longStackTraces" in (t3 = Object(t3)) && (t3.longStackTraces ? r4.longStackTraces() : !t3.longStackTraces && r4.hasLongStackTraces() && E()), "warnings" in t3) {
                var e3 = t3.warnings;
                J.warnings = !!e3, w = J.warnings, l.isObject(e3) && "wForgottenReturn" in e3 && (w = !!e3.wForgottenReturn);
              }
              if ("cancellation" in t3 && t3.cancellation && !J.cancellation) {
                if (u.haveItemsQueued())
                  throw new Error("cannot enable cancellation after promises are in use");
                r4.prototype._clearCancellationData = F, r4.prototype._propagateFrom = L, r4.prototype._onCancel = O, r4.prototype._setOnCancel = A, r4.prototype._attachCancellationCallback = P, r4.prototype._execute = T, M = L, J.cancellation = true;
              }
              return "monitoring" in t3 && (t3.monitoring && !J.monitoring ? (J.monitoring = true, r4.prototype._fireEvent = R) : !t3.monitoring && J.monitoring && (J.monitoring = false, r4.prototype._fireEvent = k)), r4;
            }, r4.prototype._fireEvent = k, r4.prototype._execute = function(t3, e3, r5) {
              try {
                t3(e3, r5);
              } catch (t4) {
                return t4;
              }
            }, r4.prototype._onCancel = function() {
            }, r4.prototype._setOnCancel = function(t3) {
            }, r4.prototype._attachCancellationCallback = function(t3) {
            }, r4.prototype._captureStackTrace = function() {
            }, r4.prototype._attachExtraTrace = function() {
            }, r4.prototype._clearCancellationData = function() {
            }, r4.prototype._propagateFrom = function(t3, e3) {
            };
            var M = function(t3, e3) {
              0 != (2 & e3) && t3._isBound() && this._setBoundTo(t3._boundTo);
            };
            function B() {
              var t3 = this._boundTo;
              return void 0 !== t3 && t3 instanceof r4 ? t3.isFulfilled() ? t3.value() : void 0 : t3;
            }
            function D() {
              this._trace = new X(this._peekContext());
            }
            function I(t3, e3) {
              if (f(t3)) {
                var r5 = this._trace;
                if (void 0 !== r5 && e3 && (r5 = r5._parent), void 0 !== r5)
                  r5.attachExtraTrace(t3);
                else if (!t3.__stackCleaned__) {
                  var n4 = H(t3);
                  l.notEnumerableProp(t3, "stack", n4.message + "\n" + n4.stack.join("\n")), l.notEnumerableProp(t3, "__stackCleaned__", true);
                }
              }
            }
            function U(t3, e3, n4) {
              if (J.warnings) {
                var i2, o2 = new c(t3);
                if (e3)
                  n4._attachExtraTrace(o2);
                else if (J.longStackTraces && (i2 = r4._peekContext()))
                  i2.attachExtraTrace(o2);
                else {
                  var s3 = H(o2);
                  o2.stack = s3.message + "\n" + s3.stack.join("\n");
                }
                R("warning", o2) || V(o2, "", true);
              }
            }
            function N(t3) {
              for (var e3 = [], r5 = 0; r5 < t3.length; ++r5) {
                var n4 = t3[r5], i2 = "    (No stack trace)" === n4 || _.test(n4), o2 = i2 && $(n4);
                i2 && !o2 && (y && " " !== n4.charAt(0) && (n4 = "    " + n4), e3.push(n4));
              }
              return e3;
            }
            function H(t3) {
              var e3 = t3.stack, r5 = t3.toString();
              return e3 = "string" == typeof e3 && e3.length > 0 ? function(t4) {
                for (var e4 = t4.stack.replace(/\s+$/g, "").split("\n"), r6 = 0; r6 < e4.length; ++r6) {
                  var n4 = e4[r6];
                  if ("    (No stack trace)" === n4 || _.test(n4))
                    break;
                }
                return r6 > 0 && "SyntaxError" != t4.name && (e4 = e4.slice(r6)), e4;
              }(t3) : ["    (No stack trace)"], { message: r5, stack: "SyntaxError" == t3.name ? e3 : N(e3) };
            }
            function V(t3, e3, r5) {
              if ("undefined" != typeof console) {
                var n4;
                if (l.isObject(t3)) {
                  var i2 = t3.stack;
                  n4 = e3 + v(i2, t3);
                } else
                  n4 = e3 + String(t3);
                "function" == typeof s2 ? s2(n4, r5) : "function" != typeof console.log && "object" != typeof console.log || console.log(n4);
              }
            }
            function q(t3, e3, r5, n4) {
              var i2 = false;
              try {
                "function" == typeof e3 && (i2 = true, "rejectionHandled" === t3 ? e3(n4) : e3(r5, n4));
              } catch (t4) {
                u.throwLater(t4);
              }
              "unhandledRejection" === t3 ? R(t3, r5, n4) || i2 || V(r5, "Unhandled rejection ") : R(t3, n4);
            }
            function W(t3) {
              var e3;
              if ("function" == typeof t3)
                e3 = "[function " + (t3.name || "anonymous") + "]";
              else {
                if (e3 = t3 && "function" == typeof t3.toString ? t3.toString() : l.toString(t3), /\[object [a-zA-Z0-9$_]+\]/.test(e3))
                  try {
                    e3 = JSON.stringify(t3);
                  } catch (t4) {
                  }
                0 === e3.length && (e3 = "(empty array)");
              }
              return "(<" + function(t4) {
                return t4.length < 41 ? t4 : t4.substr(0, 38) + "...";
              }(e3) + ">, no stack trace)";
            }
            function Y() {
              return "function" == typeof G;
            }
            var $ = function() {
              return false;
            }, z = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
            function Q(t3) {
              var e3 = t3.match(z);
              if (e3)
                return { fileName: e3[1], line: parseInt(e3[2], 10) };
            }
            function X(t3) {
              this._parent = t3, this._promisesCreated = 0;
              var e3 = this._length = 1 + (void 0 === t3 ? 0 : t3._length);
              G(this, X), e3 > 32 && this.uncycle();
            }
            l.inherits(X, Error), n3.CapturedTrace = X, X.prototype.uncycle = function() {
              var t3 = this._length;
              if (!(t3 < 2)) {
                for (var e3 = [], r5 = {}, n4 = 0, i2 = this; void 0 !== i2; ++n4)
                  e3.push(i2), i2 = i2._parent;
                for (n4 = (t3 = this._length = n4) - 1; n4 >= 0; --n4) {
                  var o2 = e3[n4].stack;
                  void 0 === r5[o2] && (r5[o2] = n4);
                }
                for (n4 = 0; n4 < t3; ++n4) {
                  var s3 = r5[e3[n4].stack];
                  if (void 0 !== s3 && s3 !== n4) {
                    s3 > 0 && (e3[s3 - 1]._parent = void 0, e3[s3 - 1]._length = 1), e3[n4]._parent = void 0, e3[n4]._length = 1;
                    var a2 = n4 > 0 ? e3[n4 - 1] : this;
                    s3 < t3 - 1 ? (a2._parent = e3[s3 + 1], a2._parent.uncycle(), a2._length = a2._parent._length + 1) : (a2._parent = void 0, a2._length = 1);
                    for (var u2 = a2._length + 1, c2 = n4 - 2; c2 >= 0; --c2)
                      e3[c2]._length = u2, u2++;
                    return;
                  }
                }
              }
            }, X.prototype.attachExtraTrace = function(t3) {
              if (!t3.__stackCleaned__) {
                this.uncycle();
                for (var e3 = H(t3), r5 = e3.message, n4 = [e3.stack], i2 = this; void 0 !== i2; )
                  n4.push(N(i2.stack.split("\n"))), i2 = i2._parent;
                !function(t4) {
                  for (var e4 = t4[0], r6 = 1; r6 < t4.length; ++r6) {
                    for (var n5 = t4[r6], i3 = e4.length - 1, o2 = e4[i3], s3 = -1, a2 = n5.length - 1; a2 >= 0; --a2)
                      if (n5[a2] === o2) {
                        s3 = a2;
                        break;
                      }
                    for (a2 = s3; a2 >= 0; --a2) {
                      var u2 = n5[a2];
                      if (e4[i3] !== u2)
                        break;
                      e4.pop(), i3--;
                    }
                    e4 = n5;
                  }
                }(n4), function(t4) {
                  for (var e4 = 0; e4 < t4.length; ++e4)
                    (0 === t4[e4].length || e4 + 1 < t4.length && t4[e4][0] === t4[e4 + 1][0]) && (t4.splice(e4, 1), e4--);
                }(n4), l.notEnumerableProp(t3, "stack", function(t4, e4) {
                  for (var r6 = 0; r6 < e4.length - 1; ++r6)
                    e4[r6].push("From previous event:"), e4[r6] = e4[r6].join("\n");
                  return r6 < e4.length && (e4[r6] = e4[r6].join("\n")), t4 + "\n" + e4.join("\n");
                }(r5, n4)), l.notEnumerableProp(t3, "__stackCleaned__", true);
              }
            };
            var G = function() {
              var t3 = /^\s*at\s*/, e3 = function(t4, e4) {
                return "string" == typeof t4 ? t4 : void 0 !== e4.name && void 0 !== e4.message ? e4.toString() : W(e4);
              };
              if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                Error.stackTraceLimit += 6, _ = t3, v = e3;
                var r5 = Error.captureStackTrace;
                return $ = function(t4) {
                  return h.test(t4);
                }, function(t4, e4) {
                  Error.stackTraceLimit += 6, r5(t4, e4), Error.stackTraceLimit -= 6;
                };
              }
              var n4, i2 = new Error();
              if ("string" == typeof i2.stack && i2.stack.split("\n")[0].indexOf("stackDetection@") >= 0)
                return _ = /@/, v = e3, y = true, function(t4) {
                  t4.stack = new Error().stack;
                };
              try {
                throw new Error();
              } catch (t4) {
                n4 = "stack" in t4;
              }
              return "stack" in i2 || !n4 || "number" != typeof Error.stackTraceLimit ? (v = function(t4, e4) {
                return "string" == typeof t4 ? t4 : "object" != typeof e4 && "function" != typeof e4 || void 0 === e4.name || void 0 === e4.message ? W(e4) : e4.toString();
              }, null) : (_ = t3, v = e3, function(t4) {
                Error.stackTraceLimit += 6;
                try {
                  throw new Error();
                } catch (e4) {
                  t4.stack = e4.stack;
                }
                Error.stackTraceLimit -= 6;
              });
            }();
            "undefined" != typeof console && void 0 !== console.warn && (s2 = function(t3) {
              console.warn(t3);
            }, l.isNode && e2.stderr.isTTY ? s2 = function(t3, e3) {
              var r5 = e3 ? "\x1B[33m" : "\x1B[31m";
              console.warn(r5 + t3 + "\x1B[0m\n");
            } : l.isNode || "string" != typeof new Error().stack || (s2 = function(t3, e3) {
              console.warn("%c" + t3, e3 ? "color: darkorange" : "color: red");
            }));
            var J = { warnings: g, longStackTraces: false, cancellation: false, monitoring: false };
            return b && r4.longStackTraces(), { longStackTraces: function() {
              return J.longStackTraces;
            }, warnings: function() {
              return J.warnings;
            }, cancellation: function() {
              return J.cancellation;
            }, monitoring: function() {
              return J.monitoring;
            }, propagateFromFunction: function() {
              return M;
            }, boundValueFunction: function() {
              return B;
            }, checkForgottenReturns: function(t3, e3, r5, n4, i2) {
              if (void 0 === t3 && null !== e3 && w) {
                if (void 0 !== i2 && i2._returnedNonUndefined())
                  return;
                if (0 == (65535 & n4._bitField))
                  return;
                r5 && (r5 += " ");
                var o2 = "", s3 = "";
                if (e3._trace) {
                  for (var a2 = e3._trace.stack.split("\n"), u2 = N(a2), c2 = u2.length - 1; c2 >= 0; --c2) {
                    var l2 = u2[c2];
                    if (!p.test(l2)) {
                      var f2 = l2.match(d);
                      f2 && (o2 = "at " + f2[1] + ":" + f2[2] + ":" + f2[3] + " ");
                      break;
                    }
                  }
                  if (u2.length > 0) {
                    var h2 = u2[0];
                    for (c2 = 0; c2 < a2.length; ++c2)
                      if (a2[c2] === h2) {
                        c2 > 0 && (s3 = "\n" + a2[c2 - 1]);
                        break;
                      }
                  }
                }
                var _2 = "a promise was created in a " + r5 + "handler " + o2 + "but was not returned from it, see http://goo.gl/rRqMUw" + s3;
                n4._warn(_2, true, e3);
              }
            }, setBounds: function(t3, e3) {
              if (Y()) {
                for (var r5, n4, i2 = t3.stack.split("\n"), o2 = e3.stack.split("\n"), s3 = -1, a2 = -1, u2 = 0; u2 < i2.length; ++u2)
                  if (c2 = Q(i2[u2])) {
                    r5 = c2.fileName, s3 = c2.line;
                    break;
                  }
                for (u2 = 0; u2 < o2.length; ++u2) {
                  var c2;
                  if (c2 = Q(o2[u2])) {
                    n4 = c2.fileName, a2 = c2.line;
                    break;
                  }
                }
                s3 < 0 || a2 < 0 || !r5 || !n4 || r5 !== n4 || s3 >= a2 || ($ = function(t4) {
                  if (h.test(t4))
                    return true;
                  var e4 = Q(t4);
                  return !!(e4 && e4.fileName === r5 && s3 <= e4.line && e4.line <= a2);
                });
              }
            }, warn: U, deprecated: function(t3, e3) {
              var r5 = t3 + " is deprecated and will be removed in a future version.";
              return e3 && (r5 += " Use " + e3 + " instead."), U(r5);
            }, CapturedTrace: X, fireDomEvent: C, fireGlobalEvent: x };
          };
        }, { "./errors": 12, "./util": 36 }], 10: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(t3) {
            function e4() {
              return this.value;
            }
            function r4() {
              throw this.reason;
            }
            t3.prototype.return = t3.prototype.thenReturn = function(r5) {
              return r5 instanceof t3 && r5.suppressUnhandledRejections(), this._then(e4, void 0, void 0, { value: r5 }, void 0);
            }, t3.prototype.throw = t3.prototype.thenThrow = function(t4) {
              return this._then(r4, void 0, void 0, { reason: t4 }, void 0);
            }, t3.prototype.catchThrow = function(t4) {
              if (arguments.length <= 1)
                return this._then(void 0, r4, void 0, { reason: t4 }, void 0);
              var e5 = arguments[1];
              return this.caught(t4, function() {
                throw e5;
              });
            }, t3.prototype.catchReturn = function(r5) {
              if (arguments.length <= 1)
                return r5 instanceof t3 && r5.suppressUnhandledRejections(), this._then(void 0, e4, void 0, { value: r5 }, void 0);
              var n2 = arguments[1];
              return n2 instanceof t3 && n2.suppressUnhandledRejections(), this.caught(r5, function() {
                return n2;
              });
            };
          };
        }, {}], 11: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(t3, e4) {
            var r4 = t3.reduce, n2 = t3.all;
            function i() {
              return n2(this);
            }
            t3.prototype.each = function(t4) {
              return r4(this, t4, e4, 0)._then(i, void 0, void 0, this, void 0);
            }, t3.prototype.mapSeries = function(t4) {
              return r4(this, t4, e4, e4);
            }, t3.each = function(t4, n3) {
              return r4(t4, n3, e4, 0)._then(i, void 0, void 0, t4, void 0);
            }, t3.mapSeries = function(t4, n3) {
              return r4(t4, n3, e4, e4);
            };
          };
        }, {}], 12: [function(t2, e3, r3) {
          "use strict";
          var n2, i, o = t2("./es5"), s2 = o.freeze, a = t2("./util"), u = a.inherits, c = a.notEnumerableProp;
          function l(t3, e4) {
            function r4(n3) {
              if (!(this instanceof r4))
                return new r4(n3);
              c(this, "message", "string" == typeof n3 ? n3 : e4), c(this, "name", t3), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
            }
            return u(r4, Error), r4;
          }
          var f = l("Warning", "warning"), h = l("CancellationError", "cancellation error"), p = l("TimeoutError", "timeout error"), d = l("AggregateError", "aggregate error");
          try {
            n2 = TypeError, i = RangeError;
          } catch (t3) {
            n2 = l("TypeError", "type error"), i = l("RangeError", "range error");
          }
          for (var _ = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), v = 0; v < _.length; ++v)
            "function" == typeof Array.prototype[_[v]] && (d.prototype[_[v]] = Array.prototype[_[v]]);
          o.defineProperty(d.prototype, "length", { value: 0, configurable: false, writable: true, enumerable: true }), d.prototype.isOperational = true;
          var y = 0;
          function m(t3) {
            if (!(this instanceof m))
              return new m(t3);
            c(this, "name", "OperationalError"), c(this, "message", t3), this.cause = t3, this.isOperational = true, t3 instanceof Error ? (c(this, "message", t3.message), c(this, "stack", t3.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
          }
          d.prototype.toString = function() {
            var t3 = Array(4 * y + 1).join(" "), e4 = "\n" + t3 + "AggregateError of:\n";
            y++, t3 = Array(4 * y + 1).join(" ");
            for (var r4 = 0; r4 < this.length; ++r4) {
              for (var n3 = this[r4] === this ? "[Circular AggregateError]" : this[r4] + "", i2 = n3.split("\n"), o2 = 0; o2 < i2.length; ++o2)
                i2[o2] = t3 + i2[o2];
              e4 += (n3 = i2.join("\n")) + "\n";
            }
            return y--, e4;
          }, u(m, Error);
          var g = Error.__BluebirdErrorTypes__;
          g || (g = s2({ CancellationError: h, TimeoutError: p, OperationalError: m, RejectionError: m, AggregateError: d }), o.defineProperty(Error, "__BluebirdErrorTypes__", { value: g, writable: false, enumerable: false, configurable: false })), e3.exports = { Error, TypeError: n2, RangeError: i, CancellationError: g.CancellationError, OperationalError: g.OperationalError, TimeoutError: g.TimeoutError, AggregateError: g.AggregateError, Warning: f };
        }, { "./es5": 13, "./util": 36 }], 13: [function(t2, e3, r3) {
          var n2 = function() {
            "use strict";
            return void 0 === this;
          }();
          if (n2)
            e3.exports = { freeze: Object.freeze, defineProperty: Object.defineProperty, getDescriptor: Object.getOwnPropertyDescriptor, keys: Object.keys, names: Object.getOwnPropertyNames, getPrototypeOf: Object.getPrototypeOf, isArray: Array.isArray, isES5: n2, propertyIsWritable: function(t3, e4) {
              var r4 = Object.getOwnPropertyDescriptor(t3, e4);
              return !(r4 && !r4.writable && !r4.set);
            } };
          else {
            var i = {}.hasOwnProperty, o = {}.toString, s2 = {}.constructor.prototype, a = function(t3) {
              var e4 = [];
              for (var r4 in t3)
                i.call(t3, r4) && e4.push(r4);
              return e4;
            };
            e3.exports = { isArray: function(t3) {
              try {
                return "[object Array]" === o.call(t3);
              } catch (t4) {
                return false;
              }
            }, keys: a, names: a, defineProperty: function(t3, e4, r4) {
              return t3[e4] = r4.value, t3;
            }, getDescriptor: function(t3, e4) {
              return { value: t3[e4] };
            }, freeze: function(t3) {
              return t3;
            }, getPrototypeOf: function(t3) {
              try {
                return Object(t3).constructor.prototype;
              } catch (t4) {
                return s2;
              }
            }, isES5: n2, propertyIsWritable: function() {
              return true;
            } };
          }
        }, {}], 14: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(t3, e4) {
            var r4 = t3.map;
            t3.prototype.filter = function(t4, n2) {
              return r4(this, t4, n2, e4);
            }, t3.filter = function(t4, n2, i) {
              return r4(t4, n2, i, e4);
            };
          };
        }, {}], 15: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2) {
            var i = t2("./util"), o = e4.CancellationError, s2 = i.errorObj, a = t2("./catch_filter")(n2);
            function u(t3, e5, r5) {
              this.promise = t3, this.type = e5, this.handler = r5, this.called = false, this.cancelPromise = null;
            }
            function c(t3) {
              this.finallyHandler = t3;
            }
            function l(t3, e5) {
              return null != t3.cancelPromise && (arguments.length > 1 ? t3.cancelPromise._reject(e5) : t3.cancelPromise._cancel(), t3.cancelPromise = null, true);
            }
            function f() {
              return p.call(this, this.promise._target()._settledValue());
            }
            function h(t3) {
              if (!l(this, t3))
                return s2.e = t3, s2;
            }
            function p(t3) {
              var i2 = this.promise, a2 = this.handler;
              if (!this.called) {
                this.called = true;
                var u2 = this.isFinallyHandler() ? a2.call(i2._boundValue()) : a2.call(i2._boundValue(), t3);
                if (u2 === n2)
                  return u2;
                if (void 0 !== u2) {
                  i2._setReturnedNonUndefined();
                  var p2 = r4(u2, i2);
                  if (p2 instanceof e4) {
                    if (null != this.cancelPromise) {
                      if (p2._isCancelled()) {
                        var d = new o("late cancellation observer");
                        return i2._attachExtraTrace(d), s2.e = d, s2;
                      }
                      p2.isPending() && p2._attachCancellationCallback(new c(this));
                    }
                    return p2._then(f, h, void 0, this, void 0);
                  }
                }
              }
              return i2.isRejected() ? (l(this), s2.e = t3, s2) : (l(this), t3);
            }
            return u.prototype.isFinallyHandler = function() {
              return 0 === this.type;
            }, c.prototype._resultCancelled = function() {
              l(this.finallyHandler);
            }, e4.prototype._passThrough = function(t3, e5, r5, n3) {
              return "function" != typeof t3 ? this.then() : this._then(r5, n3, void 0, new u(this, e5, t3), void 0);
            }, e4.prototype.lastly = e4.prototype.finally = function(t3) {
              return this._passThrough(t3, 0, p, p);
            }, e4.prototype.tap = function(t3) {
              return this._passThrough(t3, 1, p);
            }, e4.prototype.tapCatch = function(t3) {
              var r5 = arguments.length;
              if (1 === r5)
                return this._passThrough(t3, 1, void 0, p);
              var n3, o2 = new Array(r5 - 1), s3 = 0;
              for (n3 = 0; n3 < r5 - 1; ++n3) {
                var u2 = arguments[n3];
                if (!i.isObject(u2))
                  return e4.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + i.classString(u2)));
                o2[s3++] = u2;
              }
              o2.length = s3;
              var c2 = arguments[n3];
              return this._passThrough(a(o2, c2, this), 1, void 0, p);
            }, u;
          };
        }, { "./catch_filter": 7, "./util": 36 }], 16: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i, o, s2) {
            var a = t2("./errors").TypeError, u = t2("./util"), c = u.errorObj, l = u.tryCatch, f = [];
            function h(t3, r5, i2, o2) {
              if (s2.cancellation()) {
                var a2 = new e4(n2), u2 = this._finallyPromise = new e4(n2);
                this._promise = a2.lastly(function() {
                  return u2;
                }), a2._captureStackTrace(), a2._setOnCancel(this);
              } else
                (this._promise = new e4(n2))._captureStackTrace();
              this._stack = o2, this._generatorFunction = t3, this._receiver = r5, this._generator = void 0, this._yieldHandlers = "function" == typeof i2 ? [i2].concat(f) : f, this._yieldedPromise = null, this._cancellationPhase = false;
            }
            u.inherits(h, o), h.prototype._isResolved = function() {
              return null === this._promise;
            }, h.prototype._cleanup = function() {
              this._promise = this._generator = null, s2.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null);
            }, h.prototype._promiseCancelled = function() {
              if (!this._isResolved()) {
                var t3;
                if (void 0 !== this._generator.return)
                  this._promise._pushContext(), t3 = l(this._generator.return).call(this._generator, void 0), this._promise._popContext();
                else {
                  var r5 = new e4.CancellationError("generator .return() sentinel");
                  e4.coroutine.returnSentinel = r5, this._promise._attachExtraTrace(r5), this._promise._pushContext(), t3 = l(this._generator.throw).call(this._generator, r5), this._promise._popContext();
                }
                this._cancellationPhase = true, this._yieldedPromise = null, this._continue(t3);
              }
            }, h.prototype._promiseFulfilled = function(t3) {
              this._yieldedPromise = null, this._promise._pushContext();
              var e5 = l(this._generator.next).call(this._generator, t3);
              this._promise._popContext(), this._continue(e5);
            }, h.prototype._promiseRejected = function(t3) {
              this._yieldedPromise = null, this._promise._attachExtraTrace(t3), this._promise._pushContext();
              var e5 = l(this._generator.throw).call(this._generator, t3);
              this._promise._popContext(), this._continue(e5);
            }, h.prototype._resultCancelled = function() {
              if (this._yieldedPromise instanceof e4) {
                var t3 = this._yieldedPromise;
                this._yieldedPromise = null, t3.cancel();
              }
            }, h.prototype.promise = function() {
              return this._promise;
            }, h.prototype._run = function() {
              this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
            }, h.prototype._continue = function(t3) {
              var r5 = this._promise;
              if (t3 === c)
                return this._cleanup(), this._cancellationPhase ? r5.cancel() : r5._rejectCallback(t3.e, false);
              var n3 = t3.value;
              if (true === t3.done)
                return this._cleanup(), this._cancellationPhase ? r5.cancel() : r5._resolveCallback(n3);
              var o2 = i(n3, this._promise);
              if (o2 instanceof e4 || null !== (o2 = function(t4, r6, n4) {
                for (var o3 = 0; o3 < r6.length; ++o3) {
                  n4._pushContext();
                  var s4 = l(r6[o3])(t4);
                  if (n4._popContext(), s4 === c) {
                    n4._pushContext();
                    var a2 = e4.reject(c.e);
                    return n4._popContext(), a2;
                  }
                  var u2 = i(s4, n4);
                  if (u2 instanceof e4)
                    return u2;
                }
                return null;
              }(o2, this._yieldHandlers, this._promise))) {
                var s3 = (o2 = o2._target())._bitField;
                0 == (50397184 & s3) ? (this._yieldedPromise = o2, o2._proxy(this, null)) : 0 != (33554432 & s3) ? e4._async.invoke(this._promiseFulfilled, this, o2._value()) : 0 != (16777216 & s3) ? e4._async.invoke(this._promiseRejected, this, o2._reason()) : this._promiseCancelled();
              } else
                this._promiseRejected(new a("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(n3)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
            }, e4.coroutine = function(t3, e5) {
              if ("function" != typeof t3)
                throw new a("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
              var r5 = Object(e5).yieldHandler, n3 = h, i2 = new Error().stack;
              return function() {
                var e6 = t3.apply(this, arguments), o2 = new n3(void 0, void 0, r5, i2), s3 = o2.promise();
                return o2._generator = e6, o2._promiseFulfilled(void 0), s3;
              };
            }, e4.coroutine.addYieldHandler = function(t3) {
              if ("function" != typeof t3)
                throw new a("expecting a function but got " + u.classString(t3));
              f.push(t3);
            }, e4.spawn = function(t3) {
              if (s2.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t3)
                return r4("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
              var n3 = new h(t3, this), i2 = n3.promise();
              return n3._run(e4.spawn), i2;
            };
          };
        }, { "./errors": 12, "./util": 36 }], 17: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i, o, s2) {
            var a = t2("./util");
            a.canEvaluate, a.tryCatch, a.errorObj, e4.join = function() {
              var t3, e5 = arguments.length - 1;
              e5 > 0 && "function" == typeof arguments[e5] && (t3 = arguments[e5]);
              var n3 = [].slice.call(arguments);
              t3 && n3.pop();
              var i2 = new r4(n3).promise();
              return void 0 !== t3 ? i2.spread(t3) : i2;
            };
          };
        }, { "./util": 36 }], 18: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i, o, s2) {
            var a = e4._getDomain, u = t2("./util"), c = u.tryCatch, l = u.errorObj, f = e4._async;
            function h(t3, e5, r5, n3) {
              this.constructor$(t3), this._promise._captureStackTrace();
              var i2 = a();
              this._callback = null === i2 ? e5 : u.domainBind(i2, e5), this._preservedValues = n3 === o ? new Array(this.length()) : null, this._limit = r5, this._inFlight = 0, this._queue = [], f.invoke(this._asyncInit, this, void 0);
            }
            function p(t3, r5, i2, o2) {
              if ("function" != typeof r5)
                return n2("expecting a function but got " + u.classString(r5));
              var s3 = 0;
              if (void 0 !== i2) {
                if ("object" != typeof i2 || null === i2)
                  return e4.reject(new TypeError("options argument must be an object but it is " + u.classString(i2)));
                if ("number" != typeof i2.concurrency)
                  return e4.reject(new TypeError("'concurrency' must be a number but it is " + u.classString(i2.concurrency)));
                s3 = i2.concurrency;
              }
              return new h(t3, r5, s3 = "number" == typeof s3 && isFinite(s3) && s3 >= 1 ? s3 : 0, o2).promise();
            }
            u.inherits(h, r4), h.prototype._asyncInit = function() {
              this._init$(void 0, -2);
            }, h.prototype._init = function() {
            }, h.prototype._promiseFulfilled = function(t3, r5) {
              var n3 = this._values, o2 = this.length(), a2 = this._preservedValues, u2 = this._limit;
              if (r5 < 0) {
                if (n3[r5 = -1 * r5 - 1] = t3, u2 >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved()))
                  return true;
              } else {
                if (u2 >= 1 && this._inFlight >= u2)
                  return n3[r5] = t3, this._queue.push(r5), false;
                null !== a2 && (a2[r5] = t3);
                var f2 = this._promise, h2 = this._callback, p2 = f2._boundValue();
                f2._pushContext();
                var d = c(h2).call(p2, t3, r5, o2), _ = f2._popContext();
                if (s2.checkForgottenReturns(d, _, null !== a2 ? "Promise.filter" : "Promise.map", f2), d === l)
                  return this._reject(d.e), true;
                var v = i(d, this._promise);
                if (v instanceof e4) {
                  var y = (v = v._target())._bitField;
                  if (0 == (50397184 & y))
                    return u2 >= 1 && this._inFlight++, n3[r5] = v, v._proxy(this, -1 * (r5 + 1)), false;
                  if (0 == (33554432 & y))
                    return 0 != (16777216 & y) ? (this._reject(v._reason()), true) : (this._cancel(), true);
                  d = v._value();
                }
                n3[r5] = d;
              }
              return ++this._totalResolved >= o2 && (null !== a2 ? this._filter(n3, a2) : this._resolve(n3), true);
            }, h.prototype._drainQueue = function() {
              for (var t3 = this._queue, e5 = this._limit, r5 = this._values; t3.length > 0 && this._inFlight < e5; ) {
                if (this._isResolved())
                  return;
                var n3 = t3.pop();
                this._promiseFulfilled(r5[n3], n3);
              }
            }, h.prototype._filter = function(t3, e5) {
              for (var r5 = e5.length, n3 = new Array(r5), i2 = 0, o2 = 0; o2 < r5; ++o2)
                t3[o2] && (n3[i2++] = e5[o2]);
              n3.length = i2, this._resolve(n3);
            }, h.prototype.preservedValues = function() {
              return this._preservedValues;
            }, e4.prototype.map = function(t3, e5) {
              return p(this, t3, e5, null);
            }, e4.map = function(t3, e5, r5, n3) {
              return p(t3, e5, r5, n3);
            };
          };
        }, { "./util": 36 }], 19: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i, o) {
            var s2 = t2("./util"), a = s2.tryCatch;
            e4.method = function(t3) {
              if ("function" != typeof t3)
                throw new e4.TypeError("expecting a function but got " + s2.classString(t3));
              return function() {
                var n3 = new e4(r4);
                n3._captureStackTrace(), n3._pushContext();
                var i2 = a(t3).apply(this, arguments), s3 = n3._popContext();
                return o.checkForgottenReturns(i2, s3, "Promise.method", n3), n3._resolveFromSyncValue(i2), n3;
              };
            }, e4.attempt = e4.try = function(t3) {
              if ("function" != typeof t3)
                return i("expecting a function but got " + s2.classString(t3));
              var n3, u = new e4(r4);
              if (u._captureStackTrace(), u._pushContext(), arguments.length > 1) {
                o.deprecated("calling Promise.try with more than 1 argument");
                var c = arguments[1], l = arguments[2];
                n3 = s2.isArray(c) ? a(t3).apply(l, c) : a(t3).call(l, c);
              } else
                n3 = a(t3)();
              var f = u._popContext();
              return o.checkForgottenReturns(n3, f, "Promise.try", u), u._resolveFromSyncValue(n3), u;
            }, e4.prototype._resolveFromSyncValue = function(t3) {
              t3 === s2.errorObj ? this._rejectCallback(t3.e, false) : this._resolveCallback(t3, true);
            };
          };
        }, { "./util": 36 }], 20: [function(t2, e3, r3) {
          "use strict";
          var n2 = t2("./util"), i = n2.maybeWrapAsError, o = t2("./errors").OperationalError, s2 = t2("./es5"), a = /^(?:name|message|stack|cause)$/;
          function u(t3) {
            var e4;
            if (function(t4) {
              return t4 instanceof Error && s2.getPrototypeOf(t4) === Error.prototype;
            }(t3)) {
              (e4 = new o(t3)).name = t3.name, e4.message = t3.message, e4.stack = t3.stack;
              for (var r4 = s2.keys(t3), i2 = 0; i2 < r4.length; ++i2) {
                var u2 = r4[i2];
                a.test(u2) || (e4[u2] = t3[u2]);
              }
              return e4;
            }
            return n2.markAsOriginatingFromRejection(t3), t3;
          }
          e3.exports = function(t3, e4) {
            return function(r4, n3) {
              if (null !== t3) {
                if (r4) {
                  var o2 = u(i(r4));
                  t3._attachExtraTrace(o2), t3._reject(o2);
                } else if (e4) {
                  var s3 = [].slice.call(arguments, 1);
                  t3._fulfill(s3);
                } else
                  t3._fulfill(n3);
                t3 = null;
              }
            };
          };
        }, { "./errors": 12, "./es5": 13, "./util": 36 }], 21: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4) {
            var r4 = t2("./util"), n2 = e4._async, i = r4.tryCatch, o = r4.errorObj;
            function s2(t3, e5) {
              if (!r4.isArray(t3))
                return a.call(this, t3, e5);
              var s3 = i(e5).apply(this._boundValue(), [null].concat(t3));
              s3 === o && n2.throwLater(s3.e);
            }
            function a(t3, e5) {
              var r5 = this._boundValue(), s3 = void 0 === t3 ? i(e5).call(r5, null) : i(e5).call(r5, null, t3);
              s3 === o && n2.throwLater(s3.e);
            }
            function u(t3, e5) {
              if (!t3) {
                var r5 = new Error(t3 + "");
                r5.cause = t3, t3 = r5;
              }
              var s3 = i(e5).call(this._boundValue(), t3);
              s3 === o && n2.throwLater(s3.e);
            }
            e4.prototype.asCallback = e4.prototype.nodeify = function(t3, e5) {
              if ("function" == typeof t3) {
                var r5 = a;
                void 0 !== e5 && Object(e5).spread && (r5 = s2), this._then(r5, u, void 0, this, t3);
              }
              return this;
            };
          };
        }, { "./util": 36 }], 22: [function(t2, r3, n2) {
          "use strict";
          r3.exports = function() {
            var n3 = function() {
              return new d("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
            }, i = function() {
              return new T.PromiseInspection(this._target());
            }, o = function(t3) {
              return T.reject(new d(t3));
            };
            function s2() {
            }
            var a, u = {}, c = t2("./util");
            a = c.isNode ? function() {
              var t3 = e2.domain;
              return void 0 === t3 && (t3 = null), t3;
            } : function() {
              return null;
            }, c.notEnumerableProp(T, "_getDomain", a);
            var l = t2("./es5"), f = t2("./async"), h = new f();
            l.defineProperty(T, "_async", { value: h });
            var p = t2("./errors"), d = T.TypeError = p.TypeError;
            T.RangeError = p.RangeError;
            var _ = T.CancellationError = p.CancellationError;
            T.TimeoutError = p.TimeoutError, T.OperationalError = p.OperationalError, T.RejectionError = p.OperationalError, T.AggregateError = p.AggregateError;
            var v = function() {
            }, y = {}, m = {}, g = t2("./thenables")(T, v), b = t2("./promise_array")(T, v, g, o, s2), w = t2("./context")(T), E = w.create, C = t2("./debuggability")(T, w), x = (C.CapturedTrace, t2("./finally")(T, g, m)), j = t2("./catch_filter")(m), S = t2("./nodeback"), R = c.errorObj, k = c.tryCatch;
            function T(t3) {
              t3 !== v && function(t4, e3) {
                if (null == t4 || t4.constructor !== T)
                  throw new d("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                if ("function" != typeof e3)
                  throw new d("expecting a function but got " + c.classString(e3));
              }(this, t3), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(t3), this._promiseCreated(), this._fireEvent("promiseCreated", this);
            }
            function P(t3) {
              this.promise._resolveCallback(t3);
            }
            function O(t3) {
              this.promise._rejectCallback(t3, false);
            }
            function A(t3) {
              var e3 = new T(v);
              e3._fulfillmentHandler0 = t3, e3._rejectionHandler0 = t3, e3._promise0 = t3, e3._receiver0 = t3;
            }
            return T.prototype.toString = function() {
              return "[object Promise]";
            }, T.prototype.caught = T.prototype.catch = function(t3) {
              var e3 = arguments.length;
              if (e3 > 1) {
                var r4, n4 = new Array(e3 - 1), i2 = 0;
                for (r4 = 0; r4 < e3 - 1; ++r4) {
                  var s3 = arguments[r4];
                  if (!c.isObject(s3))
                    return o("Catch statement predicate: expecting an object but got " + c.classString(s3));
                  n4[i2++] = s3;
                }
                return n4.length = i2, t3 = arguments[r4], this.then(void 0, j(n4, t3, this));
              }
              return this.then(void 0, t3);
            }, T.prototype.reflect = function() {
              return this._then(i, i, void 0, this, void 0);
            }, T.prototype.then = function(t3, e3) {
              if (C.warnings() && arguments.length > 0 && "function" != typeof t3 && "function" != typeof e3) {
                var r4 = ".then() only accepts functions but was passed: " + c.classString(t3);
                arguments.length > 1 && (r4 += ", " + c.classString(e3)), this._warn(r4);
              }
              return this._then(t3, e3, void 0, void 0, void 0);
            }, T.prototype.done = function(t3, e3) {
              this._then(t3, e3, void 0, void 0, void 0)._setIsFinal();
            }, T.prototype.spread = function(t3) {
              return "function" != typeof t3 ? o("expecting a function but got " + c.classString(t3)) : this.all()._then(t3, void 0, void 0, y, void 0);
            }, T.prototype.toJSON = function() {
              var t3 = { isFulfilled: false, isRejected: false, fulfillmentValue: void 0, rejectionReason: void 0 };
              return this.isFulfilled() ? (t3.fulfillmentValue = this.value(), t3.isFulfilled = true) : this.isRejected() && (t3.rejectionReason = this.reason(), t3.isRejected = true), t3;
            }, T.prototype.all = function() {
              return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new b(this).promise();
            }, T.prototype.error = function(t3) {
              return this.caught(c.originatesFromRejection, t3);
            }, T.getNewLibraryCopy = r3.exports, T.is = function(t3) {
              return t3 instanceof T;
            }, T.fromNode = T.fromCallback = function(t3) {
              var e3 = new T(v);
              e3._captureStackTrace();
              var r4 = arguments.length > 1 && !!Object(arguments[1]).multiArgs, n4 = k(t3)(S(e3, r4));
              return n4 === R && e3._rejectCallback(n4.e, true), e3._isFateSealed() || e3._setAsyncGuaranteed(), e3;
            }, T.all = function(t3) {
              return new b(t3).promise();
            }, T.cast = function(t3) {
              var e3 = g(t3);
              return e3 instanceof T || ((e3 = new T(v))._captureStackTrace(), e3._setFulfilled(), e3._rejectionHandler0 = t3), e3;
            }, T.resolve = T.fulfilled = T.cast, T.reject = T.rejected = function(t3) {
              var e3 = new T(v);
              return e3._captureStackTrace(), e3._rejectCallback(t3, true), e3;
            }, T.setScheduler = function(t3) {
              if ("function" != typeof t3)
                throw new d("expecting a function but got " + c.classString(t3));
              return h.setScheduler(t3);
            }, T.prototype._then = function(t3, e3, r4, n4, i2) {
              var o2 = void 0 !== i2, s3 = o2 ? i2 : new T(v), u2 = this._target(), l2 = u2._bitField;
              o2 || (s3._propagateFrom(this, 3), s3._captureStackTrace(), void 0 === n4 && 0 != (2097152 & this._bitField) && (n4 = 0 != (50397184 & l2) ? this._boundValue() : u2 === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, s3));
              var f2 = a();
              if (0 != (50397184 & l2)) {
                var p2, d2, y2 = u2._settlePromiseCtx;
                0 != (33554432 & l2) ? (d2 = u2._rejectionHandler0, p2 = t3) : 0 != (16777216 & l2) ? (d2 = u2._fulfillmentHandler0, p2 = e3, u2._unsetRejectionIsUnhandled()) : (y2 = u2._settlePromiseLateCancellationObserver, d2 = new _("late cancellation observer"), u2._attachExtraTrace(d2), p2 = e3), h.invoke(y2, u2, { handler: null === f2 ? p2 : "function" == typeof p2 && c.domainBind(f2, p2), promise: s3, receiver: n4, value: d2 });
              } else
                u2._addCallbacks(t3, e3, s3, n4, f2);
              return s3;
            }, T.prototype._length = function() {
              return 65535 & this._bitField;
            }, T.prototype._isFateSealed = function() {
              return 0 != (117506048 & this._bitField);
            }, T.prototype._isFollowing = function() {
              return 67108864 == (67108864 & this._bitField);
            }, T.prototype._setLength = function(t3) {
              this._bitField = -65536 & this._bitField | 65535 & t3;
            }, T.prototype._setFulfilled = function() {
              this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this);
            }, T.prototype._setRejected = function() {
              this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this);
            }, T.prototype._setFollowing = function() {
              this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this);
            }, T.prototype._setIsFinal = function() {
              this._bitField = 4194304 | this._bitField;
            }, T.prototype._isFinal = function() {
              return (4194304 & this._bitField) > 0;
            }, T.prototype._unsetCancelled = function() {
              this._bitField = -65537 & this._bitField;
            }, T.prototype._setCancelled = function() {
              this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this);
            }, T.prototype._setWillBeCancelled = function() {
              this._bitField = 8388608 | this._bitField;
            }, T.prototype._setAsyncGuaranteed = function() {
              h.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField);
            }, T.prototype._receiverAt = function(t3) {
              var e3 = 0 === t3 ? this._receiver0 : this[4 * t3 - 4 + 3];
              if (e3 !== u)
                return void 0 === e3 && this._isBound() ? this._boundValue() : e3;
            }, T.prototype._promiseAt = function(t3) {
              return this[4 * t3 - 4 + 2];
            }, T.prototype._fulfillmentHandlerAt = function(t3) {
              return this[4 * t3 - 4 + 0];
            }, T.prototype._rejectionHandlerAt = function(t3) {
              return this[4 * t3 - 4 + 1];
            }, T.prototype._boundValue = function() {
            }, T.prototype._migrateCallback0 = function(t3) {
              t3._bitField;
              var e3 = t3._fulfillmentHandler0, r4 = t3._rejectionHandler0, n4 = t3._promise0, i2 = t3._receiverAt(0);
              void 0 === i2 && (i2 = u), this._addCallbacks(e3, r4, n4, i2, null);
            }, T.prototype._migrateCallbackAt = function(t3, e3) {
              var r4 = t3._fulfillmentHandlerAt(e3), n4 = t3._rejectionHandlerAt(e3), i2 = t3._promiseAt(e3), o2 = t3._receiverAt(e3);
              void 0 === o2 && (o2 = u), this._addCallbacks(r4, n4, i2, o2, null);
            }, T.prototype._addCallbacks = function(t3, e3, r4, n4, i2) {
              var o2 = this._length();
              if (o2 >= 65531 && (o2 = 0, this._setLength(0)), 0 === o2)
                this._promise0 = r4, this._receiver0 = n4, "function" == typeof t3 && (this._fulfillmentHandler0 = null === i2 ? t3 : c.domainBind(i2, t3)), "function" == typeof e3 && (this._rejectionHandler0 = null === i2 ? e3 : c.domainBind(i2, e3));
              else {
                var s3 = 4 * o2 - 4;
                this[s3 + 2] = r4, this[s3 + 3] = n4, "function" == typeof t3 && (this[s3 + 0] = null === i2 ? t3 : c.domainBind(i2, t3)), "function" == typeof e3 && (this[s3 + 1] = null === i2 ? e3 : c.domainBind(i2, e3));
              }
              return this._setLength(o2 + 1), o2;
            }, T.prototype._proxy = function(t3, e3) {
              this._addCallbacks(void 0, void 0, e3, t3, null);
            }, T.prototype._resolveCallback = function(t3, e3) {
              if (0 == (117506048 & this._bitField)) {
                if (t3 === this)
                  return this._rejectCallback(n3(), false);
                var r4 = g(t3, this);
                if (!(r4 instanceof T))
                  return this._fulfill(t3);
                e3 && this._propagateFrom(r4, 2);
                var i2 = r4._target();
                if (i2 !== this) {
                  var o2 = i2._bitField;
                  if (0 == (50397184 & o2)) {
                    var s3 = this._length();
                    s3 > 0 && i2._migrateCallback0(this);
                    for (var a2 = 1; a2 < s3; ++a2)
                      i2._migrateCallbackAt(this, a2);
                    this._setFollowing(), this._setLength(0), this._setFollowee(i2);
                  } else if (0 != (33554432 & o2))
                    this._fulfill(i2._value());
                  else if (0 != (16777216 & o2))
                    this._reject(i2._reason());
                  else {
                    var u2 = new _("late cancellation observer");
                    i2._attachExtraTrace(u2), this._reject(u2);
                  }
                } else
                  this._reject(n3());
              }
            }, T.prototype._rejectCallback = function(t3, e3, r4) {
              var n4 = c.ensureErrorObject(t3), i2 = n4 === t3;
              if (!i2 && !r4 && C.warnings()) {
                var o2 = "a promise was rejected with a non-error: " + c.classString(t3);
                this._warn(o2, true);
              }
              this._attachExtraTrace(n4, !!e3 && i2), this._reject(t3);
            }, T.prototype._resolveFromExecutor = function(t3) {
              if (t3 !== v) {
                var e3 = this;
                this._captureStackTrace(), this._pushContext();
                var r4 = true, n4 = this._execute(t3, function(t4) {
                  e3._resolveCallback(t4);
                }, function(t4) {
                  e3._rejectCallback(t4, r4);
                });
                r4 = false, this._popContext(), void 0 !== n4 && e3._rejectCallback(n4, true);
              }
            }, T.prototype._settlePromiseFromHandler = function(t3, e3, r4, n4) {
              var i2 = n4._bitField;
              if (0 == (65536 & i2)) {
                var o2;
                n4._pushContext(), e3 === y ? r4 && "number" == typeof r4.length ? o2 = k(t3).apply(this._boundValue(), r4) : (o2 = R).e = new d("cannot .spread() a non-array: " + c.classString(r4)) : o2 = k(t3).call(e3, r4);
                var s3 = n4._popContext();
                0 == (65536 & (i2 = n4._bitField)) && (o2 === m ? n4._reject(r4) : o2 === R ? n4._rejectCallback(o2.e, false) : (C.checkForgottenReturns(o2, s3, "", n4, this), n4._resolveCallback(o2)));
              }
            }, T.prototype._target = function() {
              for (var t3 = this; t3._isFollowing(); )
                t3 = t3._followee();
              return t3;
            }, T.prototype._followee = function() {
              return this._rejectionHandler0;
            }, T.prototype._setFollowee = function(t3) {
              this._rejectionHandler0 = t3;
            }, T.prototype._settlePromise = function(t3, e3, r4, n4) {
              var o2 = t3 instanceof T, a2 = this._bitField, u2 = 0 != (134217728 & a2);
              0 != (65536 & a2) ? (o2 && t3._invokeInternalOnCancel(), r4 instanceof x && r4.isFinallyHandler() ? (r4.cancelPromise = t3, k(e3).call(r4, n4) === R && t3._reject(R.e)) : e3 === i ? t3._fulfill(i.call(r4)) : r4 instanceof s2 ? r4._promiseCancelled(t3) : o2 || t3 instanceof b ? t3._cancel() : r4.cancel()) : "function" == typeof e3 ? o2 ? (u2 && t3._setAsyncGuaranteed(), this._settlePromiseFromHandler(e3, r4, n4, t3)) : e3.call(r4, n4, t3) : r4 instanceof s2 ? r4._isResolved() || (0 != (33554432 & a2) ? r4._promiseFulfilled(n4, t3) : r4._promiseRejected(n4, t3)) : o2 && (u2 && t3._setAsyncGuaranteed(), 0 != (33554432 & a2) ? t3._fulfill(n4) : t3._reject(n4));
            }, T.prototype._settlePromiseLateCancellationObserver = function(t3) {
              var e3 = t3.handler, r4 = t3.promise, n4 = t3.receiver, i2 = t3.value;
              "function" == typeof e3 ? r4 instanceof T ? this._settlePromiseFromHandler(e3, n4, i2, r4) : e3.call(n4, i2, r4) : r4 instanceof T && r4._reject(i2);
            }, T.prototype._settlePromiseCtx = function(t3) {
              this._settlePromise(t3.promise, t3.handler, t3.receiver, t3.value);
            }, T.prototype._settlePromise0 = function(t3, e3, r4) {
              var n4 = this._promise0, i2 = this._receiverAt(0);
              this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(n4, t3, i2, e3);
            }, T.prototype._clearCallbackDataAtIndex = function(t3) {
              var e3 = 4 * t3 - 4;
              this[e3 + 2] = this[e3 + 3] = this[e3 + 0] = this[e3 + 1] = void 0;
            }, T.prototype._fulfill = function(t3) {
              var e3 = this._bitField;
              if (!((117506048 & e3) >>> 16)) {
                if (t3 === this) {
                  var r4 = n3();
                  return this._attachExtraTrace(r4), this._reject(r4);
                }
                this._setFulfilled(), this._rejectionHandler0 = t3, (65535 & e3) > 0 && (0 != (134217728 & e3) ? this._settlePromises() : h.settlePromises(this));
              }
            }, T.prototype._reject = function(t3) {
              var e3 = this._bitField;
              if (!((117506048 & e3) >>> 16)) {
                if (this._setRejected(), this._fulfillmentHandler0 = t3, this._isFinal())
                  return h.fatalError(t3, c.isNode);
                (65535 & e3) > 0 ? h.settlePromises(this) : this._ensurePossibleRejectionHandled();
              }
            }, T.prototype._fulfillPromises = function(t3, e3) {
              for (var r4 = 1; r4 < t3; r4++) {
                var n4 = this._fulfillmentHandlerAt(r4), i2 = this._promiseAt(r4), o2 = this._receiverAt(r4);
                this._clearCallbackDataAtIndex(r4), this._settlePromise(i2, n4, o2, e3);
              }
            }, T.prototype._rejectPromises = function(t3, e3) {
              for (var r4 = 1; r4 < t3; r4++) {
                var n4 = this._rejectionHandlerAt(r4), i2 = this._promiseAt(r4), o2 = this._receiverAt(r4);
                this._clearCallbackDataAtIndex(r4), this._settlePromise(i2, n4, o2, e3);
              }
            }, T.prototype._settlePromises = function() {
              var t3 = this._bitField, e3 = 65535 & t3;
              if (e3 > 0) {
                if (0 != (16842752 & t3)) {
                  var r4 = this._fulfillmentHandler0;
                  this._settlePromise0(this._rejectionHandler0, r4, t3), this._rejectPromises(e3, r4);
                } else {
                  var n4 = this._rejectionHandler0;
                  this._settlePromise0(this._fulfillmentHandler0, n4, t3), this._fulfillPromises(e3, n4);
                }
                this._setLength(0);
              }
              this._clearCancellationData();
            }, T.prototype._settledValue = function() {
              var t3 = this._bitField;
              return 0 != (33554432 & t3) ? this._rejectionHandler0 : 0 != (16777216 & t3) ? this._fulfillmentHandler0 : void 0;
            }, T.defer = T.pending = function() {
              return C.deprecated("Promise.defer", "new Promise"), { promise: new T(v), resolve: P, reject: O };
            }, c.notEnumerableProp(T, "_makeSelfResolutionError", n3), t2("./method")(T, v, g, o, C), t2("./bind")(T, v, g, C), t2("./cancel")(T, b, o, C), t2("./direct_resolve")(T), t2("./synchronous_inspection")(T), t2("./join")(T, b, g, v, h, a), T.Promise = T, T.version = "3.5.1", t2("./map.js")(T, b, o, g, v, C), t2("./call_get.js")(T), t2("./using.js")(T, o, g, E, v, C), t2("./timers.js")(T, v, C), t2("./generators.js")(T, o, v, g, s2, C), t2("./nodeify.js")(T), t2("./promisify.js")(T, v), t2("./props.js")(T, b, g, o), t2("./race.js")(T, v, g, o), t2("./reduce.js")(T, b, o, g, v, C), t2("./settle.js")(T, b, C), t2("./some.js")(T, b, o), t2("./filter.js")(T, v), t2("./each.js")(T, v), t2("./any.js")(T), c.toFastProperties(T), c.toFastProperties(T.prototype), A({ a: 1 }), A({ b: 2 }), A({ c: 3 }), A(1), A(function() {
            }), A(void 0), A(false), A(new T(v)), C.setBounds(f.firstLineError, c.lastLineError), T;
          };
        }, { "./any.js": 1, "./async": 2, "./bind": 3, "./call_get.js": 5, "./cancel": 6, "./catch_filter": 7, "./context": 8, "./debuggability": 9, "./direct_resolve": 10, "./each.js": 11, "./errors": 12, "./es5": 13, "./filter.js": 14, "./finally": 15, "./generators.js": 16, "./join": 17, "./map.js": 18, "./method": 19, "./nodeback": 20, "./nodeify.js": 21, "./promise_array": 23, "./promisify.js": 24, "./props.js": 25, "./race.js": 27, "./reduce.js": 28, "./settle.js": 30, "./some.js": 31, "./synchronous_inspection": 32, "./thenables": 33, "./timers.js": 34, "./using.js": 35, "./util": 36 }], 23: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i, o) {
            var s2 = t2("./util");
            function a(t3) {
              var n3 = this._promise = new e4(r4);
              t3 instanceof e4 && n3._propagateFrom(t3, 3), n3._setOnCancel(this), this._values = t3, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
            }
            return s2.isArray, s2.inherits(a, o), a.prototype.length = function() {
              return this._length;
            }, a.prototype.promise = function() {
              return this._promise;
            }, a.prototype._init = function t3(r5, o2) {
              var a2 = n2(this._values, this._promise);
              if (a2 instanceof e4) {
                var u = (a2 = a2._target())._bitField;
                if (this._values = a2, 0 == (50397184 & u))
                  return this._promise._setAsyncGuaranteed(), a2._then(t3, this._reject, void 0, this, o2);
                if (0 == (33554432 & u))
                  return 0 != (16777216 & u) ? this._reject(a2._reason()) : this._cancel();
                a2 = a2._value();
              }
              if (null !== (a2 = s2.asArray(a2)))
                0 !== a2.length ? this._iterate(a2) : -5 === o2 ? this._resolveEmptyArray() : this._resolve(function(t4) {
                  switch (o2) {
                    case -2:
                      return [];
                    case -3:
                      return {};
                    case -6:
                      return /* @__PURE__ */ new Map();
                  }
                }());
              else {
                var c = i("expecting an array or an iterable object but got " + s2.classString(a2)).reason();
                this._promise._rejectCallback(c, false);
              }
            }, a.prototype._iterate = function(t3) {
              var r5 = this.getActualLength(t3.length);
              this._length = r5, this._values = this.shouldCopyValues() ? new Array(r5) : this._values;
              for (var i2 = this._promise, o2 = false, s3 = null, a2 = 0; a2 < r5; ++a2) {
                var u = n2(t3[a2], i2);
                s3 = u instanceof e4 ? (u = u._target())._bitField : null, o2 ? null !== s3 && u.suppressUnhandledRejections() : null !== s3 ? 0 == (50397184 & s3) ? (u._proxy(this, a2), this._values[a2] = u) : o2 = 0 != (33554432 & s3) ? this._promiseFulfilled(u._value(), a2) : 0 != (16777216 & s3) ? this._promiseRejected(u._reason(), a2) : this._promiseCancelled(a2) : o2 = this._promiseFulfilled(u, a2);
              }
              o2 || i2._setAsyncGuaranteed();
            }, a.prototype._isResolved = function() {
              return null === this._values;
            }, a.prototype._resolve = function(t3) {
              this._values = null, this._promise._fulfill(t3);
            }, a.prototype._cancel = function() {
              !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
            }, a.prototype._reject = function(t3) {
              this._values = null, this._promise._rejectCallback(t3, false);
            }, a.prototype._promiseFulfilled = function(t3, e5) {
              return this._values[e5] = t3, ++this._totalResolved >= this._length && (this._resolve(this._values), true);
            }, a.prototype._promiseCancelled = function() {
              return this._cancel(), true;
            }, a.prototype._promiseRejected = function(t3) {
              return this._totalResolved++, this._reject(t3), true;
            }, a.prototype._resultCancelled = function() {
              if (!this._isResolved()) {
                var t3 = this._values;
                if (this._cancel(), t3 instanceof e4)
                  t3.cancel();
                else
                  for (var r5 = 0; r5 < t3.length; ++r5)
                    t3[r5] instanceof e4 && t3[r5].cancel();
              }
            }, a.prototype.shouldCopyValues = function() {
              return true;
            }, a.prototype.getActualLength = function(t3) {
              return t3;
            }, a;
          };
        }, { "./util": 36 }], 24: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4) {
            var n2 = {}, i = t2("./util"), o = t2("./nodeback"), s2 = i.withAppended, a = i.maybeWrapAsError, u = i.canEvaluate, c = t2("./errors").TypeError, l = { __isPromisified__: true }, f = new RegExp("^(?:" + ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"].join("|") + ")$"), h = function(t3) {
              return i.isIdentifier(t3) && "_" !== t3.charAt(0) && "constructor" !== t3;
            };
            function p(t3) {
              return !f.test(t3);
            }
            function d(t3) {
              try {
                return true === t3.__isPromisified__;
              } catch (t4) {
                return false;
              }
            }
            function _(t3, e5, r5) {
              var n3 = i.getDataPropertyOrDefault(t3, e5 + r5, l);
              return !!n3 && d(n3);
            }
            function v(t3, e5, r5, n3) {
              for (var o2 = i.inheritedDataKeys(t3), s3 = [], a2 = 0; a2 < o2.length; ++a2) {
                var u2 = o2[a2], l2 = t3[u2], f2 = n3 === h || h(u2, l2, t3);
                "function" != typeof l2 || d(l2) || _(t3, u2, e5) || !n3(u2, l2, t3, f2) || s3.push(u2, l2);
              }
              return function(t4, e6, r6) {
                for (var n4 = 0; n4 < t4.length; n4 += 2) {
                  var i2 = t4[n4];
                  if (r6.test(i2)) {
                    for (var o3 = i2.replace(r6, ""), s4 = 0; s4 < t4.length; s4 += 2)
                      if (t4[s4] === o3)
                        throw new c("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e6));
                  }
                }
              }(s3, e5, r5), s3;
            }
            var y = function(t3) {
              return t3.replace(/([$])/, "\\$");
            }, m = u ? void 0 : function(t3, u2, c2, l2, f2, h2) {
              var p2 = function() {
                return this;
              }(), d2 = t3;
              function _2() {
                var i2 = u2;
                u2 === n2 && (i2 = this);
                var c3 = new e4(r4);
                c3._captureStackTrace();
                var l3 = "string" == typeof d2 && this !== p2 ? this[d2] : t3, f3 = o(c3, h2);
                try {
                  l3.apply(i2, s2(arguments, f3));
                } catch (t4) {
                  c3._rejectCallback(a(t4), true, true);
                }
                return c3._isFateSealed() || c3._setAsyncGuaranteed(), c3;
              }
              return "string" == typeof d2 && (t3 = l2), i.notEnumerableProp(_2, "__isPromisified__", true), _2;
            };
            function g(t3, e5, r5, o2, s3) {
              for (var a2 = new RegExp(y(e5) + "$"), u2 = v(t3, e5, a2, r5), c2 = 0, l2 = u2.length; c2 < l2; c2 += 2) {
                var f2 = u2[c2], h2 = u2[c2 + 1], p2 = f2 + e5;
                if (o2 === m)
                  t3[p2] = m(f2, n2, f2, h2, e5, s3);
                else {
                  var d2 = o2(h2, function() {
                    return m(f2, n2, f2, h2, e5, s3);
                  });
                  i.notEnumerableProp(d2, "__isPromisified__", true), t3[p2] = d2;
                }
              }
              return i.toFastProperties(t3), t3;
            }
            e4.promisify = function(t3, e5) {
              if ("function" != typeof t3)
                throw new c("expecting a function but got " + i.classString(t3));
              if (d(t3))
                return t3;
              var r5 = void 0 === (e5 = Object(e5)).context ? n2 : e5.context, o2 = !!e5.multiArgs, s3 = function(t4, e6, r6) {
                return m(t4, e6, void 0, t4, null, o2);
              }(t3, r5);
              return i.copyDescriptors(t3, s3, p), s3;
            }, e4.promisifyAll = function(t3, e5) {
              if ("function" != typeof t3 && "object" != typeof t3)
                throw new c("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
              var r5 = !!(e5 = Object(e5)).multiArgs, n3 = e5.suffix;
              "string" != typeof n3 && (n3 = "Async");
              var o2 = e5.filter;
              "function" != typeof o2 && (o2 = h);
              var s3 = e5.promisifier;
              if ("function" != typeof s3 && (s3 = m), !i.isIdentifier(n3))
                throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
              for (var a2 = i.inheritedDataKeys(t3), u2 = 0; u2 < a2.length; ++u2) {
                var l2 = t3[a2[u2]];
                "constructor" !== a2[u2] && i.isClass(l2) && (g(l2.prototype, n3, o2, s3, r5), g(l2, n3, o2, s3, r5));
              }
              return g(t3, n3, o2, s3, r5);
            };
          };
        }, { "./errors": 12, "./nodeback": 20, "./util": 36 }], 25: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i) {
            var o, s2 = t2("./util"), a = s2.isObject, u = t2("./es5");
            "function" == typeof Map && (o = Map);
            var c = function() {
              var t3 = 0, e5 = 0;
              function r5(r6, n3) {
                this[t3] = r6, this[t3 + e5] = n3, t3++;
              }
              return function(n3) {
                e5 = n3.size, t3 = 0;
                var i2 = new Array(2 * n3.size);
                return n3.forEach(r5, i2), i2;
              };
            }();
            function l(t3) {
              var e5, r5 = false;
              if (void 0 !== o && t3 instanceof o)
                e5 = c(t3), r5 = true;
              else {
                var n3 = u.keys(t3), i2 = n3.length;
                e5 = new Array(2 * i2);
                for (var s3 = 0; s3 < i2; ++s3) {
                  var a2 = n3[s3];
                  e5[s3] = t3[a2], e5[s3 + i2] = a2;
                }
              }
              this.constructor$(e5), this._isMap = r5, this._init$(void 0, r5 ? -6 : -3);
            }
            function f(t3) {
              var r5, o2 = n2(t3);
              return a(o2) ? (r5 = o2 instanceof e4 ? o2._then(e4.props, void 0, void 0, void 0, void 0) : new l(o2).promise(), o2 instanceof e4 && r5._propagateFrom(o2, 2), r5) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
            }
            s2.inherits(l, r4), l.prototype._init = function() {
            }, l.prototype._promiseFulfilled = function(t3, e5) {
              if (this._values[e5] = t3, ++this._totalResolved >= this._length) {
                var r5;
                if (this._isMap)
                  r5 = function(t4) {
                    for (var e6 = new o(), r6 = t4.length / 2 | 0, n4 = 0; n4 < r6; ++n4) {
                      var i3 = t4[r6 + n4], s4 = t4[n4];
                      e6.set(i3, s4);
                    }
                    return e6;
                  }(this._values);
                else {
                  r5 = {};
                  for (var n3 = this.length(), i2 = 0, s3 = this.length(); i2 < s3; ++i2)
                    r5[this._values[i2 + n3]] = this._values[i2];
                }
                return this._resolve(r5), true;
              }
              return false;
            }, l.prototype.shouldCopyValues = function() {
              return false;
            }, l.prototype.getActualLength = function(t3) {
              return t3 >> 1;
            }, e4.prototype.props = function() {
              return f(this);
            }, e4.props = function(t3) {
              return f(t3);
            };
          };
        }, { "./es5": 13, "./util": 36 }], 26: [function(t2, e3, r3) {
          "use strict";
          function n2(t3) {
            this._capacity = t3, this._length = 0, this._front = 0;
          }
          n2.prototype._willBeOverCapacity = function(t3) {
            return this._capacity < t3;
          }, n2.prototype._pushOne = function(t3) {
            var e4 = this.length();
            this._checkCapacity(e4 + 1), this[this._front + e4 & this._capacity - 1] = t3, this._length = e4 + 1;
          }, n2.prototype.push = function(t3, e4, r4) {
            var n3 = this.length() + 3;
            if (this._willBeOverCapacity(n3))
              return this._pushOne(t3), this._pushOne(e4), void this._pushOne(r4);
            var i = this._front + n3 - 3;
            this._checkCapacity(n3);
            var o = this._capacity - 1;
            this[i + 0 & o] = t3, this[i + 1 & o] = e4, this[i + 2 & o] = r4, this._length = n3;
          }, n2.prototype.shift = function() {
            var t3 = this._front, e4 = this[t3];
            return this[t3] = void 0, this._front = t3 + 1 & this._capacity - 1, this._length--, e4;
          }, n2.prototype.length = function() {
            return this._length;
          }, n2.prototype._checkCapacity = function(t3) {
            this._capacity < t3 && this._resizeTo(this._capacity << 1);
          }, n2.prototype._resizeTo = function(t3) {
            var e4 = this._capacity;
            this._capacity = t3, function(t4, e5, r4, n3, i) {
              for (var o = 0; o < i; ++o)
                r4[o + n3] = t4[o + 0], t4[o + 0] = void 0;
            }(this, 0, this, e4, this._front + this._length & e4 - 1);
          }, e3.exports = n2;
        }, {}], 27: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i) {
            var o = t2("./util"), s2 = function(t3) {
              return t3.then(function(e5) {
                return a(e5, t3);
              });
            };
            function a(t3, a2) {
              var u = n2(t3);
              if (u instanceof e4)
                return s2(u);
              if (null === (t3 = o.asArray(t3)))
                return i("expecting an array or an iterable object but got " + o.classString(t3));
              var c = new e4(r4);
              void 0 !== a2 && c._propagateFrom(a2, 3);
              for (var l = c._fulfill, f = c._reject, h = 0, p = t3.length; h < p; ++h) {
                var d = t3[h];
                (void 0 !== d || h in t3) && e4.cast(d)._then(l, f, void 0, c, null);
              }
              return c;
            }
            e4.race = function(t3) {
              return a(t3, void 0);
            }, e4.prototype.race = function() {
              return a(this, void 0);
            };
          };
        }, { "./util": 36 }], 28: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i, o, s2) {
            var a = e4._getDomain, u = t2("./util"), c = u.tryCatch;
            function l(t3, r5, n3, i2) {
              this.constructor$(t3);
              var s3 = a();
              this._fn = null === s3 ? r5 : u.domainBind(s3, r5), void 0 !== n3 && (n3 = e4.resolve(n3))._attachCancellationCallback(this), this._initialValue = n3, this._currentCancellable = null, this._eachValues = i2 === o ? Array(this._length) : 0 === i2 ? null : void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
            }
            function f(t3, e5) {
              this.isFulfilled() ? e5._resolve(t3) : e5._reject(t3);
            }
            function h(t3, e5, r5, i2) {
              return "function" != typeof e5 ? n2("expecting a function but got " + u.classString(e5)) : new l(t3, e5, r5, i2).promise();
            }
            function p(t3) {
              this.accum = t3, this.array._gotAccum(t3);
              var r5 = i(this.value, this.array._promise);
              return r5 instanceof e4 ? (this.array._currentCancellable = r5, r5._then(d, void 0, void 0, this, void 0)) : d.call(this, r5);
            }
            function d(t3) {
              var r5, n3 = this.array, i2 = n3._promise, o2 = c(n3._fn);
              i2._pushContext(), (r5 = void 0 !== n3._eachValues ? o2.call(i2._boundValue(), t3, this.index, this.length) : o2.call(i2._boundValue(), this.accum, t3, this.index, this.length)) instanceof e4 && (n3._currentCancellable = r5);
              var a2 = i2._popContext();
              return s2.checkForgottenReturns(r5, a2, void 0 !== n3._eachValues ? "Promise.each" : "Promise.reduce", i2), r5;
            }
            u.inherits(l, r4), l.prototype._gotAccum = function(t3) {
              void 0 !== this._eachValues && null !== this._eachValues && t3 !== o && this._eachValues.push(t3);
            }, l.prototype._eachComplete = function(t3) {
              return null !== this._eachValues && this._eachValues.push(t3), this._eachValues;
            }, l.prototype._init = function() {
            }, l.prototype._resolveEmptyArray = function() {
              this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
            }, l.prototype.shouldCopyValues = function() {
              return false;
            }, l.prototype._resolve = function(t3) {
              this._promise._resolveCallback(t3), this._values = null;
            }, l.prototype._resultCancelled = function(t3) {
              if (t3 === this._initialValue)
                return this._cancel();
              this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e4 && this._currentCancellable.cancel(), this._initialValue instanceof e4 && this._initialValue.cancel());
            }, l.prototype._iterate = function(t3) {
              var r5, n3;
              this._values = t3;
              var i2 = t3.length;
              if (void 0 !== this._initialValue ? (r5 = this._initialValue, n3 = 0) : (r5 = e4.resolve(t3[0]), n3 = 1), this._currentCancellable = r5, !r5.isRejected())
                for (; n3 < i2; ++n3) {
                  var o2 = { accum: null, value: t3[n3], index: n3, length: i2, array: this };
                  r5 = r5._then(p, void 0, void 0, o2, void 0);
                }
              void 0 !== this._eachValues && (r5 = r5._then(this._eachComplete, void 0, void 0, this, void 0)), r5._then(f, f, void 0, r5, this);
            }, e4.prototype.reduce = function(t3, e5) {
              return h(this, t3, e5, null);
            }, e4.reduce = function(t3, e5, r5, n3) {
              return h(t3, e5, r5, n3);
            };
          };
        }, { "./util": 36 }], 29: [function(t2, i, o) {
          "use strict";
          var s2, a = t2("./util"), u = a.getNativePromise();
          if (a.isNode && "undefined" == typeof MutationObserver) {
            var c = r2.setImmediate, l = e2.nextTick;
            s2 = a.isRecentNode ? function(t3) {
              c.call(r2, t3);
            } : function(t3) {
              l.call(e2, t3);
            };
          } else if ("function" == typeof u && "function" == typeof u.resolve) {
            var f = u.resolve();
            s2 = function(t3) {
              f.then(t3);
            };
          } else
            s2 = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? void 0 !== n ? function(t3) {
              n(t3);
            } : "undefined" != typeof setTimeout ? function(t3) {
              setTimeout(t3, 0);
            } : function() {
              throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
            } : function() {
              var t3 = document.createElement("div"), e3 = { attributes: true }, r3 = false, n2 = document.createElement("div");
              return new MutationObserver(function() {
                t3.classList.toggle("foo"), r3 = false;
              }).observe(n2, e3), function(i2) {
                var o2 = new MutationObserver(function() {
                  o2.disconnect(), i2();
                });
                o2.observe(t3, e3), r3 || (r3 = true, n2.classList.toggle("foo"));
              };
            }();
          i.exports = s2;
        }, { "./util": 36 }], 30: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2) {
            var i = e4.PromiseInspection;
            function o(t3) {
              this.constructor$(t3);
            }
            t2("./util").inherits(o, r4), o.prototype._promiseResolved = function(t3, e5) {
              return this._values[t3] = e5, ++this._totalResolved >= this._length && (this._resolve(this._values), true);
            }, o.prototype._promiseFulfilled = function(t3, e5) {
              var r5 = new i();
              return r5._bitField = 33554432, r5._settledValueField = t3, this._promiseResolved(e5, r5);
            }, o.prototype._promiseRejected = function(t3, e5) {
              var r5 = new i();
              return r5._bitField = 16777216, r5._settledValueField = t3, this._promiseResolved(e5, r5);
            }, e4.settle = function(t3) {
              return n2.deprecated(".settle()", ".reflect()"), new o(t3).promise();
            }, e4.prototype.settle = function() {
              return e4.settle(this);
            };
          };
        }, { "./util": 36 }], 31: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2) {
            var i = t2("./util"), o = t2("./errors").RangeError, s2 = t2("./errors").AggregateError, a = i.isArray, u = {};
            function c(t3) {
              this.constructor$(t3), this._howMany = 0, this._unwrap = false, this._initialized = false;
            }
            function l(t3, e5) {
              if ((0 | e5) !== e5 || e5 < 0)
                return n2("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
              var r5 = new c(t3), i2 = r5.promise();
              return r5.setHowMany(e5), r5.init(), i2;
            }
            i.inherits(c, r4), c.prototype._init = function() {
              if (this._initialized)
                if (0 !== this._howMany) {
                  this._init$(void 0, -5);
                  var t3 = a(this._values);
                  !this._isResolved() && t3 && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
                } else
                  this._resolve([]);
            }, c.prototype.init = function() {
              this._initialized = true, this._init();
            }, c.prototype.setUnwrap = function() {
              this._unwrap = true;
            }, c.prototype.howMany = function() {
              return this._howMany;
            }, c.prototype.setHowMany = function(t3) {
              this._howMany = t3;
            }, c.prototype._promiseFulfilled = function(t3) {
              return this._addFulfilled(t3), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), true);
            }, c.prototype._promiseRejected = function(t3) {
              return this._addRejected(t3), this._checkOutcome();
            }, c.prototype._promiseCancelled = function() {
              return this._values instanceof e4 || null == this._values ? this._cancel() : (this._addRejected(u), this._checkOutcome());
            }, c.prototype._checkOutcome = function() {
              if (this.howMany() > this._canPossiblyFulfill()) {
                for (var t3 = new s2(), e5 = this.length(); e5 < this._values.length; ++e5)
                  this._values[e5] !== u && t3.push(this._values[e5]);
                return t3.length > 0 ? this._reject(t3) : this._cancel(), true;
              }
              return false;
            }, c.prototype._fulfilled = function() {
              return this._totalResolved;
            }, c.prototype._rejected = function() {
              return this._values.length - this.length();
            }, c.prototype._addRejected = function(t3) {
              this._values.push(t3);
            }, c.prototype._addFulfilled = function(t3) {
              this._values[this._totalResolved++] = t3;
            }, c.prototype._canPossiblyFulfill = function() {
              return this.length() - this._rejected();
            }, c.prototype._getRangeError = function(t3) {
              var e5 = "Input array must contain at least " + this._howMany + " items but contains only " + t3 + " items";
              return new o(e5);
            }, c.prototype._resolveEmptyArray = function() {
              this._reject(this._getRangeError(0));
            }, e4.some = function(t3, e5) {
              return l(t3, e5);
            }, e4.prototype.some = function(t3) {
              return l(this, t3);
            }, e4._SomePromiseArray = c;
          };
        }, { "./errors": 12, "./util": 36 }], 32: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(t3) {
            function e4(t4) {
              void 0 !== t4 ? (t4 = t4._target(), this._bitField = t4._bitField, this._settledValueField = t4._isFateSealed() ? t4._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
            }
            e4.prototype._settledValue = function() {
              return this._settledValueField;
            };
            var r4 = e4.prototype.value = function() {
              if (!this.isFulfilled())
                throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
              return this._settledValue();
            }, n2 = e4.prototype.error = e4.prototype.reason = function() {
              if (!this.isRejected())
                throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
              return this._settledValue();
            }, i = e4.prototype.isFulfilled = function() {
              return 0 != (33554432 & this._bitField);
            }, o = e4.prototype.isRejected = function() {
              return 0 != (16777216 & this._bitField);
            }, s2 = e4.prototype.isPending = function() {
              return 0 == (50397184 & this._bitField);
            }, a = e4.prototype.isResolved = function() {
              return 0 != (50331648 & this._bitField);
            };
            e4.prototype.isCancelled = function() {
              return 0 != (8454144 & this._bitField);
            }, t3.prototype.__isCancelled = function() {
              return 65536 == (65536 & this._bitField);
            }, t3.prototype._isCancelled = function() {
              return this._target().__isCancelled();
            }, t3.prototype.isCancelled = function() {
              return 0 != (8454144 & this._target()._bitField);
            }, t3.prototype.isPending = function() {
              return s2.call(this._target());
            }, t3.prototype.isRejected = function() {
              return o.call(this._target());
            }, t3.prototype.isFulfilled = function() {
              return i.call(this._target());
            }, t3.prototype.isResolved = function() {
              return a.call(this._target());
            }, t3.prototype.value = function() {
              return r4.call(this._target());
            }, t3.prototype.reason = function() {
              var t4 = this._target();
              return t4._unsetRejectionIsUnhandled(), n2.call(t4);
            }, t3.prototype._value = function() {
              return this._settledValue();
            }, t3.prototype._reason = function() {
              return this._unsetRejectionIsUnhandled(), this._settledValue();
            }, t3.PromiseInspection = e4;
          };
        }, {}], 33: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4) {
            var n2 = t2("./util"), i = n2.errorObj, o = n2.isObject, s2 = {}.hasOwnProperty;
            return function(t3, a) {
              if (o(t3)) {
                if (t3 instanceof e4)
                  return t3;
                var u = function(t4) {
                  try {
                    return function(t5) {
                      return t5.then;
                    }(t4);
                  } catch (t5) {
                    return i.e = t5, i;
                  }
                }(t3);
                if (u === i) {
                  a && a._pushContext();
                  var c = e4.reject(u.e);
                  return a && a._popContext(), c;
                }
                if ("function" == typeof u)
                  return function(t4) {
                    try {
                      return s2.call(t4, "_promise0");
                    } catch (t5) {
                      return false;
                    }
                  }(t3) ? (c = new e4(r4), t3._then(c._fulfill, c._reject, void 0, c, null), c) : function(t4, o2, s3) {
                    var a2 = new e4(r4), u2 = a2;
                    s3 && s3._pushContext(), a2._captureStackTrace(), s3 && s3._popContext();
                    var c2 = true, l = n2.tryCatch(o2).call(t4, function(t5) {
                      a2 && (a2._resolveCallback(t5), a2 = null);
                    }, function(t5) {
                      a2 && (a2._rejectCallback(t5, c2, true), a2 = null);
                    });
                    return c2 = false, a2 && l === i && (a2._rejectCallback(l.e, true, true), a2 = null), u2;
                  }(t3, u, a);
              }
              return t3;
            };
          };
        }, { "./util": 36 }], 34: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2) {
            var i = t2("./util"), o = e4.TimeoutError;
            function s2(t3) {
              this.handle = t3;
            }
            s2.prototype._resultCancelled = function() {
              clearTimeout(this.handle);
            };
            var a = function(t3) {
              return u(+this).thenReturn(t3);
            }, u = e4.delay = function(t3, i2) {
              var o2, u2;
              return void 0 !== i2 ? (o2 = e4.resolve(i2)._then(a, null, null, t3, void 0), n2.cancellation() && i2 instanceof e4 && o2._setOnCancel(i2)) : (o2 = new e4(r4), u2 = setTimeout(function() {
                o2._fulfill();
              }, +t3), n2.cancellation() && o2._setOnCancel(new s2(u2)), o2._captureStackTrace()), o2._setAsyncGuaranteed(), o2;
            };
            function c(t3) {
              return clearTimeout(this.handle), t3;
            }
            function l(t3) {
              throw clearTimeout(this.handle), t3;
            }
            e4.prototype.delay = function(t3) {
              return u(t3, this);
            }, e4.prototype.timeout = function(t3, e5) {
              var r5, a2;
              t3 = +t3;
              var u2 = new s2(setTimeout(function() {
                r5.isPending() && function(t4, e6, r6) {
                  var n3;
                  n3 = "string" != typeof e6 ? e6 instanceof Error ? e6 : new o("operation timed out") : new o(e6), i.markAsOriginatingFromRejection(n3), t4._attachExtraTrace(n3), t4._reject(n3), null != r6 && r6.cancel();
                }(r5, e5, a2);
              }, t3));
              return n2.cancellation() ? (a2 = this.then(), (r5 = a2._then(c, l, void 0, u2, void 0))._setOnCancel(u2)) : r5 = this._then(c, l, void 0, u2, void 0), r5;
            };
          };
        }, { "./util": 36 }], 35: [function(t2, e3, r3) {
          "use strict";
          e3.exports = function(e4, r4, n2, i, o, s2) {
            var a = t2("./util"), u = t2("./errors").TypeError, c = t2("./util").inherits, l = a.errorObj, f = a.tryCatch, h = {};
            function p(t3) {
              setTimeout(function() {
                throw t3;
              }, 0);
            }
            function d(t3, r5) {
              var i2 = 0, s3 = t3.length, a2 = new e4(o);
              return function o2() {
                if (i2 >= s3)
                  return a2._fulfill();
                var u2 = function(t4) {
                  var e5 = n2(t4);
                  return e5 !== t4 && "function" == typeof t4._isDisposable && "function" == typeof t4._getDisposer && t4._isDisposable() && e5._setDisposable(t4._getDisposer()), e5;
                }(t3[i2++]);
                if (u2 instanceof e4 && u2._isDisposable()) {
                  try {
                    u2 = n2(u2._getDisposer().tryDispose(r5), t3.promise);
                  } catch (t4) {
                    return p(t4);
                  }
                  if (u2 instanceof e4)
                    return u2._then(o2, p, null, null, null);
                }
                o2();
              }(), a2;
            }
            function _(t3, e5, r5) {
              this._data = t3, this._promise = e5, this._context = r5;
            }
            function v(t3, e5, r5) {
              this.constructor$(t3, e5, r5);
            }
            function y(t3) {
              return _.isDisposer(t3) ? (this.resources[this.index]._setDisposable(t3), t3.promise()) : t3;
            }
            function m(t3) {
              this.length = t3, this.promise = null, this[t3 - 1] = null;
            }
            _.prototype.data = function() {
              return this._data;
            }, _.prototype.promise = function() {
              return this._promise;
            }, _.prototype.resource = function() {
              return this.promise().isFulfilled() ? this.promise().value() : h;
            }, _.prototype.tryDispose = function(t3) {
              var e5 = this.resource(), r5 = this._context;
              void 0 !== r5 && r5._pushContext();
              var n3 = e5 !== h ? this.doDispose(e5, t3) : null;
              return void 0 !== r5 && r5._popContext(), this._promise._unsetDisposable(), this._data = null, n3;
            }, _.isDisposer = function(t3) {
              return null != t3 && "function" == typeof t3.resource && "function" == typeof t3.tryDispose;
            }, c(v, _), v.prototype.doDispose = function(t3, e5) {
              return this.data().call(t3, t3, e5);
            }, m.prototype._resultCancelled = function() {
              for (var t3 = this.length, r5 = 0; r5 < t3; ++r5) {
                var n3 = this[r5];
                n3 instanceof e4 && n3.cancel();
              }
            }, e4.using = function() {
              var t3 = arguments.length;
              if (t3 < 2)
                return r4("you must pass at least 2 arguments to Promise.using");
              var i2, o2 = arguments[t3 - 1];
              if ("function" != typeof o2)
                return r4("expecting a function but got " + a.classString(o2));
              var u2 = true;
              2 === t3 && Array.isArray(arguments[0]) ? (t3 = (i2 = arguments[0]).length, u2 = false) : (i2 = arguments, t3--);
              for (var c2 = new m(t3), h2 = 0; h2 < t3; ++h2) {
                var p2 = i2[h2];
                if (_.isDisposer(p2)) {
                  var v2 = p2;
                  (p2 = p2.promise())._setDisposable(v2);
                } else {
                  var g = n2(p2);
                  g instanceof e4 && (p2 = g._then(y, null, null, { resources: c2, index: h2 }, void 0));
                }
                c2[h2] = p2;
              }
              var b = new Array(c2.length);
              for (h2 = 0; h2 < b.length; ++h2)
                b[h2] = e4.resolve(c2[h2]).reflect();
              var w = e4.all(b).then(function(t4) {
                for (var e5 = 0; e5 < t4.length; ++e5) {
                  var r5 = t4[e5];
                  if (r5.isRejected())
                    return l.e = r5.error(), l;
                  if (!r5.isFulfilled())
                    return void w.cancel();
                  t4[e5] = r5.value();
                }
                E._pushContext(), o2 = f(o2);
                var n3 = u2 ? o2.apply(void 0, t4) : o2(t4), i3 = E._popContext();
                return s2.checkForgottenReturns(n3, i3, "Promise.using", E), n3;
              }), E = w.lastly(function() {
                var t4 = new e4.PromiseInspection(w);
                return d(c2, t4);
              });
              return c2.promise = E, E._setOnCancel(c2), E;
            }, e4.prototype._setDisposable = function(t3) {
              this._bitField = 131072 | this._bitField, this._disposer = t3;
            }, e4.prototype._isDisposable = function() {
              return (131072 & this._bitField) > 0;
            }, e4.prototype._getDisposer = function() {
              return this._disposer;
            }, e4.prototype._unsetDisposable = function() {
              this._bitField = -131073 & this._bitField, this._disposer = void 0;
            }, e4.prototype.disposer = function(t3) {
              if ("function" == typeof t3)
                return new v(t3, this, i());
              throw new u();
            };
          };
        }, { "./errors": 12, "./util": 36 }], 36: [function(t2, n2, i) {
          "use strict";
          var o, s2 = t2("./es5"), a = "undefined" == typeof navigator, u = { e: {} }, c = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== r2 ? r2 : void 0 !== this ? this : null;
          function l() {
            try {
              var t3 = o;
              return o = null, t3.apply(this, arguments);
            } catch (t4) {
              return u.e = t4, u;
            }
          }
          function f(t3) {
            return null == t3 || true === t3 || false === t3 || "string" == typeof t3 || "number" == typeof t3;
          }
          function h(t3, e3, r3) {
            if (f(t3))
              return t3;
            var n3 = { value: r3, configurable: true, enumerable: false, writable: true };
            return s2.defineProperty(t3, e3, n3), t3;
          }
          var p = function() {
            var t3 = [Array.prototype, Object.prototype, Function.prototype], e3 = function(e4) {
              for (var r4 = 0; r4 < t3.length; ++r4)
                if (t3[r4] === e4)
                  return true;
              return false;
            };
            if (s2.isES5) {
              var r3 = Object.getOwnPropertyNames;
              return function(t4) {
                for (var n4 = [], i2 = /* @__PURE__ */ Object.create(null); null != t4 && !e3(t4); ) {
                  var o2;
                  try {
                    o2 = r3(t4);
                  } catch (t5) {
                    return n4;
                  }
                  for (var a2 = 0; a2 < o2.length; ++a2) {
                    var u2 = o2[a2];
                    if (!i2[u2]) {
                      i2[u2] = true;
                      var c2 = Object.getOwnPropertyDescriptor(t4, u2);
                      null != c2 && null == c2.get && null == c2.set && n4.push(u2);
                    }
                  }
                  t4 = s2.getPrototypeOf(t4);
                }
                return n4;
              };
            }
            var n3 = {}.hasOwnProperty;
            return function(r4) {
              if (e3(r4))
                return [];
              var i2 = [];
              t:
                for (var o2 in r4)
                  if (n3.call(r4, o2))
                    i2.push(o2);
                  else {
                    for (var s3 = 0; s3 < t3.length; ++s3)
                      if (n3.call(t3[s3], o2))
                        continue t;
                    i2.push(o2);
                  }
              return i2;
            };
          }(), d = /this\s*\.\s*\S+\s*=/, _ = /^[a-z$_][a-z$_0-9]*$/i;
          function v(t3) {
            try {
              return t3 + "";
            } catch (t4) {
              return "[no string representation]";
            }
          }
          function y(t3) {
            return t3 instanceof Error || null !== t3 && "object" == typeof t3 && "string" == typeof t3.message && "string" == typeof t3.name;
          }
          function m(t3) {
            return y(t3) && s2.propertyIsWritable(t3, "stack");
          }
          var g = "stack" in new Error() ? function(t3) {
            return m(t3) ? t3 : new Error(v(t3));
          } : function(t3) {
            if (m(t3))
              return t3;
            try {
              throw new Error(v(t3));
            } catch (t4) {
              return t4;
            }
          };
          function b(t3) {
            return {}.toString.call(t3);
          }
          var w = function(t3) {
            return s2.isArray(t3) ? t3 : null;
          };
          if ("undefined" != typeof Symbol && Symbol.iterator) {
            var E = "function" == typeof Array.from ? function(t3) {
              return Array.from(t3);
            } : function(t3) {
              for (var e3, r3 = [], n3 = t3[Symbol.iterator](); !(e3 = n3.next()).done; )
                r3.push(e3.value);
              return r3;
            };
            w = function(t3) {
              return s2.isArray(t3) ? t3 : null != t3 && "function" == typeof t3[Symbol.iterator] ? E(t3) : null;
            };
          }
          var C = void 0 !== e2 && "[object process]" === b(e2).toLowerCase(), x = void 0 !== e2 && void 0 !== e2.env, j = { isClass: function(t3) {
            try {
              if ("function" == typeof t3) {
                var e3 = s2.names(t3.prototype), r3 = s2.isES5 && e3.length > 1, n3 = e3.length > 0 && !(1 === e3.length && "constructor" === e3[0]), i2 = d.test(t3 + "") && s2.names(t3).length > 0;
                if (r3 || n3 || i2)
                  return true;
              }
              return false;
            } catch (t4) {
              return false;
            }
          }, isIdentifier: function(t3) {
            return _.test(t3);
          }, inheritedDataKeys: p, getDataPropertyOrDefault: function(t3, e3, r3) {
            if (!s2.isES5)
              return {}.hasOwnProperty.call(t3, e3) ? t3[e3] : void 0;
            var n3 = Object.getOwnPropertyDescriptor(t3, e3);
            return null != n3 ? null == n3.get && null == n3.set ? n3.value : r3 : void 0;
          }, thrower: function(t3) {
            throw t3;
          }, isArray: s2.isArray, asArray: w, notEnumerableProp: h, isPrimitive: f, isObject: function(t3) {
            return "function" == typeof t3 || "object" == typeof t3 && null !== t3;
          }, isError: y, canEvaluate: a, errorObj: u, tryCatch: function(t3) {
            return o = t3, l;
          }, inherits: function(t3, e3) {
            var r3 = {}.hasOwnProperty;
            function n3() {
              for (var n4 in this.constructor = t3, this.constructor$ = e3, e3.prototype)
                r3.call(e3.prototype, n4) && "$" !== n4.charAt(n4.length - 1) && (this[n4 + "$"] = e3.prototype[n4]);
            }
            return n3.prototype = e3.prototype, t3.prototype = new n3(), t3.prototype;
          }, withAppended: function(t3, e3) {
            var r3, n3 = t3.length, i2 = new Array(n3 + 1);
            for (r3 = 0; r3 < n3; ++r3)
              i2[r3] = t3[r3];
            return i2[r3] = e3, i2;
          }, maybeWrapAsError: function(t3) {
            return f(t3) ? new Error(v(t3)) : t3;
          }, toFastProperties: function(t3) {
            function e3() {
            }
            e3.prototype = t3;
            for (var r3 = 8; r3--; )
              new e3();
            return t3;
          }, filledRange: function(t3, e3, r3) {
            for (var n3 = new Array(t3), i2 = 0; i2 < t3; ++i2)
              n3[i2] = e3 + i2 + r3;
            return n3;
          }, toString: v, canAttachTrace: m, ensureErrorObject: g, originatesFromRejection: function(t3) {
            return null != t3 && (t3 instanceof Error.__BluebirdErrorTypes__.OperationalError || true === t3.isOperational);
          }, markAsOriginatingFromRejection: function(t3) {
            try {
              h(t3, "isOperational", true);
            } catch (t4) {
            }
          }, classString: b, copyDescriptors: function(t3, e3, r3) {
            for (var n3 = s2.names(t3), i2 = 0; i2 < n3.length; ++i2) {
              var o2 = n3[i2];
              if (r3(o2))
                try {
                  s2.defineProperty(e3, o2, s2.getDescriptor(t3, o2));
                } catch (t4) {
                }
            }
          }, hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes, isNode: C, hasEnvVariables: x, env: function(t3) {
            return x ? e2.env[t3] : void 0;
          }, global: c, getNativePromise: function() {
            if ("function" == typeof Promise)
              try {
                var t3 = new Promise(function() {
                });
                if ("[object Promise]" === {}.toString.call(t3))
                  return Promise;
              } catch (t4) {
              }
          }, domainBind: function(t3, e3) {
            return t3.bind(e3);
          } };
          j.isRecentNode = j.isNode && function() {
            var t3 = e2.versions.node.split(".").map(Number);
            return 0 === t3[0] && t3[1] > 10 || t3[0] > 0;
          }(), j.isNode && j.toFastProperties(e2);
          try {
            throw new Error();
          } catch (t3) {
            j.lastLineError = t3;
          }
          n2.exports = j;
        }, { "./es5": 13 }] }, {}, [4])(4), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);
      }).call(this, r(4), r(0), r(11).setImmediate);
    }, function(t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: true }), e.default = function(t2, e2) {
        if (!e2.eol && t2) {
          for (var r2 = 0, n = t2.length; r2 < n; r2++)
            if ("\r" === t2[r2]) {
              if ("\n" === t2[r2 + 1]) {
                e2.eol = "\r\n";
                break;
              }
              if (t2[r2 + 1]) {
                e2.eol = "\r";
                break;
              }
            } else if ("\n" === t2[r2]) {
              e2.eol = "\n";
              break;
            }
        }
        return e2.eol || "\n";
      };
    }, function(t, e, r) {
      var n = r(65), i = r(73);
      t.exports = function(t2, e2) {
        var r2 = i(t2, e2);
        return n(r2) ? r2 : void 0;
      };
    }, function(t, e, r) {
      var n = r(19).Symbol;
      t.exports = n;
    }, function(t, e, r) {
      var n = r(67), i = "object" == typeof self && self && self.Object === Object && self, o = n || i || Function("return this")();
      t.exports = o;
    }, function(t, e) {
      t.exports = function(t2) {
        var e2 = typeof t2;
        return null != t2 && ("object" == e2 || "function" == e2);
      };
    }, function(t, e) {
      var r = Array.isArray;
      t.exports = r;
    }, function(t, e, r) {
      var n = r(30), i = r(76);
      t.exports = function(t2) {
        return "symbol" == typeof t2 || i(t2) && "[object Symbol]" == n(t2);
      };
    }, function(t, e, r) {
      "use strict";
      (function(e2, n) {
        var i = r(6);
        t.exports = g;
        var o, s2 = r(37);
        g.ReadableState = m, r(12).EventEmitter;
        var a = function(t2, e3) {
          return t2.listeners(e3).length;
        }, u = r(24), c = r(7).Buffer, l = e2.Uint8Array || function() {
        }, f = r(5);
        f.inherits = r(2);
        var h = r(41), p = void 0;
        p = h && h.debuglog ? h.debuglog("stream") : function() {
        };
        var d, _ = r(42), v = r(25);
        f.inherits(g, u);
        var y = ["error", "close", "destroy", "pause", "resume"];
        function m(t2, e3) {
          o = o || r(1), t2 = t2 || {};
          var n2 = e3 instanceof o;
          this.objectMode = !!t2.objectMode, n2 && (this.objectMode = this.objectMode || !!t2.readableObjectMode);
          var i2 = t2.highWaterMark, s3 = t2.readableHighWaterMark, a2 = this.objectMode ? 16 : 16384;
          this.highWaterMark = i2 || 0 === i2 ? i2 : n2 && (s3 || 0 === s3) ? s3 : a2, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new _(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this.destroyed = false, this.defaultEncoding = t2.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = false, this.decoder = null, this.encoding = null, t2.encoding && (d || (d = r(26).StringDecoder), this.decoder = new d(t2.encoding), this.encoding = t2.encoding);
        }
        function g(t2) {
          if (o = o || r(1), !(this instanceof g))
            return new g(t2);
          this._readableState = new m(t2, this), this.readable = true, t2 && ("function" == typeof t2.read && (this._read = t2.read), "function" == typeof t2.destroy && (this._destroy = t2.destroy)), u.call(this);
        }
        function b(t2, e3, r2, n2, i2) {
          var o2, s3 = t2._readableState;
          return null === e3 ? (s3.reading = false, function(t3, e4) {
            if (!e4.ended) {
              if (e4.decoder) {
                var r3 = e4.decoder.end();
                r3 && r3.length && (e4.buffer.push(r3), e4.length += e4.objectMode ? 1 : r3.length);
              }
              e4.ended = true, x(t3);
            }
          }(t2, s3)) : (i2 || (o2 = function(t3, e4) {
            var r3;
            return function(t4) {
              return c.isBuffer(t4) || t4 instanceof l;
            }(e4) || "string" == typeof e4 || void 0 === e4 || t3.objectMode || (r3 = new TypeError("Invalid non-string/buffer chunk")), r3;
          }(s3, e3)), o2 ? t2.emit("error", o2) : s3.objectMode || e3 && e3.length > 0 ? ("string" == typeof e3 || s3.objectMode || Object.getPrototypeOf(e3) === c.prototype || (e3 = function(t3) {
            return c.from(t3);
          }(e3)), n2 ? s3.endEmitted ? t2.emit("error", new Error("stream.unshift() after end event")) : w(t2, s3, e3, true) : s3.ended ? t2.emit("error", new Error("stream.push() after EOF")) : (s3.reading = false, s3.decoder && !r2 ? (e3 = s3.decoder.write(e3), s3.objectMode || 0 !== e3.length ? w(t2, s3, e3, false) : S(t2, s3)) : w(t2, s3, e3, false))) : n2 || (s3.reading = false)), function(t3) {
            return !t3.ended && (t3.needReadable || t3.length < t3.highWaterMark || 0 === t3.length);
          }(s3);
        }
        function w(t2, e3, r2, n2) {
          e3.flowing && 0 === e3.length && !e3.sync ? (t2.emit("data", r2), t2.read(0)) : (e3.length += e3.objectMode ? 1 : r2.length, n2 ? e3.buffer.unshift(r2) : e3.buffer.push(r2), e3.needReadable && x(t2)), S(t2, e3);
        }
        Object.defineProperty(g.prototype, "destroyed", { get: function() {
          return void 0 !== this._readableState && this._readableState.destroyed;
        }, set: function(t2) {
          this._readableState && (this._readableState.destroyed = t2);
        } }), g.prototype.destroy = v.destroy, g.prototype._undestroy = v.undestroy, g.prototype._destroy = function(t2, e3) {
          this.push(null), e3(t2);
        }, g.prototype.push = function(t2, e3) {
          var r2, n2 = this._readableState;
          return n2.objectMode ? r2 = true : "string" == typeof t2 && ((e3 = e3 || n2.defaultEncoding) !== n2.encoding && (t2 = c.from(t2, e3), e3 = ""), r2 = true), b(this, t2, e3, false, r2);
        }, g.prototype.unshift = function(t2) {
          return b(this, t2, null, true, false);
        }, g.prototype.isPaused = function() {
          return false === this._readableState.flowing;
        }, g.prototype.setEncoding = function(t2) {
          return d || (d = r(26).StringDecoder), this._readableState.decoder = new d(t2), this._readableState.encoding = t2, this;
        };
        var E = 8388608;
        function C(t2, e3) {
          return t2 <= 0 || 0 === e3.length && e3.ended ? 0 : e3.objectMode ? 1 : t2 != t2 ? e3.flowing && e3.length ? e3.buffer.head.data.length : e3.length : (t2 > e3.highWaterMark && (e3.highWaterMark = function(t3) {
            return t3 >= E ? t3 = E : (t3--, t3 |= t3 >>> 1, t3 |= t3 >>> 2, t3 |= t3 >>> 4, t3 |= t3 >>> 8, t3 |= t3 >>> 16, t3++), t3;
          }(t2)), t2 <= e3.length ? t2 : e3.ended ? e3.length : (e3.needReadable = true, 0));
        }
        function x(t2) {
          var e3 = t2._readableState;
          e3.needReadable = false, e3.emittedReadable || (p("emitReadable", e3.flowing), e3.emittedReadable = true, e3.sync ? i.nextTick(j, t2) : j(t2));
        }
        function j(t2) {
          p("emit readable"), t2.emit("readable"), P(t2);
        }
        function S(t2, e3) {
          e3.readingMore || (e3.readingMore = true, i.nextTick(R, t2, e3));
        }
        function R(t2, e3) {
          for (var r2 = e3.length; !e3.reading && !e3.flowing && !e3.ended && e3.length < e3.highWaterMark && (p("maybeReadMore read 0"), t2.read(0), r2 !== e3.length); )
            r2 = e3.length;
          e3.readingMore = false;
        }
        function k(t2) {
          p("readable nexttick read 0"), t2.read(0);
        }
        function T(t2, e3) {
          e3.reading || (p("resume read 0"), t2.read(0)), e3.resumeScheduled = false, e3.awaitDrain = 0, t2.emit("resume"), P(t2), e3.flowing && !e3.reading && t2.read(0);
        }
        function P(t2) {
          var e3 = t2._readableState;
          for (p("flow", e3.flowing); e3.flowing && null !== t2.read(); )
            ;
        }
        function O(t2, e3) {
          return 0 === e3.length ? null : (e3.objectMode ? r2 = e3.buffer.shift() : !t2 || t2 >= e3.length ? (r2 = e3.decoder ? e3.buffer.join("") : 1 === e3.buffer.length ? e3.buffer.head.data : e3.buffer.concat(e3.length), e3.buffer.clear()) : r2 = function(t3, e4, r3) {
            var n2;
            return t3 < e4.head.data.length ? (n2 = e4.head.data.slice(0, t3), e4.head.data = e4.head.data.slice(t3)) : n2 = t3 === e4.head.data.length ? e4.shift() : r3 ? function(t4, e5) {
              var r4 = e5.head, n3 = 1, i2 = r4.data;
              for (t4 -= i2.length; r4 = r4.next; ) {
                var o2 = r4.data, s3 = t4 > o2.length ? o2.length : t4;
                if (s3 === o2.length ? i2 += o2 : i2 += o2.slice(0, t4), 0 == (t4 -= s3)) {
                  s3 === o2.length ? (++n3, r4.next ? e5.head = r4.next : e5.head = e5.tail = null) : (e5.head = r4, r4.data = o2.slice(s3));
                  break;
                }
                ++n3;
              }
              return e5.length -= n3, i2;
            }(t3, e4) : function(t4, e5) {
              var r4 = c.allocUnsafe(t4), n3 = e5.head, i2 = 1;
              for (n3.data.copy(r4), t4 -= n3.data.length; n3 = n3.next; ) {
                var o2 = n3.data, s3 = t4 > o2.length ? o2.length : t4;
                if (o2.copy(r4, r4.length - t4, 0, s3), 0 == (t4 -= s3)) {
                  s3 === o2.length ? (++i2, n3.next ? e5.head = n3.next : e5.head = e5.tail = null) : (e5.head = n3, n3.data = o2.slice(s3));
                  break;
                }
                ++i2;
              }
              return e5.length -= i2, r4;
            }(t3, e4), n2;
          }(t2, e3.buffer, e3.decoder), r2);
          var r2;
        }
        function A(t2) {
          var e3 = t2._readableState;
          if (e3.length > 0)
            throw new Error('"endReadable()" called on non-empty stream');
          e3.endEmitted || (e3.ended = true, i.nextTick(F, e3, t2));
        }
        function F(t2, e3) {
          t2.endEmitted || 0 !== t2.length || (t2.endEmitted = true, e3.readable = false, e3.emit("end"));
        }
        function L(t2, e3) {
          for (var r2 = 0, n2 = t2.length; r2 < n2; r2++)
            if (t2[r2] === e3)
              return r2;
          return -1;
        }
        g.prototype.read = function(t2) {
          p("read", t2), t2 = parseInt(t2, 10);
          var e3 = this._readableState, r2 = t2;
          if (0 !== t2 && (e3.emittedReadable = false), 0 === t2 && e3.needReadable && (e3.length >= e3.highWaterMark || e3.ended))
            return p("read: emitReadable", e3.length, e3.ended), 0 === e3.length && e3.ended ? A(this) : x(this), null;
          if (0 === (t2 = C(t2, e3)) && e3.ended)
            return 0 === e3.length && A(this), null;
          var n2, i2 = e3.needReadable;
          return p("need readable", i2), (0 === e3.length || e3.length - t2 < e3.highWaterMark) && p("length less than watermark", i2 = true), e3.ended || e3.reading ? p("reading or ended", i2 = false) : i2 && (p("do read"), e3.reading = true, e3.sync = true, 0 === e3.length && (e3.needReadable = true), this._read(e3.highWaterMark), e3.sync = false, e3.reading || (t2 = C(r2, e3))), null === (n2 = t2 > 0 ? O(t2, e3) : null) ? (e3.needReadable = true, t2 = 0) : e3.length -= t2, 0 === e3.length && (e3.ended || (e3.needReadable = true), r2 !== t2 && e3.ended && A(this)), null !== n2 && this.emit("data", n2), n2;
        }, g.prototype._read = function(t2) {
          this.emit("error", new Error("_read() is not implemented"));
        }, g.prototype.pipe = function(t2, e3) {
          var r2 = this, o2 = this._readableState;
          switch (o2.pipesCount) {
            case 0:
              o2.pipes = t2;
              break;
            case 1:
              o2.pipes = [o2.pipes, t2];
              break;
            default:
              o2.pipes.push(t2);
          }
          o2.pipesCount += 1, p("pipe count=%d opts=%j", o2.pipesCount, e3);
          var u2 = e3 && false === e3.end || t2 === n.stdout || t2 === n.stderr ? m2 : c2;
          function c2() {
            p("onend"), t2.end();
          }
          o2.endEmitted ? i.nextTick(u2) : r2.once("end", u2), t2.on("unpipe", function e4(n2, i2) {
            p("onunpipe"), n2 === r2 && i2 && false === i2.hasUnpiped && (i2.hasUnpiped = true, p("cleanup"), t2.removeListener("close", v2), t2.removeListener("finish", y2), t2.removeListener("drain", l2), t2.removeListener("error", _2), t2.removeListener("unpipe", e4), r2.removeListener("end", c2), r2.removeListener("end", m2), r2.removeListener("data", d2), f2 = true, !o2.awaitDrain || t2._writableState && !t2._writableState.needDrain || l2());
          });
          var l2 = function(t3) {
            return function() {
              var e4 = t3._readableState;
              p("pipeOnDrain", e4.awaitDrain), e4.awaitDrain && e4.awaitDrain--, 0 === e4.awaitDrain && a(t3, "data") && (e4.flowing = true, P(t3));
            };
          }(r2);
          t2.on("drain", l2);
          var f2 = false, h2 = false;
          function d2(e4) {
            p("ondata"), h2 = false, false !== t2.write(e4) || h2 || ((1 === o2.pipesCount && o2.pipes === t2 || o2.pipesCount > 1 && -1 !== L(o2.pipes, t2)) && !f2 && (p("false write response, pause", r2._readableState.awaitDrain), r2._readableState.awaitDrain++, h2 = true), r2.pause());
          }
          function _2(e4) {
            p("onerror", e4), m2(), t2.removeListener("error", _2), 0 === a(t2, "error") && t2.emit("error", e4);
          }
          function v2() {
            t2.removeListener("finish", y2), m2();
          }
          function y2() {
            p("onfinish"), t2.removeListener("close", v2), m2();
          }
          function m2() {
            p("unpipe"), r2.unpipe(t2);
          }
          return r2.on("data", d2), function(t3, e4, r3) {
            if ("function" == typeof t3.prependListener)
              return t3.prependListener(e4, r3);
            t3._events && t3._events[e4] ? s2(t3._events[e4]) ? t3._events[e4].unshift(r3) : t3._events[e4] = [r3, t3._events[e4]] : t3.on(e4, r3);
          }(t2, "error", _2), t2.once("close", v2), t2.once("finish", y2), t2.emit("pipe", r2), o2.flowing || (p("pipe resume"), r2.resume()), t2;
        }, g.prototype.unpipe = function(t2) {
          var e3 = this._readableState, r2 = { hasUnpiped: false };
          if (0 === e3.pipesCount)
            return this;
          if (1 === e3.pipesCount)
            return t2 && t2 !== e3.pipes ? this : (t2 || (t2 = e3.pipes), e3.pipes = null, e3.pipesCount = 0, e3.flowing = false, t2 && t2.emit("unpipe", this, r2), this);
          if (!t2) {
            var n2 = e3.pipes, i2 = e3.pipesCount;
            e3.pipes = null, e3.pipesCount = 0, e3.flowing = false;
            for (var o2 = 0; o2 < i2; o2++)
              n2[o2].emit("unpipe", this, r2);
            return this;
          }
          var s3 = L(e3.pipes, t2);
          return -1 === s3 ? this : (e3.pipes.splice(s3, 1), e3.pipesCount -= 1, 1 === e3.pipesCount && (e3.pipes = e3.pipes[0]), t2.emit("unpipe", this, r2), this);
        }, g.prototype.on = function(t2, e3) {
          var r2 = u.prototype.on.call(this, t2, e3);
          if ("data" === t2)
            false !== this._readableState.flowing && this.resume();
          else if ("readable" === t2) {
            var n2 = this._readableState;
            n2.endEmitted || n2.readableListening || (n2.readableListening = n2.needReadable = true, n2.emittedReadable = false, n2.reading ? n2.length && x(this) : i.nextTick(k, this));
          }
          return r2;
        }, g.prototype.addListener = g.prototype.on, g.prototype.resume = function() {
          var t2 = this._readableState;
          return t2.flowing || (p("resume"), t2.flowing = true, function(t3, e3) {
            e3.resumeScheduled || (e3.resumeScheduled = true, i.nextTick(T, t3, e3));
          }(this, t2)), this;
        }, g.prototype.pause = function() {
          return p("call pause flowing=%j", this._readableState.flowing), false !== this._readableState.flowing && (p("pause"), this._readableState.flowing = false, this.emit("pause")), this;
        }, g.prototype.wrap = function(t2) {
          var e3 = this, r2 = this._readableState, n2 = false;
          for (var i2 in t2.on("end", function() {
            if (p("wrapped end"), r2.decoder && !r2.ended) {
              var t3 = r2.decoder.end();
              t3 && t3.length && e3.push(t3);
            }
            e3.push(null);
          }), t2.on("data", function(i3) {
            p("wrapped data"), r2.decoder && (i3 = r2.decoder.write(i3)), (!r2.objectMode || null !== i3 && void 0 !== i3) && (r2.objectMode || i3 && i3.length) && (e3.push(i3) || (n2 = true, t2.pause()));
          }), t2)
            void 0 === this[i2] && "function" == typeof t2[i2] && (this[i2] = function(e4) {
              return function() {
                return t2[e4].apply(t2, arguments);
              };
            }(i2));
          for (var o2 = 0; o2 < y.length; o2++)
            t2.on(y[o2], this.emit.bind(this, y[o2]));
          return this._read = function(e4) {
            p("wrapped _read", e4), n2 && (n2 = false, t2.resume());
          }, this;
        }, Object.defineProperty(g.prototype, "readableHighWaterMark", { enumerable: false, get: function() {
          return this._readableState.highWaterMark;
        } }), g._fromList = O;
      }).call(this, r(0), r(4));
    }, function(t, e, r) {
      t.exports = r(12).EventEmitter;
    }, function(t, e, r) {
      "use strict";
      var n = r(6);
      function i(t2, e2) {
        t2.emit("error", e2);
      }
      t.exports = { destroy: function(t2, e2) {
        var r2 = this, o = this._readableState && this._readableState.destroyed, s2 = this._writableState && this._writableState.destroyed;
        return o || s2 ? (e2 ? e2(t2) : !t2 || this._writableState && this._writableState.errorEmitted || n.nextTick(i, this, t2), this) : (this._readableState && (this._readableState.destroyed = true), this._writableState && (this._writableState.destroyed = true), this._destroy(t2 || null, function(t3) {
          !e2 && t3 ? (n.nextTick(i, r2, t3), r2._writableState && (r2._writableState.errorEmitted = true)) : e2 && e2(t3);
        }), this);
      }, undestroy: function() {
        this._readableState && (this._readableState.destroyed = false, this._readableState.reading = false, this._readableState.ended = false, this._readableState.endEmitted = false), this._writableState && (this._writableState.destroyed = false, this._writableState.ended = false, this._writableState.ending = false, this._writableState.finished = false, this._writableState.errorEmitted = false);
      } };
    }, function(t, e, r) {
      "use strict";
      var n = r(7).Buffer, i = n.isEncoding || function(t2) {
        switch ((t2 = "" + t2) && t2.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function o(t2) {
        var e2;
        switch (this.encoding = function(t3) {
          var e3 = function(t4) {
            if (!t4)
              return "utf8";
            for (var e4; ; )
              switch (t4) {
                case "utf8":
                case "utf-8":
                  return "utf8";
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return "utf16le";
                case "latin1":
                case "binary":
                  return "latin1";
                case "base64":
                case "ascii":
                case "hex":
                  return t4;
                default:
                  if (e4)
                    return;
                  t4 = ("" + t4).toLowerCase(), e4 = true;
              }
          }(t3);
          if ("string" != typeof e3 && (n.isEncoding === i || !i(t3)))
            throw new Error("Unknown encoding: " + t3);
          return e3 || t3;
        }(t2), this.encoding) {
          case "utf16le":
            this.text = u, this.end = c, e2 = 4;
            break;
          case "utf8":
            this.fillLast = a, e2 = 4;
            break;
          case "base64":
            this.text = l, this.end = f, e2 = 3;
            break;
          default:
            return this.write = h, void (this.end = p);
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(e2);
      }
      function s2(t2) {
        return t2 <= 127 ? 0 : t2 >> 5 == 6 ? 2 : t2 >> 4 == 14 ? 3 : t2 >> 3 == 30 ? 4 : t2 >> 6 == 2 ? -1 : -2;
      }
      function a(t2) {
        var e2 = this.lastTotal - this.lastNeed, r2 = function(t3, e3, r3) {
          if (128 != (192 & e3[0]))
            return t3.lastNeed = 0, "\uFFFD";
          if (t3.lastNeed > 1 && e3.length > 1) {
            if (128 != (192 & e3[1]))
              return t3.lastNeed = 1, "\uFFFD";
            if (t3.lastNeed > 2 && e3.length > 2 && 128 != (192 & e3[2]))
              return t3.lastNeed = 2, "\uFFFD";
          }
        }(this, t2);
        return void 0 !== r2 ? r2 : this.lastNeed <= t2.length ? (t2.copy(this.lastChar, e2, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t2.copy(this.lastChar, e2, 0, t2.length), void (this.lastNeed -= t2.length));
      }
      function u(t2, e2) {
        if ((t2.length - e2) % 2 == 0) {
          var r2 = t2.toString("utf16le", e2);
          if (r2) {
            var n2 = r2.charCodeAt(r2.length - 1);
            if (n2 >= 55296 && n2 <= 56319)
              return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t2[t2.length - 2], this.lastChar[1] = t2[t2.length - 1], r2.slice(0, -1);
          }
          return r2;
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t2[t2.length - 1], t2.toString("utf16le", e2, t2.length - 1);
      }
      function c(t2) {
        var e2 = t2 && t2.length ? this.write(t2) : "";
        if (this.lastNeed) {
          var r2 = this.lastTotal - this.lastNeed;
          return e2 + this.lastChar.toString("utf16le", 0, r2);
        }
        return e2;
      }
      function l(t2, e2) {
        var r2 = (t2.length - e2) % 3;
        return 0 === r2 ? t2.toString("base64", e2) : (this.lastNeed = 3 - r2, this.lastTotal = 3, 1 === r2 ? this.lastChar[0] = t2[t2.length - 1] : (this.lastChar[0] = t2[t2.length - 2], this.lastChar[1] = t2[t2.length - 1]), t2.toString("base64", e2, t2.length - r2));
      }
      function f(t2) {
        var e2 = t2 && t2.length ? this.write(t2) : "";
        return this.lastNeed ? e2 + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e2;
      }
      function h(t2) {
        return t2.toString(this.encoding);
      }
      function p(t2) {
        return t2 && t2.length ? this.write(t2) : "";
      }
      e.StringDecoder = o, o.prototype.write = function(t2) {
        if (0 === t2.length)
          return "";
        var e2, r2;
        if (this.lastNeed) {
          if (void 0 === (e2 = this.fillLast(t2)))
            return "";
          r2 = this.lastNeed, this.lastNeed = 0;
        } else
          r2 = 0;
        return r2 < t2.length ? e2 ? e2 + this.text(t2, r2) : this.text(t2, r2) : e2 || "";
      }, o.prototype.end = function(t2) {
        var e2 = t2 && t2.length ? this.write(t2) : "";
        return this.lastNeed ? e2 + "\uFFFD" : e2;
      }, o.prototype.text = function(t2, e2) {
        var r2 = function(t3, e3, r3) {
          var n3 = e3.length - 1;
          if (n3 < r3)
            return 0;
          var i2 = s2(e3[n3]);
          return i2 >= 0 ? (i2 > 0 && (t3.lastNeed = i2 - 1), i2) : --n3 < r3 || -2 === i2 ? 0 : (i2 = s2(e3[n3])) >= 0 ? (i2 > 0 && (t3.lastNeed = i2 - 2), i2) : --n3 < r3 || -2 === i2 ? 0 : (i2 = s2(e3[n3])) >= 0 ? (i2 > 0 && (2 === i2 ? i2 = 0 : t3.lastNeed = i2 - 3), i2) : 0;
        }(this, t2, e2);
        if (!this.lastNeed)
          return t2.toString("utf8", e2);
        this.lastTotal = r2;
        var n2 = t2.length - (r2 - this.lastNeed);
        return t2.copy(this.lastChar, 0, n2), t2.toString("utf8", e2, n2);
      }, o.prototype.fillLast = function(t2) {
        if (this.lastNeed <= t2.length)
          return t2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        t2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t2.length), this.lastNeed -= t2.length;
      };
    }, function(t, e, r) {
      "use strict";
      t.exports = o;
      var n = r(1), i = r(5);
      function o(t2) {
        if (!(this instanceof o))
          return new o(t2);
        n.call(this, t2), this._transformState = { afterTransform: function(t3, e2) {
          var r2 = this._transformState;
          r2.transforming = false;
          var n2 = r2.writecb;
          if (!n2)
            return this.emit("error", new Error("write callback called multiple times"));
          r2.writechunk = null, r2.writecb = null, null != e2 && this.push(e2), n2(t3);
          var i2 = this._readableState;
          i2.reading = false, (i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
        }.bind(this), needTransform: false, transforming: false, writecb: null, writechunk: null, writeencoding: null }, this._readableState.needReadable = true, this._readableState.sync = false, t2 && ("function" == typeof t2.transform && (this._transform = t2.transform), "function" == typeof t2.flush && (this._flush = t2.flush)), this.on("prefinish", s2);
      }
      function s2() {
        var t2 = this;
        "function" == typeof this._flush ? this._flush(function(e2, r2) {
          a(t2, e2, r2);
        }) : a(this, null, null);
      }
      function a(t2, e2, r2) {
        if (e2)
          return t2.emit("error", e2);
        if (null != r2 && t2.push(r2), t2._writableState.length)
          throw new Error("Calling transform done when ws.length != 0");
        if (t2._transformState.transforming)
          throw new Error("Calling transform done when still transforming");
        return t2.push(null);
      }
      i.inherits = r(2), i.inherits(o, n), o.prototype.push = function(t2, e2) {
        return this._transformState.needTransform = false, n.prototype.push.call(this, t2, e2);
      }, o.prototype._transform = function(t2, e2, r2) {
        throw new Error("_transform() is not implemented");
      }, o.prototype._write = function(t2, e2, r2) {
        var n2 = this._transformState;
        if (n2.writecb = r2, n2.writechunk = t2, n2.writeencoding = e2, !n2.transforming) {
          var i2 = this._readableState;
          (n2.needTransform || i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
        }
      }, o.prototype._read = function(t2) {
        var e2 = this._transformState;
        null !== e2.writechunk && e2.writecb && !e2.transforming ? (e2.transforming = true, this._transform(e2.writechunk, e2.writeencoding, e2.afterTransform)) : e2.needTransform = true;
      }, o.prototype._destroy = function(t2, e2) {
        var r2 = this;
        n.prototype._destroy.call(this, t2, function(t3) {
          e2(t3), r2.emit("close");
        });
      };
    }, function(t, e, r) {
      "use strict";
      (function(t2) {
        Object.defineProperty(e, "__esModule", { value: true }), e.bufFromString = function(e2) {
          var r2 = t2.byteLength(e2), n = t2.allocUnsafe ? t2.allocUnsafe(r2) : new t2(r2);
          return n.write(e2), n;
        }, e.emptyBuffer = function() {
          return t2.allocUnsafe ? t2.allocUnsafe(0) : new t2(0);
        }, e.filterArray = function(t3, e2) {
          for (var r2 = [], n = 0; n < t3.length; n++)
            e2.indexOf(n) > -1 && r2.push(t3[n]);
          return r2;
        }, e.trimLeft = String.prototype.trimLeft ? function(t3) {
          return t3.trimLeft();
        } : function(t3) {
          return t3.replace(/^\s+/, "");
        }, e.trimRight = String.prototype.trimRight ? function(t3) {
          return t3.trimRight();
        } : function(t3) {
          return t3.replace(/\s+$/, "");
        };
      }).call(this, r(3).Buffer);
    }, function(t, e, r) {
      "use strict";
      var n = this && this.__extends || function() {
        var t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e2) {
          t3.__proto__ = e2;
        } || function(t3, e2) {
          for (var r2 in e2)
            e2.hasOwnProperty(r2) && (t3[r2] = e2[r2]);
        };
        return function(e2, r2) {
          function n2() {
            this.constructor = e2;
          }
          t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
        };
      }();
      Object.defineProperty(e, "__esModule", { value: true });
      var i = function(t2) {
        function e2(e3, r2, n2) {
          var i2 = t2.call(this, "Error: " + e3 + ". JSON Line number: " + r2 + (n2 ? " near: " + n2 : "")) || this;
          return i2.err = e3, i2.line = r2, i2.extra = n2, i2.name = "CSV Parse Error", i2;
        }
        return n(e2, t2), e2.column_mismatched = function(t3, r2) {
          return new e2("column_mismatched", t3, r2);
        }, e2.unclosed_quote = function(t3, r2) {
          return new e2("unclosed_quote", t3, r2);
        }, e2.fromJSON = function(t3) {
          return new e2(t3.err, t3.line, t3.extra);
        }, e2.prototype.toJSON = function() {
          return { err: this.err, line: this.line, extra: this.extra };
        }, e2;
      }(Error);
      e.default = i;
    }, function(t, e, r) {
      var n = r(18), i = r(68), o = r(69), s2 = n ? n.toStringTag : void 0;
      t.exports = function(t2) {
        return null == t2 ? void 0 === t2 ? "[object Undefined]" : "[object Null]" : s2 && s2 in Object(t2) ? i(t2) : o(t2);
      };
    }, function(t, e) {
      t.exports = function(t2, e2) {
        return t2 === e2 || t2 != t2 && e2 != e2;
      };
    }, function(t, e, r) {
      t.exports = r(33);
    }, function(t, e, r) {
      "use strict";
      var n = r(34), i = function(t2, e2) {
        return new n.Converter(t2, e2);
      };
      i.csv = i, i.Converter = n.Converter, t.exports = i;
    }, function(t, e, r) {
      "use strict";
      (function(t2) {
        var n = this && this.__extends || function() {
          var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e2) {
            t4.__proto__ = e2;
          } || function(t4, e2) {
            for (var r2 in e2)
              e2.hasOwnProperty(r2) && (t4[r2] = e2[r2]);
          };
          return function(e2, r2) {
            function n2() {
              this.constructor = e2;
            }
            t3(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        }(), i = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var o = r(36), s2 = r(50), a = r(51), u = i(r(15)), c = r(52), l = r(105), f = function(e2) {
          function i2(r2, n2) {
            void 0 === n2 && (n2 = {});
            var i3 = e2.call(this, n2) || this;
            return i3.options = n2, i3.params = s2.mergeParams(r2), i3.runtime = a.initParseRuntime(i3), i3.result = new l.Result(i3), i3.processor = new c.ProcessorLocal(i3), i3.once("error", function(e3) {
              t2(function() {
                i3.result.processError(e3), i3.emit("done", e3);
              });
            }), i3.once("done", function() {
              i3.processor.destroy();
            }), i3;
          }
          return n(i2, e2), i2.prototype.preRawData = function(t3) {
            return this.runtime.preRawDataHook = t3, this;
          }, i2.prototype.preFileLine = function(t3) {
            return this.runtime.preFileLineHook = t3, this;
          }, i2.prototype.subscribe = function(t3, e3, r2) {
            return this.parseRuntime.subscribe = { onNext: t3, onError: e3, onCompleted: r2 }, this;
          }, i2.prototype.fromFile = function(t3, e3) {
            var n2 = this, i3 = r(!function() {
              var t4 = new Error("Cannot find module 'fs'");
              throw t4.code = "MODULE_NOT_FOUND", t4;
            }());
            return i3.exists(t3, function(r2) {
              r2 ? i3.createReadStream(t3, e3).pipe(n2) : n2.emit("error", new Error("File does not exist. Check to make sure the file path to your csv is correct."));
            }), this;
          }, i2.prototype.fromStream = function(t3) {
            return t3.pipe(this), this;
          }, i2.prototype.fromString = function(t3) {
            t3.toString();
            var e3 = new o.Readable(), r2 = 0;
            return e3._read = function(e4) {
              if (r2 >= t3.length)
                this.push(null);
              else {
                var n2 = t3.substr(r2, e4);
                this.push(n2), r2 += e4;
              }
            }, this.fromStream(e3);
          }, i2.prototype.then = function(t3, e3) {
            var r2 = this;
            return new u.default(function(n2, i3) {
              r2.parseRuntime.then = { onfulfilled: function(e4) {
                n2(t3 ? t3(e4) : e4);
              }, onrejected: function(t4) {
                e3 ? n2(e3(t4)) : i3(t4);
              } };
            });
          }, Object.defineProperty(i2.prototype, "parseParam", { get: function() {
            return this.params;
          }, enumerable: true, configurable: true }), Object.defineProperty(i2.prototype, "parseRuntime", { get: function() {
            return this.runtime;
          }, enumerable: true, configurable: true }), i2.prototype._transform = function(t3, e3, r2) {
            var n2 = this;
            this.processor.process(t3).then(function(t4) {
              if (t4.length > 0)
                return n2.runtime.started = true, n2.result.processResult(t4);
            }).then(function() {
              n2.emit("drained"), r2();
            }, function(t4) {
              n2.runtime.hasError = true, n2.runtime.error = t4, n2.emit("error", t4), r2();
            });
          }, i2.prototype._flush = function(t3) {
            var e3 = this;
            this.processor.flush().then(function(t4) {
              if (t4.length > 0)
                return e3.result.processResult(t4);
            }).then(function() {
              e3.processEnd(t3);
            }, function(r2) {
              e3.emit("error", r2), t3();
            });
          }, i2.prototype.processEnd = function(t3) {
            this.result.endProcess(), this.emit("done"), t3();
          }, Object.defineProperty(i2.prototype, "parsedLineNumber", { get: function() {
            return this.runtime.parsedLineNumber;
          }, enumerable: true, configurable: true }), i2;
        }(o.Transform);
        e.Converter = f;
      }).call(this, r(11).setImmediate);
    }, function(t, e, r) {
      (function(t2, e2) {
        !function(t3, r2) {
          "use strict";
          if (!t3.setImmediate) {
            var n, i = 1, o = {}, s2 = false, a = t3.document, u = Object.getPrototypeOf && Object.getPrototypeOf(t3);
            u = u && u.setTimeout ? u : t3, "[object process]" === {}.toString.call(t3.process) ? n = function(t4) {
              e2.nextTick(function() {
                l(t4);
              });
            } : function() {
              if (t3.postMessage && !t3.importScripts) {
                var e3 = true, r3 = t3.onmessage;
                return t3.onmessage = function() {
                  e3 = false;
                }, t3.postMessage("", "*"), t3.onmessage = r3, e3;
              }
            }() ? function() {
              var e3 = "setImmediate$" + Math.random() + "$", r3 = function(r4) {
                r4.source === t3 && "string" == typeof r4.data && 0 === r4.data.indexOf(e3) && l(+r4.data.slice(e3.length));
              };
              t3.addEventListener ? t3.addEventListener("message", r3, false) : t3.attachEvent("onmessage", r3), n = function(r4) {
                t3.postMessage(e3 + r4, "*");
              };
            }() : t3.MessageChannel ? function() {
              var t4 = new MessageChannel();
              t4.port1.onmessage = function(t5) {
                l(t5.data);
              }, n = function(e3) {
                t4.port2.postMessage(e3);
              };
            }() : a && "onreadystatechange" in a.createElement("script") ? function() {
              var t4 = a.documentElement;
              n = function(e3) {
                var r3 = a.createElement("script");
                r3.onreadystatechange = function() {
                  l(e3), r3.onreadystatechange = null, t4.removeChild(r3), r3 = null;
                }, t4.appendChild(r3);
              };
            }() : n = function(t4) {
              setTimeout(l, 0, t4);
            }, u.setImmediate = function(t4) {
              "function" != typeof t4 && (t4 = new Function("" + t4));
              for (var e3 = new Array(arguments.length - 1), r3 = 0; r3 < e3.length; r3++)
                e3[r3] = arguments[r3 + 1];
              var s3 = { callback: t4, args: e3 };
              return o[i] = s3, n(i), i++;
            }, u.clearImmediate = c;
          }
          function c(t4) {
            delete o[t4];
          }
          function l(t4) {
            if (s2)
              setTimeout(l, 0, t4);
            else {
              var e3 = o[t4];
              if (e3) {
                s2 = true;
                try {
                  !function(t5) {
                    var e4 = t5.callback, n2 = t5.args;
                    switch (n2.length) {
                      case 0:
                        e4();
                        break;
                      case 1:
                        e4(n2[0]);
                        break;
                      case 2:
                        e4(n2[0], n2[1]);
                        break;
                      case 3:
                        e4(n2[0], n2[1], n2[2]);
                        break;
                      default:
                        e4.apply(r2, n2);
                    }
                  }(e3);
                } finally {
                  c(t4), s2 = false;
                }
              }
            }
          }
        }("undefined" == typeof self ? void 0 === t2 ? this : t2 : self);
      }).call(this, r(0), r(4));
    }, function(t, e, r) {
      t.exports = i;
      var n = r(12).EventEmitter;
      function i() {
        n.call(this);
      }
      r(2)(i, n), i.Readable = r(13), i.Writable = r(46), i.Duplex = r(47), i.Transform = r(48), i.PassThrough = r(49), i.Stream = i, i.prototype.pipe = function(t2, e2) {
        var r2 = this;
        function i2(e3) {
          t2.writable && false === t2.write(e3) && r2.pause && r2.pause();
        }
        function o() {
          r2.readable && r2.resume && r2.resume();
        }
        r2.on("data", i2), t2.on("drain", o), t2._isStdio || e2 && false === e2.end || (r2.on("end", a), r2.on("close", u));
        var s2 = false;
        function a() {
          s2 || (s2 = true, t2.end());
        }
        function u() {
          s2 || (s2 = true, "function" == typeof t2.destroy && t2.destroy());
        }
        function c(t3) {
          if (l(), 0 === n.listenerCount(this, "error"))
            throw t3;
        }
        function l() {
          r2.removeListener("data", i2), t2.removeListener("drain", o), r2.removeListener("end", a), r2.removeListener("close", u), r2.removeListener("error", c), t2.removeListener("error", c), r2.removeListener("end", l), r2.removeListener("close", l), t2.removeListener("close", l);
        }
        return r2.on("error", c), t2.on("error", c), r2.on("end", l), r2.on("close", l), t2.on("close", l), t2.emit("pipe", r2), t2;
      };
    }, function(t, e) {
      var r = {}.toString;
      t.exports = Array.isArray || function(t2) {
        return "[object Array]" == r.call(t2);
      };
    }, function(t, e, r) {
      "use strict";
      e.byteLength = function(t2) {
        var e2 = c(t2), r2 = e2[0], n2 = e2[1];
        return 3 * (r2 + n2) / 4 - n2;
      }, e.toByteArray = function(t2) {
        for (var e2, r2 = c(t2), n2 = r2[0], s3 = r2[1], a2 = new o(3 * (n2 + s3) / 4 - s3), u2 = 0, l2 = s3 > 0 ? n2 - 4 : n2, f2 = 0; f2 < l2; f2 += 4)
          e2 = i[t2.charCodeAt(f2)] << 18 | i[t2.charCodeAt(f2 + 1)] << 12 | i[t2.charCodeAt(f2 + 2)] << 6 | i[t2.charCodeAt(f2 + 3)], a2[u2++] = e2 >> 16 & 255, a2[u2++] = e2 >> 8 & 255, a2[u2++] = 255 & e2;
        return 2 === s3 && (e2 = i[t2.charCodeAt(f2)] << 2 | i[t2.charCodeAt(f2 + 1)] >> 4, a2[u2++] = 255 & e2), 1 === s3 && (e2 = i[t2.charCodeAt(f2)] << 10 | i[t2.charCodeAt(f2 + 1)] << 4 | i[t2.charCodeAt(f2 + 2)] >> 2, a2[u2++] = e2 >> 8 & 255, a2[u2++] = 255 & e2), a2;
      }, e.fromByteArray = function(t2) {
        for (var e2, r2 = t2.length, i2 = r2 % 3, o2 = [], s3 = 0, a2 = r2 - i2; s3 < a2; s3 += 16383)
          o2.push(f(t2, s3, s3 + 16383 > a2 ? a2 : s3 + 16383));
        return 1 === i2 ? (e2 = t2[r2 - 1], o2.push(n[e2 >> 2] + n[e2 << 4 & 63] + "==")) : 2 === i2 && (e2 = (t2[r2 - 2] << 8) + t2[r2 - 1], o2.push(n[e2 >> 10] + n[e2 >> 4 & 63] + n[e2 << 2 & 63] + "=")), o2.join("");
      };
      for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s2.length; a < u; ++a)
        n[a] = s2[a], i[s2.charCodeAt(a)] = a;
      function c(t2) {
        var e2 = t2.length;
        if (e2 % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var r2 = t2.indexOf("=");
        return -1 === r2 && (r2 = e2), [r2, r2 === e2 ? 0 : 4 - r2 % 4];
      }
      function l(t2) {
        return n[t2 >> 18 & 63] + n[t2 >> 12 & 63] + n[t2 >> 6 & 63] + n[63 & t2];
      }
      function f(t2, e2, r2) {
        for (var n2, i2 = [], o2 = e2; o2 < r2; o2 += 3)
          n2 = (t2[o2] << 16 & 16711680) + (t2[o2 + 1] << 8 & 65280) + (255 & t2[o2 + 2]), i2.push(l(n2));
        return i2.join("");
      }
      i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
    }, function(t, e) {
      e.read = function(t2, e2, r, n, i) {
        var o, s2, a = 8 * i - n - 1, u = (1 << a) - 1, c = u >> 1, l = -7, f = r ? i - 1 : 0, h = r ? -1 : 1, p = t2[e2 + f];
        for (f += h, o = p & (1 << -l) - 1, p >>= -l, l += a; l > 0; o = 256 * o + t2[e2 + f], f += h, l -= 8)
          ;
        for (s2 = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; s2 = 256 * s2 + t2[e2 + f], f += h, l -= 8)
          ;
        if (0 === o)
          o = 1 - c;
        else {
          if (o === u)
            return s2 ? NaN : 1 / 0 * (p ? -1 : 1);
          s2 += Math.pow(2, n), o -= c;
        }
        return (p ? -1 : 1) * s2 * Math.pow(2, o - n);
      }, e.write = function(t2, e2, r, n, i, o) {
        var s2, a, u, c = 8 * o - i - 1, l = (1 << c) - 1, f = l >> 1, h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : o - 1, d = n ? 1 : -1, _ = e2 < 0 || 0 === e2 && 1 / e2 < 0 ? 1 : 0;
        for (e2 = Math.abs(e2), isNaN(e2) || e2 === 1 / 0 ? (a = isNaN(e2) ? 1 : 0, s2 = l) : (s2 = Math.floor(Math.log(e2) / Math.LN2), e2 * (u = Math.pow(2, -s2)) < 1 && (s2--, u *= 2), (e2 += s2 + f >= 1 ? h / u : h * Math.pow(2, 1 - f)) * u >= 2 && (s2++, u /= 2), s2 + f >= l ? (a = 0, s2 = l) : s2 + f >= 1 ? (a = (e2 * u - 1) * Math.pow(2, i), s2 += f) : (a = e2 * Math.pow(2, f - 1) * Math.pow(2, i), s2 = 0)); i >= 8; t2[r + p] = 255 & a, p += d, a /= 256, i -= 8)
          ;
        for (s2 = s2 << i | a, c += i; c > 0; t2[r + p] = 255 & s2, p += d, s2 /= 256, c -= 8)
          ;
        t2[r + p - d] |= 128 * _;
      };
    }, function(t, e) {
      var r = {}.toString;
      t.exports = Array.isArray || function(t2) {
        return "[object Array]" == r.call(t2);
      };
    }, function(t, e) {
    }, function(t, e, r) {
      "use strict";
      var n = r(7).Buffer, i = r(43);
      function o(t2, e2, r2) {
        t2.copy(e2, r2);
      }
      t.exports = function() {
        function t2() {
          !function(t3, e2) {
            if (!(t3 instanceof e2))
              throw new TypeError("Cannot call a class as a function");
          }(this, t2), this.head = null, this.tail = null, this.length = 0;
        }
        return t2.prototype.push = function(t3) {
          var e2 = { data: t3, next: null };
          this.length > 0 ? this.tail.next = e2 : this.head = e2, this.tail = e2, ++this.length;
        }, t2.prototype.unshift = function(t3) {
          var e2 = { data: t3, next: this.head };
          0 === this.length && (this.tail = e2), this.head = e2, ++this.length;
        }, t2.prototype.shift = function() {
          if (0 !== this.length) {
            var t3 = this.head.data;
            return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t3;
          }
        }, t2.prototype.clear = function() {
          this.head = this.tail = null, this.length = 0;
        }, t2.prototype.join = function(t3) {
          if (0 === this.length)
            return "";
          for (var e2 = this.head, r2 = "" + e2.data; e2 = e2.next; )
            r2 += t3 + e2.data;
          return r2;
        }, t2.prototype.concat = function(t3) {
          if (0 === this.length)
            return n.alloc(0);
          if (1 === this.length)
            return this.head.data;
          for (var e2 = n.allocUnsafe(t3 >>> 0), r2 = this.head, i2 = 0; r2; )
            o(r2.data, e2, i2), i2 += r2.data.length, r2 = r2.next;
          return e2;
        }, t2;
      }(), i && i.inspect && i.inspect.custom && (t.exports.prototype[i.inspect.custom] = function() {
        var t2 = i.inspect({ length: this.length });
        return this.constructor.name + " " + t2;
      });
    }, function(t, e) {
    }, function(t, e, r) {
      (function(e2) {
        function r2(t2) {
          try {
            if (!e2.localStorage)
              return false;
          } catch (t3) {
            return false;
          }
          var r3 = e2.localStorage[t2];
          return null != r3 && "true" === String(r3).toLowerCase();
        }
        t.exports = function(t2, e3) {
          if (r2("noDeprecation"))
            return t2;
          var n = false;
          return function() {
            if (!n) {
              if (r2("throwDeprecation"))
                throw new Error(e3);
              r2("traceDeprecation") ? console.trace(e3) : console.warn(e3), n = true;
            }
            return t2.apply(this, arguments);
          };
        };
      }).call(this, r(0));
    }, function(t, e, r) {
      "use strict";
      t.exports = o;
      var n = r(27), i = r(5);
      function o(t2) {
        if (!(this instanceof o))
          return new o(t2);
        n.call(this, t2);
      }
      i.inherits = r(2), i.inherits(o, n), o.prototype._transform = function(t2, e2, r2) {
        r2(null, t2);
      };
    }, function(t, e, r) {
      t.exports = r(14);
    }, function(t, e, r) {
      t.exports = r(1);
    }, function(t, e, r) {
      t.exports = r(13).Transform;
    }, function(t, e, r) {
      t.exports = r(13).PassThrough;
    }, function(t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: true }), e.mergeParams = function(t2) {
        var e2 = { delimiter: ",", ignoreColumns: void 0, includeColumns: void 0, quote: '"', trim: true, checkType: false, ignoreEmpty: false, noheader: false, headers: void 0, flatKeys: false, maxRowLength: 0, checkColumn: false, escape: '"', colParser: {}, eol: void 0, alwaysSplitAtEOL: false, output: "json", nullObject: false, downstreamFormat: "line", needEmitAll: true };
        for (var r2 in t2 || (t2 = {}), t2)
          t2.hasOwnProperty(r2) && (Array.isArray(t2[r2]) ? e2[r2] = [].concat(t2[r2]) : e2[r2] = t2[r2]);
        return e2;
      };
    }, function(t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: true }), e.initParseRuntime = function(t2) {
        var e2 = t2.parseParam, r2 = { needProcessIgnoreColumn: false, needProcessIncludeColumn: false, selectedColumns: void 0, ended: false, hasError: false, error: void 0, delimiter: t2.parseParam.delimiter, eol: t2.parseParam.eol, columnConv: [], headerType: [], headerTitle: [], headerFlag: [], headers: void 0, started: false, parsedLineNumber: 0, columnValueSetter: [] };
        return e2.ignoreColumns && (r2.needProcessIgnoreColumn = true), e2.includeColumns && (r2.needProcessIncludeColumn = true), r2;
      };
    }, function(t, e, r) {
      "use strict";
      (function(t2) {
        var n = this && this.__extends || function() {
          var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e2) {
            t4.__proto__ = e2;
          } || function(t4, e2) {
            for (var r2 in e2)
              e2.hasOwnProperty(r2) && (t4[r2] = e2[r2]);
          };
          return function(e2, r2) {
            function n2() {
              this.constructor = e2;
            }
            t3(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        }(), i = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var o = r(53), s2 = i(r(15)), a = r(54), u = i(r(16)), c = r(57), l = r(28), f = r(58), h = i(r(59)), p = i(r(29)), d = function(e2) {
          function r2() {
            var t3 = null !== e2 && e2.apply(this, arguments) || this;
            return t3.rowSplit = new f.RowSplit(t3.converter), t3.eolEmitted = false, t3._needEmitEol = void 0, t3.headEmitted = false, t3._needEmitHead = void 0, t3;
          }
          return n(r2, e2), r2.prototype.flush = function() {
            var t3 = this;
            if (this.runtime.csvLineBuffer && this.runtime.csvLineBuffer.length > 0) {
              var e3 = this.runtime.csvLineBuffer;
              return this.runtime.csvLineBuffer = void 0, this.process(e3, true).then(function(e4) {
                return t3.runtime.csvLineBuffer && t3.runtime.csvLineBuffer.length > 0 ? s2.default.reject(p.default.unclosed_quote(t3.runtime.parsedLineNumber, t3.runtime.csvLineBuffer.toString())) : s2.default.resolve(e4);
              });
            }
            return s2.default.resolve([]);
          }, r2.prototype.destroy = function() {
            return s2.default.resolve();
          }, Object.defineProperty(r2.prototype, "needEmitEol", { get: function() {
            return void 0 === this._needEmitEol && (this._needEmitEol = this.converter.listeners("eol").length > 0), this._needEmitEol;
          }, enumerable: true, configurable: true }), Object.defineProperty(r2.prototype, "needEmitHead", { get: function() {
            return void 0 === this._needEmitHead && (this._needEmitHead = this.converter.listeners("header").length > 0), this._needEmitHead;
          }, enumerable: true, configurable: true }), r2.prototype.process = function(t3, e3) {
            var r3, n2 = this;
            return void 0 === e3 && (e3 = false), r3 = e3 ? t3.toString() : a.prepareData(t3, this.converter.parseRuntime), s2.default.resolve().then(function() {
              return n2.runtime.preRawDataHook ? n2.runtime.preRawDataHook(r3) : r3;
            }).then(function(t4) {
              return t4 && t4.length > 0 ? n2.processCSV(t4, e3) : s2.default.resolve([]);
            });
          }, r2.prototype.processCSV = function(t3, e3) {
            var r3 = this, n2 = this.params, i2 = this.runtime;
            i2.eol || u.default(t3, i2), this.needEmitEol && !this.eolEmitted && i2.eol && (this.converter.emit("eol", i2.eol), this.eolEmitted = true), n2.ignoreEmpty && !i2.started && (t3 = l.trimLeft(t3));
            var o2 = c.stringToLines(t3, i2);
            return e3 ? (o2.lines.push(o2.partial), o2.partial = "") : this.prependLeftBuf(l.bufFromString(o2.partial)), o2.lines.length > 0 ? (i2.preFileLineHook ? this.runPreLineHook(o2.lines) : s2.default.resolve(o2.lines)).then(function(t4) {
              return i2.started || r3.runtime.headers ? r3.processCSVBody(t4) : r3.processDataWithHead(t4);
            }) : s2.default.resolve([]);
          }, r2.prototype.processDataWithHead = function(t3) {
            if (this.params.noheader)
              this.params.headers ? this.runtime.headers = this.params.headers : this.runtime.headers = [];
            else {
              for (var e3 = "", r3 = []; t3.length; ) {
                var n2 = e3 + t3.shift(), i2 = this.rowSplit.parse(n2);
                if (i2.closed) {
                  r3 = i2.cells, e3 = "";
                  break;
                }
                e3 = n2 + u.default(n2, this.runtime);
              }
              if (this.prependLeftBuf(l.bufFromString(e3)), 0 === r3.length)
                return [];
              this.params.headers ? this.runtime.headers = this.params.headers : this.runtime.headers = r3;
            }
            return (this.runtime.needProcessIgnoreColumn || this.runtime.needProcessIncludeColumn) && this.filterHeader(), this.needEmitHead && !this.headEmitted && (this.converter.emit("header", this.runtime.headers), this.headEmitted = true), this.processCSVBody(t3);
          }, r2.prototype.filterHeader = function() {
            if (this.runtime.selectedColumns = [], this.runtime.headers) {
              for (var t3 = this.runtime.headers, e3 = 0; e3 < t3.length; e3++)
                if (this.params.ignoreColumns)
                  if (this.params.ignoreColumns.test(t3[e3])) {
                    if (!this.params.includeColumns || !this.params.includeColumns.test(t3[e3]))
                      continue;
                    this.runtime.selectedColumns.push(e3);
                  } else
                    this.runtime.selectedColumns.push(e3);
                else
                  this.params.includeColumns ? this.params.includeColumns.test(t3[e3]) && this.runtime.selectedColumns.push(e3) : this.runtime.selectedColumns.push(e3);
              this.runtime.headers = l.filterArray(this.runtime.headers, this.runtime.selectedColumns);
            }
          }, r2.prototype.processCSVBody = function(t3) {
            if ("line" === this.params.output)
              return t3;
            var e3 = this.rowSplit.parseMultiLines(t3);
            return this.prependLeftBuf(l.bufFromString(e3.partial)), "csv" === this.params.output ? e3.rowsCells : h.default(e3.rowsCells, this.converter);
          }, r2.prototype.prependLeftBuf = function(e3) {
            e3 && (this.runtime.csvLineBuffer ? this.runtime.csvLineBuffer = t2.concat([e3, this.runtime.csvLineBuffer]) : this.runtime.csvLineBuffer = e3);
          }, r2.prototype.runPreLineHook = function(t3) {
            var e3 = this;
            return new s2.default(function(r3, n2) {
              !function t4(e4, r4, n3, i2) {
                if (n3 >= e4.length)
                  i2();
                else if (r4.preFileLineHook) {
                  var o2 = e4[n3], s3 = r4.preFileLineHook(o2, r4.parsedLineNumber + n3);
                  if (n3++, s3 && s3.then)
                    s3.then(function(o3) {
                      e4[n3 - 1] = o3, t4(e4, r4, n3, i2);
                    });
                  else {
                    for (e4[n3 - 1] = s3; n3 < e4.length; )
                      e4[n3] = r4.preFileLineHook(e4[n3], r4.parsedLineNumber + n3), n3++;
                    i2();
                  }
                } else
                  i2();
              }(t3, e3.runtime, 0, function(e4) {
                e4 ? n2(e4) : r3(t3);
              });
            });
          }, r2;
        }(o.Processor);
        e.ProcessorLocal = d;
      }).call(this, r(3).Buffer);
    }, function(t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: true });
      var n = function(t2) {
        this.converter = t2, this.params = t2.parseParam, this.runtime = t2.parseRuntime;
      };
      e.Processor = n;
    }, function(t, e, r) {
      "use strict";
      (function(t2) {
        var n = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = n(r(55));
        e.prepareData = function(e2, r2) {
          var n2 = function(e3, r3) {
            return r3.csvLineBuffer && r3.csvLineBuffer.length > 0 ? t2.concat([r3.csvLineBuffer, e3]) : e3;
          }(e2, r2);
          r2.csvLineBuffer = void 0;
          var o = function(t3, e3) {
            var r3 = t3.length - 1;
            if (0 != (128 & t3[r3])) {
              for (; 128 == (192 & t3[r3]); )
                r3--;
              r3--;
            }
            return r3 != t3.length - 1 ? (e3.csvLineBuffer = t3.slice(r3 + 1), t3.slice(0, r3 + 1)) : t3;
          }(n2, r2).toString("utf8");
          return false === r2.started ? i.default(o) : o;
        };
      }).call(this, r(3).Buffer);
    }, function(t, e, r) {
      "use strict";
      (function(e2) {
        var n = r(56);
        t.exports = function(t2) {
          return "string" == typeof t2 && 65279 === t2.charCodeAt(0) ? t2.slice(1) : e2.isBuffer(t2) && n(t2) && 239 === t2[0] && 187 === t2[1] && 191 === t2[2] ? t2.slice(3) : t2;
        };
      }).call(this, r(3).Buffer);
    }, function(t, e) {
      t.exports = function(t2) {
        for (var e2 = 0; e2 < t2.length; )
          if (9 == t2[e2] || 10 == t2[e2] || 13 == t2[e2] || 32 <= t2[e2] && t2[e2] <= 126)
            e2 += 1;
          else if (194 <= t2[e2] && t2[e2] <= 223 && 128 <= t2[e2 + 1] && t2[e2 + 1] <= 191)
            e2 += 2;
          else if (224 == t2[e2] && 160 <= t2[e2 + 1] && t2[e2 + 1] <= 191 && 128 <= t2[e2 + 2] && t2[e2 + 2] <= 191 || (225 <= t2[e2] && t2[e2] <= 236 || 238 == t2[e2] || 239 == t2[e2]) && 128 <= t2[e2 + 1] && t2[e2 + 1] <= 191 && 128 <= t2[e2 + 2] && t2[e2 + 2] <= 191 || 237 == t2[e2] && 128 <= t2[e2 + 1] && t2[e2 + 1] <= 159 && 128 <= t2[e2 + 2] && t2[e2 + 2] <= 191)
            e2 += 3;
          else {
            if (!(240 == t2[e2] && 144 <= t2[e2 + 1] && t2[e2 + 1] <= 191 && 128 <= t2[e2 + 2] && t2[e2 + 2] <= 191 && 128 <= t2[e2 + 3] && t2[e2 + 3] <= 191 || 241 <= t2[e2] && t2[e2] <= 243 && 128 <= t2[e2 + 1] && t2[e2 + 1] <= 191 && 128 <= t2[e2 + 2] && t2[e2 + 2] <= 191 && 128 <= t2[e2 + 3] && t2[e2 + 3] <= 191 || 244 == t2[e2] && 128 <= t2[e2 + 1] && t2[e2 + 1] <= 143 && 128 <= t2[e2 + 2] && t2[e2 + 2] <= 191 && 128 <= t2[e2 + 3] && t2[e2 + 3] <= 191))
              return false;
            e2 += 4;
          }
        return true;
      };
    }, function(t, e, r) {
      "use strict";
      var n = this && this.__importDefault || function(t2) {
        return t2 && t2.__esModule ? t2 : { default: t2 };
      };
      Object.defineProperty(e, "__esModule", { value: true });
      var i = n(r(16));
      e.stringToLines = function(t2, e2) {
        var r2 = i.default(t2, e2), n2 = t2.split(r2);
        return { lines: n2, partial: n2.pop() || "" };
      };
    }, function(t, e, r) {
      "use strict";
      var n = this && this.__importDefault || function(t2) {
        return t2 && t2.__esModule ? t2 : { default: t2 };
      };
      Object.defineProperty(e, "__esModule", { value: true });
      var i = n(r(16)), o = r(28), s2 = [",", "|", "	", ";", ":"], a = function() {
        function t2(t3) {
          this.conv = t3, this.cachedRegExp = {}, this.delimiterEmitted = false, this._needEmitDelimiter = void 0, this.quote = t3.parseParam.quote, this.trim = t3.parseParam.trim, this.escape = t3.parseParam.escape;
        }
        return Object.defineProperty(t2.prototype, "needEmitDelimiter", { get: function() {
          return void 0 === this._needEmitDelimiter && (this._needEmitDelimiter = this.conv.listeners("delimiter").length > 0), this._needEmitDelimiter;
        }, enumerable: true, configurable: true }), t2.prototype.parse = function(t3) {
          if (0 === t3.length || this.conv.parseParam.ignoreEmpty && 0 === t3.trim().length)
            return { cells: [], closed: true };
          var e2 = this.quote, r2 = this.trim;
          this.escape, (this.conv.parseRuntime.delimiter instanceof Array || "auto" === this.conv.parseRuntime.delimiter.toLowerCase()) && (this.conv.parseRuntime.delimiter = this.getDelimiter(t3)), this.needEmitDelimiter && !this.delimiterEmitted && (this.conv.emit("delimiter", this.conv.parseRuntime.delimiter), this.delimiterEmitted = true);
          var n2 = this.conv.parseRuntime.delimiter, i2 = t3.split(n2);
          if ("off" === e2) {
            if (r2)
              for (var o2 = 0; o2 < i2.length; o2++)
                i2[o2] = i2[o2].trim();
            return { cells: i2, closed: true };
          }
          return this.toCSVRow(i2, r2, e2, n2);
        }, t2.prototype.toCSVRow = function(t3, e2, r2, n2) {
          for (var i2 = [], s3 = false, a2 = "", u = 0, c = t3.length; u < c; u++) {
            var l = t3[u];
            !s3 && e2 && (l = o.trimLeft(l));
            var f = l.length;
            if (s3)
              this.isQuoteClose(l) ? (s3 = false, a2 += n2 + (l = l.substr(0, f - 1)), a2 = this.escapeQuote(a2), e2 && (a2 = o.trimRight(a2)), i2.push(a2), a2 = "") : a2 += n2 + l;
            else {
              if (2 === f && l === this.quote + this.quote) {
                i2.push("");
                continue;
              }
              if (this.isQuoteOpen(l)) {
                if (l = l.substr(1), this.isQuoteClose(l)) {
                  l = l.substring(0, l.lastIndexOf(r2)), l = this.escapeQuote(l), i2.push(l);
                  continue;
                }
                if (-1 !== l.indexOf(r2)) {
                  for (var h = 0, p = "", d = 0, _ = l; d < _.length; d++) {
                    var v = _[d];
                    v === r2 && p !== this.escape ? (h++, p = "") : p = v;
                  }
                  if (h % 2 == 1) {
                    e2 && (l = o.trimRight(l)), i2.push(r2 + l);
                    continue;
                  }
                  s3 = true, a2 += l;
                  continue;
                }
                s3 = true, a2 += l;
                continue;
              }
              e2 && (l = o.trimRight(l)), i2.push(l);
            }
          }
          return { cells: i2, closed: !s3 };
        }, t2.prototype.getDelimiter = function(t3) {
          var e2;
          if ("auto" === this.conv.parseParam.delimiter)
            e2 = s2;
          else {
            if (!(this.conv.parseParam.delimiter instanceof Array))
              return this.conv.parseParam.delimiter;
            e2 = this.conv.parseParam.delimiter;
          }
          var r2 = 0, n2 = ",";
          return e2.forEach(function(e3) {
            var i2 = t3.split(e3).length;
            i2 > r2 && (n2 = e3, r2 = i2);
          }), n2;
        }, t2.prototype.isQuoteOpen = function(t3) {
          var e2 = this.quote, r2 = this.escape;
          return t3[0] === e2 && (t3[1] !== e2 || t3[1] === r2 && (t3[2] === e2 || 2 === t3.length));
        }, t2.prototype.isQuoteClose = function(t3) {
          var e2 = this.quote, r2 = this.escape;
          this.conv.parseParam.trim && (t3 = o.trimRight(t3));
          for (var n2 = 0, i2 = t3.length - 1; t3[i2] === e2 || t3[i2] === r2; )
            i2--, n2++;
          return n2 % 2 != 0;
        }, t2.prototype.escapeQuote = function(t3) {
          var e2 = "es|" + this.quote + "|" + this.escape;
          void 0 === this.cachedRegExp[e2] && (this.cachedRegExp[e2] = new RegExp("\\" + this.escape + "\\" + this.quote, "g"));
          var r2 = this.cachedRegExp[e2];
          return t3.replace(r2, this.quote);
        }, t2.prototype.parseMultiLines = function(t3) {
          for (var e2 = [], r2 = ""; t3.length; ) {
            var n2 = r2 + t3.shift(), s3 = this.parse(n2);
            0 === s3.cells.length && this.conv.parseParam.ignoreEmpty || (s3.closed || this.conv.parseParam.alwaysSplitAtEOL ? (this.conv.parseRuntime.selectedColumns ? e2.push(o.filterArray(s3.cells, this.conv.parseRuntime.selectedColumns)) : e2.push(s3.cells), r2 = "") : r2 = n2 + (i.default(n2, this.conv.parseRuntime) || "\n"));
          }
          return { rowsCells: e2, partial: r2 };
        }, t2;
      }();
      e.RowSplit = a;
    }, function(t, e, r) {
      "use strict";
      var n = this && this.__importDefault || function(t2) {
        return t2 && t2.__esModule ? t2 : { default: t2 };
      };
      Object.defineProperty(e, "__esModule", { value: true });
      var i = n(r(29)), o = n(r(60)), s2 = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
      function a(t2, e2, r2) {
        if (e2.parseParam.checkColumn && e2.parseRuntime.headers && t2.length !== e2.parseRuntime.headers.length)
          throw i.default.column_mismatched(e2.parseRuntime.parsedLineNumber + r2);
        return function(t3, e3, r3) {
          for (var n2 = false, i2 = {}, o2 = 0, s3 = t3.length; o2 < s3; o2++) {
            var a2 = t3[o2];
            if (!r3.parseParam.ignoreEmpty || "" !== a2) {
              n2 = true;
              var u2 = e3[o2];
              u2 && "" !== u2 || (u2 = e3[o2] = "field" + (o2 + 1));
              var f2 = c(u2, o2, r3);
              if (f2) {
                var h2 = f2(a2, u2, i2, t3, o2);
                void 0 !== h2 && l(i2, u2, h2, r3, o2);
              } else {
                if (r3.parseParam.checkType)
                  a2 = p(a2, u2, o2, r3)(a2);
                void 0 !== a2 && l(i2, u2, a2, r3, o2);
              }
            }
          }
          return n2 ? i2 : null;
        }(t2, e2.parseRuntime.headers || [], e2) || null;
      }
      e.default = function(t2, e2) {
        for (var r2 = [], n2 = 0, i2 = t2.length; n2 < i2; n2++) {
          var o2 = a(t2[n2], e2, n2);
          o2 && r2.push(o2);
        }
        return r2;
      };
      var u = { string: _, number: d, omit: function() {
      } };
      function c(t2, e2, r2) {
        if (void 0 !== r2.parseRuntime.columnConv[e2])
          return r2.parseRuntime.columnConv[e2];
        var n2 = r2.parseParam.colParser[t2];
        if (void 0 === n2)
          return r2.parseRuntime.columnConv[e2] = null;
        if ("object" == typeof n2 && (n2 = n2.cellParser || "string"), "string" == typeof n2) {
          n2 = n2.trim().toLowerCase();
          var i2 = u[n2];
          return r2.parseRuntime.columnConv[e2] = i2 || null;
        }
        return r2.parseRuntime.columnConv[e2] = "function" == typeof n2 ? n2 : null;
      }
      function l(t2, e2, r2, n2, i2) {
        if (!n2.parseRuntime.columnValueSetter[i2])
          if (n2.parseParam.flatKeys)
            n2.parseRuntime.columnValueSetter[i2] = f;
          else if (e2.indexOf(".") > -1) {
            for (var o2 = e2.split("."), s3 = true; o2.length > 0; )
              if (0 === o2.shift().length) {
                s3 = false;
                break;
              }
            !s3 || n2.parseParam.colParser[e2] && n2.parseParam.colParser[e2].flat ? n2.parseRuntime.columnValueSetter[i2] = f : n2.parseRuntime.columnValueSetter[i2] = h;
          } else
            n2.parseRuntime.columnValueSetter[i2] = f;
        true === n2.parseParam.nullObject && "null" === r2 && (r2 = null), n2.parseRuntime.columnValueSetter[i2](t2, e2, r2);
      }
      function f(t2, e2, r2) {
        t2[e2] = r2;
      }
      function h(t2, e2, r2) {
        o.default(t2, e2, r2);
      }
      function p(t2, e2, r2, n2) {
        return n2.parseRuntime.headerType[r2] ? n2.parseRuntime.headerType[r2] : e2.indexOf("number#!") > -1 ? n2.parseRuntime.headerType[r2] = d : e2.indexOf("string#!") > -1 ? n2.parseRuntime.headerType[r2] = _ : n2.parseParam.checkType ? n2.parseRuntime.headerType[r2] = v : n2.parseRuntime.headerType[r2] = _;
      }
      function d(t2) {
        var e2 = parseFloat(t2);
        return isNaN(e2) ? t2 : e2;
      }
      function _(t2) {
        return t2.toString();
      }
      function v(t2) {
        var e2 = t2.trim();
        return "" === e2 ? _(t2) : s2.test(e2) ? d(t2) : 5 === e2.length && "false" === e2.toLowerCase() || 4 === e2.length && "true" === e2.toLowerCase() ? function(t3) {
          var e3 = t3.trim();
          return 5 !== e3.length || "false" !== e3.toLowerCase();
        }(t2) : "{" === e2[0] && "}" === e2[e2.length - 1] || "[" === e2[0] && "]" === e2[e2.length - 1] ? function(t3) {
          try {
            return JSON.parse(t3);
          } catch (e3) {
            return t3;
          }
        }(t2) : _(t2);
      }
    }, function(t, e, r) {
      var n = r(61);
      t.exports = function(t2, e2, r2) {
        return null == t2 ? t2 : n(t2, e2, r2);
      };
    }, function(t, e, r) {
      var n = r(62), i = r(74), o = r(103), s2 = r(20), a = r(104);
      t.exports = function(t2, e2, r2, u) {
        if (!s2(t2))
          return t2;
        for (var c = -1, l = (e2 = i(e2, t2)).length, f = l - 1, h = t2; null != h && ++c < l; ) {
          var p = a(e2[c]), d = r2;
          if (c != f) {
            var _ = h[p];
            void 0 === (d = u ? u(_, p, h) : void 0) && (d = s2(_) ? _ : o(e2[c + 1]) ? [] : {});
          }
          n(h, p, d), h = h[p];
        }
        return t2;
      };
    }, function(t, e, r) {
      var n = r(63), i = r(31), o = Object.prototype.hasOwnProperty;
      t.exports = function(t2, e2, r2) {
        var s2 = t2[e2];
        o.call(t2, e2) && i(s2, r2) && (void 0 !== r2 || e2 in t2) || n(t2, e2, r2);
      };
    }, function(t, e, r) {
      var n = r(64);
      t.exports = function(t2, e2, r2) {
        "__proto__" == e2 && n ? n(t2, e2, { configurable: true, enumerable: true, value: r2, writable: true }) : t2[e2] = r2;
      };
    }, function(t, e, r) {
      var n = r(17), i = function() {
        try {
          var t2 = n(Object, "defineProperty");
          return t2({}, "", {}), t2;
        } catch (t3) {
        }
      }();
      t.exports = i;
    }, function(t, e, r) {
      var n = r(66), i = r(70), o = r(20), s2 = r(72), a = /^\[object .+?Constructor\]$/, u = Function.prototype, c = Object.prototype, l = u.toString, f = c.hasOwnProperty, h = RegExp("^" + l.call(f).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      t.exports = function(t2) {
        return !(!o(t2) || i(t2)) && (n(t2) ? h : a).test(s2(t2));
      };
    }, function(t, e, r) {
      var n = r(30), i = r(20);
      t.exports = function(t2) {
        if (!i(t2))
          return false;
        var e2 = n(t2);
        return "[object Function]" == e2 || "[object GeneratorFunction]" == e2 || "[object AsyncFunction]" == e2 || "[object Proxy]" == e2;
      };
    }, function(t, e, r) {
      (function(e2) {
        var r2 = "object" == typeof e2 && e2 && e2.Object === Object && e2;
        t.exports = r2;
      }).call(this, r(0));
    }, function(t, e, r) {
      var n = r(18), i = Object.prototype, o = i.hasOwnProperty, s2 = i.toString, a = n ? n.toStringTag : void 0;
      t.exports = function(t2) {
        var e2 = o.call(t2, a), r2 = t2[a];
        try {
          t2[a] = void 0;
          var n2 = true;
        } catch (t3) {
        }
        var i2 = s2.call(t2);
        return n2 && (e2 ? t2[a] = r2 : delete t2[a]), i2;
      };
    }, function(t, e) {
      var r = Object.prototype.toString;
      t.exports = function(t2) {
        return r.call(t2);
      };
    }, function(t, e, r) {
      var n = r(71), i = function() {
        var t2 = /[^.]+$/.exec(n && n.keys && n.keys.IE_PROTO || "");
        return t2 ? "Symbol(src)_1." + t2 : "";
      }();
      t.exports = function(t2) {
        return !!i && i in t2;
      };
    }, function(t, e, r) {
      var n = r(19)["__core-js_shared__"];
      t.exports = n;
    }, function(t, e) {
      var r = Function.prototype.toString;
      t.exports = function(t2) {
        if (null != t2) {
          try {
            return r.call(t2);
          } catch (t3) {
          }
          try {
            return t2 + "";
          } catch (t3) {
          }
        }
        return "";
      };
    }, function(t, e) {
      t.exports = function(t2, e2) {
        return null == t2 ? void 0 : t2[e2];
      };
    }, function(t, e, r) {
      var n = r(21), i = r(75), o = r(77), s2 = r(100);
      t.exports = function(t2, e2) {
        return n(t2) ? t2 : i(t2, e2) ? [t2] : o(s2(t2));
      };
    }, function(t, e, r) {
      var n = r(21), i = r(22), o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, s2 = /^\w*$/;
      t.exports = function(t2, e2) {
        if (n(t2))
          return false;
        var r2 = typeof t2;
        return !("number" != r2 && "symbol" != r2 && "boolean" != r2 && null != t2 && !i(t2)) || s2.test(t2) || !o.test(t2) || null != e2 && t2 in Object(e2);
      };
    }, function(t, e) {
      t.exports = function(t2) {
        return null != t2 && "object" == typeof t2;
      };
    }, function(t, e, r) {
      var n = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, i = /\\(\\)?/g, o = r(78)(function(t2) {
        var e2 = [];
        return 46 === t2.charCodeAt(0) && e2.push(""), t2.replace(n, function(t3, r2, n2, o2) {
          e2.push(n2 ? o2.replace(i, "$1") : r2 || t3);
        }), e2;
      });
      t.exports = o;
    }, function(t, e, r) {
      var n = r(79);
      t.exports = function(t2) {
        var e2 = n(t2, function(t3) {
          return 500 === r2.size && r2.clear(), t3;
        }), r2 = e2.cache;
        return e2;
      };
    }, function(t, e, r) {
      var n = r(80), i = "Expected a function";
      function o(t2, e2) {
        if ("function" != typeof t2 || null != e2 && "function" != typeof e2)
          throw new TypeError(i);
        var r2 = function() {
          var n2 = arguments, i2 = e2 ? e2.apply(this, n2) : n2[0], o2 = r2.cache;
          if (o2.has(i2))
            return o2.get(i2);
          var s2 = t2.apply(this, n2);
          return r2.cache = o2.set(i2, s2) || o2, s2;
        };
        return r2.cache = new (o.Cache || n)(), r2;
      }
      o.Cache = n, t.exports = o;
    }, function(t, e, r) {
      var n = r(81), i = r(95), o = r(97), s2 = r(98), a = r(99);
      function u(t2) {
        var e2 = -1, r2 = null == t2 ? 0 : t2.length;
        for (this.clear(); ++e2 < r2; ) {
          var n2 = t2[e2];
          this.set(n2[0], n2[1]);
        }
      }
      u.prototype.clear = n, u.prototype.delete = i, u.prototype.get = o, u.prototype.has = s2, u.prototype.set = a, t.exports = u;
    }, function(t, e, r) {
      var n = r(82), i = r(88), o = r(94);
      t.exports = function() {
        this.size = 0, this.__data__ = { hash: new n(), map: new (o || i)(), string: new n() };
      };
    }, function(t, e, r) {
      var n = r(83), i = r(84), o = r(85), s2 = r(86), a = r(87);
      function u(t2) {
        var e2 = -1, r2 = null == t2 ? 0 : t2.length;
        for (this.clear(); ++e2 < r2; ) {
          var n2 = t2[e2];
          this.set(n2[0], n2[1]);
        }
      }
      u.prototype.clear = n, u.prototype.delete = i, u.prototype.get = o, u.prototype.has = s2, u.prototype.set = a, t.exports = u;
    }, function(t, e, r) {
      var n = r(8);
      t.exports = function() {
        this.__data__ = n ? n(null) : {}, this.size = 0;
      };
    }, function(t, e) {
      t.exports = function(t2) {
        var e2 = this.has(t2) && delete this.__data__[t2];
        return this.size -= e2 ? 1 : 0, e2;
      };
    }, function(t, e, r) {
      var n = r(8), i = Object.prototype.hasOwnProperty;
      t.exports = function(t2) {
        var e2 = this.__data__;
        if (n) {
          var r2 = e2[t2];
          return "__lodash_hash_undefined__" === r2 ? void 0 : r2;
        }
        return i.call(e2, t2) ? e2[t2] : void 0;
      };
    }, function(t, e, r) {
      var n = r(8), i = Object.prototype.hasOwnProperty;
      t.exports = function(t2) {
        var e2 = this.__data__;
        return n ? void 0 !== e2[t2] : i.call(e2, t2);
      };
    }, function(t, e, r) {
      var n = r(8);
      t.exports = function(t2, e2) {
        var r2 = this.__data__;
        return this.size += this.has(t2) ? 0 : 1, r2[t2] = n && void 0 === e2 ? "__lodash_hash_undefined__" : e2, this;
      };
    }, function(t, e, r) {
      var n = r(89), i = r(90), o = r(91), s2 = r(92), a = r(93);
      function u(t2) {
        var e2 = -1, r2 = null == t2 ? 0 : t2.length;
        for (this.clear(); ++e2 < r2; ) {
          var n2 = t2[e2];
          this.set(n2[0], n2[1]);
        }
      }
      u.prototype.clear = n, u.prototype.delete = i, u.prototype.get = o, u.prototype.has = s2, u.prototype.set = a, t.exports = u;
    }, function(t, e) {
      t.exports = function() {
        this.__data__ = [], this.size = 0;
      };
    }, function(t, e, r) {
      var n = r(9), i = Array.prototype.splice;
      t.exports = function(t2) {
        var e2 = this.__data__, r2 = n(e2, t2);
        return !(r2 < 0 || (r2 == e2.length - 1 ? e2.pop() : i.call(e2, r2, 1), --this.size, 0));
      };
    }, function(t, e, r) {
      var n = r(9);
      t.exports = function(t2) {
        var e2 = this.__data__, r2 = n(e2, t2);
        return r2 < 0 ? void 0 : e2[r2][1];
      };
    }, function(t, e, r) {
      var n = r(9);
      t.exports = function(t2) {
        return n(this.__data__, t2) > -1;
      };
    }, function(t, e, r) {
      var n = r(9);
      t.exports = function(t2, e2) {
        var r2 = this.__data__, i = n(r2, t2);
        return i < 0 ? (++this.size, r2.push([t2, e2])) : r2[i][1] = e2, this;
      };
    }, function(t, e, r) {
      var n = r(17)(r(19), "Map");
      t.exports = n;
    }, function(t, e, r) {
      var n = r(10);
      t.exports = function(t2) {
        var e2 = n(this, t2).delete(t2);
        return this.size -= e2 ? 1 : 0, e2;
      };
    }, function(t, e) {
      t.exports = function(t2) {
        var e2 = typeof t2;
        return "string" == e2 || "number" == e2 || "symbol" == e2 || "boolean" == e2 ? "__proto__" !== t2 : null === t2;
      };
    }, function(t, e, r) {
      var n = r(10);
      t.exports = function(t2) {
        return n(this, t2).get(t2);
      };
    }, function(t, e, r) {
      var n = r(10);
      t.exports = function(t2) {
        return n(this, t2).has(t2);
      };
    }, function(t, e, r) {
      var n = r(10);
      t.exports = function(t2, e2) {
        var r2 = n(this, t2), i = r2.size;
        return r2.set(t2, e2), this.size += r2.size == i ? 0 : 1, this;
      };
    }, function(t, e, r) {
      var n = r(101);
      t.exports = function(t2) {
        return null == t2 ? "" : n(t2);
      };
    }, function(t, e, r) {
      var n = r(18), i = r(102), o = r(21), s2 = r(22), a = n ? n.prototype : void 0, u = a ? a.toString : void 0;
      t.exports = function t2(e2) {
        if ("string" == typeof e2)
          return e2;
        if (o(e2))
          return i(e2, t2) + "";
        if (s2(e2))
          return u ? u.call(e2) : "";
        var r2 = e2 + "";
        return "0" == r2 && 1 / e2 == -1 / 0 ? "-0" : r2;
      };
    }, function(t, e) {
      t.exports = function(t2, e2) {
        for (var r = -1, n = null == t2 ? 0 : t2.length, i = Array(n); ++r < n; )
          i[r] = e2(t2[r], r, t2);
        return i;
      };
    }, function(t, e) {
      var r = /^(?:0|[1-9]\d*)$/;
      t.exports = function(t2, e2) {
        var n = typeof t2;
        return !!(e2 = null == e2 ? 9007199254740991 : e2) && ("number" == n || "symbol" != n && r.test(t2)) && t2 > -1 && t2 % 1 == 0 && t2 < e2;
      };
    }, function(t, e, r) {
      var n = r(22);
      t.exports = function(t2) {
        if ("string" == typeof t2 || n(t2))
          return t2;
        var e2 = t2 + "";
        return "0" == e2 && 1 / t2 == -1 / 0 ? "-0" : e2;
      };
    }, function(t, e, r) {
      "use strict";
      var n = this && this.__importDefault || function(t2) {
        return t2 && t2.__esModule ? t2 : { default: t2 };
      };
      Object.defineProperty(e, "__esModule", { value: true });
      var i = n(r(15)), o = r(106), s2 = function() {
        function t2(t3) {
          this.converter = t3, this.finalResult = [];
        }
        return Object.defineProperty(t2.prototype, "needEmitLine", { get: function() {
          return !!this.converter.parseRuntime.subscribe && !!this.converter.parseRuntime.subscribe.onNext || this.needPushDownstream;
        }, enumerable: true, configurable: true }), Object.defineProperty(t2.prototype, "needPushDownstream", { get: function() {
          return void 0 === this._needPushDownstream && (this._needPushDownstream = this.converter.listeners("data").length > 0 || this.converter.listeners("readable").length > 0), this._needPushDownstream;
        }, enumerable: true, configurable: true }), Object.defineProperty(t2.prototype, "needEmitAll", { get: function() {
          return !!this.converter.parseRuntime.then && this.converter.parseParam.needEmitAll;
        }, enumerable: true, configurable: true }), t2.prototype.processResult = function(t3) {
          var e2 = this, r2 = this.converter.parseRuntime.parsedLineNumber;
          return this.needPushDownstream && "array" === this.converter.parseParam.downstreamFormat && 0 === r2 && a(this.converter, "[" + o.EOL), new i.default(function(r3, n2) {
            e2.needEmitLine ? function t4(e3, r4, n3, i2, o2) {
              if (n3 >= e3.length)
                o2();
              else if (r4.parseRuntime.subscribe && r4.parseRuntime.subscribe.onNext) {
                var s3 = r4.parseRuntime.subscribe.onNext, u = e3[n3], c = s3(u, r4.parseRuntime.parsedLineNumber + n3);
                if (n3++, c && c.then)
                  c.then(function() {
                    !function(e4, r5, n4, i3, o3, s4, u2) {
                      o3 && a(n4, u2), t4(e4, n4, i3, o3, s4);
                    }(e3, 0, r4, n3, i2, o2, u);
                  }, o2);
                else {
                  for (i2 && a(r4, u); n3 < e3.length; ) {
                    var l = e3[n3];
                    s3(l, r4.parseRuntime.parsedLineNumber + n3), n3++, i2 && a(r4, l);
                  }
                  o2();
                }
              } else {
                if (i2)
                  for (; n3 < e3.length; )
                    l = e3[n3++], a(r4, l);
                o2();
              }
            }(t3, e2.converter, 0, e2.needPushDownstream, function(i2) {
              i2 ? n2(i2) : (e2.appendFinalResult(t3), r3());
            }) : (e2.appendFinalResult(t3), r3());
          });
        }, t2.prototype.appendFinalResult = function(t3) {
          this.needEmitAll && (this.finalResult = this.finalResult.concat(t3)), this.converter.parseRuntime.parsedLineNumber += t3.length;
        }, t2.prototype.processError = function(t3) {
          this.converter.parseRuntime.subscribe && this.converter.parseRuntime.subscribe.onError && this.converter.parseRuntime.subscribe.onError(t3), this.converter.parseRuntime.then && this.converter.parseRuntime.then.onrejected && this.converter.parseRuntime.then.onrejected(t3);
        }, t2.prototype.endProcess = function() {
          this.converter.parseRuntime.then && this.converter.parseRuntime.then.onfulfilled && (this.needEmitAll ? this.converter.parseRuntime.then.onfulfilled(this.finalResult) : this.converter.parseRuntime.then.onfulfilled([])), this.converter.parseRuntime.subscribe && this.converter.parseRuntime.subscribe.onCompleted && this.converter.parseRuntime.subscribe.onCompleted(), this.needPushDownstream && "array" === this.converter.parseParam.downstreamFormat && a(this.converter, "]" + o.EOL);
        }, t2;
      }();
      function a(t2, e2) {
        if ("object" != typeof e2 || t2.options.objectMode)
          t2.push(e2);
        else {
          var r2 = JSON.stringify(e2);
          t2.push(r2 + ("array" === t2.parseParam.downstreamFormat ? "," + o.EOL : o.EOL), "utf8");
        }
      }
      e.Result = s2;
    }, function(t, e) {
      e.endianness = function() {
        return "LE";
      }, e.hostname = function() {
        return "undefined" != typeof location ? location.hostname : "";
      }, e.loadavg = function() {
        return [];
      }, e.uptime = function() {
        return 0;
      }, e.freemem = function() {
        return Number.MAX_VALUE;
      }, e.totalmem = function() {
        return Number.MAX_VALUE;
      }, e.cpus = function() {
        return [];
      }, e.type = function() {
        return "Browser";
      }, e.release = function() {
        return "undefined" != typeof navigator ? navigator.appVersion : "";
      }, e.networkInterfaces = e.getNetworkInterfaces = function() {
        return {};
      }, e.arch = function() {
        return "javascript";
      }, e.platform = function() {
        return "browser";
      }, e.tmpdir = e.tmpDir = function() {
        return "/tmp";
      }, e.EOL = "\n", e.homedir = function() {
        return "/";
      };
    }]);
  }
});

// .svelte-kit/output/server/chunks/helpers.js
function wrapTextInParagraphTags(text3) {
  return text3.split("\n").map((line) => `<p>${line}</p>`).join("");
}
function generateTestImage(randomSizeLimit = 400, fixedSizeLimit = 200) {
  const id = Math.random() * 1e8;
  return {
    id,
    name: "Test image " + id,
    imgurl: `https://picsum.photos/${Math.floor(Math.random() * randomSizeLimit) + fixedSizeLimit}/${Math.floor(Math.random() * randomSizeLimit) + fixedSizeLimit}?random=6`,
    attribution: "picsum photos"
  };
}
var init_helpers = __esm({
  ".svelte-kit/output/server/chunks/helpers.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/products/_layout.server.ts.js
var layout_server_ts_exports = {};
__export(layout_server_ts_exports, {
  load: () => load
});
async function fetchProductData(googleSheetsUrl) {
  const results = await fetch(googleSheetsUrl);
  const body = await results.text();
  const spreadsheetData = await (0, import_csvtojson.default)().fromString(body);
  const productData = spreadsheetData.map((row) => ({
    ...row,
    images: JSON.parse(row.images)
  }));
  return productData;
}
var import_csvtojson, SPREADSHEET_URL, API_CACHE_DURATION, apiCache, load;
var init_layout_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/products/_layout.server.ts.js"() {
    import_csvtojson = __toESM(require_browser(), 1);
    init_helpers();
    [
      {
        id: "hunnie-bunnys-garden",
        title: "Hunnie Bunny\u2019s Garden",
        type: "book",
        description: `Hunnie Bunny\u2019s Garden is an enchanting picture book that brings children closer to nature, instills valuable virtues and ignites a sense of responsibility towards our environment.
Through the endearing character of Hunnie Bunny, it\u2019s a delightful blend of entertainment and education. This book also promotes discussions about nature, gardening, sustainability, and healthy eating. If you are looking for a children\u2019s book that offers both a charming story and important life lessons, Hunnie Bunny\u2019s Garden is the book for you!`,
        price: 20.99,
        images: [
          {
            id: 0,
            imgurl: "/images/hunnie-bunnys-garden-book-cover-front-1.png"
          },
          {
            id: 1,
            imgurl: "/images/hunnie-bunnys-garden-book-cover-back-1.png"
          },
          {
            id: 2,
            imgurl: "/images/hunnie-bunnys-garden-page-1.png"
          },
          {
            id: 3,
            imgurl: "/images/hunnie-bunnys-garden-page-2.png"
          },
          {
            id: 4,
            imgurl: "/images/hunnie-bunnys-garden-book-cover.png"
          }
        ]
      },
      {
        id: "hunnie-bunnys-garden-mystery",
        title: "Hunnie Bunny\u2019s Garden Mystery",
        type: "book",
        description: `Hunnie Bunny\u2019s Garden Mystery is the next upcoming book in the Hunnie Bunny Series.`,
        price: 20.99,
        images: Array(4).fill({ id: 0, imgurl: "" }).map((item, index12) => {
          return {
            id: index12,
            imgurl: generateTestImage().imgurl
          };
        })
      },
      {
        id: "hunnie-bunnys-third-story",
        title: "Hunnie Bunny\u2019s Third Story",
        type: "book",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.`,
        price: 20.99,
        images: Array(4).fill({ id: 0, imgurl: "" }).map((item, index12) => {
          return {
            id: index12,
            imgurl: generateTestImage().imgurl
          };
        })
      },
      {
        id: "hunnie-bunnys-christmas-story",
        title: "Hunnie Bunny\u2019s Christmas Story",
        type: "book",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.`,
        price: 20.99,
        images: Array(4).fill({ id: 0, imgurl: "" }).map((item, index12) => {
          return {
            id: index12,
            imgurl: generateTestImage().imgurl
          };
        })
      }
    ];
    SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1_We5tuuuMtIETdyutjqacA7ZBNimaZymn7NNhLDC1zs/export?format=csv";
    API_CACHE_DURATION = 30 * 1e3;
    apiCache = {
      products: [],
      lastFetch: 0
    };
    load = async () => {
      const NOW = Date.now();
      const remainingTime = NOW - apiCache.lastFetch;
      if (apiCache.products && remainingTime < API_CACHE_DURATION) {
        console.log(`Cache hit! Returning cached products (${remainingTime}ms remaining)`);
        return {
          products: apiCache.products
        };
      }
      apiCache.products = await fetchProductData(SPREADSHEET_URL);
      apiCache.lastFetch = NOW;
      console.info("[Server-Side] Successfully fetched products from Google Sheets.");
      return {
        products: apiCache.products
      };
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/fallbacks/layout.svelte.js"() {
    init_ssr();
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  server: () => layout_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, server_id, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_layout_server_ts();
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default);
    server_id = "src/routes/products/+layout.server.ts";
    imports3 = ["_app/immutable/nodes/2.6db8019a.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/ButtonAmazon.js
var ButtonAmazon;
var init_ButtonAmazon = __esm({
  ".svelte-kit/output/server/chunks/ButtonAmazon.js"() {
    init_ssr();
    init_Indicator_svelte_svelte_type_style_lang();
    ButtonAmazon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let buttonClass;
      let { fullWidth = false } = $$props;
      let { disabled = true } = $$props;
      let { size = "xl" } = $$props;
      if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
        $$bindings.fullWidth(fullWidth);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      buttonClass = `${fullWidth && "w-full"}`;
      return `${validate_component(Button, "Button").$$render(
        $$result,
        {
          disabled: true,
          color: "primary",
          size,
          class: buttonClass
        },
        {},
        {
          default: () => {
            return `<svg class="mr-3" style="color: white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5_logos</title><path d="M48.48,378.73a300.52,300.52,0,0,0,152.89,95.92,262.57,262.57,0,0,0,159.3-17.25,225.52,225.52,0,0,0,66.79-47,6.36,6.36,0,0,0-2-8.53,11.76,11.76,0,0,0-8-.05,401.92,401.92,0,0,1-116.55,39.34,358.13,358.13,0,0,1-127.29-8.83,446.73,446.73,0,0,1-119.1-60.49,5,5,0,0,0-6.06,6.9Z" fill="white"></path><path d="M387.15,388.44a168.11,168.11,0,0,1,48.94-2.23l.67.13a10,10,0,0,1,7.37,12.05A204.71,204.71,0,0,1,429,444.47a2.55,2.55,0,0,0,1.66,3.18,2.51,2.51,0,0,0,2.23-.37A83.31,83.31,0,0,0,464,382.86a12.44,12.44,0,0,0-10.22-13.22A95.75,95.75,0,0,0,384.91,384a2.55,2.55,0,0,0-.57,3.55A2.52,2.52,0,0,0,387.15,388.44Z" fill="white"></path><path d="M304.24,324.92a164,164,0,0,1-28.92,25.3A135.16,135.16,0,0,1,208.63,369a99.49,99.49,0,0,1-57.49-19.85,97.25,97.25,0,0,1-27.36-100.28,112.35,112.35,0,0,1,65.3-69.06,367.67,367.67,0,0,1,104.7-15.55V127A37.82,37.82,0,0,0,261,94.72a59.9,59.9,0,0,0-31.17,4.08,48.89,48.89,0,0,0-27.13,34.67,12,12,0,0,1-12.58,6.72l-50.9-4.5a11.38,11.38,0,0,1-8.38-10.16,103.66,103.66,0,0,1,36.61-63.45A143.86,143.86,0,0,1,257.85,32a146.24,146.24,0,0,1,84.27,27.67,86.82,86.82,0,0,1,30.7,70.22V258.8a84.46,84.46,0,0,0,8,31.28l15.87,23.23a13,13,0,0,1,0,11.23L349.7,364.25a12.5,12.5,0,0,1-12.68-.44A244.84,244.84,0,0,1,304.24,324.92Zm-10.6-116.83a257.68,257.68,0,0,0-44,2.89A63,63,0,0,0,208,242.54a63,63,0,0,0,3.07,54,40.6,40.6,0,0,0,47.11,12.19,78.61,78.61,0,0,0,35.46-55.58V208.09" fill="white"></path></svg>
	Buy on Amazon`;
          }
        }
      )}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/home/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/home/_page.svelte.js"() {
    init_ssr();
    init_ButtonAmazon();
    init_Indicator_svelte_svelte_type_style_lang();
    init_CldImage();
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-im3euq_START -->${$$result.title = `<title>Welcome to Simple Reads Books</title>`, ""}<!-- HEAD_svelte-im3euq_END -->`, ""} <section class="w-full py-10 md:py-20 px-4 md:px-5 bg-[#009933] bg-opacity-40 flex-col justify-start items-center inline-flex font-[Itim]" data-svelte-h="svelte-zlw5rg"><div class="justify-start items-center inline-flex"><div class="self-stretch justify-between items-start gap-2.5 inline-flex"><div class="text-center text-gray-900 lg:text-4xl xs:text-normal sm:text-2xl md:text-3xl font-normal md:px-10">Simple Reads Books encourages children to explore nature through entertaining stories filled
				with colorful illustrations</div></div></div></section>  <section><div class="flex flex-row flex-wrap font-[Itim]"><div class="p-4 md:basis-7/12" role="button" tabindex="0"><a href="/products/hunnie-bunnys-garden">${validate_component(CldImage, "CldImage").$$render(
        $$result,
        {
          width: 1616,
          height: "100%",
          aspectRatio: 1413 / 983,
          class: "rounded-lg w-full",
          src: "hunnie-bunnys-garden-table",
          alt: "book mockup cover",
          quality: 75,
          loading: "eager"
        },
        {},
        {}
      )} <div class="self-stretch text-center text-gray-900 md:text-xl lg:text-2xl text-xl p-3" data-svelte-h="svelte-1i186ue"><p class="mb-2">Hunnie Bunny\u2019s Garden is a delightful blend of entertainment and education that provides
						endless opportunities for learning and discovery.</p> <p class="mb-2">This charming story is a wonderful testament to the beauty of nature and the joy that
						gardening can bring.</p> <p class="pt-3 text-shadow-black-xs text-black">Add Hunnie Bunny\u2019s Garden to your child\u2019s library today!</p></div></a></div> <div class="p-4 basis-full md:basis-5/12 flex flex-col justify-start items-center"><div class="md:mt-[70px] xl:mt-[90px] text-center text-black text-xl lg:text-2xl xl:text-3xl font-normal mb-10" data-svelte-h="svelte-118b3i3">Release Date <mark class="px-2 bg-[#B9D6B8] rounded">August 15, 2023</mark></div> ${validate_component(ButtonAmazon, "ButtonAmazon").$$render($$result, {}, {}, {})} ${validate_component(CldImage, "CldImage").$$render(
        $$result,
        {
          width: 1420,
          height: "100%",
          aspectRatio: 2100 / 1500,
          style: "scale:1.25",
          src: "hunnie-bunny-reading-book",
          alt: "hunnie bunny reading",
          class: "mt-10"
        },
        {},
        {}
      )}</div></div></section> <section class="w-full font-[Itim]"><div class="bg-[rgba(0,102,204,0.44)] p-2.5 flex flex-row items-center justify-between w-full relative">${validate_component(CldImage, "CldImage").$$render(
        $$result,
        {
          width: 472,
          height: "100%",
          aspectRatio: 2100 / 1500,
          class: "hidden sm:flex col-span-3 !max-w-[20%] !h-fit   animate-[rotateSlow_1s_ease-in_infinite]",
          src: "mr-squirrel-sitting",
          alt: "Mr. Frog sitting"
        },
        {},
        {}
      )} <div class="flex flex-row gap-2.5 items-center justify-center col-span-6 m-auto" data-svelte-h="svelte-rv2nkz"><div class="flex flex-col gap-0 items-center justify-start"><div class="text-gray-900 text-center relative self-stretch"><span><p class="text-xl md:text-2xl lg:text-3xl text-normal text-shadow-sm mb-5">Coming Soon!</p> <div class="mt-30"><span class="md:text-xl lg:text-2xl">Hunnie Bunny\u2019s Garden Mystery
								<br>
								Hunnie Bunny\u2019s Special Gift
								<br>
								Hunnie Bunny\u2019s Christmas Wish</span></div></span></div></div></div> ${validate_component(CldImage, "CldImage").$$render(
        $$result,
        {
          width: 382,
          height: "100%",
          aspectRatio: 252 / 191,
          class: "hidden sm:flex col-span-3 !max-w-[20%] !h-fit animate-[bouncefrog_1s_ease-in_infinite]",
          src: "mr-frog-sitting",
          alt: "Mr. Frog sitting"
        },
        {},
        {}
      )}</div> </section>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page_1
});
var Page_1;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_page_svelte();
    Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Page, "Page").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    imports4 = ["_app/immutable/nodes/3.05ca9a8f.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/nodes/6.87ebb84f.js", "_app/immutable/chunks/navigation.f585b75f.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/chunks/ButtonAmazon.2dbe8e11.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/CldImage.0f5e97b0.js"];
    stylesheets4 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/about/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page2
});
var Page2;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/about/_page.svelte.js"() {
    init_ssr();
    init_CldImage();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-19wrl6u_START -->${$$result.title = `<title>About Simple Reads Books</title>`, ""}<!-- HEAD_svelte-19wrl6u_END -->`, ""} <article class="prose prose-lg sm:prose-xl md:prose-2xl w-full m-auto max-w-4xl p-2 md:p-0 pt-5 md:pt-8"><h1 class="text-center font-bold text-5xl sm:text-6xl md:text-7xl" data-svelte-h="svelte-10100qf">About Us</h1> <div>${validate_component(CldImage, "CldImage").$$render(
        $$result,
        {
          width: 896,
          height: "100%",
          aspectRatio: 2956 / 4016,
          class: "sm:float-right sm:rounded-bl-[75px] align-bottom rounded-br-[50px] rounded-bl-[50px] sm:!w-fit !max-h-[50vh] !object-contain",
          src: "author-portrait-photo",
          alt: "Author portrait"
        },
        {},
        {}
      )} <p class="font-medium -mt-[30px]" data-svelte-h="svelte-15jehfs">Welcome to Simple Reads Books!<br></p> <p class="font-medium" data-svelte-h="svelte-1sbrp6n">My name is Deborah Martin and I am the author of the Hunnie Bunny book series.</p> <p data-svelte-h="svelte-hvq6vx">I have always enjoyed writing children\u2019s stories and decided to finally publish Hunnie Bunny\u2019s
			Garden after my grandson\u2019s birth In August of 2022. Even though I wrote Hunnie Bunny\u2019s Garden
			in 1985 when my son was two years old, I never forgot about the story and recently was able to
			find the perfect illustrator to bring the story to life.</p> <p data-svelte-h="svelte-4w1nde">Growing up in Roanoke, Virginia, we had lots of pets, including cats, dogs, bunnies, birds and
			fish, all at the same time. So, it was natural for me to write about animals as I grew older.
			I believe that children learn empathy, respect and responsibility when pets are part of the
			family.</p> <p data-svelte-h="svelte-epi3fx">Horses have always been my first love and true passion, and I was fortunate to buy my first
			horse when I was in college. Some of my best years were spent showing my thoroughbred mare in
			hunter shows.</p> <p data-svelte-h="svelte-155rnqi">When I moved to California, I gave up riding to raise my family and didn\u2019t buy another horse
			until our son went off to college. I now have three horses, a chestnut Appendix Quarter horse
			gelding named Crimson Sky, a black German warmblood gelding named San Fransisko, and a bay
			Oldenburg gelding named Santana. All three are trained in dressage and have done extremely
			well at shows with their professional rider.</p> <p data-svelte-h="svelte-45l6bh">Besides my horses, I have two other four-legged children: a fifteen-year-old Bluepoint
			Balinese cat named Zoie (who is quite the diva in our house) and an eight-year-old Bluepoint
			Birman/Siamese mix named Rascal (who definitely lives up to his name). They are wonderful
			companions, and my home wouldn\u2019t be the same without them!</p> <p data-svelte-h="svelte-13xn0hy">I hope you will join the Simple Reads Books community and share my books with your family and
			friends. Enjoy!</p> <h2 data-svelte-h="svelte-2gijk7">Mission Statement</h2> <p data-svelte-h="svelte-1ovthg3">Simple Reads Books is dedicated to presenting children\u2019s stories with a positive message using
			colorful illustrations to build self-esteem and a love of animals and nature.</p></div></article>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default);
    imports5 = ["_app/immutable/nodes/4.902cff0a.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/CldImage.0f5e97b0.js", "_app/immutable/chunks/spread.8a54911c.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/contact/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page3
});
var Label, Textarea, CheckSolid, PenSolid, Page3;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/contact/_page.svelte.js"() {
    init_ssr();
    init_Indicator_svelte_svelte_type_style_lang();
    init_tailwind_merge();
    init_Modal();
    Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelClass;
      let $$restProps = compute_rest_props($$props, ["color", "defaultClass", "show"]);
      let { color = "gray" } = $$props;
      let { defaultClass = "text-sm font-medium block" } = $$props;
      let { show = true } = $$props;
      let node;
      const colorClasses = {
        gray: "text-gray-900 dark:text-gray-300",
        green: "text-green-700 dark:text-green-500",
        red: "text-red-700 dark:text-red-500",
        disabled: "text-gray-400 dark:text-gray-500"
      };
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
        $$bindings.defaultClass(defaultClass);
      if ($$props.show === void 0 && $$bindings.show && show !== void 0)
        $$bindings.show(show);
      {
        {
          color = color;
        }
      }
      labelClass = twMerge(defaultClass, colorClasses[color], $$props.class);
      return `${show ? ` <label${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(labelClass)
          }
        ],
        {}
      )}${add_attribute("this", node, 0)}>${slots.default ? slots.default({}) : ``}</label>` : `${slots.default ? slots.default({}) : ``}`} `;
    });
    Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["value", "wrappedClass", "unWrappedClass", "innerWrappedClass"]);
      let $$slots = compute_slots(slots);
      const background = getContext("background");
      let { value = void 0 } = $$props;
      let { wrappedClass = "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0" } = $$props;
      let { unWrappedClass = "p-2.5 text-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500" } = $$props;
      let { innerWrappedClass = "py-2 px-4 bg-white dark:bg-gray-800" } = $$props;
      let wrapped;
      let wrapperClass;
      let textareaClass;
      const headerClass = (header) => twMerge(header ? "border-b" : "border-t", "py-2 px-3 border-gray-200 dark:border-gray-600");
      let innerWrapperClass;
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.wrappedClass === void 0 && $$bindings.wrappedClass && wrappedClass !== void 0)
        $$bindings.wrappedClass(wrappedClass);
      if ($$props.unWrappedClass === void 0 && $$bindings.unWrappedClass && unWrappedClass !== void 0)
        $$bindings.unWrappedClass(unWrappedClass);
      if ($$props.innerWrappedClass === void 0 && $$bindings.innerWrappedClass && innerWrappedClass !== void 0)
        $$bindings.innerWrappedClass(innerWrappedClass);
      wrapped = $$slots.header || $$slots.footer;
      wrapperClass = twMerge(
        "w-full rounded-lg",
        background ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700",
        "text-gray-900 dark:placeholder-gray-400 dark:text-white ",
        "border border-gray-200 dark:border-gray-600",
        $$props.class
      );
      textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);
      innerWrapperClass = twMerge(innerWrappedClass, $$slots.footer ? "rounded-b-lg" : "", $$slots.header ? "rounded-t-lg" : "");
      return `${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: wrapperClass }, {}, {
        default: () => {
          return `${$$slots.header ? `<div${add_attribute("class", headerClass(true), 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} ${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: innerWrapperClass }, {}, {
            default: () => {
              return `<textarea${spread(
                [
                  escape_object($$restProps),
                  {
                    class: escape_attribute_value(textareaClass)
                  }
                ],
                {}
              )}>${escape(value || "")}</textarea>`;
            }
          })} ${$$slots.footer ? `<div${add_attribute("class", headerClass(false), 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
        }
      })} `;
    });
    CheckSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
      let { size = "md" } = $$props;
      let { role = "img" } = $$props;
      const sizes = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
      };
      let { ariaLabel = "check solid" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { fill: "currentColor" },
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
          },
          { role: escape_attribute_value(role) },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          { viewBox: "0 0 17 12" }
        ],
        {}
      )}><path fill="currentColor" d="M5.667 11.875h-.015a1 1 0 0 1-.714-.314L.272 6.6a1 1 0 1 1 1.456-1.372l3.959 4.207 8.6-8.643a1 1 0 1 1 1.418 1.41l-9.33 9.378a.991.991 0 0 1-.708.295Z"></path></svg> `;
    });
    PenSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
      let { size = "md" } = $$props;
      let { role = "img" } = $$props;
      const sizes = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
      };
      let { ariaLabel = "pen solid" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { fill: "currentColor" },
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
          },
          { role: escape_attribute_value(role) },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          { viewBox: "0 0 20 20" }
        ],
        {}
      )}><path fill="currentColor" d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"></path></svg> `;
    });
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isEmailValid;
      let isSubjectValid;
      let isMessageValid;
      let isFormValid;
      const form = { email: "", subject: "", message: "" };
      const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
      };
      let confirmModal = false;
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        isEmailValid = isValidEmail(form.email);
        isSubjectValid = form.subject.length > 3;
        isMessageValid = form.message.length > 5;
        isFormValid = isEmailValid && isSubjectValid && isMessageValid;
        $$rendered = `${validate_component(Modal, "Modal").$$render(
          $$result,
          {
            size: "xs",
            autoclose: true,
            open: confirmModal
          },
          {
            open: ($$value) => {
              confirmModal = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `<div class="text-center">${validate_component(CheckSolid, "CheckSolid").$$render(
                $$result,
                {
                  class: "mx-auto mb-4 w-14 h-14 text-green-600 dark:text-green-400"
                },
                {},
                {}
              )} <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" data-svelte-h="svelte-zjgr5a">Your message has been sent successfully.
			<br><br>
			We will get back to you soon \u{1F60A}</h3> ${validate_component(Button, "Button").$$render($$result, { color: "green", class: "mr-2" }, {}, {
                default: () => {
                  return `OK`;
                }
              })}</div>`;
            }
          }
        )} ${$$result.head += `<!-- HEAD_svelte-rg684o_START -->${$$result.title = `<title>Contact</title>`, ""}<!-- HEAD_svelte-rg684o_END -->`, ""} <section class="bg-white dark:bg-gray-900"><div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md !pt-8"><h2 class="mb-4 text-5xl sm:text-6xl md:text-7xl tracking-tight font-bold text-center text-gray-900 dark:text-white" data-svelte-h="svelte-1onfpeg">Contact Us</h2> <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl" data-svelte-h="svelte-1c50znc">Have any questions or comments? Let me know how we can help.</p> <form id="contact-form" name="contact" method="POST" class="space-y-8"><div><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" data-svelte-h="svelte-18o4z4r">Your email</label> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
          default: () => {
            return `${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "email",
                name: "email",
                placeholder: "yourname@gmail.com",
                size: "md",
                color: form.email.length === 0 ? "base" : isEmailValid ? "green" : "red",
                value: form.email
              },
              {
                value: ($$value) => {
                  form.email = $$value;
                  $$settled = false;
                }
              },
              {
                left: () => {
                  return `<svg slot="left" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>`;
                }
              }
            )}`;
          }
        })}</div> <div><label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" data-svelte-h="svelte-15spobe">Subject</label> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
          default: () => {
            return `${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "text",
                name: "subject",
                placeholder: "Subject",
                size: "md",
                color: form.subject.length === 0 ? "base" : isSubjectValid ? "green" : "red",
                value: form.subject
              },
              {
                value: ($$value) => {
                  form.subject = $$value;
                  $$settled = false;
                }
              },
              {
                left: () => {
                  return `${validate_component(PenSolid, "PenSolid").$$render($$result, { slot: "left", class: "w-5 h-5" }, {}, {})}`;
                }
              }
            )}`;
          }
        })}</div> <div class="sm:col-span-2"><label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" data-svelte-h="svelte-1tpugrs">Your message</label> ${validate_component(Textarea, "Textarea").$$render(
          $$result,
          {
            type: "text",
            name: "message",
            id: "message",
            rows: "6",
            placeholder: "Leave a comment...",
            value: form.message
          },
          {
            value: ($$value) => {
              form.message = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div> <button type="submit"${add_attribute("class", "py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 " + (!isFormValid && "opacity-40"), 0)} color="primary" ${!isFormValid ? "disabled" : ""}>Send message</button></form></div></section>`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default);
    imports6 = ["_app/immutable/nodes/5.5615251c.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/Modal.33e41680.js", "_app/immutable/chunks/CloseButton.c40e06a6.js"];
    stylesheets6 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index7 = 6;
    component7 = async () => component_cache7 ?? (component_cache7 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports7 = ["_app/immutable/nodes/6.87ebb84f.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/navigation.f585b75f.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/chunks/ButtonAmazon.2dbe8e11.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/CldImage.0f5e97b0.js"];
    stylesheets7 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/privacy/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page4
});
var h2Class, h3Class, pClass, Page4;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/privacy/_page.svelte.js"() {
    init_ssr();
    init_ButtonBack();
    h2Class = "text-gray-900 text-2xl font-bold";
    h3Class = "text-gray-900 text-xl font-semibold pb-0.5 leading-normal";
    pClass = "text-gray-500 text-sm font-normal leading-normal";
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-8dio08_START -->${$$result.title = `<title>Privacy</title>`, ""}<!-- HEAD_svelte-8dio08_END -->`, ""} <div class="max-w-2xl m-auto mb-5"><section class="w-full flex flex-col justify-center items-center my-10"><h1 class="text-4xl font-extrabold" data-svelte-h="svelte-1nh32uq">Privacy Policy</h1> <h6 class="text-gray-500" data-svelte-h="svelte-1lv66r3">Last updated on July 26th, 2023</h6> ${validate_component(ButtonBack, "ButtonBack").$$render($$result, {}, {}, {})}</section> <p class="font-normal text-gray-900 pb-5" data-svelte-h="svelte-r2h0nv">At <a href="simplereadsbooks.com" class="text-blue-400">simplereadsbooks.com</a>, we take your
		privacy seriously. This Privacy Policy outlines the types of personal information we collect
		from visitors to our website and how we use, disclose, and protect that information.
		<br><br>
		By accessing or using simplereadsbooks.com, you consent to the collection, use, and disclosure of
		your personal information in accordance with this policy.</p> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>1. Information We Collect</h2> <div class="pb-2"><div class="pl-5"><h3${add_attribute("class", h3Class, 0)}>1.1 Personal Information</h3> <p${add_attribute("class", pClass, 0)}>We may collect certain personally identifiable information, such as your name, email
					address, and any additional information you voluntarily provide to us through contact
					forms or subscription forms.</p> <h3${add_attribute("class", h3Class, 0)}>1.2 Log Files</h3> <p${add_attribute("class", pClass, 0)}>Like many other websites, we automatically gather certain non-personal information about
					your visit. This information may include your IP address, browser type, operating system,
					referring website, pages visited, and the date and time of your visit. This data is used
					to analyze trends, administer the site, and track user engagement, but it does not
					personally identify you.</p></div></div></div> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>2. Use of Collected Information</h2> <div class="pb-2"><div class="pl-5"><h3${add_attribute("class", h3Class, 0)}>2.1 Personal Information</h3> <p${add_attribute("class", pClass, 0)}>We may use your personal information to respond to your inquiries, provide the services
					you request, and communicate with you about our website, products, and services. We may
					also use this information to send you promotional materials or newsletters, but you will
					always have the option to opt-out of receiving such communications.</p> <h3${add_attribute("class", h3Class, 0)}>2.2 Log Files</h3> <p${add_attribute("class", pClass, 0)}>The non-personal information collected is used to improve our website&#39;s content and
					functionality, enhance user experience, and analyze user trends. It may also be used for
					troubleshooting purposes and to ensure the security and integrity of our website.</p></div></div></div> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>3. Sharing of Collected Information</h2> <div class="pb-2"><div class="pl-5"><h3${add_attribute("class", h3Class, 0)}>3.1 Third-Party Service Providers</h3> <p${add_attribute("class", pClass, 0)}>We may share your personal information with third-party service providers who assist us in
					operating our website, conducting our business, or providing services to you. These
					service providers have access to your personal information only as necessary to perform
					their functions and are obligated to protect its confidentiality.</p> <h3${add_attribute("class", h3Class, 0)}>3.2 Legal Requirements</h3> <p${add_attribute("class", pClass, 0)}>We may disclose your personal information if required to do so by law or if we believe
					that such action is necessary to comply with legal obligations, protect and defend our
					rights or property, prevent fraud, or ensure the safety of our users.</p></div></div></div> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>4. Security</h2> <p${add_attribute("class", pClass, 0)}>We implement reasonable security measures to protect your personal information from
			unauthorized access, disclosure, alteration, or destruction. However, no data transmission
			over the internet or electronic storage method is 100% secure, and we cannot guarantee
			absolute security.</p></div> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>5. External Links</h2> <p${add_attribute("class", pClass, 0)}>Our website may contain links to third-party websites. We have no control over the content,
			privacy practices, or security of these websites. Therefore, we encourage you to review the
			privacy policies of any third-party sites you visit.</p></div> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>6. Children&#39;s Privacy</h2> <p${add_attribute("class", pClass, 0)}>Our website is not intended for individuals under the age of 13. We do not knowingly collect
			personal information from children. If you are a parent or guardian and believe that your
			child has provided us with personal information, please contact us, and we will promptly
			remove that information from our records.</p></div> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>7. Changes to the Privacy Policy</h2> <p${add_attribute("class", pClass, 0)}>We reserve the right to modify or update this Privacy Policy at any time. Any changes will be
			effective immediately upon posting the revised policy on our website. We encourage you to
			review this policy periodically for any updates.</p></div> <div class="p-1"><h2${add_attribute("class", h2Class, 0)}>8. Contact Us</h2> <p${add_attribute("class", pClass, 0)}>If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy
			practices, please contact us at <a href="mailto:debbie@simplereadsbooks.com" class="text-blue-400" data-svelte-h="svelte-1hee0it">debbie@simplereadsbooks.com</a>.</p></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => component_cache8 ?? (component_cache8 = (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default);
    imports8 = ["_app/immutable/nodes/7.24677d2d.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/ButtonBack.ec23fa3b.js", "_app/immutable/chunks/navigation.f585b75f.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/spread.8a54911c.js"];
    stylesheets8 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/chunks/Badge.js
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
var baseClass, Badge;
var init_Badge = __esm({
  ".svelte-kit/output/server/chunks/Badge.js"() {
    init_ssr();
    init_tailwind_merge();
    init_CloseButton();
    baseClass = "font-medium inline-flex items-center justify-center px-2.5 py-0.5";
    Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["color", "large", "dismissable"]);
      let { color = "primary" } = $$props;
      let { large = false } = $$props;
      let { dismissable = false } = $$props;
      const colors = {
        primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
        blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
        purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
        none: ""
      };
      const borderedColors = {
        primary: "bg-primary-100 text-primary-800 dark:bg-gray-700 dark:text-primary-400 border-primary-400 dark:border-primary-400",
        blue: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border-blue-400 dark:border-blue-400",
        dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border-gray-500 dark:border-gray-500",
        red: "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-400 dark:border-red-400",
        green: "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border-green-400 dark:border-green-400",
        yellow: "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-300",
        indigo: "bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border-indigo-400 dark:border-indigo-400",
        purple: "bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border-purple-400 dark:border-purple-400",
        pink: "bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border-pink-400 dark:border-pink-400",
        none: ""
      };
      const hoverColors = {
        primary: "hover:bg-primary-200",
        blue: "hover:bg-blue-200",
        dark: "hover:bg-gray-200",
        red: "hover:bg-red-200",
        green: "hover:bg-green-200",
        yellow: "hover:bg-yellow-200",
        indigo: "hover:bg-indigo-200",
        purple: "hover:bg-purple-200",
        pink: "hover:bg-pink-200",
        none: ""
      };
      let badgeClass;
      let open = true;
      const dispatch = createEventDispatcher();
      const close = (e) => {
        e.stopPropagation();
        open = false;
        dispatch("dismiss");
      };
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.large === void 0 && $$bindings.large && large !== void 0)
        $$bindings.large(large);
      if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0)
        $$bindings.dismissable(dismissable);
      {
        {
          if (dismissable)
            $$restProps.transition = $$restProps.transition ?? fade;
        }
      }
      badgeClass = twMerge(
        baseClass,
        large ? "text-sm" : "text-xs",
        $$restProps.border ? `border ${borderedColors[color]}` : colors[color],
        $$restProps.href && hoverColors[color],
        $$restProps.rounded ? "rounded-full" : "rounded",
        $$props.class
      );
      return `${open ? `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, $$restProps, { class: badgeClass }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``} ${dismissable ? `${slots["close-button"] ? slots["close-button"]({ close }) : ` ${validate_component(CloseButton, "CloseButton").$$render(
            $$result,
            {
              color,
              size: large ? "sm" : "xs",
              name: "Remove badge",
              class: "ml-1.5 -mr-1.5"
            },
            {},
            {}
          )} `}` : ``}`;
        }
      })}` : ``} `;
    });
  }
});

// .svelte-kit/output/server/entries/pages/products/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page5
});
var Card, Heading, Span, AvailableInFormat, Page5;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/products/_page.svelte.js"() {
    init_ssr();
    init_tailwind_merge();
    init_CloseButton();
    init_Indicator_svelte_svelte_type_style_lang();
    init_ButtonAmazon();
    init_Badge();
    init_CldImage();
    Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let innerPadding;
      let $$restProps = compute_rest_props($$props, ["href", "horizontal", "reverse", "img", "padding", "size"]);
      let { href = void 0 } = $$props;
      let { horizontal = false } = $$props;
      let { reverse = false } = $$props;
      let { img = void 0 } = $$props;
      let { padding = "lg" } = $$props;
      let { size = "sm" } = $$props;
      const paddings = {
        none: "p-0",
        sm: "p-4 sm:p-6 md:p-8",
        md: "p-4 sm:p-5",
        lg: "p-4 sm:p-6",
        xl: "p-4 sm:p-8"
      };
      const sizes = {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-screen-xl"
      };
      let cardClass;
      let imgClass;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
        $$bindings.horizontal(horizontal);
      if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
        $$bindings.reverse(reverse);
      if ($$props.img === void 0 && $$bindings.img && img !== void 0)
        $$bindings.img(img);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      innerPadding = paddings[padding];
      cardClass = twMerge(
        "flex",
        sizes[size],
        reverse ? "flex-col-reverse" : "flex-col",
        horizontal && (reverse ? "md:flex-row-reverse md:max-w-xl" : "md:flex-row md:max-w-xl"),
        href && "hover:bg-gray-100 dark:hover:bg-gray-700",
        !img && innerPadding,
        $$props.class
      );
      imgClass = twMerge(reverse ? "rounded-b-lg" : "rounded-t-lg", horizontal && "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none", horizontal && (reverse ? "md:rounded-r-lg" : "md:rounded-l-lg"));
      return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { tag: href ? "a" : "div" }, { rounded: true }, { shadow: true }, { border: true }, { href }, $$restProps, { class: cardClass }), {}, {
        default: () => {
          return `${img ? `<img${add_attribute("class", imgClass, 0)}${add_attribute("src", img, 0)} alt=""> <div${add_attribute("class", innerPadding, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
        }
      })} `;
    });
    Heading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["tag", "color", "customSize"]);
      let { tag = "h1" } = $$props;
      let { color = "text-gray-900 dark:text-white" } = $$props;
      let { customSize = "" } = $$props;
      const textSizes = {
        h1: "text-5xl font-extrabold",
        h2: "text-4xl font-bold",
        h3: "text-3xl font-bold",
        h4: "text-2xl font-bold",
        h5: "text-xl font-bold",
        h6: "text-lg font-bold"
      };
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.customSize === void 0 && $$bindings.customSize && customSize !== void 0)
        $$bindings.customSize(customSize);
      return `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            escape_object($$restProps),
            {
              class: escape_attribute_value(twMerge(customSize ? customSize : textSizes[tag], color, "w-full", $$props.class))
            }
          ],
          {}
        )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)} `;
    });
    Span = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "italic",
        "underline",
        "linethrough",
        "uppercase",
        "gradient",
        "highlight",
        "highlightClass",
        "decorationClass",
        "gradientClass"
      ]);
      let { italic = false } = $$props;
      let { underline = false } = $$props;
      let { linethrough = false } = $$props;
      let { uppercase = false } = $$props;
      let { gradient = false } = $$props;
      let { highlight = false } = $$props;
      let { highlightClass = "text-blue-600 dark:text-blue-500" } = $$props;
      let { decorationClass = "decoration-2 decoration-blue-400 dark:decoration-blue-600" } = $$props;
      let { gradientClass = "text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400" } = $$props;
      let underlineClass = twMerge("underline", decorationClass);
      let classSpan = twMerge(
        italic && "italic",
        underline && underlineClass,
        linethrough && "line-through",
        uppercase && "uppercase",
        gradient ? gradientClass : "font-semibold text-gray-900 dark:text-white",
        highlight && highlightClass,
        $$props.class
      );
      if ($$props.italic === void 0 && $$bindings.italic && italic !== void 0)
        $$bindings.italic(italic);
      if ($$props.underline === void 0 && $$bindings.underline && underline !== void 0)
        $$bindings.underline(underline);
      if ($$props.linethrough === void 0 && $$bindings.linethrough && linethrough !== void 0)
        $$bindings.linethrough(linethrough);
      if ($$props.uppercase === void 0 && $$bindings.uppercase && uppercase !== void 0)
        $$bindings.uppercase(uppercase);
      if ($$props.gradient === void 0 && $$bindings.gradient && gradient !== void 0)
        $$bindings.gradient(gradient);
      if ($$props.highlight === void 0 && $$bindings.highlight && highlight !== void 0)
        $$bindings.highlight(highlight);
      if ($$props.highlightClass === void 0 && $$bindings.highlightClass && highlightClass !== void 0)
        $$bindings.highlightClass(highlightClass);
      if ($$props.decorationClass === void 0 && $$bindings.decorationClass && decorationClass !== void 0)
        $$bindings.decorationClass(decorationClass);
      if ($$props.gradientClass === void 0 && $$bindings.gradientClass && gradientClass !== void 0)
        $$bindings.gradientClass(gradientClass);
      return `<span${spread([escape_object($$restProps), { class: escape_attribute_value(classSpan) }], {})}>${slots.default ? slots.default({}) : ``}</span> `;
    });
    AvailableInFormat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { showText = true } = $$props;
      let { color = "green" } = $$props;
      let { divClass = "" } = $$props;
      if ($$props.showText === void 0 && $$bindings.showText && showText !== void 0)
        $$bindings.showText(showText);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
        $$bindings.divClass(divClass);
      return `<div${add_attribute("class", divClass, 0)}>${showText ? `<span class="text-xs font-light align-middle" data-svelte-h="svelte-1s6rzpl">Available in</span>` : ``} ${validate_component(Badge, "Badge").$$render($$result, { color }, {}, {
        default: () => {
          return `Hardcover`;
        }
      })} ${validate_component(Badge, "Badge").$$render($$result, { color }, {}, {
        default: () => {
          return `Paperback`;
        }
      })} ${validate_component(Badge, "Badge").$$render($$result, { color }, {}, {
        default: () => {
          return `Kindle`;
        }
      })}</div>`;
    });
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      const { products } = data;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-tdgbx4_START -->${$$result.title = `<title>Books &amp; Products</title>`, ""}<!-- HEAD_svelte-tdgbx4_END -->`, ""} <h1 class="text-5xl sm:text-6xl md:text-7xl text-center font-bold mt-4 md:mt-8" data-svelte-h="svelte-jlnj2x">Books</h1> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-4 md:gap-8 justify-items-center mt-4 sm:mt-6 md:mt-10 mx-3 sm:mx-4 md:mx-6">${each(products, (product, i) => {
        return `${validate_component(Card, "Card").$$render(
          $$result,
          {
            padding: "none",
            class: "h-fit " + (i > 0 ? "opacity-40" : "")
          },
          {},
          {
            default: () => {
              return `<a${add_attribute("href", "/products/" + product.id, 0)} class="flex justify-center items-center"><img class="rounded-t-lg object-cover w-full"${add_attribute("src", product.images[0].imgurl, 0)}${add_attribute("alt", "Product image" + i, 0)} loading="lazy"></a> <div class="px-5 py-5 pt-2"><h1 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">${escape(product.title)} ${validate_component(AvailableInFormat, "AvailableInFormat").$$render(
                $$result,
                {
                  divClass: "pt-0 -mt-[8px]",
                  showText: false
                },
                {},
                {}
              )}</h1> <p class="text-sm text-gray-400 mt-1.5 sm:mt-3">${escape(product.description.split("\n")[0])}</p> <div class="flex justify-between items-center mt-5"><span class="text-xl font-medium text-gray-900 dark:text-white">$${escape(product.price.toLocaleString("en-US", { style: "currency", currency: "USD" }))}</span> ${validate_component(ButtonAmazon, "ButtonAmazon").$$render($$result, { size: "xs" }, {}, {})} </div></div> `;
            }
          }
        )}`;
      })}</div> <h1 class="text-5xl sm:text-6xl md:text-7xl text-center font-bold mt-4 md:mt-10 mb-4 lg:mb-8" data-svelte-h="svelte-1ongo0u">Products</h1> ${validate_component(Heading, "Heading").$$render(
        $$result,
        {
          tag: "h1",
          class: "mb-0 animate-bounce text-center",
          customSize: "text-2xl font-extrabold sm:text-4xl md:text-5xl"
        },
        {},
        {
          default: () => {
            return `${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
              default: () => {
                return `Coming soon...`;
              }
            })}`;
          }
        }
      )} ${validate_component(CldImage, "CldImage").$$render(
        $$result,
        {
          width: 2100,
          height: "100%",
          aspectRatio: 2100 / 1500,
          src: "hunnie-bunny-reading-a-book-to-mr-squirrel",
          quality: 80,
          class: "w-full !p-1 sm:!p-8 md:!p-24 md:!-mb-20 block !-mt-4 sm:!-mt-8 md:!-mt-24 !mb-0 !pb-0 !h-[100%] !object-contain"
        },
        {},
        {}
      )}`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    index9 = 8;
    component9 = async () => component_cache9 ?? (component_cache9 = (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default);
    imports9 = ["_app/immutable/nodes/8.487b3361.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/Badge.533cf40a.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/CloseButton.c40e06a6.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/index.d0fa776d.js", "_app/immutable/chunks/ButtonAmazon.2dbe8e11.js", "_app/immutable/chunks/CldImage.0f5e97b0.js"];
    stylesheets9 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/entries/pages/products/_id_/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page6
});
function getProductById(products, id) {
  return products.find((product) => product.id === id);
}
var Slide, css$1, Thumbnail, Caption, css, Indicator, Carousel, ExclamationCircleSolid, Page6;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/products/_id_/_page.svelte.js"() {
    init_ssr();
    init_Badge();
    init_tailwind_merge();
    init_Indicator_svelte_svelte_type_style_lang();
    init_ButtonAmazon();
    init_stores();
    init_ButtonBack();
    init_helpers();
    init_CldImage();
    Slide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { image = "" } = $$props;
      let { altTag = "" } = $$props;
      let { attr = "" } = $$props;
      let { slideClass = "" } = $$props;
      let { imgClass = "" } = $$props;
      if ($$props.image === void 0 && $$bindings.image && image !== void 0)
        $$bindings.image(image);
      if ($$props.altTag === void 0 && $$bindings.altTag && altTag !== void 0)
        $$bindings.altTag(altTag);
      if ($$props.attr === void 0 && $$bindings.attr && attr !== void 0)
        $$bindings.attr(attr);
      if ($$props.slideClass === void 0 && $$bindings.slideClass && slideClass !== void 0)
        $$bindings.slideClass(slideClass);
      if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
        $$bindings.imgClass(imgClass);
      return `<div${add_attribute("class", slideClass, 0)}><img${add_attribute("src", image, 0)}${add_attribute("alt", altTag, 0)}${add_attribute("title", attr, 0)}${add_attribute("class", imgClass, 0)}></div> `;
    });
    css$1 = {
      code: ".active.svelte-1o2b5yq{opacity:1}",
      map: null
    };
    Thumbnail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { thumbImg = "" } = $$props;
      let { altTag = "" } = $$props;
      let { titleLink = "" } = $$props;
      let { id } = $$props;
      let { thumbWidth = 100 } = $$props;
      let { selected = false } = $$props;
      let { thumbClass = "" } = $$props;
      let { thumbBtnClass = "" } = $$props;
      if ($$props.thumbImg === void 0 && $$bindings.thumbImg && thumbImg !== void 0)
        $$bindings.thumbImg(thumbImg);
      if ($$props.altTag === void 0 && $$bindings.altTag && altTag !== void 0)
        $$bindings.altTag(altTag);
      if ($$props.titleLink === void 0 && $$bindings.titleLink && titleLink !== void 0)
        $$bindings.titleLink(titleLink);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.thumbWidth === void 0 && $$bindings.thumbWidth && thumbWidth !== void 0)
        $$bindings.thumbWidth(thumbWidth);
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.thumbClass === void 0 && $$bindings.thumbClass && thumbClass !== void 0)
        $$bindings.thumbClass(thumbClass);
      if ($$props.thumbBtnClass === void 0 && $$bindings.thumbBtnClass && thumbBtnClass !== void 0)
        $$bindings.thumbBtnClass(thumbBtnClass);
      $$result.css.add(css$1);
      return ` <button aria-label="Click to view image" class="${escape(null_to_empty(thumbBtnClass), true) + " svelte-1o2b5yq"}"><img class="${[
        escape(null_to_empty(thumbClass), true) + " svelte-1o2b5yq",
        selected ? "active" : ""
      ].join(" ").trim()}"${add_attribute("id", id.toString(), 0)}${add_attribute("src", thumbImg, 0)}${add_attribute("alt", altTag, 0)} title="${"Image from " + escape(titleLink, true)}" width="${escape(thumbWidth, true) + "%"}"></button> `;
    });
    Caption = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { caption = "" } = $$props;
      let { captionClass = "" } = $$props;
      let { pClass: pClass3 = "text-gray-900 dark:text-white" } = $$props;
      if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
        $$bindings.caption(caption);
      if ($$props.captionClass === void 0 && $$bindings.captionClass && captionClass !== void 0)
        $$bindings.captionClass(captionClass);
      if ($$props.pClass === void 0 && $$bindings.pClass && pClass3 !== void 0)
        $$bindings.pClass(pClass3);
      return `<div${add_attribute("class", captionClass, 0)}><p id="caption"${add_attribute("class", pClass3, 0)}>${escape(caption)}</p></div> `;
    });
    css = {
      code: ".active.svelte-1o2b5yq{opacity:1}",
      map: null
    };
    Indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { name: name2 = "" } = $$props;
      let { selected = false } = $$props;
      let { indicatorClass = "" } = $$props;
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
        $$bindings.name(name2);
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.indicatorClass === void 0 && $$bindings.indicatorClass && indicatorClass !== void 0)
        $$bindings.indicatorClass(indicatorClass);
      $$result.css.add(css);
      return `<button type="button" class="${[
        escape(null_to_empty(indicatorClass), true) + " svelte-1o2b5yq",
        selected ? "active" : ""
      ].join(" ").trim()}"${add_attribute("aria-label", name2, 0)}></button> `;
    });
    Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let image;
      let $$slots = compute_slots(slots);
      let { id = "default-carousel" } = $$props;
      let { showIndicators = true } = $$props;
      let { showCaptions = true } = $$props;
      let { showThumbs = true } = $$props;
      let { images } = $$props;
      let { slideControls = true } = $$props;
      let { loop = false } = $$props;
      let { duration = 2e3 } = $$props;
      let { divClass = "overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96" } = $$props;
      let divCls = twMerge(divClass, $$props.classDiv);
      let { indicatorDivClass = "flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2" } = $$props;
      let indicatorDivCls = twMerge(indicatorDivClass, $$props.classIndicatorDiv);
      let { captionClass = "h-10 bg-gray-300 dark:bg-gray-700 dark:text-white p-2 my-2 text-center" } = $$props;
      let captionCls = twMerge(captionClass, $$props.classCaption);
      let { indicatorClass = "w-3 h-3 rounded-full bg-gray-100 hover:bg-gray-300 opacity-60" } = $$props;
      let indicatorCls = twMerge(indicatorClass, $$props.classIndicator);
      let { slideClass = "bg-purple-500" } = $$props;
      let slideCls = twMerge(slideClass, $$props.classSlide);
      let { imgClass = "object-contain" } = $$props;
      let imgCls = twMerge(imgClass, $$props.classImg);
      let { thumbClass = "opacity-40" } = $$props;
      let thumbCls = twMerge(thumbClass, $$props.classThumb);
      let { thumbDivClass = "flex flex-row justify-center bg-gray-100 w-full" } = $$props;
      let thumbDivCls = twMerge(thumbDivClass, $$props.classThumbDiv);
      let { thumbBtnClass = "" } = $$props;
      let thumbBtnCls = twMerge(thumbBtnClass, $$props.classBtnThumb);
      let imageShowingIndex = 0;
      const nextSlide = () => {
        if (imageShowingIndex === images.length - 1) {
          imageShowingIndex = 0;
        } else {
          imageShowingIndex += 1;
        }
      };
      if (loop) {
        setInterval(
          () => {
            nextSlide();
          },
          duration
        );
      }
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.showIndicators === void 0 && $$bindings.showIndicators && showIndicators !== void 0)
        $$bindings.showIndicators(showIndicators);
      if ($$props.showCaptions === void 0 && $$bindings.showCaptions && showCaptions !== void 0)
        $$bindings.showCaptions(showCaptions);
      if ($$props.showThumbs === void 0 && $$bindings.showThumbs && showThumbs !== void 0)
        $$bindings.showThumbs(showThumbs);
      if ($$props.images === void 0 && $$bindings.images && images !== void 0)
        $$bindings.images(images);
      if ($$props.slideControls === void 0 && $$bindings.slideControls && slideControls !== void 0)
        $$bindings.slideControls(slideControls);
      if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
        $$bindings.loop(loop);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
        $$bindings.divClass(divClass);
      if ($$props.indicatorDivClass === void 0 && $$bindings.indicatorDivClass && indicatorDivClass !== void 0)
        $$bindings.indicatorDivClass(indicatorDivClass);
      if ($$props.captionClass === void 0 && $$bindings.captionClass && captionClass !== void 0)
        $$bindings.captionClass(captionClass);
      if ($$props.indicatorClass === void 0 && $$bindings.indicatorClass && indicatorClass !== void 0)
        $$bindings.indicatorClass(indicatorClass);
      if ($$props.slideClass === void 0 && $$bindings.slideClass && slideClass !== void 0)
        $$bindings.slideClass(slideClass);
      if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
        $$bindings.imgClass(imgClass);
      if ($$props.thumbClass === void 0 && $$bindings.thumbClass && thumbClass !== void 0)
        $$bindings.thumbClass(thumbClass);
      if ($$props.thumbDivClass === void 0 && $$bindings.thumbDivClass && thumbDivClass !== void 0)
        $$bindings.thumbDivClass(thumbDivClass);
      if ($$props.thumbBtnClass === void 0 && $$bindings.thumbBtnClass && thumbBtnClass !== void 0)
        $$bindings.thumbBtnClass(thumbBtnClass);
      image = images[imageShowingIndex];
      return `<div${add_attribute("id", id, 0)} class="relative"><div${add_attribute("class", divCls, 0)}>${validate_component(Slide, "Slide").$$render(
        $$result,
        {
          image: image.imgurl,
          altTag: image.name,
          attr: image.attribution,
          slideClass: slideCls,
          imgClass: imgCls
        },
        {},
        {}
      )}</div> ${showIndicators ? ` <div${add_attribute("class", indicatorDivCls, 0)}>${each(images, ({ id: id2, imgurl, name: name2, attribution }) => {
        return `${validate_component(Indicator, "Indicator").$$render(
          $$result,
          {
            name: name2,
            selected: imageShowingIndex === id2,
            indicatorClass: indicatorCls
          },
          {},
          {}
        )}`;
      })}</div>` : ``} ${slideControls ? ` <button type="button" class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev><span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">${$$slots.previous ? `${slots.previous ? slots.previous({}) : ``}` : `<svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`} <span class="hidden" data-svelte-h="svelte-15eom22">Previous</span></span></button> <button type="button" class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next><span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">${$$slots.next ? `${slots.next ? slots.next({}) : ``}` : `<svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`} <span class="hidden" data-svelte-h="svelte-1cuepzi">Next</span></span></button>` : ``}</div> ${showCaptions ? `${validate_component(Caption, "Caption").$$render(
        $$result,
        {
          caption: images[imageShowingIndex].name,
          captionClass: captionCls
        },
        {},
        {}
      )}` : ``} ${showThumbs ? `<div${add_attribute("class", thumbDivCls, 0)}>${each(images, ({ id: id2, imgurl, name: name2, attribution }) => {
        return `${validate_component(Thumbnail, "Thumbnail").$$render(
          $$result,
          {
            thumbClass: thumbCls,
            thumbBtnClass: thumbBtnCls,
            thumbImg: imgurl,
            altTag: name2,
            titleLink: attribution,
            id: id2,
            selected: imageShowingIndex === id2
          },
          {},
          {}
        )}`;
      })}</div>` : ``} `;
    });
    ExclamationCircleSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
      let { size = "md" } = $$props;
      let { role = "img" } = $$props;
      const sizes = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
      };
      let { ariaLabel = "exclamation circle solid" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { fill: "currentColor" },
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
          },
          { role: escape_attribute_value(role) },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          { viewBox: "0 0 20 20" }
        ],
        {}
      )}><path fill="currentColor" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"></path></svg> `;
    });
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isBook;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { data } = $$props;
      const { id } = $page.params;
      const { products } = data;
      const product = getProductById(products, id);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      isBook = product?.type === "book";
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-ucssa1_START -->${product ? `${$$result.title = `<title>${escape(product.title)}</title>`, ""}` : ``}<!-- HEAD_svelte-ucssa1_END -->`, ""} ${product ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-1 w-full justiy-center items-center justify-items-center"><div id="carousel-wrapper" class="dark m-2 sm:m-6 md:m-10">${validate_component(Carousel, "Carousel").$$render(
        $$result,
        {
          images: product.images,
          showCaptions: false,
          showIndicators: false,
          classSlide: "flex items-center justify-center h-[100%] w-[100%] !rounded-none !bg-transparent",
          classDiv: "w-[100%] !h-[300px] sm:!h-[400px] !rounded-none !bg-transparent",
          classImg: "!bg-none rounded-md animate-[fadeIn_.2s_ease-in-out_1] h-full",
          classThumb: "p-0 rounded-md shadow-xl hover:outline hover:outline-primary-500",
          classThumbDiv: "bg-transparent",
          thumbBtnClass: "m-2",
          indicatorDivClass: "bg-gray-500",
          indicatorClass: "bg-purple-500"
        },
        {},
        {}
      )}</div> <div class="bg-gray-100 p-8 sm:p-10 md:p-16 prose prose-sm sm:prose-xs sm:m-5 md:m-8 lg:m-10"><h1 class="text-2xl sm:text-3xl">${escape(product.title)}</h1> ${isBook ? `<div class="pt-0 mt-[-20px]"><span class="text-xs font-light align-middle" data-svelte-h="svelte-1s6rzpl">Available in</span> ${validate_component(Badge, "Badge").$$render($$result, { color: "green" }, {}, {
        default: () => {
          return `Hardcover`;
        }
      })} ${validate_component(Badge, "Badge").$$render($$result, { color: "green" }, {}, {
        default: () => {
          return `Paperback`;
        }
      })} ${validate_component(Badge, "Badge").$$render($$result, { color: "green" }, {}, {
        default: () => {
          return `Kindle`;
        }
      })}</div>` : ``} <!-- HTML_TAG_START -->${wrapTextInParagraphTags(product.description)}<!-- HTML_TAG_END --> <h2 class="p-0 mt-[5px]">$${escape(product.price.toLocaleString("en-US", { style: "currency", currency: "USD" }))}</h2> ${validate_component(ButtonAmazon, "ButtonAmazon").$$render($$result, { fullWidth: true }, {}, {})}</div></div>` : `<div class="text-center pt-2"><h1 class="text-3xl sm:text-4xl text-center text-red-500 flex flex-row justify-center items-center">${validate_component(ExclamationCircleSolid, "ExclamationCircleSolid").$$render(
        $$result,
        {
          class: "inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2"
        },
        {},
        {}
      )}
			No product found</h1> <h6 class="text-md text-center" data-svelte-h="svelte-rwseym">We couldn&#39;t find a match based on the provided product ID.</h6> ${validate_component(ButtonBack, "ButtonBack").$$render($$result, {}, {}, {})}</div> ${validate_component(CldImage, "CldImage").$$render(
        $$result,
        {
          width: 2100,
          height: "100%",
          aspectRatio: 2100 / 1500,
          src: "hunnie-bunny-reading-a-book-to-mr-squirrel",
          quality: 80,
          class: "w-full"
        },
        {},
        {}
      )}`}`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  fonts: () => fonts10,
  imports: () => imports10,
  index: () => index10,
  stylesheets: () => stylesheets10
});
var index10, component_cache10, component10, imports10, stylesheets10, fonts10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    index10 = 9;
    component10 = async () => component_cache10 ?? (component_cache10 = (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default);
    imports10 = ["_app/immutable/nodes/9.057567ba.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/Badge.533cf40a.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/CloseButton.c40e06a6.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/index.d0fa776d.js", "_app/immutable/chunks/ButtonAmazon.2dbe8e11.js", "_app/immutable/chunks/stores.36d1c324.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/chunks/ButtonBack.ec23fa3b.js", "_app/immutable/chunks/navigation.f585b75f.js", "_app/immutable/chunks/CldImage.0f5e97b0.js"];
    stylesheets10 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/terms/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => Page7
});
var pClass2, Page7;
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/terms/_page.svelte.js"() {
    init_ssr();
    init_ButtonBack();
    init_Indicator_svelte_svelte_type_style_lang();
    pClass2 = "text-sm text-gray-500 font-normal leading-normal pb-2";
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-12dfn2p_START -->${$$result.title = `<title>Terms &amp; Conditions</title>`, ""}<!-- HEAD_svelte-12dfn2p_END -->`, ""} <div class="m-auto max-w-2xl mt-10"><section class="w-full flex flex-col justify-center items-center mb-10"><h1 class="text-4xl font-extrabold" data-svelte-h="svelte-2lnjzc">Terms and Conditions</h1> <h6 class="text-gray-500" data-svelte-h="svelte-1lv66r3">Last updated on July 26th, 2023</h6> ${validate_component(ButtonBack, "ButtonBack").$$render($$result, {}, {}, {})}</section> <section><h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-1qodkej">Acceptance of Terms</h1> <p${add_attribute("class", pClass2, 0)}>By accessing or using the Simple Reads Books website, you acknowledge that you have read,
			understood, and agree to be bound by these Terms and Conditions. If you do not agree to these
			terms, please refrain from using the website.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-1pgjztr">Intellectual Property</h1> <p${add_attribute("class", pClass2, 0)}>All content on the Simple Reads Books website, including but not limited to text, graphics,
			logos, images, and any other materials, is the intellectual property of Simple Reads Books and
			the author, Deborah C. Martin (hereinafter referred to as \u201Cauthor\u201D), and is protected by
			copyright laws. You may not reproduce, distribute, modify, or use any content from the website
			without the author&#39;s prior written consent.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-qjsc9e">Use of the Website</h1> <p${add_attribute("class", pClass2, 0)}>You agree to use the Simple Reads Books website only for lawful purposes and in a manner that
			does not infringe upon the rights of others or restrict or inhibit their use and enjoyment of
			the website. You shall not engage in any activity that could harm, disable, or impair the
			website or interfere with any other party&#39;s use of the website.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-1agc4a2">User-Generated Content</h1> <p${add_attribute("class", pClass2, 0)}>You may have the opportunity to contribute content to the Simple Reads Books website, such as
			comments or reviews. By submitting any user-generated content, you grant Simple Reads Books
			and the author a non-exclusive, worldwide, royalty-free, perpetual, and irrevocable right to
			use, reproduce, modify, adapt, publish, translate, distribute, and display such content in any
			media. You represent and warrant that you have the necessary rights to grant this license and
			that your content does not infringe upon any third-party rights.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-4u49ni">Links to Third-Party Websites</h1> <p${add_attribute("class", pClass2, 0)}>The Simple Reads Books website may contain links to third-party websites for your convenience
			and reference. The inclusion of any link does not imply endorsement or approval by Simple
			Reads Books or the author of the linked website. You acknowledge and agree that Simple Reads
			Books and the author are not responsible for the availability or accuracy of such third-party
			websites, and your use of them is at your own risk.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-1g3e7t4">Limitation of Liability</h1> <p${add_attribute("class", pClass2, 0)}>In no event shall Simple Reads Books or the author be liable for any direct, indirect,
			incidental, special, or consequential damages arising out of or in connection with your use of
			the website or its content. This includes, but is not limited to, any loss or damage caused by
			viruses, bugs, errors, omissions, or inaccuracies in the content or the transmission of
			information to or from the website.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-mdj4up">Indemnification</h1> <p${add_attribute("class", pClass2, 0)}>You agree to indemnify and hold harmless Simple Reads Books and the author and their
			affiliates, officers, directors, employees, and agents from any claim, demand, or damage,
			including reasonable attorneys&#39; fees, arising out of or in connection with your use of the
			Simple Reads Books website, your violation of these Terms and Conditions, or your violation of
			any rights of another party.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-17ovjkt">Modifications</h1> <p${add_attribute("class", pClass2, 0)}>Simple Reads Books and the author reserve the right to modify or update these Terms and
			Conditions at any time without prior notice. Your continued use of the website after any
			changes signifies your acceptance of the modified Terms and Conditions.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-eolwnh">Governing Law</h1> <p${add_attribute("class", pClass2, 0)}>These Terms and Conditions shall be governed by and construed in accordance with the laws of
			the State of California. Any legal action or proceeding arising out of or relating to these
			Terms and Conditions or your use of the Simple Reads Books website shall be exclusively
			brought in the courts located in Orange County, California.</p> <h1 class="text-2xl font-bold pb-0.5" data-svelte-h="svelte-uym095">Severability</h1> <p${add_attribute("class", pClass2, 0)}>If any provision of these Terms and Conditions is found to be invalid or unenforceable, the
			remaining provisions shall continue to be valid and enforceable to the fullest extent
			permitted by law.</p> <p${add_attribute("class", pClass2 + " mb-2 mt-4 text-xs", 0)}>By using the Simple Reads Books website, you acknowledge that you have read, understood, and
			agree to these Terms and Conditions. If you have any questions or concerns, please contact
			<a href="mailto:debbie@simplereadsbooks.com" class="text-blue-400" data-svelte-h="svelte-1ggi43n">debbie@simplereadsbooks.com.</a></p></section></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  fonts: () => fonts11,
  imports: () => imports11,
  index: () => index11,
  stylesheets: () => stylesheets11
});
var index11, component_cache11, component11, imports11, stylesheets11, fonts11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    index11 = 10;
    component11 = async () => component_cache11 ?? (component_cache11 = (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default);
    imports11 = ["_app/immutable/nodes/10.ff0a9344.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js", "_app/immutable/chunks/ButtonBack.ec23fa3b.js", "_app/immutable/chunks/navigation.f585b75f.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.8f059b12.js", "_app/immutable/chunks/spread.8a54911c.js"];
    stylesheets11 = ["_app/immutable/assets/Indicator.1d121e74.css"];
    fonts11 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0)
    $$bindings.data_2(data_2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${constructors[2] ? `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, form, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            }
          )}` : `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n	<meta charset="utf-8" />\n	<link\n		rel="icon"\n		href="' + assets2 + '/favicon.png"\n	/>\n\n	<link\n		rel="preconnect"\n		href="https://fonts.googleapis.com"\n	>\n	<link\n		rel="preconnect"\n		href="https://fonts.gstatic.com"\n		crossorigin\n	>\n	<link\n		href="https://fonts.googleapis.com/css2?family=Itim&display=swap"\n		rel="stylesheet"\n	>\n\n	<meta\n		name="viewport"\n		content="width=device-width"\n	/>\n	' + head + '\n</head>\n\n<body data-sveltekit-preload-data="hover">\n	<div style="display: contents">' + body + "</div>\n</body>\n\n</html>",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "r03l80"
};
function get_hooks() {
  return {};
}

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type2 = get_type(thing);
    switch (type2) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type2}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name2, thing) => {
      params.push(name2);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name2}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name2}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name2}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name2}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num2) {
  let name2 = "";
  do {
    name2 = chars[num2 % chars.length] + name2;
    num2 = ~~(num2 / chars.length) - 1;
  } while (num2 >= 0);
  return reserved.test(name2) ? `${name2}0` : name2;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index13 = p++;
    indexes.set(thing, index13);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index13] = `["${key2}",${flatten(value2)}]`;
        return index13;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags: flags2 } = thing;
          str = flags2 ? `["RegExp",${stringify_string(source)},"${flags2}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index13] = str;
    return index13;
  }
  const index12 = flatten(value);
  if (index12 < 0)
    return `${index12}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type2 = typeof thing;
  if (type2 === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type2 === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_ssr();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
var PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types2) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type2, subtype, q = "1"] = match;
      parts.push({ type: type2, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type2, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type2 || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types2) {
  const type2 = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types2.includes(type2.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location2) {
    this.status = status;
    this.location = location2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} [data]
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder$3.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var encoder$3 = new TextEncoder();
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder$3.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type2 = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type2 === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location2) {
  const response = new Response(void 0, {
    status,
    headers: { location: location2 }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler2 = mod[method];
  if (!handler2 && method === "HEAD") {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler2(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name2 = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name2 = param[0].slice(1);
      if (name2 === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name2];
  if (!action) {
    throw new Error(`No action with name '${name2}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text22() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text22;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text22());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets12 = new Set(client.stylesheets);
  const fonts12 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props15 = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props15[`data_${i}`] = data2;
    }
    props15.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props15);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets12.add(url);
      for (const url of node.fonts)
        fonts12.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets12) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts12) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index12 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index12]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name2, opts) {
      const c = new_cookies[name2];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name2];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name2, value]) => ({ name: name2, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name2, value, opts = {}) {
      set_internal(name2, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name2, opts = {}) {
      cookies.set(name2, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name2, value, opts) {
      return (0, import_cookie.serialize)(name2, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name2 in parsed) {
        combined_cookies[name2] = parsed[name2];
      }
    }
    return Object.entries(combined_cookies).map(([name2, value]) => `${name2}=${value}`).join("; ");
  }
  function set_internal(name2, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name2] = {
      name: name2,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name: name2, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name2, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix2 = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type2 = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type2 ? { "content-type": type2 } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name: name2, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name2,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module2, file) {
    if (!module2)
      return;
    for (const key2 in module2) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type: type2 }) => type2 === "js" || type2 === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location2 = response.headers.get("location");
      if (location2) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location2
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    if (!__privateGet(this, _options).hooks) {
      try {
        const module2 = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module2.handle || (({ event, resolve }) => resolve(event)),
          handleError: module2.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module2.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/netlify-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set([".DS_Store", "favicon.png", "images/banner.png", "images/dcm-author.png", "images/hunnie-bunny-2-transparent.png", "images/hunnie-bunny-peering-over.png", "images/hunnie-bunny-reading-a-book-to-mr-squirrel.png", "images/hunnie-bunny-reading-book.png", "images/hunnie-bunny-reading.png", "images/hunnie-bunnys-garden-book-cover-back-1.png", "images/hunnie-bunnys-garden-book-cover-front-1.png", "images/hunnie-bunnys-garden-book-cover.png", "images/hunnie-bunnys-garden-mockup.png", "images/hunnie-bunnys-garden-page-1.png", "images/hunnie-bunnys-garden-page-2.png", "images/logo.png", "images/mr_frog_sitting.png", "images/mr_frog_sitting.svg", "images/mr_squirrel_sitting.png", "images/mr_squirrel_sitting.svg"]),
    mimeTypes: { ".png": "image/png", ".svg": "image/svg+xml" },
    _: {
      client: { "start": "_app/immutable/entry/start.2e4a60c6.js", "app": "_app/immutable/entry/app.9712bb43.js", "imports": ["_app/immutable/entry/start.2e4a60c6.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/singletons.c7454a51.js", "_app/immutable/entry/app.9712bb43.js", "_app/immutable/chunks/scheduler.3319f7f9.js", "_app/immutable/chunks/index.10ff34d5.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9))),
        __memo(() => Promise.resolve().then(() => (init__10(), __exports10))),
        __memo(() => Promise.resolve().then(() => (init__11(), __exports11)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/about",
          pattern: /^\/about\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/contact",
          pattern: /^\/contact\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/home",
          pattern: /^\/home\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/privacy",
          pattern: /^\/privacy\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null
        },
        {
          id: "/products",
          pattern: /^\/products\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 8 },
          endpoint: null
        },
        {
          id: "/products/[id]",
          pattern: /^\/products\/([^/]+?)\/?$/,
          params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 9 },
          endpoint: null
        },
        {
          id: "/terms",
          pattern: /^\/terms\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 10 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set([]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  // @ts-ignore
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file = pathname.substring(1);
  try {
    file = decodeURIComponent(file);
  } catch (err) {
  }
  return manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

csvtojson/browser/browser.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)
*/
//# sourceMappingURL=render.js.map
