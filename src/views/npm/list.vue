<template>
  <div class="gallery-container m15">
    <div class="search-container df mb10">
      <div class="mr10">
        关键字:
        <el-input v-model="listQuery.schWord" class="w200" size="mini" />
      </div>
      <div class="mr10">
        状态:
        <div class="dib w200">
          <el-select v-model="listQuery.status" multiple placeholder="请选择展示状态" class="w200" size="mini">
            <el-option label="已发" :value="1" />
            <el-option label="未发" :value="0" />
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
      <el-button type="primary" @click="search()" size="mini">查询</el-button>
      <el-button type="success" @click="editItem()" size="mini">新增</el-button>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="time"
        label="发布日期"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        width="200"
      />
      <el-table-column
        prop="desc"
        label="项目简介"
      />
      <el-table-column
        prop="statis"
        label="项目统计"
        width="220"
      >
        <template slot-scope="scope">
          <github-button :href="'https://github.com/linwens/' + scope.row.name" data-show-count="true" :aria-label="'Star linwens/' + scope.row.name + ' on GitHub'">Star</github-button><!-- Place this tag where you want the button to render. -->
          <github-button :href="'https://github.com/linwens/' + scope.row.name + '/fork'" data-show-count="true" :aria-label="'Fork linwens/' + scope.row.name + ' on GitHub'">Fork</github-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="publish"
        label="是否展示在前台"
        width="80"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.publish"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="showNPM(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="gitUrl"
        label="git地址"
        width="400"
      >
        <template slot-scope="scope">
          <a :href="'https://github.com/linwens/' + scope.row.name" target="_blank" class="cl-green">{{'https://github.com/linwens/' + scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editItem(scope)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="removeItem(scope.row.nid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getNpmList" />
    <el-dialog title="修改信息" :visible.sync="show" width="30%">
      <el-form :model="form">
        <el-form-item label="仓库名称:" label-width="120">
          <el-input
            v-model="form.name"
            placeholder="请输入仓库名称"
            size="mini"
            class="w200"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" label-width="120">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            value-format="timestamp"
            class="w200"
            size="mini"
            :disabled="disabled"
            placeholder="请选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目简介:" label-width="120">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入项目简介"
            class="w400"
            maxlength="100"
            show-word-limit
            v-model="form.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="subInfo">{{subBtnText}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getNpmList, addNPM, showNPM, removeNpm } from '@/api/npms'
import Pagination from '@/components/Pagination'
import GithubButton from 'vue-github-button'

export default {
  name: 'List',
  components: {
    Pagination,
    GithubButton
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        schWord: null,
        curPage: 1,
        pageSize: 10,
        status: null,
        sort: -1
      },
      visible: false, // 是否展示开关
      show: false,
      form: {
        name: '',
        time: '',
        desc: ''
      },
      subBtnText: '',
      disabled: false, //不可编辑
    }
  },
  created() {
    this.getNpmList()
  },
  methods: {
    getNpmList() {
      console.log(this.listQuery)
      // this.listLoading = true
      getNpmList(this.listQuery).then(res => {
        this.list = res.dataList
        this.total = res.total
        // this.listLoading = false
      })
    },
    // 删除条目
    removeItem(id){
      removeNpm({
        nid: id
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
          this.getNpmList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      })
    },
    // 编辑条目
    editItem(item){
      console.log(item)
      this.disabled = item ? true : false;
      if (item) {
        this.form.nid = item.row.nid;
        this.form.name = item.row.name;
        this.form.time = item.row.time;
        this.form.desc = item.row.desc;
        this.subBtnText = '更新';
      } else {
        this.form.name = null;
        this.form.time = null;
        this.form.desc = null;
        this.subBtnText = '新增';
      }
      this.show = true;

    },
    // 提交更新
    subInfo(){
      let params = this.form;
      if(this.subBtnText === '更新') {
        params = Object.assign(params, {option: 'modify'})
      }
      addNPM(params).then((res) => {

        this.show = false
      })
    },
    // 展示npm项目
    showNPM(item){
      showNPM({nid: item.nid, publish: item.publish}).then((res) => {
        // 可以直接给id对应的item的publish取反
        this.$message({
          type: 'success',
          message: res.res_msg,
          duration: 1500
        })
      })
    },
    search() {
      console.log(this.listQuery)
      this.getNpmList(this.listQuery)
    }
  }
}
</script>
<style lang="scss">

</style>

