import { IFadeoutScreenCommand } from './fadeout-screen'
import { IFadeinScreenCommand } from './fadein-screen'
import { ITintScreenCommand } from './tint-screen'
import { IFlashScreenCommand } from './flash-screen'
import { IShakeScreenCommand } from './shake-screen'
import { IWaitCommand } from './wait'
import { IShowPictureCommand } from './show-picture'
import { IMovePictureCommand } from './move-picture'
import { ITintPictureCommand } from './tint-picture'
import { IRotatePictureCommand } from './rotate-picture'
import { IErasePictureCommand } from './erase-picture'
import { IWeatherCommand } from './weather'
import { IPlayBGMCommand } from './play-bgm'
import { IFadeoutBGMCommand } from './fadeout-bgm'
import { ISaveBGMCommand } from './save-bgm'
import { IResumeBGMCommand } from './resume-bgm'
import { IPlayBGSCommand } from './play-bgs'
import { IFadeoutBGSCommand } from './fadeout-bgs'
import { IPlayMECommand } from './play-me'
import { IPlaySECommand } from './play-se'
import { IStopSECommand } from './stop-se'
import { IPlayMovieCommand } from './play-movie'
import { IChangeBackgroundCommand } from './change-background'
import { ISaveCommand } from './save'
import { IGameOverCommand } from './game-over'
import { IReturnToTitleCommand } from './return-to-title'

function v (value: number) {
  return `{#${String(value).padStart(4, '0')}}`
}

export interface ISingleParameterSignature {
  type?: string
  value: string
  name?: string
}

export interface IMulitipleParameterSignature  { 
  type: 'tuple'
  value: string[]
  name?: string
}

export interface ISelectParameterSignature  { 
  type: 'select'
  value: string[]
  name?: string
}

export type IParameterSignature = IMulitipleParameterSignature | ISelectParameterSignature | ISingleParameterSignature

export interface ICommandDescription {
  content: string
  color: string
  text?: string
  option?: string
  prefix?: string
}

export interface ICommandDefinition {
  name: string
  title: string
  parameters: string[]
  parameterSignatures: IParameterSignature[]
  example: string
  describe (parameters: any[]): string
  description (parameters: any[]): ICommandDescription
}

