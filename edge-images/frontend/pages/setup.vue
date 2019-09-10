<template>
    <v-container class="fill-height" >
        <v-fade-transition>
            <v-layout align-center justify-center fill-height wrap>
                <v-flex xs12 md8 v-if="error">
                    <v-alert type="error" transition="fade" :value="error">{{error}}</v-alert>
                </v-flex>
                <!-- <client-only> -->
                <v-flex sm5 md6 lg12 pa-2 mx-1 text-xs-center>
                    <img class="banner-logo" :src="require('~/static/img/logo-white@3x.png')"/>
                </v-flex>
                <v-flex lg7 md8 sm10 mt-3 mx-3>
                    <v-stepper
                        v-model="step"
                        vertical
                        flat
                        dark
                        class="elevation-12"
                        style="background-color: rgba(0, 0, 0, 0.15) !important;"
                    >
                        <v-stepper-step :complete="step > 1" step="1">Welcome.</v-stepper-step>
                        <v-stepper-content step="1" class="text-xs-center">
                            <admin-registration/>
                            <v-btn color="primary" outline small @click="step = 2">Continue</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="step > 2" step="2">
                            Authenticate.
                            <small>Lock it down.</small>
                        </v-stepper-step>

                        <v-stepper-content step="2" class="mr-0 pr-2">
                            <v-card class="mb-2" color="transparent" flat>
                                <v-card-text v-if="!awaitingVerification">
                                    <p></p>
                                    <form>
                                        <v-layout row wrap>
                                            <v-flex xs6 pr-2>
                                                <v-text-field
                                                    color="accent lighten-1"
                                                    v-model="email"
                                                    v-validate="'required|email'"
                                                    :error-messages="errors.collect('email')"
                                                    label="E-mail"
                                                    data-vv-name="email"
                                                    required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs6 pl-2>
                                                <v-text-field
                                                    prefix="+1 "
                                                    color="accent lighten-1"
                                                    v-model="phone"
                                                    v-validate="'required|tel-us'"
                                                    :error-messages="errors.collect('phone')"
                                                    label="Phone"
                                                    data-vv-name="phone"
                                                    required
                                                    type="tel"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex sm6 pr-2>
                                                <v-text-field
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
                                            <v-flex sm6 pl-2>
                                                <v-text-field
                                                    v-model="passwordConfirm"
                                                    color="accent lighten-1"
                                                    v-validate="'required|confirmed:password'"
                                                    :error-messages="errors.collect('passwordConfirmation')"
                                                    label="Password confirmation"
                                                    data-vv-name="passwordConfirmation"
                                                    type="password"
                                                ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </form>
                                </v-card-text>
                                <v-card-text v-else>
                                    <v-layout column>
                                        <v-flex class="text-xs-center">
                                            <p class="pb-4 subheading">
                                                Code sent to {{ this.phone | prettyPhone }}.
                                            </p>
                                            <otp-input @on-complete="otpInputComplete"
                                                       class="justify-center text-xs-center" :num-inputs="6"
                                                       :shouldAutoFocus="true"
                                                       inputClasses="otp-input"
                                                       separator="<span>&nbsp;&nbsp;&nbsp;</span>"></otp-input>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-flex text-xs-center v-if="!awaitingVerification">
                                    <v-btn
                                        @click="submit"
                                        :disabled="submitDisabled"
                                        ref="submit"
                                        color="primary"
                                        outline
                                        small
                                    >Continue
                                    </v-btn>
                                </v-flex>
                                <v-layout row>
                                    <v-flex sm6 text-xs-center v-if="awaitingVerification">
                                        <v-btn
                                            @click="awaitingVerification = false"
                                            flat
                                            small
                                        >Back
                                        </v-btn>
                                    </v-flex>
                                    <v-flex sm5 text-xs-center v-if="awaitingVerification">
                                        <v-btn
                                            @click="submit"
                                            :disabled="submitDisabled"
                                            ref="submit"
                                            color="primary"
                                            outline
                                            small
                                        >Continue
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-stepper-content>


                        <v-stepper-step :complete="step > 3" step="3">
                            Configure.
                            <small>
                                Remote access, WiFi, location & display
                                settings.
                            </small>
                        </v-stepper-step>

                        <admin-registation-settings :step="step"/>

                        <v-stepper-step step="4">Capture.</v-stepper-step>
                        <v-stepper-content step="4">
                            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                            <v-btn color="primary" @click="step = 1">Continue</v-btn>
                            <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>
                    </v-stepper>
                </v-flex>
            </v-layout>
        </v-fade-transition>
    </v-container>
