<template>
  <div class="gallery-container m15">
    <div class="search-container df mb10">
      <div class="mr10">
        标题:
        <el-input v-model="listQuery.title" class="w200" />
      </div>
      <div class="mr10">
        简介:
        <el-input v-model="listQuery.brief" class="w200" />
      </div>
      <div class="mr10">
        时间排序：
        <el-select v-model="listQuery.sort" placeholder="请选择排序" class="w200">
          <el-option label="按时间从近到远" :value="1" />
          <el-option label="按时间从远到近" :value="-1" />
        </el-select>
      </div>
      <el-button type="primary" @click="search()">查询</el-button>
    </div>
    <el-tabs v-model="actTab" class="mt15" type="border-card">
      <el-tab-pane v-for="item in tabs" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="actTab==item.key" :ref="'tabpane_'+actTab" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tabPane from './components/TabPane'

export default {
  name: 'List',
  components: {
    tabPane
  },
  data() {
    return {
      listQuery: {
        title: null,
        brief: null,
        sort: 1
      },
      tabs: [
        {
          label: '摄影作品',
          key: 'GL'
        },
        {
          label: '博客插图',
          key: 'BO'
        }
      ],
      actTab: 'GL' // 默认展示的选项卡
    }
  },
  created() {
    // this.getGalleryList()
  },
  methods: {
    search() {
      console.log(this.listQuery)
      this.$refs['tabpane_' + this.actTab][0].getList(this.listQuery)
    }
  }
}
</script>
<style lang="scss">

</style>

