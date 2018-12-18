import Vue from "vue";
import colors from "vuetify/es5/util/colors";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  theme: {
    primary: colors.blueGrey.darken4,
    secondary: colors.red.darken4,
    accent: colors.blueGrey.lighten1,
    error: colors.red.darken2,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base,
  },
  customProperties: true,
  iconfont: "fa",
});
