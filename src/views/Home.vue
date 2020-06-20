<template>
  <v-container>
    <v-row justify="center">
      <div class="text-center">
        <h1>{{ today }}</h1>
      </div>
    </v-row>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            快速操作
          </v-card-title>
          <v-card-text>
            <v-row justify="space-around">
              <v-col cols="3">
                <v-btn block color="primary" outlined @click="openCourses" :loading="ld2">打开课件目录</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn block color="primary" outlined @click="closeAll" :loading="ld3">关闭所有窗口</v-btn>
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
import { shell, remote } from 'electron'
import { promisify } from 'util'
import { exec } from 'child_process'

const execAsync = promisify(exec)

@Component
export default class Home extends Vue {
  today!: string
  ld2 = false
  ld3 = false

  created () {
    const now = new Date()
    this.today = `${now.getMonth()}月${now.getDate()}日星期${'日一二三四五六'[now.getDay()]}`
  }

  open (url: string) {
    shell.openExternal(url)
  }

  async openCourses () {
    try {
      this.ld2 = true
      const desktop = remote.app.getPath('desktop')
      await shell.openExternal(`${desktop}\\课件`)
    } catch (e) {
      console.log(e)
    } finally {
      this.ld2 = false
    }
  }

  async closeAll () {
    try {
      this.ld3 = true
      await execAsync('TASKKILL /F /IM POWERPNT.EXE').catch(() => 0)
      await execAsync('TASKKILL /F /IM WINWORD.EXE').catch(() => 0)
      await execAsync('TASKKILL /F /IM EXCEL.EXE').catch(() => 0)
    } catch (e) {
      console.log(e)
    } finally {
      this.ld3 = false
    }
  }
}
</script>
