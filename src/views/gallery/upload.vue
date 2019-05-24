<template>
  <div class="article-container m15">
    <div class="mb10">
      <el-input v-model="imgInfo.title" placeholder="请输入标题" class="input-with-select">
        <el-select slot="prepend" v-model="imgInfo.type" placeholder="请选择" class="w100">
          <el-option label="摄影" :value="1" />
          <el-option label="截图" :value="2" />
        </el-select>
      </el-input>
    </div>
    <div class="df mb10">
      <el-input v-model="imgInfo.theme" placeholder="请输入主题" class="mr10">
        <div slot="prepend" class="w60">theme</div>
      </el-input>
      <div>
        <el-date-picker
          v-model="imgInfo.time"
          class="w300"
          type="datetime"
          placeholder="选择发布时间"
        />
      </div>
    </div>
    <div class="mb10">
      <el-input
        v-model="imgInfo.brief"
        type="textarea"
        placeholder="请输入简介"
        maxlength="300"
        show-word-limit
      />
    </div>
    <div>
      <el-upload
        ref="upload"
        :auto-upload="false"
        list-type="picture-card"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus va-m" />
      </el-upload>
      <el-button class="w150 mt10" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </div>
    <div>
      <el-button class="w150 mt10" size="small" type="primary" @click="saveImg">保存图片</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Upload',
  data() {
    return {
      imgInfo: {
        title: '',
        type: 1,
        brief: '',
        theme: '',
        time: ''
      },
      fileList: []
    }
  },
  created() {},
  methods: {
    saveImg() {},
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
