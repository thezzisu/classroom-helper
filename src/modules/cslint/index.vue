<template>
  <v-container>
    <v-row>
      <v-col rows="auto">
        <v-card>
          <v-card-title>
            自动课件整理
          </v-card-title>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                描述
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                该模块可以将桌面上的课件自动整理至对应文件夹<br/>
                条件见源码
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(c, i) in changes" :key="i">
                <v-list-item-icon>
                  <v-icon>mdi-file</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ c.src }}</v-list-item-title>
                  <v-list-item-subtitle>移动到：{{ c.dst }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-row no-gutters>
                    <v-col>
                      <v-btn icon color="success">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="error">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="success" @click="scan">重新扫描</v-btn>
            <v-btn color="error" @click="$router.push('/')">取消</v-btn>
            <v-btn color="primary" @click="apply">继续</v-btn>
          </v-card-actions>
          <v-overlay v-model="loading" absolute class="text-center">
            <v-progress-circular indeterminate/>
            <div>
              执行文件操作中
            </div>
          </v-overlay>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getChanges, Change } from './scan'
import { remote } from 'electron'
import * as fs from 'fs-extra'

@Component
export default class Index extends Vue {
  loading = false

  changes: Change[] = []

  mounted () {
    this.scan()
  }

  async scan () {
    this.loading = true
    this.changes = await getChanges()
    this.loading = false
  }

  async apply () {
    this.loading = true
    const win = remote.getCurrentWindow()
    const all = this.changes.length
    let cur = 0
    for (const change of this.changes) {
      fs.copyFile(change.src, change.dst)
      cur++
      win.setProgressBar(cur / all)
    }
    win.setProgressBar(-1)
    this.loading = false
  }
}
</script>
