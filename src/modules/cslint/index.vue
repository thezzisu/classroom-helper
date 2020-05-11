<template>
  <v-container>
    <v-row justify="center">
      <v-col>
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
            <v-list v-if="changes.length">
              <v-list-item v-for="(c, i) in changes" :key="i">
                <v-list-item-icon>
                  <v-icon v-if="c.src.includes('~$')">mdi-lock</v-icon>
                  <v-icon v-else>mdi-file</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ c.src }}</v-list-item-title>
                  <v-list-item-subtitle v-if="c.dst === '#remove'">删除</v-list-item-subtitle>
                  <v-list-item-subtitle v-else>移动到：{{ c.dst }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-row no-gutters>
                    <v-col>
                      <v-btn icon color="success" disabled>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="error" @click="changes.splice(i, 1)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-row v-else justify="center">
              <v-col cols="auto">
                <div class="text-center">
                  <v-icon large>mdi-information-outline</v-icon>
                  <br/>
                  没有未整理的课件
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="success" @click="scan">重新扫描</v-btn>
            <v-btn color="error" @click="$router.push('/')">取消</v-btn>
            <v-btn color="primary" @click="apply" :disabled="!changes.length">继续</v-btn>
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
import { remote, ipcRenderer } from 'electron'
import * as fs from 'fs-extra'
import path from 'path'
import { getChanges, Change } from './scan'
import { getConfig } from './config'

@Component
export default class Index extends Vue {
  loading = false

  changes: Change[] = []

  mounted () {
    this.scan()
    const listener = () => {
      this.scan()
    }
    ipcRenderer.addListener('cslint-fschanged', listener)
    this.$on('hook:beforeDestroy', () => {
      ipcRenderer.removeListener('cslint-fschanged', listener)
    })
  }

  async scan () {
    this.loading = true
    this.changes = await getChanges()
    this.loading = false
  }

  async apply () {
    this.loading = true
    const cfg = getConfig()
    const win = remote.getCurrentWindow()
    const all = this.changes.length
    let cur = 0
    let succ = 0
    let fail = 0
    for (const change of this.changes) {
      try {
        if (change.dst === '#remove') {
          await fs.unlink(change.src)
        } else {
          await fs.move(change.src, path.resolve(cfg.dist, change.dst))
        }
        succ++
      } catch (e) {
        // eslint-disable-next-line no-new
        new Notification('课堂助手-课件整理', {
          body: `${change.src}操作失败\n${e.message}`
        })
        fail++
      }
      cur++
      win.setProgressBar(cur / all)
    }
    win.setProgressBar(-1)
    this.loading = false
    // eslint-disable-next-line no-new
    new Notification('课堂助手-课件整理', {
      image: '/icon.png',
      body: `整理完成 ${succ}成功 ${fail}失败`
    })
    this.scan()
  }
}
</script>
