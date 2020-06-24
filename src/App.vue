<template>
  <v-app>
    <title-bar/>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" style="-webkit-app-region: no-drag">
      <v-list nav>
        <v-list-item @click="openHomepage">
          <v-list-item-avatar tile size="24">
            <v-img id="logo" contain src="@/assets/logo.svg"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>ZhangZisu.CN</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-home</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>概览</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(x, i) in nav" :key="i" :to="x.path">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-{{ x.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ x.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>关于</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div class="content-wrap">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TitleBar from '@/components/TitleBar.vue'
import { shell } from 'electron'
import { nav } from '@/modules/fg'

@Component({ components: { TitleBar } })
export default class App extends Vue {
  readonly nav = nav

  drawer = false

  openHomepage () {
    shell.openExternal('https://zhangzisu.cn/')
  }
}
</script>

<style lang="scss" scoped>
.content-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
</style>
