<template>
  <div>
    <el-table
      :data="list"
      border fit highlight-current-row
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date"
        width="150"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="theme"
        label="Theme"
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="brief"
        label="Brief">
      </el-table-column>
      <el-table-column
        prop="thumbnail"
        label="Thumbnail"
        width="120">
        <template slot-scope="scope">
          <vue-viewer :dom="'img_'+scope.$index" :url="scope.row.url" />
          <el-image
            :id="'img_'+scope.$index"
            style="width: 100px; height: 50px"
            :src="scope.row.thumbnail"
            :fit="'cover'"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="Url"
      >
        <template slot-scope="{row}">
          {{ row.url }}
          <el-button v-clipboard:copy="row.url" v-clipboard:success="clipboardSuccess" size="mini" plain type="success">copy</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Operation"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <router-link :to="'/gallery/upload/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete">
            Del
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getGalleryList as GL, getBlogList as BO } from '@/api/table'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import Pagination from '@/components/Pagination'
import VueViewer from '@/components/Viewer'

export default {
  directives: {
    clipboard
  },
  components: {
    Pagination,
    VueViewer
  },
  props: {
    type: {
      type: String,
      default: 'GL'
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        limit: 10,
        page: 1,
        title: null,
        brief: null,
        sort: 1
      },
      total: 0,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(q) {
      this.loading = true
      this.$emit('create') // for test
      const listApi = this.type === 'GL' ? GL : BO
      const query = Object.assign(this.listQuery, q || {})

      listApi(query).then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.loading = false
      })
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

