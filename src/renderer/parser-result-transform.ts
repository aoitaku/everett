import { ParseResult, IEventCommand } from './parser'
import { commandDefinitions } from './commands/definitions'
import { store } from './store'

export default function resultTransform (result: ParseResult) {
  return result.map((command) => {
    switch (command.code) {
    case 101:
      const [faceName, faceIndex, windowStyle, windowPosition] = command.parameters
      const [defaultFaceName, defaultFaceIndex, defaultWindowStyle, defaultWindowPosition] = store.state.showMessageParameters
      command.parameters = [
        faceName ? faceName : defaultFaceName,
        faceIndex ? faceIndex : defaultFaceIndex,
        windowStyle ? windowStyle : defaultWindowStyle,
        windowPosition ? windowPosition : defaultWindowPosition,
      ]
      return {
        ...command,
        indent: 0
      }
    case 401:
      const { code, parameters, name } = command
      if (name) {
        parameters[0] = `\\n<${name}>${parameters[0]}`
      }
      return {
        code,
        parameters,
        indent: 0,
      }
    default:
      return {
        ...command,
        indent: 0,
      }
    }
  })
}

export function describeResult (result: IEventCommand[]) {
  return result.map((command) => {
    switch (command.code) {
    case 101:
      const [faceName, faceIndex, windowStyleValue, windowPositionValue] = command.parameters
      const windowStyle = [
        'ウィンドウ', '暗くする', '透明',
      ][windowStyleValue]
      const windowPosition = [
        '上', '中', '下',
      ][windowPositionValue]
      return `◆文章：${faceName}(${faceIndex}), ${windowStyle}, ${windowPosition}`
    case 401:
      return `：　　：${command.parameters[0]}`
    case 356:
      return `◆プラグインコマンド：${command.parameters[0]}`
    default:
      const definition = commandDefinitions[command.code]
      return definition.describe.call(definition, command.parameters)
    }
  }).join("\n")
}
