<template>
  <v-container fluid pa-0>
    <v-container fluid grid-list-lg class="theme--light application">
      <v-layout row wrap>
        <v-flex md6 mt-2 offset-md1>
          <v-select solo :items="configs" item-text="name" item-value="id"></v-select>
        </v-flex>
        <v-flex md2>
          <v-btn block color="warning">Revert</v-btn>
        </v-flex>
        <v-flex md2>
          <v-btn block color="info">Save</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-lg style="padding: 0 15px;" class="theme--light application">
      <v-layout row wrap>
        <v-flex md12>
          <v-card flat tile style="box-shadow: none">
            <v-card-title>
              <v-icon left medium>mdi-radio</v-icon>
              <span class="title font-weight-light">Radios</span>
            </v-card-title>
            <v-data-table
              :headers="radios.headers"
              :items="radios.data"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.model }}</td>
                <td>
                  <pre>{{ props.item.deviceString }}</pre>
                </td>
                <td>{{ props.item.gain }}</td>
                <td>{{ props.item.error }}</td>
                <td>{{ props.item.squelch }}</td>
                <td>{{ props.item.rate }}</td>
                <td>{{ props.item.analogRecorders }}</td>
                <td>{{ props.item.digitalRecorders }}</td>
                <td>{{ props.item.modulation }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
        <v-flex md12>
          <v-card>
            <v-card-title>
              <v-icon left medium>mdi-city</v-icon>
              <span class="title font-weight-light">Systems</span>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    name: "TrunkedAppSettings",
    components: {},
    data: () => {
      return {
        radios: {
          headers: [
            {
              text: "Model",
              value: "model",
              align: "left",
              sortable: false,
            },
            { text: "Device String", value: "deviceString" },
            { text: "Gain", value: "gain" },
            { text: "Error", value: "error" },
            { text: "Squelch", value: "squelch" },
            { text: "Rate", value: "rate" },
            { text: "Analog Recorders", value: "analogRecorders" },
            { text: "Digital Recorders", value: "digitalRecorders" },
            { text: "Modulation", value: "modulation" },
          ],
          data: [
            {
              value: false,
              model: "BladeRF",
              gain: 30,
              analogRecorders: 3,
              digitalRecorders: 3,
              deviceString: "bladerf=0",
            },
          ],
        },

        headers: [
          {
            text: "Dessert (100g serving)",
            align: "left",
            sortable: false,
            value: "name",
          },
          { text: "Calories", value: "calories" },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" },
        ],
        desserts: [
          {
            value: false,
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%",
          },
          {
            value: false,
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            value: false,
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            value: false,
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            value: false,
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%",
          },
          {
            value: false,
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%",
          },
          {
            value: false,
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%",
          },
          {
            value: false,
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%",
          },
          {
            value: false,
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%",
          },
          {
            value: false,
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%",
          },
          {
            value: false,
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            value: false,
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            value: false,
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            value: false,
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%",
          },
          {
            value: false,
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%",
          },
          {
            value: false,
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%",
          },
          {
            value: false,
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%",
          },
          {
            value: false,
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%",
          },
          {
            value: false,
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%",
          },
        ],
        // apollo: { trunkedConfigs: { query: trunkedConfigs } }
      };
    },
  })
  export default class TrunkedAppSettings extends Vue {
    configs: any[] = [];
  }
</script>

