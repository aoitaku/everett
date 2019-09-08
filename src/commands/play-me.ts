import { IPlayAudioParameter } from './parameters'

export interface IPlayMECommand {
  code: 249
  indent: number
  parameters: [IPlayAudioParameter]
}
