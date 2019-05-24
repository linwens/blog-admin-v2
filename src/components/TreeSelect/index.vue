<template>
  <div>
    <treeselect
      :value="!!value?value:null"
      :options="options"
      :normalizer="normalizer"
      :placeholder="placeholder"
      :multiple="multiple"
      :disabled="disabled"
      @input="updateValue"
      appendToBody
    >
      <!-- 这么写是为了初始化展示(unknown)的问题 -->
      <div slot="value-label" slot-scope="{ node }">{{ node.raw[normalStr] }}</div>
    </treeselect>
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    // register the component
    components: { Treeselect },
    props: {
      // 接收绑定参数
      value: [String, Array],
      // 输入框宽度
      width: String,
      // 选项数据
      options: {
        type: Array,
        required: true,
        default: [ {
          id: 'a',
          label: 'a',
          children: [ {
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          } ],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        } ]
      },
      // 输入框占位符
      placeholder: {
        type: String,
        required: false,
        default: '请选择'
      },
      // 是否可多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 文案对应的字段
      normalStr: {
        type: String,
        default: 'label'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        normalizer(node) { // treeselect重写key名称
          return {
            label: node.label || node.name
          }
        }
      }
    },
    methods: {
      updateValue(val) {
        this.$emit('update:value', !val ? '' : val)
      }
    }
  }
</script>
<style>
  .vue-treeselect--disabled .vue-treeselect__single-value{
    color:#C0C4CC;
  }
  .vue-treeselect__single-value{
    color:#606266;
  }
</style>