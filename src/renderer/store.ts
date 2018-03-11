import { ShowMessageParameters } from './commands/parameters'
import * as Parser from './parser'
import errorTransform from './parser-error-transform'
import resultTransform, { describeResult } from './parser-result-transform'

export interface ISharedState  {
  selectedProject: string | null
  selectedFile: string | null
  eventDataJSON: string
  parseResult: string
  source: string
  showMessageParameters: ShowMessageParameters
  edited: boolean
  busy: boolean
}

export interface IStore {
  state: ISharedState
  initState (): void
  updateSource (newValue: string): void
}

export const store: IStore = {
  state: {
    selectedProject: null,
    selectedFile: null,
    eventDataJSON: '',
    parseResult: '',
    source: '',
    showMessageParameters: ["Actor1", 0, 0, 2],
    edited: false,
    busy: false,
  },
  initState () {
    this.state.selectedProject = null
    this.state.selectedFile = null
    this.state.eventDataJSON = ''
    this.state.parseResult = ''
    this.state.source = ''
    this.state.edited = false
    this.state.busy = false
  },
  updateSource (newValue: string) {
    this.state.source = newValue
    try {
      const result = resultTransform(Parser.parse(this.state.source))
      this.state.eventDataJSON = JSON.stringify(result)
      this.state.parseResult = describeResult(result)
    } catch (err) {
      this.state.parseResult = errorTransform(err)
    }
  },
}
