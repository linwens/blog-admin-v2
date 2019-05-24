<template>
  <div class="article-container m15">
    <div class="search-container df mb10">
      <div class="mr10">
        标题:
        <el-input v-model="listQuery.title" class="w200"></el-input>
      </div>
      <div class="mr10">
        简介:
        <el-input v-model="listQuery.brief" class="w200"></el-input>
      </div>
      <div class="mr10">
        状态:
        <div class="dib w200">
          <tree-select
            :value.sync="listQuery.status"
            :options="tagsData"
            multiple/>
        </div>
      </div>
      <div class="mr10">
        时间排序：
        <el-select v-model="listQuery.sort" placeholder="请选择排序" class="w200">
          <el-option label="按时间从近到远" :value="1"></el-option>
          <el-option label="按时间从远到近" :value="-1"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getList()">查询</el-button>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date"
        width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
        width="350">
      </el-table-column>
      <el-table-column
        prop="brief"
        label="Brief">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status"
        width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Operation"
        width="150">
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import TreeSelect from '@/components/TreeSelect'

export default {
  name: 'List',
  data() {
    return {
      list:[],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        title: null,
        brief: null,
        status: [],
        sort: 1
      },
      // tags:null,
      tagsData: [
        {
          id:'published',
          label: 'published'
        },
        {
          id:'draft',
          label: 'draft'
        },
        {
          id:'deleted',
          label: 'deleted'
        }
      ]
    }
  },
  components: {
    Pagination,
    TreeSelect
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log(this.listQuery)
      // this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // this.listLoading = false
      })
    }
  }
}
</script>
<style>

</style>
