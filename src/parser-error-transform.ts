import { SyntaxError } from './parser'

export default function errorTransform (error: SyntaxError) {
  return error.message.replace(/Expected (.+) but (.+) found\./, (substr, ...args) => {
    const expected = args[0]
    if (args[1] === 'end of input') {
      return `${expected}が必要ですが、入力の終端に達しました。`
    }
    if (args[1] === '"\\n"') {
      return `${expected}が必要ですが、行末に達しました。`
    }
    return `${args[1]}ではなく${expected}が必要です。`
  })
}
