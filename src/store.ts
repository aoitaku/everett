import { ShowMessageParameters } from './commands/parameters'
import Parser from './parser'
import errorTransform from './parser-error-transform'
import resultTransform, { resultDescriptions } from './parser-result-transform'
import { ICommandDescription } from './commands/definitions'

export interface ISharedState {
  selectedProject: string | null
  selectedFile: string | null
  files: { [key: string]: string[] }
  variables: { [key: number]: string | number }
  eventDataJSON: string
  parseResult: ICommandDescription[]
  parseError: string
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
    files: {},
    variables: {},
    eventDataJSON: '',
    parseResult: [],
    parseError: '',
    source: '',
    showMessageParameters: ['Actor1', 0, 0, 2],
    edited: false,
    busy: false,
  },
  initState () {
    this.state.selectedProject = null
    this.state.selectedFile = null
    this.state.eventDataJSON = ''
    this.state.parseResult = []
    this.state.source = ''
    this.state.edited = false
    this.state.busy = false
  },
  updateSource (newValue: string) {
    this.state.source = newValue
    try {
      const result = resultTransform(Parser.parse(this.state.source))
      this.state.eventDataJSON = JSON.stringify(result)
      this.state.parseResult = resultDescriptions(result)
      this.state.parseError = ''
    } catch (err) {
      this.state.parseError = errorTransform(err)
    }
  },
}
