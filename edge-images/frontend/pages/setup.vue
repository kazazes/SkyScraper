<template>
  <v-container class="fill-height" fluid>
    <v-fade-transition>
      <v-layout align-center justify-center fill-height wrap>
        <client-only>
          <v-flex md6 lg4 mx-1 text-xs-center>
            <img class="banner-logo" :src="require('~/static/img/logo-white@3x.png')">
          </v-flex>
          <v-flex lg6 offset-lg1 md8>
            <v-stepper v-model="step" vertical flat dark class="elevation-12"
                       style="background-color: transparent !important;">
              <v-stepper-step :complete="step > 1" step="1">
                Welcome.
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="mb-5" color="transparent" max-height="300px" style="overflow-y: scroll">
                  <v-card-text>
                    <p>Any large system in the developed world, be it digital, scientific, or social, depends on some
                      radio system
                      for its function. Since its invention, radio pioneers have not stoped building more robust,
                      efficient and powerful radio devices. With 120 years of compounding advancement, radios have
                      transcended into specialized and sophisticated systems so performant and reliable it's easy to
                      forget they're there. Performance comes at the prices of sophistication; we've reached the point
                      where it is imposible to interface, catalog or analyze these systems. For seismologists, telecom,
                      doctors, astronomers, pilots, biologists, farmers, law enforcement, door bells, car keys and 6
                      devices
                      within an arms reach, radio is an indespencible part of a utile pursuit.
                    </p>
                    <p>
                      Software defined radio was fated to exist. By offloading the processing burden to a tool better
                      suited, a radio can now monitor massive swaths of spectrum with instantaneous feedback. There's
                      also no need for the doctrinaire of infallible radios anymore; the computer can deal with less
                      than perfect signals. So, rather than continue down the increasingly insurmoutable strive for
                      domain-constrained analog radio tech, we traded physically constrained analog hardware
                      for radios supercharged first by small transistors, and in the last twenty years, by anyone with a
                      computer and $20.
                    </p>
                    <p>
                      This was of course a complete transformation for radio applications; it goes without saying that
                      radios themselves are in a golden age. WiFi speeds double every election cycle, cars are
                      starting to communicate, and as of this summer a watch battery can transmit a datastream 500
                      miles. Radio gave us a revolution as a squaky soapbox, from fireside chats to Apollo, radio was
                      the messenger. It's happening again; but this time the entire developed world is being sold a
                      radio every few weeks, while a millenial army of entrepenirual engineers attack the century
                      old problem from the same tack, albeit with more resources than ever before.
                    </p>
                    <p>
                      As it turns out, the complexity of protocols past is well documented. Though arduous, any radio
                      transmitter transmitting unencrypted is parsable. With exploding RF use across industries, that
                      "dark" data is begging to be brought to light. While computers and radio have been married for
                      decades, we've reached a triple point of cheap computing power and SDRs, the real AI/ML
                      research of the last decade is slowly percolating out of academia and big co's and into
                      the commercial and OSS zeitgeist, and IoT and DevOps tooling actually making this feasible as a
                      platform. With all this in hand, SkyScraper is a bridge from the airwaves to modern data science
                      practices, a privilege hitherto reserved for spooky men in vans.
                    </p>
                    <p>We've abstracted away the configuration, compilation and endless shots in the dark of dealing
                      with SDR software and its assorted woes. More complex systems, like trunked radio systems, are
                      auto-configured by location. We're SDR vendor agnostic. Plug it in, and SkyScraper will allocate
                      its bandwidth appropriately. If you know your way around already, there is an entire dev
                      playground
                      built in to the data processing stack. NLP, realtime transcription, intelligent alerting,
                      with a sanitized and standardized dataset of plane, train and boat telemetry, cops, firemen,
                      robbers, taxi drivers, ISS transmissions, NOAA weather satellite images and all the good data
                      we've
                      juiced out of it.
                    </p>
                    <p>
                      SkyScraper is the first device dedicated to capturing all the (legal, per the FCC) bits and bytes
                      flying around us, whatever the protocol, whatever the context, and further enriching that data
                      until it affects change. For a journalist, that's getting a push notification about an incident
                      as soon as a 911 call is placed. For a falconer, it's finding your tagged bird six hours sooner
                      than otherwise, for a marine biologist it's visualizing tagged sharks with higher fidelity than
                      satallite capture could never rival.</p>
                    <p>
                      And while the scientific and general utility is apparent but not yet fully realized, the most
                      transformative function of SkyScraper is for the billions of people whose governments have
                      premptively outlawed similar technologies out of cowardice. It's for the men and women who need a
                      tool instead of a weapon to right an injustice. Whether it's tagging sharks, catching poachers,
                      popping up a cell tower after a hurricane, Nightcrawler fanboys or just listening to those HF
                      French jazz stations, democratizing the airwaves is our mission.
                    </p>
                    <p class="blockquote">“New innovations in SDR hardware won’t be very useful, however, if the
                      software and tools don’t follow. That is the whole point of SDR, after all.”<br><span
                        style="display:block" class="text-xs-right">- National Instruments, SDR: Past, Present, and Future</span></p>
                  </v-card-text>
                </v-card>
                <v-btn color="primary" outline small @click="step = 2">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="step > 2" step="2">Authenticate.<small>Lock it down.</small></v-stepper-step>

              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="step = 3">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="step > 3" step="3">Configure.<small>Remote access, WiFi, location & display
                settings.</small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="step = 4">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step step="4">Capture.</v-stepper-step>
              <v-stepper-content step="4">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="step = 1">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-flex>
        </client-only>
      </v-layout>
    </v-fade-transition>
  </v-container>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "nuxt-property-decorator";
  import { DEVICE_REGISTERED } from "~/assets/apollo/queries/auth/getDeviceRegistered";

  @Component({
    layout: "authenticate",
    head: {
      title: "Register",
    },
    apollo: {
      deviceRegistered: {
        query: DEVICE_REGISTERED,
        fetchPolicy: "no-cache",
        prefetch: false,
      },
    },
    data() {
      return {
        step: 1,
      };
    },
  })
  export default class Register extends Vue {
    deviceRegistered: boolean | null = null;

    @Watch("deviceRegistered")
    registeredResult() {
      this.$nuxt.$loading.finish();
      if (this.deviceRegistered === true) {
        this.$router.replace("/login");
      }
    }

    mounted() {
      this.$nextTick(() => {
        if (this.$nuxt.$loading && typeof this.$nuxt.$loading.start === "function")
          this.$nuxt.$loading.start();
      });
    }
  }
</script>

<style>
  .banner-logo {
    width: 100%
  }
</style>
