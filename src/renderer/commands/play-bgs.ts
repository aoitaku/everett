import { IPlayAudioParameter } from './parameters'

export interface IPlayBGSCommand {
  code: 245,
  indent: number,
  parameters: [IPlayAudioParameter],
}
