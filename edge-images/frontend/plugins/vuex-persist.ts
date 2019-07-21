import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  return new VuexPersistence({
    storage: (window as any).localforage,
  }).plugin(store);
};
