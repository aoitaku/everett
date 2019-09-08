import * as monaco from 'monaco-editor'
import everettSyntaxDefinition from './everett-syntax-definition'

monaco.languages.register({ id: 'everett' })
monaco.languages.setMonarchTokensProvider('everett', everettSyntaxDefinition)
monaco.editor.defineTheme('everett', {
  base: 'vs',
  inherit: false,
  rules: [
    { token: '', foreground: '000000' },
    { token: 'operators', foreground: '3f51b5' },
    { token: 'symbol', foreground: 'f44336' },
    { token: 'command', foreground: '2196f3' },
    { token: 'number', foreground: 'f44336' },
    { token: 'keyword', foreground: '009688' },
    { token: 'attributes', foreground: '2196f3' },
    { token: 'string', foreground: '3f51b5' },
    { token: 'comment', foreground: 'aaaaaa' }
  ]
})
