import { VueConstructor } from 'vue'

export interface Mod {
  id: string;
  name: string;
  icon: string;
}

export interface BgMod {
  mod: Mod;
  onReady?: () => void;
}

export interface FgMod {
  mod: Mod;
  view: VueConstructor;
}
