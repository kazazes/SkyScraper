<template>
  <v-container fluid grid-list-xl py-0>
    <ValidationObserver ref="observer" v-slot="{ invalid, validate, errors }" tag="form">
      <v-form @submit.prevent="validate().then(submit)">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <ValidationProvider name="name" rules="required|alpha_spaces|min:4|max:30">
              <v-text-field
                key="name"
                v-model="nameInput"
                slot-scope="{
                  errors,
                  valid
                }"
                v-validate
                data-vv-name="name"
                :error-messages="errors"
                :success="valid"
                label="Profile name"
                placeholder="City - State, Network"
                required
              />
            </ValidationProvider>
            <!-- TODO: CHANGE ALL TO VALDATION PROVIDER -->
            <v-select
              v-model="systemType"
              v-validate="'required'"
              :items="systemTypes"
              label="System type"
              data-vv-name="systemType"
              :error-messages="errors['systemType']"
              required
            />
            <v-select
              v-if="systemType === 'SMARTNET'"
              key="bandplan"
              v-model="bandplan"
              v-validate="'required'"
              :items="bandplans"
              label="Bandplan"
              data-vv-name="bandplan"
              :error-messages="errors['bandplan']"
              required
            />
          </v-flex>
          <v-flex xs12 md6>
            <v-layout v-if="systemType === 'SMARTNET'" row wrap>
              <v-flex v-if="bandplan === 'CUSTOM_400'" key="base" md6>
                <v-text-field
                  v-model="bandplanBase"
                  v-validate="'required|decimal:5|max_value:6000|min_value:80'"
                  label="Base frequency"
                  suffix="MHz"
                  data-vv-name="base"
                  :error-messages="errors['base']"
                  required
                  hint="The system base frequency."
                />
              </v-flex>
              <v-flex v-if="bandplan === 'CUSTOM_400'" key="spacing" md6>
                <v-text-field
                  v-model="bandplanSpacing"
                  v-validate="
                    'required|decimal:5|max_value:1000000|min_value:0'
                  "
                  label="Frequency spacing"
                  data-vv-name="bandplan spacing"
                  :error-messages="errors['bandplan spacing']"
                  suffix="kHz"
                  hint="The system channel spacing."
                  required
                />
              </v-flex>
              <v-flex v-if="bandplan === 'CUSTOM_400'" key="offset" md6>
                <v-text-field
                  v-model="bandplanOffset"
                  v-validate="
                    'required|decimal:5|max_value:1000000|min_value:0'
                  "
                  label="Offset frequency"
                  data-vv-name="bandplan offset"
                  :error-messages="errors['bandplan offset']"
                  suffix="kHz"
                  required
                  hint="The offset used to calculate frequencies."
                />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md6>
                <v-text-field
                  key="high"
                  v-model="bandplanHigh"
                  v-validate="'required|decimal:5|max_value:6000|min_value:80'"
                  label="Highest frequency"
                  suffix="MHz"
                  data-vv-name="high"
                  :error-messages="errors['high']"
                  required
                  hint="The highest frequency in the system."
                />
              </v-flex>
              <v-flex md6>
                <v-text-field
                  key="low"
                  v-model="bandplanLow"
                  v-validate="'required|decimal:5|max_value:6000|min_value:80'"
                  label="Lowest frequency"
                  suffix="MHz"
                  data-vv-name="low"
                  :error-messages="errors['low']"
                  required
                  hint="The lowest frequency in the system."
                />
              </v-flex>
            </v-layout>
            <v-combobox
              v-model="channels"
              ref="channelInput"
              v-validate="
                'required|max:10|length:2|max_value:6000|min_value:80'
              "
              key="controlChannels"
              :rules="[validateChannels]"
              data-vv-name="channels"
              suffix="MHz"
              label="Control channels"
              append-icon
              multiple
              chips
              small
              :hint="bandwidthString"
              required
            />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md4 offset-md4>
            <v-btn block color="accent" :disabled="!invalid">
              Continue
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script lang="ts">
import { randomBytes } from "crypto"
import {
  FieldFlags,
  ValidationObserver,
  ErrorBag,
  ValidationProvider
} from "vee-validate"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { validFrequencyKHz, validFrequencyMHz } from "~/utils/frequencies"
import {
  TrunkedSmartnetBandplan,
  TrunkedSystemType,
  TrunkedSystemCreateInput
} from "~/types/gql.types"

