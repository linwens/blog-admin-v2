<template>
  <div>
    <el-table
      :data="list"
      border fit highlight-current-row
      style="width: 100%">
      <el-table-column
        prop="date"
        label="发布日期"
        width="150"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="theme"
        label="主题"
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="thumbnail"
        label="缩略图"
        width="120">
        <template slot-scope="scope">
          <vue-viewer :dom="'img_'+scope.$index" :url="scope.row.url" />
          <el-image
            :id="'img_'+scope.$index"
            style="width: 100px; height: 50px"
            :src="scope.row.url+'?imageView2/1/w/100/h/50'"
            :fit="'cover'"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="图片地址"
      >
        <template slot-scope="{row}">
          {{ row.url }}
          <el-button v-clipboard:copy="row.url" v-clipboard:success="clipboardSuccess" size="mini" plain type="success">复制</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <router-link :to="'/gallery/upload/'+scope.row.gid">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removeImg(scope.row.gid)">
            Del
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="query.curPage" :limit.sync="query.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { getGalleryList as GL, getBlogList as BO, removeImg } from '@/api/imgs'
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
    },
    query: {
      type: Object,
      default: function () {
        return {
          schWord: null,
          curPage: 1,
          pageSize: 10,
          sort: 1
        }
      }
    }
  },
  data() {
    return {
      list: [],
      // listQuery: {
      //   schWord: null,
      //   curPage: 1,
      //   pageSize: 10,
      //   sort: 1
      // },
      total: 0,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    removeImg(id) {
      removeImg({
        gid: id
      }).then(res => {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: res.res_msg,
            duration: 1500
          });
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      })
    },
    getList() {
      this.loading = true
      this.$emit('create') // for test
      const listApi = this.type === 'GL' ? GL : BO
      // const query = Object.assign(this.listQuery, q || {})

      listApi(this.query).then(res => {
        console.log(res)
        this.list = res.dataList
        this.total = res.total
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