</template>
<script lang="ts">
  import vueOtpInput from "@bachdgvn/vue-otp-input";
  import consola from "consola";
  import { Component, Vue, Watch } from "nuxt-property-decorator";
  import phone from "phone";
  import { REGISTER_ADMIN } from "~/assets/apollo/mutations/register";
  import { DEVICE_REGISTERED } from "~/assets/apollo/queries/auth/getDeviceRegistered";
  import { SEND_AUTHY_TEXT } from "~/assets/apollo/queries/auth/sendAuthyText";
  import AdminRegistationSettings from "~/components/cards/AdminRegistationSettings.vue";
  import AdminRegistrationMessage from "~/components/cards/AdminRegistrationMessage.vue";

  @Component({
    layout: "authenticate",
    head: {
      title: "Welcome to SkyScraper",
      titleTemplate: undefined,
    },
    components: {
      AdminRegistationSettings,
      AdminRegistration: AdminRegistrationMessage,
      "otp-input": vueOtpInput,
    },
    apollo: {
      deviceRegistered: {
        query: DEVICE_REGISTERED,
        fetchPolicy: "no-cache",
        prefetch: false,
      },
    },
    filters: {
      prettyPhone(n: string) {
        var cleaned = ("" + n).replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          var intlCode = (match[1] ? "+1 " : "");
          return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
        }
        return null;
      },
    },
    data() {
      return {
        step: 1,
        email: `${ (Math.random() * 100).toFixed(0) }@peterk.co`,
        password: "Boomer101!",
        passwordConfirm: "Boomer101!",
        phone: "2039401857",
        submitDisabled: false,
        awaitingVerification: false,
        error: null,
        otpSubmitDisabled: true,
      };
    },
  })
  export default class Register extends Vue {
    deviceRegistered: boolean | null = null;
    step = 1;
    email = "";
    password = "";
    passwordConfirm = "";
    phone = "";
    submitDisabled = false;
    awaitingVerification = false;
    error: any = null;
    userId: string | undefined = undefined;
    otpInput: string = "";
    otpSubmitDisabled = true;

    @Watch("deviceRegistered")
    registeredResult() {
      this.$nuxt.$loading.finish();
      if (this.deviceRegistered === true) {
        this.$router.replace("/login");
      }
    }

    async submit() {
      this.submitDisabled = true;
      const valid = await this.$validator.validateAll();
      if (!valid) {
        this.submitDisabled = false;
        return;
      }
      this.registerAdmin();
    }

    async registerAdmin() {
      this.$nuxt.$loading.start();
      await this.$apollo
        .mutate({
          mutation: REGISTER_ADMIN,
          variables: {
            email: this.email,
            password: this.password,
            phone: phone(this.phone, "US")[0],
          },
        })
        .then((result) => {
          consola.info(
            `Registered admin ${ this.email } ${ result.data.register.id }`,
          );
          this.awaitingVerification = true;
          this.userId = result.data.register.id;
          this.verifyAdmin();
          this.$nuxt.$loading.finish();
        })
        .catch((e) => {
          this.error = e;
          consola.error(e);
          this.clear();
          this.$nuxt.$loading.finish();
          return;
        });
    }

    async verifyAdmin() {
      await this.$apollo
        .query({
          query: SEND_AUTHY_TEXT,
          variables: { user: { id: this.userId } },
        })
        .then(() => {
          consola.info("Sent auth SMS to " + this.phone);
        });
    }

    otpInputComplete(code: any) {
      consola.info(code);
      this.otpInput = code;
      this.otpSubmitDisabled = false;
    }

    clear() {
      this.password = "";
      this.passwordConfirm = "";
      this.phone = "";
      this.email = "";
      this.$validator.reset();
      this.submitDisabled = false;
    }

    mounted() {
      this.$nextTick(() => {
        if (
          this.$nuxt.$loading &&
          typeof this.$nuxt.$loading.start === "function"
        )
          this.$nuxt.$loading.start();
      });
    }
  }
</script>

<style lang="scss">
    .banner-logo {
        width: 100%;
        max-width: 500px;
    }

    .otp-input {
        color: indigo;
        background-color: white;
        height: 48px;
        width: 32px;
        font-size: 1.6rem;
        text-align: center;
        border-radius: 4px;
    }
</style>
