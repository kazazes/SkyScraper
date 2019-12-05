<template>
  <v-dialog v-model="dialog" max-width="700px">
    <v-btn slot="activator" color="secondary">
      Upload CSV
    </v-btn>
    <v-card>
      <v-container grid-list-md>
        <v-layout wrap>
          <!-- <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            class="ma-auto"
            :hidden="loading"
          ></v-progress-circular> -->
          <v-flex v-model="instructions" xs12>
            <v-card-title class="headline">
              Upload Talkgroups File
            </v-card-title>
            <v-card-text>
              Upload a file with a format similar to the <a
                href="https://www.radioreference.com/apps/db/?sid=60&tab=reports"
              >RadioReference.com</a>
              CSV format.
            </v-card-text>
            <v-card-text>
              <v-card color="white">
                <v-card-title>
                  <h5 class="mx-auto">
                    Required Columns
                  </h5>
                </v-card-title>
                <v-divider />
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Decimal</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      Talkgroup ID
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Alpha Tag</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      The talkgroup's short tag
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Mode</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      Frequency mode. Accepted values: D
                      (digital), A (analog), DE (encrypted)
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Description</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      A uniquely identifiable description of the talkgroup.
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Tag</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      <a
                        href="https://wiki.radioreference.com/index.php/Function_Tags"
                      >
                        A general category, domain and usage. (e.g. Fire Dispatch)</a>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Category</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      A high-level category. (e.g. Police)
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Priority (optional)</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      A priority level from 1 to 3. Defaults to
                      1.
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
            <v-card-text>
              <v-spacer />
              <v-card-actions class="mx-0">
                <v-btn block color="accent" @click.stop="downloadSample">
                  Download Sample
                </v-btn>
                <v-spacer />
                <label class="d-block file-select ml-2">
                  <span class="v-btn theme--light primary">
                    <span v-if="selectedFile">Selected File: {{ file.name }}</span>
                    <span v-else :v-text="buttonText">Select File</span>
                  </span>
                  <input type="file" @change="handleFileChange">
                </label>
              </v-card-actions>
            </v-card-text>
          </v-flex>
          <v-flex v-if="showResults" xs12>
            <v-alert v-for="(error, idx) in fatal" :key="e + idx" type="error">
              {{ error.toString() }}
            </v-alert>
            <v-card-text>Imported <strong>{{ talkgroups.length }}</strong> talkgroups.</v-card-text>
            <v-card-text v-if="rowErrors.length > 0">
              {{ rowErrors.length }} rows were discarded. See below.
            </v-card-text>
            <pre v-if="rowErrors.length > 0">
                            {{ JSON.stringify(rowErrors) }}
                        </pre>
            <v-card-text>
              <v-spacer />
              <v-card-actions class="mx-0">
                <v-spacer />
                <v-btn block color="success" @click="completeUpload">
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Papa, { ParseResult } from "papaparse"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import axios from "axios"
import { IInputtedTalkgroup, TalkgroupValidator } from "./talkgroupValidator"

  @Component({
  })
export default class Upload extends Vue {
    @Prop({ type: String }) buttonText!: string;
    file: File | undefined = undefined;
    selectedFile = false;
    instructions = true;
    results = false;
    dialog = false;
    parseResult: ParseResult | undefined = undefined;
    fatal: Error[] = [];
    rowErrors: any[] = [];
    talkgroups: IInputtedTalkgroup[] = [];
    loading = false;

    completeUpload () {
      this.$emit("loadedTalkgroups", this.talkgroups)
      this.dialog = false
    }

    get showResults () {
      return !this.instructions
    }

    handleFileChange (e: any) {
      this.$emit("input", e.target.files[0])
      console.log(e)
      this.file = e.target.files[0]
      this.selectedFile = true
      this.loadCSVFromFile(this.file as File)
    }

    loadCSVFromFile (file: File) {
      const that = this
      this.loading = true
      Papa.parse(file, {
        worker: true,
        trimHeaders: true,
        dynamicTyping: true,
        complete (results: ParseResult): void {
          that.instructions = false
          that.processParsedCSV(results)
        }
      })
    }

    protected processParsedCSV (results: ParseResult) {
      const validator = new TalkgroupValidator(results as ParseResult)
      const headerErrors = validator.validateHeaders()
      if (headerErrors.length > 0) {
        this.fatal.push(...headerErrors)
      } else {
        const mapped = validator.mapToTalkgroups()
        this.talkgroups = mapped.talkgroups
        this.rowErrors = mapped.errors
      }
    }

    downloadSample () {
      return axios({
        url: "../sample/SF_TGs.csv",
        method: "GET",
        responseType: "blob" // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.target = "_blank"
        link.setAttribute("download", "SF_TGs.csv")
        document.body.appendChild(link)
        link.click()
      })
    }
}
</script>

<style scoped>
  .file-select > .select-button {
    padding: 1rem;

    color: white;
    background-color: #2EA169;

    border-radius: .3rem;

    text-align: center;
    font-weight: bold;
  }

  /* Don't forget to hide the original file input! */
  .file-select > input[type="file"] {
    display: none;
  }
</style>
