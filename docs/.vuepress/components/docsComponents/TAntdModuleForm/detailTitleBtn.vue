<template>
  <t-antd-layout-page>
    <t-antd-layout-page-item>
      <t-antd-module-form
        title="模块详情组件运用"
        subTitle="Title右侧插槽使用"
        ref="sourceDetail"
        handleType="desc"
        :descData="descData"
      >
        <!-- 标题右侧按钮 -->
        <template #extra>
          <a-button type="primary">主要按钮</a-button>
          <a-button type="success">成功按钮</a-button>
          <a-button type="danger">信息按钮</a-button>
        </template>
        <!-- 模块detail详情插槽 -->
        <template #line>
          <a-button type="danger">自定义模块detail插槽</a-button>
        </template>
        <!-- title右侧按钮插槽 -->
        <template #material>
          <a-button size="small" @click.stop="batchPass('批量通过')" type="primary">批量通过</a-button>
          <a-button size="small" @click.stop="batchPass('批量驳回')" type="danger">批量驳回</a-button>
          <a-button size="small" @click.stop="batchPass('导出')">导出</a-button>
        </template>
        <!-- value自定义插槽 -->
        <template #loadKgPerCar>
          <div class="text-danger">value自定义插槽</div>
        </template>
      </t-antd-module-form>
    </t-antd-layout-page-item>
  </t-antd-layout-page>
</template>
<script>
export default {
  name: 'TModuleDetailDemo',
  data() {
    return {
      descData: {
        goods: {
          name: 'goods',
          title: '禁止收缩',
          disabled: true,
          data: [
            {
              label: '货品名称',
              fieldName: 'cargoName',
              value: ''
            },
            {
              label: '货品类别',
              fieldName: 'cargoType',
              value: ''
            },
            {
              label: '货品价值',
              fieldName: 'cargoMoneyCentPerTon',
              value: ''
            },
            {
              label: '总重量',
              fieldName: 'cargoWeightKg',
              value: ''
            },
            {
              label: '总体积',
              fieldName: 'cargoVolumeDm3',
              value: ''
            },
            {
              label: '总件数',
              fieldName: 'cargoQty',
              value: ''
            },
            {
              label: '易碎品',
              fieldName: 'isBreakable',
              value: '3333',
              span: 2
            },
            {
              label: '备注',
              fieldName: 'cargoRemark',
              value: '占位一整行',
              span: 4
            }
          ]
        },
        freight: {
          name: 'freight',
          title: '运费信息',
          data: [
            {
              label: '计费模式',
              fieldName: 'calFeeType',
              value: ''
            },
            {
              label: '运费单价',
              value: ''
            },

            {
              label: '路损类型',
              fieldName: 'roadLossType',
              value: '定率',
              tooltip: '测试字符串提示'
            },
            {
              label: '路耗定额',
              fieldName: 'roadLossKg',
              value: ''
            },
            {
              label: '整车承载',
              fieldName: 'loadKgPerCar',
              slotName: 'loadKgPerCar',
              value: ''
            },
            {
              label: '保险购买',
              fieldName: 'buyInsurance',
              value: '是',
              tooltip: () => (
                <div>
                  <div>测试函数方式提示</div>
                </div>
              )
            }
          ]
        },
        line: {
          name: 'line',
          title: '线路信息',
          disabled: true,
          slotName: 'line',
          btn: 'material'
        }
      }
    }
  },
  mounted() {
    const goodsData = {
      cargoName: '汽车总动员',
      cargoType: '玩具',
      cargoMoneyCentPerTon: '500',
      cargoWeightKg: '500',
      cargoVolumeDm3: '30',
      cargoQty: '40',
      isBreakable: '否',
      cargoRemark: '汽车总动员备注'
    }
    this.descData.goods.data.map(val => {
      val.value = goodsData[val.fieldName]
    })
  },
  methods: {
    batchPass(type) {
      console.log(`点击了${type}`)
    }
  }
}
</script>
