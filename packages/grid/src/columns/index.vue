<template>
  <thead class="t_grid_head" :class="{ stealth }">
    <tr v-for="(rowCol, key) in arrColumns" :key="key">
      <template v-for="(col, colKey) in rowCol">
        <t-grid-th-cell
          v-if="col.colSpan !== 0"
          :key="`${key}-${colKey}-${col.dataIndex}`"
          :colKey="colKey"
          :level="key"
          :col="col"
          :sticky="sticky"
          :rowspan="col.rowSpan"
          :colspan="col.colSpan"
          :sort="sort"
          @sortHandle="sortHandle"
          @filterChange="val => $emit('filterChange', val)"
        />
      </template>
    </tr>
  </thead>
</template>
<script lang="ts">
import Vue from "vue"
import TGridThCell from "./th.vue"
import { Component, Prop } from "vue-property-decorator"
import { Col } from "../types"
@Component({
  components: {
    TGridThCell
  }
})
export default class DhGridColumns extends Vue {
  // 是否透明
  @Prop({
    type: Boolean,
    default: false
  })
  stealth?: boolean
  // 列头描述
  @Prop({
    type: Array,
    default: () => []
  })
  columns!: Col[]
  // 列表头顶部粘性
  @Prop({
    type: Boolean,
    default: true
  })
  sticky!: boolean
  // 左侧冻结列数
  @Prop({
    type: Number,
    default: 0
  })
  fixedColumnLeft?: number
  // 右侧冻结列数
  @Prop({
    type: Number,
    default: 0
  })
  fixedColumnRight?: number
  // 列总数
  @Prop({
    type: Number,
    default: 0
  })
  colLength!: number

  sort = {
    dataIndex: "",
    direction: ""
  }

  get levelSum() {
    // 列头最大层级数
    return this.getLevel(this.columns, 1)
  }
  get arrColumns() {
    return this.buildColumns(this.columns, [[]], 0, 0, []).colSum
  }

  getLevel(columns: Col[], level: number) {
    let childLevel = level
    columns.forEach((col) => {
      if (col.children && col.children.length > 0) {
        const curLevel = this.getLevel(col.children, level + 1)
        childLevel = curLevel > childLevel ? curLevel : childLevel
      }
    })
    return childLevel
  }
  buildColumns(
    columns: Col[],
    colSum: Col[][],
    level: number,
    lastFieldIndex: number,
    lastClass: string[]
  ): { colSum: Col[][]; lastFieldIndex: number; fixed: string | null } {
    const { fixedColumnLeft, fixedColumnRight, colLength } = this
    let fixed: string | null = null
    columns.forEach((col) => {
      // 冻结列标记
      if (col.children && col.children.length > 0) {
        // 存在子集先操作子集
        if (colSum.length - 1 === level) {
          // 如果是当前层级，表示层级不足以放下下一层，推送多一层空集
          colSum.push([])
        }
        const buildColumns = this.buildColumns(
          col.children,
          colSum,
          level + 1,
          lastFieldIndex,
          [...lastClass, col.dataIndex + "_lastChild"]
        ) // 递归构建子集
        colSum = buildColumns.colSum
        lastFieldIndex = buildColumns.lastFieldIndex
        if (buildColumns.fixed !== null) {
          fixed =
            buildColumns.fixed === "left"
              ? "c_left"
              : buildColumns.fixed === "right"
              ? "c_right"
              : buildColumns.fixed
          col.fixed = fixed
        }
      } else {
        if (fixedColumnLeft && lastFieldIndex < fixedColumnLeft) {
          fixed = "left"
          col.fixed = fixed
          col.className = lastClass
        }
        if (
          fixedColumnRight &&
          colLength - lastFieldIndex <= fixedColumnRight
        ) {
          fixed = "right"
          col.fixed = fixed
          col.className = lastClass
        }
        lastFieldIndex++
      }
      col.colSpan = this.getHeadColSpan(col)
      colSum[level].push({
        ...col,
        rowSpan:
          !col.children || col.children.length === 0 ? this.levelSum - level : 1 // 跨行数。若存在子集则不跨行，不存在则占用剩余的行
      })
    })
    return { colSum, lastFieldIndex, fixed }
  }
  getHeadColSpan(col: Col) {
    // 获取当前列头跨列数量
    let length = col.colSpan || col.colSpan === 0 ? col.colSpan : 1 // 若指定了列头合并优先级高
    if (col.children && col.children.length > 0) {
      length = 0
      col.children.forEach((item) => {
        length += this.getHeadColSpan(item)
      })
    }
    return length
  }
  sortHandle(dataIndex: string) {
    if (dataIndex !== this.sort.dataIndex) {
      this.sort = {
        dataIndex,
        direction: "desc"
      }
    } else {
      if (this.sort.direction === "") {
        this.sort.direction = "desc"
      } else if (this.sort.direction === "desc") {
        this.sort.direction = "asc"
      } else {
        this.sort.direction = ""
      }
    }
    this.$emit("sortChange", {
      ...this.sort
    })
  }
}
</script>
<style lang="scss" scoped>
.t_grid_head {
  user-select: none;
  &.stealth {
    opacity: 0;
  }
}
</style>