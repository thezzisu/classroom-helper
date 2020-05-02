<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Home</v-card-title>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="openDevTools">
              Open devtools
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { remote } from 'electron'

@Component
export default class Home extends Vue {
  openDevTools () {
    remote.getCurrentWebContents().openDevTools()
  }
}
</script>
