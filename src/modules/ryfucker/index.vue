<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>如何评价睿易教育</v-card-title>
          <v-card-text>
            <a @click="open('https://www.zhihu.com/question/296363864')"><b>睿易教育在诈骗</b></a>
            <br>
            教育，堵不如疏
            <br>
            挣黑心钱，真™既爽又快
          </v-card-text>
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
