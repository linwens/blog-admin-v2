<template>
  <div class="article-container m15">
    <aside class="mb10">
      这里是<a href="https://segmentfault.com/markdown" target="_blank">markdown</a>语法提示
    </aside>
    <div class="mb10">
      <el-input v-model="title" placeholder="请输入标题" class="input-with-select">
        <el-select slot="prepend" v-model="type" placeholder="请选择" class="w100">
          <el-option label="原创" value="1" />
          <el-option label="笔记" value="2" />
          <el-option label="翻译" value="3" />
        </el-select>
      </el-input>
    </div>
    <div class="mb10" style="display:flex;">
      <div class="mr10">
        <el-date-picker
          v-model="time"
          type="datetime"
          placeholder="选择发布时间"
        />
      </div>
      <div>
        <tree-select
          :value.sync="tags"
          :options="tagsData"
          multiple
        />
      </div>
    </div>
    <div class="mb10">
      <el-input
        v-model="brief"
        type="textarea"
        placeholder="请输入简介"
        maxlength="300"
        show-word-limit
      />
    </div>
    <div class="editor-container mb10">
      <markdown-editor v-model="content" height="600px" />
    </div>
    <div class="btns">
      <el-button type="primary">提交按钮</el-button>
      <el-button type="warning">暂存按钮</el-button>
    </div>
  </div>
</template>
<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import TreeSelect from '@/components/TreeSelect'

export default {
  name: 'List',
  components: {
    MarkdownEditor,
    TreeSelect
  },
  data() {
    return {
      type: '',
      title: '',
      time: '',
      tags: [], // 标签
      tagsData: [{
        id: 'fruits',
        label: 'Fruits',
        children: [{
          id: 'apple',
          label: 'Apple 🍎',
          isNew: true
        }, {
          id: 'grapes',
          label: 'Grapes 🍇'
        }, {
          id: 'pear',
          label: 'Pear 🍐'
        }, {
          id: 'strawberry',
          label: 'Strawberry 🍓'
        }, {
          id: 'watermelon',
          label: 'Watermelon 🍉'
        }]
      }, {
        id: 'vegetables',
        label: 'Vegetables',
        children: [{
          id: 'corn',
          label: 'Corn 🌽'
        }, {
          id: 'carrot',
          label: 'Carrot 🥕'
        }, {
          id: 'eggplant',
          label: 'Eggplant 🍆'
        }, {
          id: 'tomato',
          label: 'Tomato 🍅'
        }]
      }],
      brief: '', // 简介
      inputVisible: false,
      inputValue: '',
      content: ''
    }
  },
  methods: {}
}
</script>
<style>

</style>
