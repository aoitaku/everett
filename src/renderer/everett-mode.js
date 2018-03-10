import CodeMirror from 'codemirror'
import 'codemirror/addon/mode/simple'

const identifier = '[_a-zA-Z][_a-zA-Z0-9]*';
const mode = {
  start: [{
    token : 'string',
    regex : '>.+$',
    next : 'start',
  }, {
    token: 'symbol',
    regex: '%',
    next:  'pluginCommand',
  }, {
    token: 'symbol',
    regex: '@',
    next:  'command',
  }, {
    token: 'text',
    regex: '[^>%@].*$',
    next:  'start',
  }],
  pluginCommand: [{
    token: ['command', 'text'],
    regex: '([^ ]+)((?: *[^ ]+)* *)$',
    next: 'start',
  }],
  command: [{
    token: 'command',
    regex: identifier,
    next: 'separator',
  }],
  parameter: [{
    token: ['attribute', 'operator'],
    regex: `(${identifier})(:) *`,
    next: 'value',
  }, {
    token: 'operator',
    regex: '(\\[) *',
    next: 'list',
  }, {
    token: 'number',
    regex: '(-?[0-9]+)',
    next: 'separator',
  }, {
    token: 'string',
    regex: '"([^"\\n]+)"',
    next: 'separator',
  }, {
    token: 'keyword',
    regex: `(?:${identifier})|(?:[^ :]+)`,
    next: 'separator',
  }],
  value: [{
    token: 'number',
    regex: '(-?[0-9]+)',
    next: 'separator',
  }, {
    token: 'string',
    regex: '"([^"\\n]+)"',
    next: 'separator',
  }, {
    token: 'keyword',
    regex: `(?:${identifier})|(?:[^ :]+)`,
    next: 'separator',
  }],
  list: [{
    token: 'number',
    regex: '(-?[0-9]+)',
    next: 'listSeparator',
  }, {
    token: 'string',
    regex: '"([^"\\n]+)"',
    next: 'listSeparator',
  }, {
    token: 'operator',
    regex: '\\]',
    next: 'parameter',
  }, {
    token: 'keyword',
    regex: `(?:${identifier})|(?:[^\\] :]+)`,
    next: 'listSeparator',
  }],
  listSeparator: [{
    token: 'empty',
    regex: ' +',
    next: 'list',
  }, {
    token: 'operator',
    regex: '\\]',
    next: 'parameter',
  }],
  separator: [{
    token: 'empty',
    regex: ' +',
    next: 'parameter',
  }, {
    token: 'empty',
    regex: '',
    next: 'start',
  }],
};

CodeMirror.defineSimpleMode('everett', mode);
