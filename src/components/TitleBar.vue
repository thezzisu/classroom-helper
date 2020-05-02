<template>
  <v-system-bar app window style="-webkit-app-region: drag" class="pr-0">
    <v-spacer/>
    <v-btn @click="minimize" depressed tile height="32" style="-webkit-app-region: no-drag" color="transparent">
      <v-icon class="ma-0">mdi-minus</v-icon>
    </v-btn>
    <v-btn @click="maximize" depressed tile height="32" style="-webkit-app-region: no-drag" color="transparent">
      <v-icon class="ma-0">{{ maximized ? 'mdi-window-restore' : 'mdi-crop-square' }}</v-icon>
    </v-btn>
    <v-btn @click="close" depressed tile height="32" style="-webkit-app-region: no-drag" color="error">
      <v-icon class="ma-0">mdi-close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { remote } from 'electron'

@Component
export default class TitleBar extends Vue {
  window = remote.getCurrentWindow()
  maximized = this.window.isMaximized()

  onMaxmized () {
    this.maximized = true
  }

  onUnmaximized () {
    this.maximized = false
  }

  mounted () {
    this.window.addListener('maximize', this.onMaxmized)
    this.window.addListener('unmaximize', this.onUnmaximized)
    this.$on('hook:beforeDestory', () => {
      this.window.removeListener('maximize', this.onMaxmized)
      this.window.removeListener('unmaximize', this.onUnmaximized)
    })
  }

  minimize () {
    this.window.minimize()
  }

  maximize () {
    this.maximized
      ? this.window.unmaximize()
      : this.window.maximize()
  }

  close () {
    this.window.close()
  }
}
</script>
