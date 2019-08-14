import { TrunkedCall, Transcription, Maybe } from "~/assets/gql.types";

interface TrunkedState {
  selected?: Maybe<TrunkedCall>;
}

export const state = (): TrunkedState => ({
  selected: undefined,
});

export const mutations = {
  setSelected(state: TrunkedState, selected: TrunkedCall) {
    state.selected = {...selected};
  },
};

export const getters = {
  selected: (state: TrunkedState) => {
    return state.selected;
  },
};