export const commandDefinitions: { [key: number]: ICommandDefinition } = {
  // IFadeoutScreenCommand
  221: {
    name: 'fadeoutScreen',
    title: '画面のフェードアウト',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@fadeoutScreen',
    describe (parameters: IFadeoutScreenCommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: IFadeoutScreenCommand['parameters']) {
      return {
        content: this.title,
        color: 'screen',
      }
    },
  },
  // IFadeinScreenCommand
  222: {
    name: 'fadeinScreen',
    title: '画面のフェードイン',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@fadeinScreen',
    describe (parameters: IFadeinScreenCommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: IFadeinScreenCommand['parameters']) {
      return {
        content: this.title,
        color: 'screen',
      }
    },
  },
  // ITintScreenCommand
  223: {
    name: 'tintScreen',
    title: '画面の色調変更',
    parameters: [
      '色（赤成分,緑成分,青成分,彩度）',
      '効果時間（フレーム）',
      'ウェイト（あり/なし）',
    ],
    parameterSignatures: [
      { type: 'tuple', value: ['number', 'number', 'number', 'number'] },
      { name: 'duration', value: 'number' },
      { value: 'wait', type: 'option' },
    ],
    example: '@tintScreen [255 255 255 100] duration: 30 wait',
    describe ([color, duration, wait]: ITintScreenCommand['parameters']) {
      return `◆${this.title}：(${[color].join()}), ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
    description ([color, duration, wait]: ITintScreenCommand['parameters']) {
      return {
        content: `${this.title}：(${[color].join()}), ${duration}フレーム`,
        color: 'screen',
        option: wait ? ' (ウェイト)' : '',
      }
    },
  },
  // IFlashScreenCommand
  224: {
    name: 'flashScreen',
    title: '画面のフラッシュ',
    parameters: [
      '色（赤成分,緑成分,青成分,明度）',
      '効果時間（フレーム）',
      'ウェイト（あり/なし）',
    ],
    parameterSignatures: [
      { type: 'tuple', value: ['number', 'number', 'number', 'number'] },
      { name: 'duration', value: 'number' },
      { value: 'wait', type: 'option' },
    ],
    example: '@flashScreen [255 255 255 100] duration: 30 wait',
    describe ([color, duration, wait]: IFlashScreenCommand['parameters']) {
      return `◆${this.title}：(${[color].join()}), ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
    description ([color, duration, wait]: IFlashScreenCommand['parameters']) {
      return {
        content: `${this.title}：(${[color].join()}), ${duration}フレーム`,
        color: 'screen',
        option: wait ? ' (ウェイト)' : '',
      }
    },
  },
  // IShakeScreenCommand
  225: {
    name: 'shakeScreen',
    title: '画面のシェイク',
    parameters: [
      '強さ',
      '速さ',
      '効果時間（フレーム）',
      'ウェイト（あり/なし）',
    ],
    parameterSignatures: [
      { name: 'force', value: 'number' },
      { name: 'speed', value: 'number' },
      { name: 'duration', value: 'number' },
      { value: 'wait', type: 'option' },
    ],
    example: '@shakeScreen force: 5 speed: 5 duration: 10 wait',
    describe ([force, speed, duration, wait]: IShakeScreenCommand['parameters']) {
      return `◆${this.title}：${force}, ${speed}, ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
    description ([force, speed, duration, wait]: IShakeScreenCommand['parameters']) {
      return {
        content: `${this.title}：${force}, ${speed}, ${duration}`,
        color: 'screen',
        option: wait ? ' (ウェイト)' : '',
      }
    },
  },
  // IWaitCommand
  230: {
    name: 'wait',
    title: 'ウェイト',
    parameters: [
      'ウェイトの長さ（フレーム）',
    ],
    parameterSignatures: [
      { value: 'number' },
    ],
    example: '@wait 30',
    describe ([wait]: IWaitCommand['parameters']) {
      return `◆${this.title}：${wait}フレーム`
    },
    description ([wait]: IWaitCommand['parameters']) {
      return {
        content: `${this.title}：${wait}フレーム`,
        color: 'wait',
      }
    },
  },
  // IShowPictureCommand
  231: {
    name: 'showPicture',
    title: 'ピクチャの表示',
    parameters: [
      'ピクチャ番号',
      'ピクチャファイル名',
      '原点（左上/中央）',
      '座標（x,y）',
      '変数指定（する/しない）',
      '拡大率（幅,高さ）',
      '不透明度',
      '合成方法(通常/加算/乗算/スクリーン)',
    ],
    parameterSignatures: [
      { value: 'number' },
      { value: 'string' },
      { type: 'select', value: ['topLeft', 'center'] },
      { type: 'tuple', value: ['number', 'number'] },
      { value: 'byVariable', type: 'option' },
      { name: 'scale', type: 'tuple', value: ['number', 'number'] },
      { name: 'opacity', value: 'number' },
      { name: 'blend', type: 'select', value: ['normal', 'add', 'multiply', 'screen'] },
    ],
    example: '@showPicture 1 "ファイル名" topLeft [0 0] byVariable scale: [100 100] opacity: 255 blend: normal',
    describe ([id, file, origin, byVariable, x, y, scaleX, scaleY, opacity, blend]: IShowPictureCommand['parameters']) {
      return `◆${this.title}：#${id}, ${file}, ${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y}), (${scaleX}%,${scaleY}%), ${opacity}, ${['通常', '加算', '乗算', 'スクリーン'][blend]}`
    },
    description ([id, file, origin, byVariable, x, y, scaleX, scaleY, opacity, blend]: IShowPictureCommand['parameters']) {
      return {
        content: `${this.title}：#${id}, ${file}, ${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y}), (${scaleX}%,${scaleY}%), ${opacity}, ${['通常', '加算', '乗算', 'スクリーン'][blend]}`,
        color: 'picture',
      }
    },
  },
  // IMovePictureCommand
  232: {
    name: 'movePicture',
    title: 'ピクチャの移動',
    parameters: [
      'ピクチャ番号',
      '原点（左上/中央）',
      '座標（直接指定x,y/変数指定x,y）',
      '拡大率（幅,高さ）',
      '不透明度',
      '合成方法(通常/加算/乗算/スクリーン)',
      '変更にかける時間（フレーム）',
      'ウェイト（あり/なし）',
    ],
    parameterSignatures: [
      { value: 'number' },
      { type: 'select', value: ['topLeft', 'center'] },
      { type: 'tuple', value: ['number', 'number'] },
      { value: 'byVariable', type: 'option' },
      { name: 'scale', type: 'tuple', value: ['number', 'number'] },
      { name: 'opacity', value: 'number' },
      { name: 'blend', type: 'select', value: ['normal', 'add', 'multiply', 'screen'] },
      { name: 'duration', value: 'number' },
      { value: 'wait', type: 'option' },
    ],
    example: '@movePicture 1 topLeft [0 0] byVariable scale: [-100 100] opacity: 255 blend: normal duration: 20 wait',
    describe ([id, file, origin, byVariable, x, y, scaleX, scaleY, opacity, blend, duration, wait]: IMovePictureCommand['parameters']) {
      return `◆${this.title}：#${id}, ${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y}), (${scaleX}%,${scaleY}%), ${opacity}, ${['通常', '加算', '乗算', 'スクリーン'][blend]}, ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
    description ([id, file, origin, byVariable, x, y, scaleX, scaleY, opacity, blend, duration, wait]: IMovePictureCommand['parameters']) {
      return {
        content: `${this.title}：#${id}, ${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y}), (${scaleX}%,${scaleY}%), ${opacity}, ${['通常', '加算', '乗算', 'スクリーン'][blend]}, ${duration}フレーム`,
        color: 'picture',
        option: wait ? ' (ウェイト)' : '',
      }
    },
  },
  // IRotatePictureCommand
  233: {
    name: 'rotatePicture',
    title: 'ピクチャの回転',
    parameters: [
      'ピクチャ番号',
      '回転速度（正数:反時計回り/負数:時計回り）',
    ],
    parameterSignatures: [
      { value: 'number' },
      { name: 'speed', value: 'number' },
    ],
    example: '@rotatePicture 1 speed:5',
    describe ([id, speed]: IRotatePictureCommand['parameters']) {
      return `◆${this.title}：#${id}, ${speed}`
    },
    description ([id, speed]: IRotatePictureCommand['parameters']) {
      return {
        content: `${this.title}：#${id}, ${speed}`,
        color: 'picture',
      }
    },
  },
  // ITintPictureCommand
  234: {
    name: 'tintPicture',
    title: 'ピクチャの色調変更',
    parameters: [
      'ピクチャ番号',
      '色（赤成分,緑成分,青成分,彩度）',
      '変更にかける時間（フレーム）',
      'ウェイト（あり/なし）',
    ],
    parameterSignatures: [
      { value: 'number' },
      { type: 'tuple', value: ['number', 'number', 'number', 'number'] },
      { name: 'duration', value: 'number' },
      { value: 'wait', type: 'option' },
    ],
    example: '@tintPicture 1 [255 255 255 100] duration: 30 wait',
    describe ([id, color, duration, wait]: ITintPictureCommand['parameters']) {
      return `◆${this.title}：#${id}, (${[color].join()}), ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
    description ([id, color, duration, wait]: ITintPictureCommand['parameters']) {
      return {
        content: `${this.title}：#${id}, (${[color].join()}), ${duration}フレーム`,
        color: 'picture',
        option: wait ? ' (ウェイト)' : '',
      }
    },
  },
  // IErasePictureCommand
  235: {
    name: 'erasePicture',
    title: 'ピクチャの消去',
    parameters: [
      'ピクチャ番号',
    ],
    parameterSignatures: [
      { value: 'number' },
    ],
    example: '@erasePicture 1',
    describe ([id]: IErasePictureCommand['parameters']) {
      return `◆${this.title}：#${id}`
    },
    description ([id]: IErasePictureCommand['parameters']) {
      return {
        content: `${this.title}：#${id}`,
        color: 'picture',
      }
    },
  },
  // IWeatherCommand
  236: {
    name: 'weather',
    title: '天候の設定',
    parameters: [
      '種類（なし/雨/嵐/雪）',
      '強さ',
      '効果時間（フレーム）',
      'ウェイト（あり/なし）',
    ],
    parameterSignatures: [
      { type: 'select', value: ['rain', 'storm', 'snow', 'none'] },
      { name: 'force', value: 'number' },
      { name: 'duration', value: 'number' },
      { value: 'wait', type: 'option' },
    ],
    example: '@weather rain force: 5 duration: 30 wait',
    describe ([type, force, duration, wait]: IWeatherCommand['parameters']) {
      const weather = [['なし', '雨', '嵐', '雪'][type], type === 0 ? force : null].filter((v)=> v).join(', ')
      return `◆${this.title}：${weather}, ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
    description ([type, force, duration, wait]: IWeatherCommand['parameters']) {
      const weather = [['なし', '雨', '嵐', '雪'][type], type === 0 ? force : null].filter((v)=> v).join(', ')
      return {
        content: `${this.title}：${weather}, ${duration}フレーム`,
        color: 'screen',
        option: wait ? ' (ウェイト)' : '',
      }
    },
  },
  // IPlayBGMCommand
  241: {
    name: 'playBGM',
    title: 'BGMの演奏',
    parameters: [
      'BGMファイル名',
      '音量',
      'ピッチ',
      '位相（正数:右/負数:左）',
    ],
    parameterSignatures: [
      { value: 'string' },
      { name: 'volume', value: 'number' },
      { name: 'pitch', value: 'number' },
      { name: 'pan', value: 'number' },
    ],
    example: '@playBGM "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlayBGMCommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
    },
    description ([{ name, volume, pitch, pan }]: IPlayBGMCommand['parameters']) {
      return {
        content: `${this.title}：${name} (${volume}, ${pitch}, ${pan})`,
        color: 'audioVideo',
      }
    },
  },
  // IFadeoutBGMCommand
  242: {
    name: 'fadeoutBGM',
    title: 'BGMのフェードアウト',
    parameters: [
      'フェードアウトにかける時間（秒）',
    ],
    parameterSignatures: [
      { value: 'number' },
    ],
    example: '@fadeoutBGM 3',
    describe ([duration]: IFadeoutBGMCommand['parameters']) {
      return `◆${this.title}：${duration}秒`
    },
    description ([duration]: IFadeoutBGMCommand['parameters']) {
      return {
        content: `${this.title}：${duration}秒`,
        color: 'audioVideo',
      }
    },
  },
  // ISaveBGMCommand
  243: {
    name: 'saveBGM',
    title: 'BGMの保存',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@saveBGM',
    describe (parameters: ISaveBGMCommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: ISaveBGMCommand['parameters']) {
      return {
        content: this.title,
        color: 'audioVideo',
      }
    },
  },
  // IResumeBGMCommand
  244: {
    name: 'resumeBGM',
    title: 'BGMの再開',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@resumeBGM',
    describe (parameters: IResumeBGMCommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: IResumeBGMCommand['parameters']) {
      return {
        content: this.title,
        color: 'audioVideo',
      }
    },
  },
  // IPlayBGSCommand
  245: {
    name: 'playBGS',
    title: 'BGSの演奏',
    parameters: [
      'BGSファイル名',
      '音量',
      'ピッチ',
      '位相（正数:右/負数:左）',
    ],
    parameterSignatures: [
      { value: 'string' },
      { name: 'volume', value: 'number' },
      { name: 'pitch', value: 'number' },
      { name: 'pan', value: 'number' },
    ],
    example: '@playBGS "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlayBGSCommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
    },
    description ([{ name, volume, pitch, pan }]: IPlayBGSCommand['parameters']) {
      return {
        content: `${this.title}：${name} (${volume}, ${pitch}, ${pan})`,
        color: 'audioVideo',
      }
    },
  },
  // IFadeoutBGSCommand
  246: {
    name: 'fadeoutBGS',
    title: 'BGSのフェードアウト',
    parameters: [
      'フェードアウトにかける時間（秒）',
    ],
    parameterSignatures: [
      { value: 'number' },
    ],
    example: '@fadeoutBGS 3',
    describe ([duration]: IFadeoutBGSCommand['parameters']) {
      return `◆${this.title}：${duration}秒`
    },
    description ([duration]: IFadeoutBGSCommand['parameters']) {
      return {
        content: `${this.title}：${duration}秒`,
        color: 'audioVideo',
      }
    },
  },
  // IPlayMECommand
  249: {
    name: 'playME',
    title: 'MEの演奏',
    parameters: [
      'MEファイル名',
      '音量',
      'ピッチ',
      '位相（正数:右/負数:左）',
    ],
    parameterSignatures: [
      { value: 'string' },
      { name: 'volume', value: 'number' },
      { name: 'pitch', value: 'number' },
      { name: 'pan', value: 'number' },
    ],
    example: '@playME "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlayMECommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
    },
    description ([{ name, volume, pitch, pan }]: IPlayMECommand['parameters']) {
      return {
        content: `${this.title}：${name} (${volume}, ${pitch}, ${pan})`,
        color: 'audioVideo',
      }
    },
  },
  // IPlaySECommand
  250: {
    name: 'playSE',
    title: 'SEの演奏',
    parameters: [
      'SEファイル名',
      '音量',
      'ピッチ',
      '位相（正数:右/負数:左）',
    ],
    parameterSignatures: [
      { value: 'string' },
      { name: 'volume', value: 'number' },
      { name: 'pitch', value: 'number' },
      { name: 'pan', value: 'number' },
    ],
    example: '@playSE "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlaySECommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
    },
    description ([{ name, volume, pitch, pan }]: IPlaySECommand['parameters']) {
      return {
        content: `${this.title}：${name} (${volume}, ${pitch}, ${pan})`,
        color: 'audioVideo',
      }
    },
  },
  // IStopSECommand
  251: {
    name: 'stopSE',
    title: 'SEの停止',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@stopSE',
    describe (parameters: IStopSECommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: IStopSECommand['parameters']) {
      return {
        content: this.title,
        color: 'audioVideo',
      }
    },
  },
  // IPlayMovieCommand
  261: {
    name: 'playMovie',
    title: 'ムービーの再生',
    parameters: [
      'ムービーファイル名',
    ],
    parameterSignatures: [
      { value: 'string' },
    ],
    example: '@playMovie "ファイル名"',
    describe ([file]: IPlayMovieCommand['parameters']) {
      return `◆${this.title}：${file}`
    },
    description ([file]: IPlayMovieCommand['parameters']) {
      return {
        content: this.title,
        color: 'audioVideo',
      }
    },
  },
  // IChangeBackgroundCommand
  284: {
    name: 'changeBackground',
    title: '遠景の変更',
    parameters: [
      '遠景ファイル名',
      '横方向のループとスクロール量（数値:ループありで指定量スクロール/ループなし）',
      '縦方向のループとスクロール量（数値:ループありで指定量スクロール/ループなし）',
    ],
    parameterSignatures: [
      { value: 'string' },
      { name: 'loopX', type: 'select', value: ['false', 'number'] },
      { name: 'loopY', type: 'select', value: ['false', 'number'] },
    ],
    example: '@changeBackground "ファイル名" loopX: false loopY: 10',
    describe ([file, loopX, loopY, sX, sY]: IChangeBackgroundCommand['parameters']) {
      const loop = ` (${[loopX ? '横方向にループする' : null, loopY ? '縦方向にループする' : null].filter((v) => v).join(', ')})`
      return `◆${this.title}：${file}${loopX || loopY ? loop : ''}`
    },
    description ([file, loopX, loopY, sX, sY]: IChangeBackgroundCommand['parameters']) {
      const loop = ` (${[loopX ? '横方向にループする' : null, loopY ? '縦方向にループする' : null].filter((v) => v).join(', ')})`
      return {
        content: `${this.title}：${file}`,
        color: 'changeBackground',
        option: loopX || loopY ? loop : '',
      }
    },
  },
  // ISaveCommand
  352: {
    name: 'save',
    title: 'セーブ画面を開く',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@save',
    describe (parameters: ISaveCommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: ISaveCommand['parameters']) {
      return {
        content: this.title,
        color: 'system',
      }
    },
  },
  // IGameOverCommand
  353: {
    name: 'gameOver',
    title: 'ゲームオーバー',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@gameOver',
    describe (parameters: IGameOverCommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: IGameOverCommand['parameters']) {
      return {
        content: this.title,
        color: 'system',
      }
    },
  },
  // IReturnToTitleCommand
  354: {
    name: 'returnToTitle',
    title: 'タイトルに戻る',
    parameters: [
      'なし',
    ],
    parameterSignatures: [],
    example: '@returnToTitle',
    describe (parameters: IReturnToTitleCommand['parameters']) {
      return `◆${this.title}`
    },
    description (parameters: IReturnToTitleCommand['parameters']) {
      return {
        content: this.title,
        color: 'system',
      }
    },
  },
}