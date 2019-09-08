declare module 'vue-monaco' {
  import Vue from 'vue'
  import * as monacoEditor from 'monaco-editor'
  export interface IMonacoEditorCompornent extends Vue {
    getEditor (): monacoEditor.editor.ICodeEditor
  }
}
