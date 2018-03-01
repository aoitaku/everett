import { TintScreenParameters } from './parameters'

export interface ITintScreenCommand {
  code: 223,
  indent: number,
  parameters: TintScreenParameters,
}
