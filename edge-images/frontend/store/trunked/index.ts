import { TrunkedCall, Transcription } from "~/assets/gql.types"

interface TrunkedState {
  trunkedCalls: TrunkedCall[];
  selected?: Partial<TrunkedCall>;
}

export const state = (): TrunkedState => ({
  trunkedCalls: [],
  selected: { id: undefined },
});

export const mutations = {
  add(state: TrunkedState, call: TrunkedCall | TrunkedCall[]) {
    if (Array.isArray(call)) {
      state.trunkedCalls.push(...call);
    } else {
      state.trunkedCalls.push(call);
    }
  },
  update(state: TrunkedState, call: Partial<TrunkedCall>) {
    const idx = state.trunkedCalls.map((c) => c.id).indexOf((call as any).id);
    if (idx >= 0) {
      const copy = state.trunkedCalls[idx];
      Object.keys(call).map((key) => {
        copy[key] = call[key];
      });
      state.trunkedCalls[idx] = copy;
    }
  },
  setTranscription(state: TrunkedState, transcription: Transcription) {
    (state.trunkedCalls.find((c) => c.id === transcription.call.id))!.transcription = transcription;
  },
  setSelectedById(state: TrunkedState, selectedId: string) {
    state.selected = state.trunkedCalls.find(({ id }) => id === selectedId);
  },
  setSelected(state: TrunkedState, selected: TrunkedCall) {
    state.selected = selected;
  },
};

export const getters = {
  trunkedCalls: (state: TrunkedState) => {
    return state.trunkedCalls;
  },
  selected: (state: TrunkedState) => {
    return state.selected;
  },
};
