import { ShowMessageParameters } from './parameters'

export interface IShowMessageCommand {
  code: 101,
  indent: number,
  parameters: ShowMessageParameters,
}
