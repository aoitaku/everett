import { ShowMessageParameters } from './commands/parameters'

export interface ISharedState  {
  selectedProject: string | null 
  eventDataJSON: string
  parseResult: string
  source: string
  showMessageParameters: ShowMessageParameters
}

export interface IStore {
  state: ISharedState
}

export const store: IStore = {
  state: {
    selectedProject: null,
    eventDataJSON: '',
    parseResult: '',
    source: '',
    showMessageParameters: ["Actor1", 0, 0, 2],
  },
}
