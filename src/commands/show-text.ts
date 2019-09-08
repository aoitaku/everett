import { ShowMessageParameters } from './parameters'
export interface IShowTextCommand {
  code: 101
  indent: number
  parameters: ShowMessageParameters
}
