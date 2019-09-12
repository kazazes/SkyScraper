import { User } from "~/types/gql.types";

interface UserState {
  user?: Partial<User>;
  token?: string;
}

export const state = (): UserState => ({
  user: undefined,
  token: undefined
});

export const mutations = {
  setUser(state: UserState, user: Partial<User>) {
    state.user = user;
  },
  setToken(state: UserState, token: string) {
    state.token =  token;
  },
};

export const getters = {
  token: (state: UserState) => {
    return state.token;
  },
  user: (state: UserState) => {
    return state.user;
  }
};


