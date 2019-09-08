export interface IPlayAudioParameter {
  name: string
  volume: number
  pitch: number
  pan: number
}
export type ColorParameter = [number, number, number, number]

export type ShowMessageParameters = [string, number, number, number]
export type FlashScreenParameters = [ColorParameter, number, number]
export type TintScreenParameters = [ColorParameter, number, number]
export type ShakeScreenParameters = [number, number, number, boolean]
export type ShowPictureParameters = [
  number,
  string,
  number,
  boolean,
  number,
  number,
  number,
  number,
  number,
  number,
]
export type MovePictureParameters = [
  number,
  null,
  number,
  boolean,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  boolean,
]
export type TintPictureParameters = [number, ColorParameter, number, number, number]
export type WeatherParameters = [number, number, number, boolean]
export type ChangeBackgroundParameters = [string, number, number, number, number]
