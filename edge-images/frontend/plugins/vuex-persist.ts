import VuexPersistence from "vuex-persist";


export default ({ store }) => {
  (window as any).onNuxtReady(() => {
    new VuexPersistence({
    }).plugin(store);
  });
};

