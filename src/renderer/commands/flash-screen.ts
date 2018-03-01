import { FlashScreenParameters } from './parameters'

export interface IFlashScreenCommand {
  code: 224,
  indent: number,
  parameters: FlashScreenParameters
}
