<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            <v-img src="/icon.png" height="8em" contain/>
            <div class="text-center" style="width: 100%">
              <v-badge content="preview">
                <div>课堂助手</div>
              </v-badge>
              <div class="subtitle-2">Apache-2.0 &copy; ZhangZisu</div>
            </div>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <v-switch readonly label="开机自动启动" v-model="config.autoStart"/>
            <v-switch readonly label="启动时不显示窗口" v-model="config.hideOnStart"/>
          </v-card-text>
          <v-divider/>
          <v-list>
            <v-list-item v-for="(d, i) in info" :key="i">
              <v-list-item-icon>
                <v-icon :color="d.color">mdi-{{ d.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ d.key }}</v-list-item-title>
                <v-list-item-subtitle>{{ d.value }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="exit" depressed color="error">
              退出
            </v-btn>
            <v-btn @click="openConfigDir" depressed>
              打开配置文件夹
            </v-btn>
            <v-btn @click="openDevTools" depressed>
              开发者工具
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { remote, shell } from 'electron'
import { getConfig, saveConfig } from '@/common/config'
import path from 'path'
import pkg from '@/../package.json'

/* global GIT_HASH, GIT_BRANCH, BUILD_MACHINE, BUILD_DATE */

const info = [
  { icon: 'update', color: '#000000', key: '版本', value: pkg.version },
  { icon: 'git', color: '#F05032', key: '提交及分支', value: `${GIT_HASH.substr(0, 7)}@${GIT_BRANCH}` },
  { icon: 'server', color: '#FCA121', key: '构建', value: `${BUILD_MACHINE}, ${BUILD_DATE}` },
  { icon: 'electron-framework', color: '#47848F', key: 'Electron', value: process.versions.electron },
  { icon: 'nodejs', color: '#339933', key: 'Node', value: process.versions.node },
  { icon: 'vuejs', color: '#4FC08D', key: 'Vue', value: pkg.dependencies.vue },
  { icon: 'vuetify', color: '#1867C0', key: 'Vuetify', value: pkg.dependencies.vuetify }
]

@Component
export default class About extends Vue {
  info = info
  config = getConfig()

  @Watch('config', { deep: true })
  _wConfig () {
    saveConfig(this.config)
  }

  openDevTools () {
    remote.getCurrentWebContents().openDevTools()
  }

  openConfigDir () {
    shell.openExternal(path.join(remote.app.getPath('appData'), 'classroom-helper', 'config'))
  }

  exit () {
    remote.app.exit()
  }
}
</script>
