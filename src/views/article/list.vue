<template>
  <div class="article-container m15">
    <div class="search-container df mb10">
      <div class="mr10">
        关键字:
        <el-input v-model="listQuery.schWord" class="w200" size="mini" />
      </div>
      <div class="mr10">
        状态:
        <div class="dib w200">
          <el-select v-model="listQuery.status" multiple placeholder="请选择文章状态" class="w200" size="mini">
            <el-option label="publish" :value="'publish'" />
            <el-option label="save" :value="'save'" />
          </el-select>
        </div>
      </div>
      <div class="mr10">
        时间排序：
        <el-select v-model="listQuery.sort" placeholder="请选择排序" class="w200" size="mini">
          <el-option label="按时间从近到远" :value="-1" />
          <el-option label="按时间从远到近" :value="1" />
        </el-select>
      </div>
      <el-button type="primary" @click="getBlogList()" size="mini">查询</el-button>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="time"
        label="日期"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="230"
      />
      <el-table-column
        prop="brief"
        label="文章简介"
      />
      <el-table-column
        prop="tags"
        label="文章标签"
        align="center"
        width="200"
      >
        <template slot-scope="{row}">
          <el-tag size="mini" type="info" class="mr5" v-for="(item, index) in row.tags" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="文章状态"
        width="100"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.operate | statusFilter">
            {{ row.operate }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.aid">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.curPage" :limit.sync="listQuery.pageSize" @pagination="getBlogList" />
  </div>
</template>
<script>
import { getBlogList } from '@/api/article'
import Pagination from '@/components/Pagination'
import TreeSelect from '@/components/TreeSelect'

export default {
  name: 'List',
  filters: {
    statusFilter(status) {
      const statusMap = {
        publish: 'success',
        save: 'warning'
      }
      return statusMap[status]
    }
  },
  components: {
    Pagination,
    TreeSelect
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        schWord: null,
        curPage: 1,
        pageSize: 10,
        status: [],
        sort: 1
      }
    }
  },
  created() {
    this.getBlogList()
  },
  methods: {
    search() {
      this.listQuery.curPage = 1;
      this.getBlogList(this.listQuery)
    },
    getBlogList() {
      console.log(this.listQuery)
      // this.listLoading = true
      getBlogList(this.listQuery).then(res => {
        console.log(res)
        this.list = res.dataList
        this.total = res.total
        // this.listLoading = false
      })
    }
  }
}
</script>
<style>

</style>
