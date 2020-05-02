<template>
  <v-app>
    <title-bar/>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <v-spacer/>
      <v-toolbar-items>
        <settings-menu/>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" style="-webkit-app-region: no-drag">
      <v-list nav>
        <v-list-item href="https://zhangzisu.cn/">
          <v-list-item-avatar tile size="24">
            <v-img id="logo" contain :src="require('@/assets/logo.svg')"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>ZhangZisu.CN</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Posts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/search">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Search</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/link">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-link</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Links</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TitleBar from '@/components/TitleBar.vue'

@Component({ components: { TitleBar } })
export default class App extends Vue {
  drawer = false
}
</script>
