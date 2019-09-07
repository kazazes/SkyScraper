import { Maybe, TrunkedSystem } from "../../types/gql.types";

interface SystemsState {
  trunkedSystems?: Maybe<TrunkedSystem[]>;
}

export const state = (): SystemsState => ({
  trunkedSystems: undefined,
});

export const mutations = {
  setTrunkedSystems(state: SystemsState, systems: TrunkedSystem[]) {
    state.trunkedSystems = systems;
  },
};

export const getters = {
  systems: (state: SystemsState) => {
    return state.trunkedSystems;
  },
};
