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

export interface IParameterSignature {
  [key: string]: any
}

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
  parameterSignatures: IParameterSignature[]
  description (parameters: any[]): ICommandDescription
}

export const commandDefinitions: { [key: number]: ICommandDefinition } = {
  // IFadeoutScreenCommand
  221: {
    name: 'fadeoutScreen',
    title: '画面のフェードアウト',
    parameterSignatures: [],
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
    parameterSignatures: [],
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
    parameterSignatures: [
      {
        type: 'tone',
        values: [['number', {
          min: -255,
          max: 255,
          default: 0,
        }], ['number', {
          min: -255,
          max: 255,
          default: 0,
        }], ['number', {
          min: -255,
          max: 255,
          default: 0,
        }], ['number', {
          min: 0,
          max: 255,
          default: 0,
        }]],
        label: '色調',
      }, {
        key: 'duration',
        type: 'number',
        value: ['number', {
          min: 0,
          default: 60,
        }],
        label: '効果時間（フレーム）'
      }, {
        key: 'wait',
        type: 'optional',
        value: ['true'],
        label: '完了までウェイト'
      },
    ],
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
    parameterSignatures: [
      {
        type: 'color',
        value: ['number', 'number', 'number', 'number'],
        values: [['number', {
          min: 0,
          max: 255,
          default: 255,
        }], ['number', {
          min: 0,
          max: 255,
          default: 255,
        }], ['number', {
          min: 0,
          max: 255,
          default: 255,
        }], ['number', {
          min: 0,
          max: 255,
          default: 170,
        }]],
        label: '色',
      }, {
        key: 'duration',
        type: 'number',
        value: ['number', {
          min: 0,
          default: 60,
        }],
        label: '効果時間（フレーム）',
      }, {
        key: 'wait',
        type: 'optional',
        value: ['true'],
        label: '完了までウェイト'
      },
    ],
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
    parameterSignatures: [
      {
        key: 'force',
        type: 'volume',
        value: ['number', {
          min: 1,
          max: 9,
          default: 5,
        }],
        label: '強さ',
      }, {
        key: 'speed',
        type: 'volume',
        value: ['number', {
          min: 1,
          max: 9,
          default: 5,
        }],
        label: '速さ'
      }, {
        key: 'duration',
        type: 'number',
        value: ['number', {
          min: 0,
          default: 60,
        }],
        label: '効果時間（フレーム）',
      }, {
        key: 'wait',
        type: 'optional',
        value: ['true'],
        label: '完了までウェイト'
      },
    ],
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
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 0,
          default: 60,
        }],
        label: 'ウェイトの長さ（フレーム）'
      },
    ],
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
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 1,
          max: 100,
          default: 1,
        }],
        label: 'ピクチャ番号'
      }, {
        type: 'filename',
        value: ['filename', {
          folder: 'img/pictures',
          name: 'picture',
        }],
        label: 'ファイル名',
      }, {
        type: 'select',
        value: ['keyword', {
          values: [{
            value: 'topLeft',
            label: '左上',
          }, {
            value: 'center',
            label: '中央',
          }],
        }],
        label: '原点',
      }, {
        type: 'or',
        values: [{
          type: 'vector',
          values: [
            ['number', {
              default: 0,
              label: 'X座標',
            }], ['number', {
              default: 0,
              label: 'Y座標',
            }],
          ],
          label: '直接指定',
        }, {
          key: 'byVariables',
          type: 'vector',
          values: [
            ['variable', {
              default: 1,
              label: 'X座標',
            }], ['variable', {
              default: 1,
              label: 'Y座標',
            }],
          ],
          label: '変数で指定',
        }],
        label: '座標',
      }, {
        key: 'scale',
        type: 'vector',
        values: [['number', {
          default: 100,
          label: '幅',
        }], ['number', {
          default: 100,
          label: '高さ',
        }]],
        label: '拡大率',
      }, {
        key: 'opacity',
        type: 'volume',
        value: ['number', {
          min: 0,
          max: 255,
          default: 255,
        }],
        label: '不透明度',
      }, {
        key: 'blend',
        type: 'select',
        value: ['keyword', {
          values: [{
            value: 'normal',
            label: '通常',
          }, {
            value: 'add',
            label: '加算',
          }, {
            value: 'multiply',
            label: '乗算',
          }, {
            value: 'screen',
            label: 'スクリーン',
          }],
        }],
        label: '合成方法',
      },
    ],
    description ([
      id,
      file,
      origin,
      byVariable, x, y,
      scaleX, scaleY,
      opacity,
      blend
    ]: IShowPictureCommand['parameters']) {
      const parameters = [
        `#${id}`,
        file,
        `${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y})`,
        `(${scaleX}%,${scaleY}%)`,
        opacity,
        `${['通常', '加算', '乗算', 'スクリーン'][blend]}`,
      ].join(', ')
      return {
        content: `${this.title}：${parameters}`,
        color: 'picture',
      }
    },
  },
  // IMovePictureCommand
  232: {
    name: 'movePicture',
    title: 'ピクチャの移動',
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 1,
          max: 100,
          default: 1,
        }],
        label: 'ピクチャ番号'
      }, {
        type: 'select',
        value: ['keyword', {
          values: [{
            value: 'topLeft',
            label: '左上',
          }, {
            value: 'center',
            label: '中央',
          }],
        }],
        label: '原点',
      }, {
        type: 'or',
        values: [{
          type: 'vector',
          values: [
            ['number', {
              default: 0,
              label: 'X座標',
            }], ['number', {
              default: 0,
              label: 'Y座標',
            }],
          ],
          label: '直接指定',
        }, {
          key: 'byVariables',
          type: 'vector',
          values: [
            ['variable', {
              default: 1,
              label: 'X座標',
            }], ['variable', {
              default: 1,
              label: 'Y座標',
            }],
          ],
          label: '変数で指定',
        }],
        label: '座標',
      }, {
        key: 'scale',
        type: 'vector',
        values: [['number', {
          default: 100,
          label: '幅',
        }], ['number', {
          default: 100,
          label: '高さ',
        }]],
        label: '拡大率',
      }, {
        key: 'opacity',
        type: 'volume',
        value: ['number', {
          min: 0,
          max: 255,
          default: 255,
        }],
        label: '不透明度',
      }, {
        key: 'blend',
        type: 'select',
        value: ['keyword', {
          values: [{
            value: 'normal',
            label: '通常',
          }, {
            value: 'add',
            label: '加算',
          }, {
            value: 'multiply',
            label: '乗算',
          }, {
            value: 'screen',
            label: 'スクリーン',
          }],
        }],
        label: '合成方法',
      }, {
        key: 'duration',
        type: 'value',
        value: ['number', {
          min: 0,
          default: 60,
        }],
        label: '変更にかける時間（フレーム）',
      }, {
        key: 'wait',
        type: 'optional',
        value: ['true'],
        label: '完了までウェイト',
      },
    ],
    description ([
      id,
      file,
      origin,
      byVariable, x, y,
      scaleX, scaleY,
      opacity, blend,
      duration,
      wait
    ]: IMovePictureCommand['parameters']) {
      const parameters = [
        `#${id}`,
        `${['左上', '中央'][origin]} (${byVariable ? v(x) : x},${byVariable ? v(y) : y})`,
        `(${scaleX}%,${scaleY}%)`,
        opacity,
        `${['通常', '加算', '乗算', 'スクリーン'][blend]}`,
        `${duration}フレーム`,
      ].join(', ')
      return {
        content: `${this.title}：${parameters}`,
        color: 'picture',
        option: wait ? ' (ウェイト)' : '',
      }
    },
  },
  // IRotatePictureCommand
  233: {
    name: 'rotatePicture',
    title: 'ピクチャの回転',
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 1,
          max: 100,
          default: 1,
        }],
        label: 'ピクチャ番号'
      },
      {
        key: 'speed',
        type: 'number',
        value: ['number', {
          default: 0,
        }],
        label: '回転速度'
      },
    ],
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
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 1,
          max: 100,
          default: 1,
        }],
        label: 'ピクチャ番号'
      }, {
        type: 'tone',
        values: [['number', {
          min: -255,
          max: 255,
          default: 0,
        }], ['number', {
          min: -255,
          max: 255,
          default: 0,
        }], ['number', {
          min: -255,
          max: 255,
          default: 0,
        }], ['number', {
          min: 0,
          max: 255,
          default: 0,
        }]],
        label: '色調',
      }, {
        key: 'duration',
        type: 'number',
        value: ['number', {
          min: 0,
          default: 60,
        }],
        label: '変更にかける時間（フレーム）',
      }, {
        key: 'wait',
        type: 'optional',
        value: ['true'],
        label: '完了までウェイト'
      },
    ],
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
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 1,
          max: 100,
          default: 1,
        }],
        label: 'ピクチャ番号'
      },
    ],
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
    parameterSignatures: [
      {
        type: 'select',
        value: ['keyword', {
          values: [{
            value: 'none',
            label: 'なし',
          }, {
            value: 'rain',
            label: '雨',
          }, {
            value: 'storm',
            label: '嵐',
          }, {
            value: 'snow',
            label: '雪',
          }],
          label: '種類',
        }],
      }, {
        key: 'force',
        type: 'volume',
        value: ['number', {
          min: 1,
          max: 9,
          default: 5,
        }],
        label: '強さ',
      }, {
        key: 'duration',
        type: 'value',
        value: ['number', {
          min: 0,
          default: 60,
        }],
        label: '変更にかける時間（フレーム）',
      }, {
        key: 'wait',
        type: 'optional',
        value: ['true'],
        label: '完了までウェイト',
      },
    ],
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
    parameterSignatures: [
      {
        type: 'filename',
        value: ['filename', {
          folder: 'audio/bgm',
          name: 'bgm',
        }],
        label: 'ファイル名',
      }, {
        key: 'volume',
        type: 'volume',
        value: ['number', {
          min: 0,
          max: 100,
          default: 90,
        }],
        label: '音量',
      }, {
        key: 'pitch',
        type: 'volume',
        value: ['number', {
          min: 50,
          max: 150,
          default: 100,
        }],
        label: 'ピッチ',
      }, {
        key: 'pan',
        type: 'volume',
        value: ['number', {
          min: -100,
          max: 100,
          default: 0,
        }],
        label: '位相',
      },
    ],
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
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 0,
          default: 3,
        }],
        label: 'フェードアウトにかける時間（秒）',
      },
    ],
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
    parameterSignatures: [],
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
    parameterSignatures: [],
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
    parameterSignatures: [
      {
        type: 'filename',
        value: ['filename', {
          folder: 'audio/bgs',
          name: 'bgs',
        }],
        label: 'ファイル名',
      }, {
        key: 'volume',
        type: 'volume',
        value: ['number', {
          min: 0,
          max: 100,
          default: 90,
        }],
        label: '音量',
      }, {
        key: 'pitch',
        type: 'volume',
        value: ['number', {
          min: 50,
          max: 150,
          default: 100,
        }],
        label: 'ピッチ',
      }, {
        key: 'pan',
        type: 'volume',
        value: ['number', {
          min: -100,
          max: 100,
          default: 0,
        }],
        label: '位相',
      },
    ],
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
    parameterSignatures: [
      {
        type: 'number',
        value: ['number', {
          min: 0,
          default: 3,
        }],
        label: 'フェードアウトにかける時間（秒）',
      },
    ],
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
    parameterSignatures: [
      {
        type: 'filename',
        value: ['filename', {
          folder: 'audio/me',
          name: 'me',
        }],
        label: 'ファイル名',
      }, {
        key: 'volume',
        type: 'volume',
        value: ['number', {
          min: 0,
          max: 100,
          default: 90,
        }],
        label: '音量',
      }, {
        key: 'pitch',
        type: 'volume',
        value: ['number', {
          min: 50,
          max: 150,
          default: 100,
        }],
        label: 'ピッチ',
      }, {
        key: 'pan',
        type: 'volume',
        value: ['number', {
          min: -100,
          max: 100,
          default: 0,
        }],
        label: '位相',
      },
    ],
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
    parameterSignatures: [
      {
        type: 'filename',
        value: ['filename', {
          folder: 'audio/se',
          name: 'se',
        }],
        label: 'ファイル名',
      }, {
        key: 'volume',
        type: 'volume',
        value: ['number', {
          min: 0,
          max: 100,
          default: 90,
        }],
        label: '音量',
      }, {
        key: 'pitch',
        type: 'volume',
        value: ['number', {
          min: 50,
          max: 150,
          default: 100,
        }],
        label: 'ピッチ',
      }, {
        key: 'pan',
        type: 'volume',
        value: ['number', {
          min: -100,
          max: 100,
          default: 0,
        }],
        label: '位相',
      },
    ],
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
    parameterSignatures: [],
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
    parameterSignatures: [
      {
        type: 'filename',
        value: ['filename', {
          folder: 'movies',
          name: 'movie',
        }],
        label: 'ファイル名',
      },
    ],
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
    parameterSignatures: [
      {
        type: 'filename',
        value: ['filename', {
          folder: 'img/parallaxes',
          name: 'parallax',
        }],
        label: 'ファイル名',
      },
      {
        key: 'loopX',
        type: 'optional',
        value: ['number', {
          default: 0,
          label: 'スクロール量',
        }],
        label: '横方向のループ',
      },
      {
        key: 'loopY',
        type: 'optional',
        value: ['number', {
          default: 0,
          label: 'スクロール量',
        }],
        label: '縦方向のループ',
      },
    ],
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
    parameterSignatures: [],
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
    parameterSignatures: [],
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
    parameterSignatures: [],
    description (parameters: IReturnToTitleCommand['parameters']) {
      return {
        content: this.title,
        color: 'system',
      }
    },
  },
}