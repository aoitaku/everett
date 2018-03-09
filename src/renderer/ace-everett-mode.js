ace.define("ace/mode/everett_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function (acequire, exports, module) {
  "use strict";

  var oop = acequire("ace/lib/oop");
  var TextHighlightRules = acequire("ace/mode/text_highlight_rules").TextHighlightRules;

  var identifier = '[_a-zA-Z][_a-zA-Z0-9]*'

  var EverettHighlightRules = function () {
    this.$rules = {
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
        regex: `(${identifier})(:)`,
        next: 'separator',
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
      list: [{
        token: ' '
      }, {
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
        next: 'start'
      }],
    };
    this.normalizeRules();
  }

  EverettHighlightRules.metaData = {
    fileTypes: ['everett'],
    name: 'everett',
    scopeName: 'text.everett'
  };

  oop.inherits(EverettHighlightRules, TextHighlightRules);

  exports.EverettHighlightRules = EverettHighlightRules;
});

ace.define("ace/mode/everett",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/everett_highlight_rules","ace/mode/folding/cstyle"], function (acequire, exports, module) {
  "use strict";

  var oop = acequire("ace/lib/oop");
  var TextMode = acequire("ace/mode/text").Mode;
  var EverettHighlightRules = acequire("ace/mode/everett_highlight_rules").EverettHighlightRules;

  var Mode = function () {
      this.HighlightRules = EverettHighlightRules;
      this.$behaviour = this.$defaultBehaviour;
  };
  oop.inherits(Mode, TextMode);

  (function () {
    this.$id = "ace/mode/everett";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});
