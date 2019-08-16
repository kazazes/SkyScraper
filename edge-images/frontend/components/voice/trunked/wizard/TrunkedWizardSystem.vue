<template>
  <v-container fluid grid-list-xl py-0>
    <ValidationObserver>
      <v-form @submit.prevent="submit">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-text-field
              v-model="nameInput"
              v-validate="'required|alpha_spaces|min:4|max:30'"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
              label="Profile name"
              placeholder="City - State, Network"
              required
            ></v-text-field>
            <v-select
              :items="systemTypes"
              v-model="systemType"
              label="System type"
              v-validate="'required'"
              data-vv-name="systemType"
              :error-messages="errors.collect('systemType')"
              required
            ></v-select>
            <v-select
              v-if="systemType === 'SMARTNET'"
              :items="bandplans"
              v-model="bandplan"
              label="Bandplan"
              v-validate="'required'"
              data-vv-name="bandplan"
              :error-messages="errors.collect('bandplan')"
              key="bandplan"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12 md6>
            <v-layout v-if="bandplan === 'CUSTOM_400' && systemType === 'SMARTNET'">
              <v-flex md6>
                <v-text-field
                  v-model="bandplanBase"
                  label="Base frequency"
                  suffix="MHz"
                  v-validate="'required|decimal:5|max_value:6000|min_value:80'"
                  data-vv-name="base"
                  :error-messages="errors.collect('base')"
                  required
                  hint="The system base frequency."
                  key="base"
                ></v-text-field>
                <v-text-field
                  label="High frequency"
                  v-model="bandplanHigh"
                  suffix="MHz"
                  v-validate="'required|decimal:5|max_value:6000|min_value:80'"
                  data-vv-name="high"
                  :error-messages="errors.collect('high')"
                  required
                  hint="The highest channel in the system."
                  key="high"
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field
                  label="Frequency spacing"
                  v-model="bandplanSpacing"
                  v-validate="
                    'required|decimal:5|max_value:1000000|min_value:0'
                  "
                  data-vv-name="bandplan spacing"
                  :error-messages="errors.collect('bandplan spacing')"
                  suffix="kHz"
                  hint="The system channel spacing."
                  key="spacing"
                  required
                ></v-text-field>
                <v-text-field
                  label="Offset frequency"
                  v-model="bandplanOffset"
                  v-validate="
                    'required|decimal:5|max_value:1000000|min_value:0'
                  "
                  data-vv-name="bandplan offset"
                  :error-messages="errors.collect('bandplan offset')"
                  suffix="kHz"
                  key="offset"
                  required
                  hint="The offset used to calculate frequencies."
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-combobox
              v-model="channels"
              :rules="[validateChannels]"
              v-validate="
                'required|max:10|length:2|max_value:6000|min_value:80'
              "
              data-vv-name="channels"
              suffix="MHz"
              label="Control channels"
              append-icon
              multiple
              chips
              :hint="bandwidthString"
              ref="channelInput"
              required
            ></v-combobox>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md4 offset-md4>
            <v-btn block color="accent" :disabled="!formValid">Continue</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script lang="ts">
  import { validFrequencyKHz, validFrequencyMHz } from "~/utils/frequencies";
  import { randomBytes } from "crypto";
  import { FieldFlags, ValidationObserver } from "vee-validate";
  import Vue from "vue";
  import { Component, Prop } from "vue-property-decorator";
  import { ErrorBag } from "vee-validate";

  const MAX_TRUNKED_RANGE_MHZ = 15;

  @Component({
    methods: {
      validFrequencyKHz,
      validFrequencyMHz,
    },
    components: {
      ValidationObserver,
    },
  })
  export default class TrunkedWizardSystem extends Vue {
    // errors = new ErrorBag();
    @Prop() configs!: any[];
    controlChannels: string[] = [];
    controlChannelErrors: string[] = [];
    conventionalChannels: string[] = [];
    conventionalChannelErrors: string[] = [];
    nameInput = "";
    bandplan = "CUSTOM_400";
    bandplanBase: string = "";
    bandplanHigh: string = "";
    bandplanOffset = "";
    bandplanSpacing = "25";
    bandplans: { value: string; text: string }[] = [
      { value: "STANDARD_800", text: "800 Standard" },
      { value: "REBAND_800", text: "800 Reband" },
      { value: "SPLINTER_800", text: "800 Splinter" },
      { value: "CUSTOM_400", text: "400 Custom" },
    ];
    systemType = "SMARTNET";
    systemTypes: { value: string; text: string }[] = [
      { value: "CONVENTIONAL", text: "Conventional" },
      { value: "P25", text: "P25" },
      { value: "SMARTNET", text: "Motorola" },
      { value: "CONVENTIONAL_P25", text: "Conventional P25" },
    ];

    // Get the fragment made by this step of the wizard
    get fragment(): Partial<any> {
      const systemInput: any = {
        bandplan: this.bandplan,
        bandplanBase: Number(this.bandplanBase),
        bandplanHigh: Number(this.bandplanHigh),
        bandplanOffset: Number(this.bandplanOffset),
        bandplanSpacing: Number(this.bandplanSpacing),
        controlChannels: { set: this.controlChannels.map((c) => Number(c)) },
        channels: { set: this.conventionalChannels.map((c) => Number(c)) },
        type: this.systemType,
        shortName: randomBytes(3).toString("hex"),
      };
      return {
        name: this.nameInput,
        systems: {
          create: [systemInput],
        },
      };
    }

    get formValid() {
      return (
        Object.keys(this.$validator.fields).findIndex((k: string) => {
          const f = this.$validator.fields[k] as FieldFlags;
          return f.invalid || f.pending;
        }) === -1
      );
    }

    get channels() {
      if (this.systemType === "CONVENTIONAL") return this.conventionalChannels;
      else return this.controlChannels;
    }

    set channels(a: string[]) {
      if (this.systemType === "CONVENTIONAL") this.conventionalChannels = a;
      else this.controlChannels = a;
    }

    get conventional() {
      return this.systemType === "CONVENTIONAL";
    }

    get channelNumbers() {
      return this.channels.map((c) => Number(c));
    }

    validateChannels() {
      if (this.channels.length < 2) return true;
      const min = this.minChannel;
      const max = this.maxChannel;
      console.log(`Min: ${min} Max: ${max} Diff: ${max - min}`);
      if (max - min > MAX_TRUNKED_RANGE_MHZ) {
        const err = `${(max - min).toFixed(
          2
        )} MHz is above max range of ${MAX_TRUNKED_RANGE_MHZ} MHz.`;
        return err;
      }
      if (this.channels.length > 1) return true;
    }

    get minChannel() {
      const ctrl = this.channelNumbers;
      return ctrl.reduce((prev, current) => {
        if (Number(current) < Number(prev)) return current;
        else return prev;
      });
    }

    get maxChannel() {
      if (this.channels.length < 1) return 400.0;
      const ctrl = this.channelNumbers;
      const max = ctrl.reduce((prev, current) => {
        if (Number(current) > Number(prev)) return current;
        else return prev;
      });
      return max;
    }

    get medianChannel() {
      if (this.channels.length < 1) return 400.0;
      const median = (this.maxChannel + this.minChannel) / 2;
      console.log(`Median: ${median}`);
      return median;
    }

    get bandwidthString() {
      if (this.channels.length < 2)
        return `Input at least two ${
          this.systemType === "CONVENTIONAL" ? "conventional" : "control"
        } channels.`;
      else return `Bandwidth: ${this.bandwidth.toFixed(2)} MHz`;
    }

    get bandwidth() {
      return this.maxChannel - this.minChannel;
    }
  }
</script>
