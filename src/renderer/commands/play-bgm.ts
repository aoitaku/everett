import { IPlayAudioParameter } from './parameters'

export interface IPlayBGMCommand {
  code: 241,
  indent: number,
  parameters: [IPlayAudioParameter],
}
