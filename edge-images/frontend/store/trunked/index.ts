import { TrunkedCall } from "~/assets/prisma-client/index";

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
      Object.keys(call).map((key) => {
        state.trunkedCalls[idx][key] = call[key];
      });
    }
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
