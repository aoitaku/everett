import { WeatherParameters } from './parameters'

export interface IWeatherCommand {
  code: 236
  indent: number
  parameters: WeatherParameters
}
