import { IPlayAudioParameter, ColorParameter } from './commands/parameters'
import { ParseResult } from './parser'
import { IShowMessageCommand } from './commands/show-message'
import { IMessageCommand } from './commands/message'
import { IFadeoutScreenCommand } from './commands/fadeout-screen'
import { IFadeinScreenCommand } from './commands/fadein-screen'
import { ITintScreenCommand } from './commands/tint-screen'
import { IFlashScreenCommand } from './commands/flash-screen'
import { IShakeScreenCommand } from './commands/shake-screen'
import { IWaitCommand } from './commands/wait'
import { IShowPictureCommand } from './commands/show-picture'
import { IMovePictureCommand } from './commands/move-picture'
import { ITintPictureCommand } from './commands/tint-picture'
import { IRotatePictureCommand } from './commands/rotate-picture'
import { IErasePictureCommand } from './commands/erase-picture'
import { IWeatherCommand } from './commands/weather'
import { IPlayBGMCommand } from './commands/play-bgm'
import { IFadeoutBGMCommand } from './commands/fadeout-bgm'
import { ISaveBGMCommand } from './commands/save-bgm'
import { IResumeBGMCommand } from './commands/resume-bgm'
import { IPlayBGSCommand } from './commands/play-bgs'
import { IFadeoutBGSCommand } from './commands/fadeout-bgs'
import { IPlayMECommand } from './commands/play-me'
import { IPlaySECommand } from './commands/play-se'
import { IStopSECommand } from './commands/stop-se'
import { IPlayMovieCommand } from './commands/play-movie'
import { IChangeBackgroundCommand } from './commands/change-background'
import { ISaveCommand } from './commands/save'
import { IGameOverCommand } from './commands/game-over'
import { IReturnToTitleCommand } from './commands/return-to-title'
import { IPluginCommand } from './commands/plugin'
import SyntaxError from './parser'

export type IEventCommand =
  IShowMessageCommand |
  IMessageCommand |
  IFadeoutScreenCommand |
  IFadeinScreenCommand |
  ITintScreenCommand |
  IFlashScreenCommand |
  IShakeScreenCommand |
  IWaitCommand |
  IShowPictureCommand |
  IMovePictureCommand |
  IRotatePictureCommand |
  ITintPictureCommand |
  IErasePictureCommand |
  IWeatherCommand |
  IPlayBGMCommand |
  IFadeoutBGMCommand |
  ISaveBGMCommand |
  IResumeBGMCommand |
  IPlayBGSCommand |
  IFadeoutBGSCommand |
  IPlayMECommand |
  IPlaySECommand |
  IStopSECommand |
  IPlayMovieCommand |
  IChangeBackgroundCommand |
  ISaveCommand |
  IGameOverCommand |
  IReturnToTitleCommand |
  IPluginCommand

declare module './parser' {
  interface IParseOptions {
    filename?: string
    startRule?: string
    tracer?: any
    [key: string]: any
  }
  export interface SyntaxError {
    message: string
    expected: any
    found: any
    location: any
    name: "SyntaxError"
  }
  export type ParseResult = IEventCommand[]
  function parse (input: string, options?: IParseOptions): ParseResult
}
