<template>
  <v-layout>
    <v-container fluid>
      <div class="px-4 py-0 my-0">
        <v-btn @click="dialog = true" color="blue-grey darken" dark class="mb-2">Add Talkgroup</v-btn>
        <Upload v-bind:file="file" v-on:loadedTalkgroups="talkgroupsFileLoaded"></Upload>
      </div>
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card flat>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.decimal" label="Decimal"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.mode" label="Mode"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.alphaTag" label="Alpha Tag"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tag" label="Tag"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.group" label="Group"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.priority" label="Priority"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="talkgroups"
        :no-data-text="noDataText"
        :rows-per-page-items="[25, 50, 100, 200]"
        class="mt-3"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.decimal }}</td>
          <td class="text-xs-right">{{ props.item.mode }}</td>
          <td class="text-xs-right">{{ props.item.alphaTag }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.tag }}</td>
          <td class="text-xs-right">{{ props.item.group }}</td>
          <td class="text-xs-right">{{ props.item.priority }}</td>
          <td class="justify-center layout">
            <v-icon small class="mr-2" @click="editItem(props.item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(props.item)">mdi-delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
  import { IInputtedTalkgroup } from "./talkgroupValidator";
  import { TrunkedTalkgroup } from "~/types/gql.types";
  import Vue from "vue";
  import { Component, Prop } from "vue-property-decorator";
  import Upload from "./Upload.vue";

  @Component({
    components: {
      Upload,
    },
    props: {
      file: { type: Object },
    },
    watch: {
      dialog(val) {
        val || (this as any).close();
      },
    },
  })
  export default class TalkgroupsTable extends Vue {
    noDataText = "No talkgroups added.";
    snack = false;
    dialog = false;
    editedIndex = -1;
    editedItem: Partial<TrunkedTalkgroup> = {
      decimal: 0,
      mode: "A",
      alphaTag: "",
      description: "",
      tag: "",
      group: "",
      priority: 1,
    };
    defaultItem: Partial<TrunkedTalkgroup> = {
      decimal: 0,
      mode: "A",
      alphaTag: "",
      description: "",
      tag: "",
      group: "",
      priority: 1,
    };
    pagination = {};
    headers = [
      {
        text: "Decimal",
        align: "left",
        sortable: true,
        value: "decimal",
      },
      { text: "Mode", value: "mode" },
      { text: "Alpha Tag", value: "alphaTag" },
      { text: "Description", value: "description" },
      { text: "Tag", value: "tag" },
      { text: "Group", value: "group" },
      { text: "Priority", value: "priority" },
      { text: "", value: "edit" },
    ];
    talkgroups: Partial<TrunkedTalkgroup>[] = [];

    created() {
      this.initialize();
    }

    initialize() {}

    editItem(item: Partial<TrunkedTalkgroup>) {
      this.editedIndex = this.talkgroups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    }

    deleteItem(item: Partial<TrunkedTalkgroup>) {
      const index = this.talkgroups.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.talkgroups.splice(index, 1);
    }

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.talkgroups[this.editedIndex], this.editedItem);
      } else {
        this.talkgroups.push(this.editedItem);
      }
      this.close();
    }

    talkgroupsFileLoaded(parsed: IInputtedTalkgroup[]) {
      // TODO: Use primitives in interface
      this.talkgroups = parsed.map((t) => {
        return {
          alphaTag: t.alphaTag as string,
          decimal: t.decimal as number,
          group: t.category as string,
          description: t.description as string,
          priority: (t.priority as number) || 1,
          mode: t.mode as string,
          tag: t.tag as string,
        };
      });
    }
  }
</script>
