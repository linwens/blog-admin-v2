<template>
  <div class="gallery-container m15">
    <div class="search-container df mb10">
      <div class="mr10">
        关键字:
        <el-input v-model="listQuery.schWord" class="w200" size="mini" />
      </div>
      <div class="mr10">
        主题:
        <el-select v-model="listQuery.theme" multiple placeholder="请选择作品主题" class="w200" size="mini">
          <el-option v-for="(item, index) in themeArr" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="mr10">
        时间排序：
        <el-select v-model="listQuery.sort" placeholder="请选择排序" class="w200" size="mini">
          <el-option label="按时间从近到远" :value="-1" />
          <el-option label="按时间从远到近" :value="1" />
        </el-select>
      </div>
      <el-button type="primary" @click="search()" size="mini">查询</el-button>
    </div>
    <el-tabs v-model="actTab" class="mt15" type="border-card" @tab-click="changeTab">
      <el-tab-pane v-for="item in tabs" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="actTab==item.key" :ref="'tabpane_'+actTab" :type="item.key" :query="listQuery" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getThemes } from '@/api/imgs'
import tabPane from './components/TabPane'

export default {
  name: 'List',
  components: {
    tabPane
  },
  data() {
    return {
      listQuery: {
        schWord: null,
        theme: [],
        curPage: 1,
        pageSize: 10,
        sort: -1
      },
      themeArr: [],
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
    this.getThemes();
  },
  methods: {
    getThemes() {
      getThemes({}).then(res => {
        console.log(res)
        this.themeArr = res.themes;
      })
    },
    search() {
      console.log(this.listQuery)
      this.$refs['tabpane_' + this.actTab][0].getList(this.listQuery)
    },
    changeTab(tab, e){
      console.log('切换了')
      // 清空搜索条件
      this.listQuery.schWord = null;
      this.listQuery.theme = [];
      this.listQuery.curPage = 1;
      this.listQuery.pageSize = 10;
      this.listQuery.sort = 1;
    }
  }
}
</script>
<style lang="scss">

</style>

