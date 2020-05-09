<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>自动关机</v-card-title>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                描述
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                该模块可以将本电脑定时关闭（强制关闭）
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card-text class="text-center">
            设定关机时间
          </v-card-text>
          <v-card-text class="text-center title">
            {{ target.toLocaleString() }}
          </v-card-text>
          <v-card-text class="text-center">
            剩余时间
          </v-card-text>
          <v-card-text class="text-center display-3">
            {{ restH }} : {{ restM }} : {{ restS }}
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="error" @click="$router.push('/')">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import cp from 'child_process'

@Component
export default class Index extends Vue {
  target!: Date
  restH = '**'
  restM = '**'
  restS = '**'

  created () {
    const day = 1000 * 60 * 60 * 24
    let target = new Date(Math.floor(Date.now() / day) * day)
    target.setHours(21)
    target.setMinutes(20)
    if (+target <= Date.now()) {
      target = new Date(+target + day)
    }
    this.target = target
    const id = setInterval(() => {
      const restMs = +target - Date.now()
      if (restMs < 0) {
        cp.exec('shutdown -s -f -t 0')
      }
      let rest = +target - Date.now()
      this.restS = ((rest = Math.floor(rest / 1000)) % 60).toString().padStart(2, '0')
      this.restM = ((rest = Math.floor(rest / 60)) % 60).toString().padStart(2, '0')
      this.restH = (rest = Math.floor(rest / 60)).toString().padStart(2, '0')
    }, 1000)
    this.$on('hook:beforeDestory', () => {
      clearInterval(id)
    })
  }
}
</script>
