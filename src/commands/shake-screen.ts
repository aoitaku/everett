import { ShakeScreenParameters } from './parameters'

export interface IShakeScreenCommand {
  code: 225,
  indent: number,
  parameters: ShakeScreenParameters,
}
