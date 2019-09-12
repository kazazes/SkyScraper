<template>
    <v-layout align-center justify-center fill-height column>
        <v-flex xs12 md8 v-if="error">
            <v-alert type="error" transition="fade" :value="error">{{error}}</v-alert>
        </v-flex>
        <!-- <client-only> -->
        <v-flex xs2 offset-md3 pa-2 ma-4 pa-4 text-xs-center>
            <img class="banner-logo" :src="require('~/static/img/logo-white@3x.png')"/>
        </v-flex>
        <v-flex mt-3 mx-3 style="width: 400px;" class="align-content-start">
            <v-card class="mb-2" color="transparent">
                <v-card-text>
                    <form>
                        <v-layout row wrap>
                            <v-flex pr-2 xs12>
                                <v-text-field
                                    color="accent lighten-1"
                                    dark
                                    v-model="email"
                                    v-validate="'required|email'"
                                    :error-messages="errors.collect('email')"
                                    label="E-mail"
                                    data-vv-name="email"
                                    required
                                ></v-text-field>
                            </v-flex>
                            <v-flex pr-2 xs12>
                                <v-text-field
                                    dark
                                    color="accent lighten-1"
                                    v-model="password"
                                    v-validate="'required|min:6|password'"
                                    :error-messages="errors.collect('password')"
                                    label="Password"
                                    data-vv-name="password"
                                    ref="password"
                                    type="password"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-flex text-xs-center>
                            <v-btn
                                @click="submit"
                                :disabled="submitDisabled"
                                ref="submit"
                                color="primary"
                                outline
                            >Login
                            </v-btn>
                        </v-flex>
                    </form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<style scoped>
    .login-button {
        border: 0;
    }
</style>

<script lang="ts">
  import consola from "consola";
  import { Component, Vue } from "nuxt-property-decorator";
  import { LOGIN } from "~/assets/apollo/queries/auth/login";

  @Component({
    layout: "authenticate",
    head: {
      title: "Login | SkyScraper",
      titleTemplate: undefined,
    },
    data() {
      return {
        email: ``,
        password: "",
        submitDisabled: false,
        error: null,
      };
    },
  })
  export default class Login extends Vue {
    email = "";
    password = "";
    submitDisabled = false;
    error: any = null;

    async submit() {
      this.submitDisabled = true;
      const valid = await this.$validator.validateAll();
      if (!valid) {
        this.submitDisabled = false;
        return;
      }
      this.loginSubmit();
    }

    async loginSubmit() {
      debugger
      this.$nuxt.$loading.start();
      const res = await this.$apollo.query({
          query: LOGIN,
          variables: {
            user: { email: this.email },
            password: this.password,
          },
        })
        .catch((e) => {
          consola.error(e);
          this.clear();
          this.submitDisabled = false;
        });
      if (res && res.data.login && res.data.login.token) {
        const  t =res.data.login.token;
        await this.$apolloHelpers.onLogin(t);
        this.$store.commit('user/setToken', t)
        this.$store.commit('user/setUser', res.data.user)
        this.$router.replace("/configure/admin");
      } else {
        this.clear();
        this.submitDisabled = false;
      }
    }

    clear() {
      this.password = "";
      this.email = "";
      this.$validator.reset();
      this.submitDisabled = false;
    }

    mounted() {
      if (this.$auth.loggedIn) {
        this.$router.replace("/configure/admin");
      }
    }
  }
</script>
