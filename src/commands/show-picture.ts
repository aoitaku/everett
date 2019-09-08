import { ShowPictureParameters } from './parameters'

export interface IShowPictureCommand {
  code: 231,
  indent: number,
  parameters: ShowPictureParameters,
}
