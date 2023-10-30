export default {
  methods: {
    addKeyListener() {
      document.documentElement.addEventListener('keydown', this.keyListener)
    },
    removeKeyListener() {
      document.documentElement.removeEventListener('keydown', this.keyListener)
    },
    keyListener(e) {
      const cellStatus = this.cellStatus
      switch (e.key) {
        case 'Tab': {
          e.preventDefault()
          this.rect = this.getCellInfo(this.rect.dataIndex, this.rect.rowIndex, 'r')
          this.$nextTick(() => { // 渲染完成后恢复原来状态
            if (cellStatus === 'edit') {
              this.$refs.bodyTr[this.rect.rowIndex].cell2Edit({ event: null })
            } else {
              this.cellStatus = cellStatus
            }
          })
          this.$emit('keydown', 'Tab', { dataIndex: this.rect.dataIndex, rowIndex: this.rect.rowIndex })
          break
        }
        case 'Enter': {
          e.preventDefault()
          this.rect = this.getCellInfo(this.rect.dataIndex, this.rect.rowIndex, 'b')
          this.$nextTick(() => { // 渲染完成后恢复原来状态
            if (cellStatus === 'edit') {
              this.$refs.bodyTr[this.rect.rowIndex].cell2Edit({ event: null })
            } else {
              this.cellStatus = cellStatus
            }
          })
          this.$emit('keydown', 'Enter', { dataIndex: this.rect.dataIndex, rowIndex: this.rect.rowIndex })
          break
        }
        default:
          break
      }
    }
  }
}
