<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            快速操作
          </v-card-title>
          <v-card-text>
            <v-row justify="space-around">
              <v-col cols="3">
                <v-btn block color="primary" outlined @click="open('ftp://ftp.zhzx.net.cn/')">打开FTP</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn block color="primary" outlined>打开课件目录</v-btn>
              </v-col>
            </v-row>
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
export default class Home extends Vue {
  open (url: string) {
    shell.openExternal(url)
  }
}
</script>
