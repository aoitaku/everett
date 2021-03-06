export default {
  defaultToken: '',
  escapes: /\\(?:[abfgrtv\\"'])/,
  digits: /\d+(_+\d+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[01]+(_+[01]+)*/,
  tokenizer: {
    root: [
      [/(@)([_a-zA-Z][_a-zA-Z0-9]*)([ \t]*)$/, ['symbol', 'command', 'whitespace']],
      [/(%)([^\s]+)([ \t]*)$/, ['symbol', 'command', 'whitespace']],
      [/(@)([_a-zA-Z][_a-zA-Z0-9]*)([ \t]+)/, [
        'symbol',
        'command',
        { token: 'whitespace', next: '@parameters' },
      ]],
      [/(%)([^\s]+)([ \t]+)/, [
        'symbol',
        'command',
        { token: 'whitespace', next: '@parameters' },
      ]],
      [/>.+$/, 'string'],
      [/\/{2}.*$/, 'comment'],
      [/[^>%@].*$/],
    ],
    parameters: [
      [/^/, '', '@pop'],
      [/[ \t]+/, 'whitespace'],
      [/([_a-zA-Z][_a-zA-Z0-9]*)(:)/, ['attributes', 'operators']],
      [/([_a-zA-Z][_a-zA-Z0-9]*)/, 'keyword'],
      [/-?(@digits)\.(@digits)/, 'number.float'],
      [/-?0[xX](@hexdigits)/, 'number.hex'],
      [/-?0[oO]?(@octaldigits)/, 'number.octal'],
      [/-?0[bB](@binarydigits)/, 'number.binary'],
      [/-?(@digits)/, 'number'],
      [/[-=^~/|!#$%&@+*:?<>(){}[\]\\]/, 'operators'],
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/'([^'\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string_double'],
      [/'/, 'string', '@string_single'],
      [/`/, 'string', '@string_backtick'],
    ],
    string_double: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, 'string', '@pop'],
    ],
    string_single: [
      [/[^\\']+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/'/, 'string', '@pop'],
    ],
    string_backtick: [
      [/[^\\`]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/`/, 'string', '@pop'],
    ],
  },
}
