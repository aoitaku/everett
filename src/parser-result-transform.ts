import { ParseResult, IEventCommand } from './parser'
import { commandDefinitions, ICommandDescription } from './commands/definitions'
import { store } from './store'

export default function resultTransform (result: ParseResult) {
  return result.map((command) => {
    switch (command.code) {
      case 101:
        const [
          faceName,
          faceIndex,
          windowStyle,
          windowPosition,
        ] = command.parameters
        const [
          defaultFaceName,
          defaultFaceIndex,
          defaultWindowStyle,
          defaultWindowPosition,
        ] = store.state.showMessageParameters
        command.parameters = [
          faceName || defaultFaceName,
          faceIndex || defaultFaceIndex,
          windowStyle || defaultWindowStyle,
          windowPosition || defaultWindowPosition,
        ]
        return {
          ...command,
          indent: 0,
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

export function resultDescriptions (result: IEventCommand[]): ICommandDescription[] {
  return result.map((command) => {
    switch (command.code) {
      case 101:
        const [
          faceName,
          faceIndex,
          windowStyleValue,
          windowPositionValue,
        ] = command.parameters
        const windowStyle = [
          'ウィンドウ', '暗くする', '透明',
        ][windowStyleValue]
        const windowPosition = [
          '上', '中', '下',
        ][windowPositionValue]
        return {
          content: '文章：',
          color: 'message',
          option: `${faceName}(${faceIndex}), ${windowStyle}, ${windowPosition}`,
          prefix: '◆',
        }
      case 401:
        return {
          content: '　　：',
          color: 'text',
          text: command.parameters[0],
          prefix: '：',
        }
      case 356:
        return {
          content: 'プラグインコマンド：',
          color: 'text',
          text: command.parameters[0],
          prefix: '◆',
        }
      default:
        const definition = commandDefinitions[command.code]
        return {
          ...definition.description(command.parameters),
          prefix: '◆',
        }
    }
  })
}
