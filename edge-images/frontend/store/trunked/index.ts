import { Maybe, Transcription, TrunkedCall } from "../../types/gql.types"

interface TrunkedState {
  selected?: Maybe<TrunkedCall>;
  selectedTranscription?: Maybe<Transcription>;
}

export const state = (): TrunkedState => ({
  selected: undefined,
  selectedTranscription: undefined
})

export const mutations = {
  setSelected (state: TrunkedState, selected: TrunkedCall) {
    if (selected.transcription) {
      state.selectedTranscription = selected.transcription
    } else {
      state.selectedTranscription = undefined
    }
    state.selected = selected
  },
  setSelectedTranscription (state: TrunkedState, selected: Transcription) {
    state.selectedTranscription = selected
  }
}

export const getters = {
  selected: (state: TrunkedState) => {
    return state.selected
  },
  selectedTranscription: (state: TrunkedState) => {
    return state.selectedTranscription
  }
}
