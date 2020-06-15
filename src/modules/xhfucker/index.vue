<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>课件下载</v-card-title>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { shell } from 'electron'

@Component
export default class Index extends Vue {
  open (url: string) {
    shell.openExternal(url)
  }
}
</script>
