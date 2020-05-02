<template>
  <v-app>
    <title-bar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TitleBar from '@/components/TitleBar.vue'

@Component({ components: { TitleBar } })
export default class App extends Vue {

}
</script>
