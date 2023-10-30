<template>
  <div class="t_grid_th_sort_handle">
    <a-icon
      type="caret-up"
      class="icon"
      :class="{ active: sort === 'asc', 'un_active': sort === 'desc' }"
    />
    <a-icon
      type="caret-down"
      class="icon"
      :class="{ active: sort === 'desc', 'un_active': sort === 'asc' }"
    />
  </div>
</template>
<script lang="ts">
import { Icon } from "ant-design-vue"
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  components: {
    [Icon.name]: Icon
  }
})
export default class GridSortHandle extends Vue {
  @Prop({
    type: String,
    default: ""
  })
  sort!: string
}
</script>
<style lang="scss" scoped>
.t_grid_th_sort_handle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 4px 2px;
  font-size: 10px;
  cursor: pointer;
  color: #999;
  visibility: hidden;
  &.show {
    visibility: unset;
  }
  .icon {
    margin: -1px;
    &.active {
      color: #3860b2;
    }
    &.un_active {
      color: #999;
    }
  }
}
</style>