const MAX_TRUNKED_RANGE_MHZ = 15

  @Component({
    methods: {
      validFrequencyKHz,
      validFrequencyMHz
    },
    components: {
      ValidationObserver,
      ValidationProvider
    }
  })
export default class TrunkedWizardSystem extends Vue {
    @Prop() configs!: any[];
    controlChannels: string[] = [];
    controlChannelErrors: string[] = [];
    conventionalChannels: string[] = [];
    conventionalChannelErrors: string[] = [];
    nameInput = "";
    bandplan = TrunkedSmartnetBandplan.Reband_800;
    bandplanBase: string = "";
    bandplanHigh: string = "";
    bandplanLow: string = "";
    bandplanOffset = "";
    bandplanSpacing = "25";
    bandplans: { value: TrunkedSmartnetBandplan; text: string }[] = [
      { value: TrunkedSmartnetBandplan.Standard_800, text: "800 Standard" },
      { value: TrunkedSmartnetBandplan.Reband_800, text: "800 Reband" },
      { value: TrunkedSmartnetBandplan.Splinter_800, text: "800 Splinter" },
      { value: TrunkedSmartnetBandplan.Custom_400, text: "400 Custom" }
    ];

    systemType = TrunkedSystemType.Smartnet;
    systemTypes: { value: TrunkedSystemType; text: string }[] = [
      { value: TrunkedSystemType.Conventional, text: "Conventional" },
      { value: TrunkedSystemType.P25, text: "P25" },
      { value: TrunkedSystemType.Smartnet, text: "Motorola" },
      { value: TrunkedSystemType.ConventionalP25, text: "Conventional P25" }
    ];

    get systemCreateInput (): TrunkedSystemCreateInput {
      const createInput: TrunkedSystemCreateInput = {
        bandplan: this.bandplan,
        bandplanBase: Number(this.bandplanBase),
        bandplanHigh: Number(this.bandplanHigh),
        bandplanLow: Number(this.bandplanLow),
        bandplanOffset: Number(this.bandplanOffset),
        bandplanSpacing: Number(this.bandplanSpacing),
        controlChannels: { set: this.controlChannels.map(c => Number(c)) },
        channels: { set: this.conventionalChannels.map(c => Number(c)) },
        type: this.systemType,
        shortName: randomBytes(3).toString("hex")
      }

      return createInput
    }

    async validateForm () {
      return (this.$refs.observer as any).validate()
    }

    get channels () {
      if (this.systemType === "CONVENTIONAL") { return this.conventionalChannels } else { return this.controlChannels }
    }

    set channels (a: string[]) {
      if (this.systemType === "CONVENTIONAL") { this.conventionalChannels = a } else { this.controlChannels = a }
    }

    get conventional () {
      return this.systemType === "CONVENTIONAL"
    }

    get channelNumbers () {
      return this.channels.map(c => Number(c))
    }

    validateChannels () {
      if (this.channels.length < 2) { return true }
      const min = this.minChannel
      const max = this.maxChannel
      console.log(`Min: ${min} Max: ${max} Diff: ${max - min}`)
      if (max - min > MAX_TRUNKED_RANGE_MHZ) {
        const err = `${(max - min).toFixed(
          2
        )} MHz is above max range of ${MAX_TRUNKED_RANGE_MHZ} MHz.`
        return err
      }
      if (this.channels.length > 1) { return true }
    }

    get minChannel () {
      if (this.channels.length < 1) { return 400.0 }
      const ctrl = this.channelNumbers
      return ctrl.reduce((prev, current) => {
        if (Number(current) < Number(prev)) { return current } else { return prev }
      })
    }

    get maxChannel () {
      if (this.channels.length < 1) { return 400.0 }
      const ctrl = this.channelNumbers
      const max = ctrl.reduce((prev, current) => {
        if (Number(current) > Number(prev)) { return current } else { return prev }
      })
      return max
    }

    get medianChannel () {
      if (this.channels.length < 1) { return 400.0 }
      const median = (this.maxChannel + this.minChannel) / 2
      console.log(`Median: ${median}`)
      return median
    }

    get bandwidthString () {
      if (this.channels.length < 2) {
        return `Input at least two ${
          this.systemType === "CONVENTIONAL" ? "conventional" : "control"
        } channels.`
      } else { return `Bandwidth: ${this.bandwidth.toFixed(2)} MHz` }
    }

    get bandwidth () {
      if (this.maxChannel && this.minChannel) { return this.maxChannel - this.minChannel } else { return 0 }
    }
}
</script>
