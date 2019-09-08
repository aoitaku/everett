import { MovePictureParameters } from './parameters'

export interface IMovePictureCommand {
  code: 232,
  indent: number,
  parameters: MovePictureParameters
}
