import { IPlayAudioParameter } from './parameters'

export interface IPlaySECommand {
  code: 250,
  indent: number,
  parameters: [IPlayAudioParameter],
}
