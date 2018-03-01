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

export interface ICommandDefinition {
  name: string
  title: string
  parameters: string[]
  signature: string
  example: string
  describe (parameters: any[]): string
}

export const commandDefinitions: { [key: number]: ICommandDefinition } = {
  // IFadeoutScreenCommand
  221: {
    name: 'fadeoutScreen',
    title: '画面のフェードアウト',
    parameters: [
      'なし',
    ],
    signature: '@fadeoutScreen',
    example: '@fadeoutScreen',
    describe (parameters: IFadeoutScreenCommand['parameters']) {
      return `◆${this.title}`
    },
  },
  // IFadeinScreenCommand
  222: {
    name: 'fadeinScreen',
    title: '画面のフェードイン',
    parameters: [
      'なし',
    ],
    signature: '@fadeinScreen',
    example: '@fadeinScreen',
    describe (parameters: IFadeinScreenCommand['parameters']) {
      return `◆${this.title}`
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
    signature: '@tintScreen [_number_ _number_ _number_ _number_] duration: _number_ (_wait_)',
    example: '@tintScreen [255 255 255 100] duration: 30 wait',
    describe ([color, duration, wait]: ITintScreenCommand['parameters']) {
      return `◆${this.title}：(${[color].join()}), ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
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
    signature: '@flashScreen [_number_ _number_ _number_ _number_] duration: _number_ (_wait_)',
    example: '@flashScreen [255 255 255 100] duration: 30 wait',
    describe ([color, duration, wait]: IFlashScreenCommand['parameters']) {
      return `◆${this.title}：(${[color].join()}), ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
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
    signature: '@shakeScreen force: _number_ speed: _number_ duration: _number_ (_wait_)',
    example: '@shakeScreen force: 5 speed: 5 duration: 10 wait',
    describe ([force, speed, duration, wait]: IShakeScreenCommand['parameters']) {
      return `◆${this.title}：${force}, ${speed}, ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
  },
  // IWaitCommand
  230: {
    name: 'wait',
    title: 'ウェイト',
    parameters: [
      'ウェイトの長さ（フレーム）',
    ],
    signature: '@wait _number_',
    example: '@wait 30',
    describe ([wait]: IWaitCommand['parameters']) {
      return `◆${this.title}：${wait}フレーム`
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
    signature: '@showPicture _number_ _string_ _topLeft_ | _center_ [_number_ _number_] (_byVariable_) scale: [_number_ _number_] opacity: _number_ blend: _normal_ | _add_ | _multiply_ | _screen_',
    example: '@showPicture 1 "ファイル名" topLeft [0 0] byVariable scale: [100 100] opacity: 255 blend: normal',
    describe ([id, file, origin, byVariable, x, y, scaleX, scaleY, opacity, blend]: IShowPictureCommand['parameters']) {
      return `◆${this.title}：#${id}, ${file}, ${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y}), (${scaleX}%,${scaleY}%), ${opacity}, ${['通常', '加算', '乗算', 'スクリーン'][blend]}`
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
    signature: '@movePicture _number_ _topLeft_ | _center_ [_number_ _number_] (_byVariable_) scale: [_number_ _number_] opacity: _number_ blend: _normal_ | _add_ | _multiply_ | _screen_ duration: _number_ (_wait_)',
    example: '@movePicture 1 topLeft [0 0] byVariable scale: [-100 100] opacity: 255 blend: normal duration: 20 wait',
    describe ([id, file, origin, byVariable, x, y, scaleX, scaleY, opacity, blend, duration, wait]: IMovePictureCommand['parameters']) {
      return `◆${this.title}：#${id}, ${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y}), (${scaleX}%,${scaleY}%), ${opacity}, ${['通常', '加算', '乗算', 'スクリーン'][blend]}, ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
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
    signature: '@rotatePicture _number_ speed: _number_',
    example: '@rotatePicture 1 speed:5',
    describe ([id, speed]: IRotatePictureCommand['parameters']) {
      return `◆${this.title}：#${id}, ${speed}`
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
    signature: '@tintPicture _number_ [_number_ _number_ _number_ _number_] duration: _number_ (_wait_)',
    example: '@tintPicture 1 [255 255 255 100] duration: 30 wait',
    describe ([id, color, duration, wait]: ITintPictureCommand['parameters']) {
      return `◆${this.title}：#${id}, (${[color].join()}), ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
    },
  },
  // IErasePictureCommand
  235: {
    name: 'erasePicture',
    title: 'ピクチャの消去',
    parameters: [
      'ピクチャ番号',
    ],
    signature: '@erasePicture _number_',
    example: '@erasePicture 1',
    describe ([id]: IErasePictureCommand['parameters']) {
      return `◆${this.title}：#${id}`
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
    signature: '@weather _rain_ | _storm_ | _snow_ | _none_ force: _number_ duration: _number_ (_wait_) ',
    example: '@weather rain force: 5 duration: 30 wait',
    describe ([type, force, duration, wait]: IWeatherCommand['parameters']) {
      const weather = [['なし', '雨', '嵐', '雪'][type], type === 0 ? force : null].filter((v)=> v).join(', ')
      return `◆${this.title}：${weather}, ${duration}フレーム${wait ? ' (ウェイト)' : ''}`
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
    signature: '@playBGM _string_ volume: _number_ pitch: _number_ pan: _number_',
    example: '@playBGM "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlayBGMCommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
    },
  },
  // IFadeoutBGMCommand
  242: {
    name: 'fadeoutBGM',
    title: 'BGMのフェードアウト',
    parameters: [
      'フェードアウトにかける時間（秒）',
    ],
    signature: '@fadeoutBGM _number_',
    example: '@fadeoutBGM 3',
    describe ([duration]: IFadeoutBGMCommand['parameters']) {
      return `◆${this.title}：${duration}秒`
    },
  },
  // ISaveBGMCommand
  243: {
    name: 'saveBGM',
    title: 'BGMの保存',
    parameters: [
      'なし',
    ],
    signature: '@saveBGM',
    example: '@saveBGM',
    describe (parameters: ISaveBGMCommand['parameters']) {
      return `◆${this.title}`
    },
  },
  // IResumeBGMCommand
  244: {
    name: 'resumeBGM',
    title: 'BGMの再開',
    parameters: [
      'なし',
    ],
    signature: '@resumeBGM',
    example: '@resumeBGM',
    describe (parameters: IResumeBGMCommand['parameters']) {
      return `◆${this.title}`
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
    signature: '@playBGS _string_ volume: _number_ pitch: _number_ pan: _number_',
    example: '@playBGS "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlayBGSCommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
    },
  },
  // IFadeoutBGSCommand
  246: {
    name: 'fadeoutBGS',
    title: 'BGSのフェードアウト',
    parameters: [
      'フェードアウトにかける時間（秒）',
    ],
    signature: '@fadeoutBGS _number_',
    example: '@fadeoutBGS 3',
    describe ([duration]: IFadeoutBGSCommand['parameters']) {
      return `◆${this.title}：${duration}秒`
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
    signature: '@playME _string_ volume: _number_ pitch: _number_ pan: _number_',
    example: '@playME "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlayMECommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
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
    signature: '@playSE _string_ volume: _number_ pitch: _number_ pan: _number_',
    example: '@playSE "ファイル名" volume: 90 pitch: 100 pan: 0',
    describe ([{ name, volume, pitch, pan }]: IPlaySECommand['parameters']) {
      return `◆${this.title}：${name} (${volume}, ${pitch}, ${pan})`
    },
  },
  // IStopSECommand
  251: {
    name: 'stopSE',
    title: 'SEの停止',
    parameters: [
      'なし',
    ],
    signature: '@stopSE',
    example: '@stopSE',
    describe (parameters: IStopSECommand['parameters']) {
      return `◆${this.title}`
    },
  },
  // IPlayMovieCommand
  261: {
    name: 'playMovie',
    title: 'ムービーの再生',
    parameters: [
      'ムービーファイル名',
    ],
    signature: '@playMovie _string_',
    example: '@playMovie "ファイル名"',
    describe ([file]: IPlayMovieCommand['parameters']) {
      return `◆${this.title}：${file}`
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
    signature: '@changeBackground _string_ loopX: _false_ | _number_ loopY: _false_ | _number_',
    example: '@changeBackground "ファイル名" loopX: false loopY: 10',
    describe ([file, loopX, loopY, sX, sY]: IChangeBackgroundCommand['parameters']) {
      const loop = ` (${[loopX ? '横方向にループする' : null, loopY ? '縦方向にループする' : null].filter((v) => v).join(', ')})`
      return `◆${this.title}：${file}${loopX || loopY ? loop : ''}`
    },
  },
  // ISaveCommand
  352: {
    name: 'save',
    title: 'セーブ画面を開く',
    parameters: [
      'なし',
    ],
    signature: '@save',
    example: '@save',
    describe (parameters: ISaveCommand['parameters']) {
      return `◆${this.title}`
    },
  },
  // IGameOverCommand
  353: {
    name: 'gameOver',
    title: 'ゲームオーバー',
    parameters: [
      'なし',
    ],
    signature: '@gameOver',
    example: '@gameOver',
    describe (parameters: IGameOverCommand['parameters']) {
      return `◆${this.title}`
    },
  },
  // IReturnToTitleCommand
  354: {
    name: 'returnToTitle',
    title: 'タイトルに戻る',
    parameters: [
      'なし',
    ],
    signature: '@returnToTitle',
    example: '@returnToTitle',
    describe (parameters: IReturnToTitleCommand['parameters']) {
      return `◆${this.title}`
    },
  },
}