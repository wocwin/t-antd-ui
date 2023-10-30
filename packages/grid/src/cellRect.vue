<template>
  <div v-show="w !== 0 && h !== 0" class="cell_rect" :style="`width: ${wrapW}px`">
    <div class="bd" :style="bdStyle"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
@Component
export default class CellRect extends Vue {
  @Prop({
    type: Number,
    default: 0
  }) x!: number
  @Prop({
    type: Number,
    default: 0
  }) y!: number
  @Prop({
    type: Number,
    default: 0
  }) w!: number
  @Prop({
    type: Number,
    default: 0
  }) h!: number
  @Prop({
    type: Boolean,
    default: 0
  }) isFixed!: boolean
  @Prop({
    type: Number,
    default: 0
  }) wrapW!: number
  
  get bdStyle() {
    const { x, y, w, h, isFixed } = this
    return {
      position: isFixed ? 'sticky' : 'absolute',
      zIndex: isFixed ? 21 : 9,
      top: `${y}px`,
      left: `${x}px`,
      width: `${w + 1}px`,
      height: `${h + 1}px`
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
.cell_rect {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
  .bd {
    position: absolute;
    border: 2px solid $theme-color;
  }
}
</style>