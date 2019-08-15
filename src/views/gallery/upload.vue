<template>
  <div class="article-container m15">
    <div class="mb10">
      <el-input v-model="imgInfo.title" placeholder="请输入标题" class="input-with-select">
        <el-select slot="prepend" v-model="imgInfo.type" placeholder="请选择" class="w100">
          <el-option label="摄影" :value="'galleryImg'" />
          <el-option label="截图" :value="'blogImg'" />
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
        v-model="imgInfo.desc"
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
        :data="{bucketType:imgInfo.type}"
        name="imgFiles"
        :file-list="fileList"
        :action="actionUrl"
        :on-preview="handlePreview"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        :on-error="handleErr"
      >
        <i class="el-icon-plus va-m" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="url" alt="">
      </el-dialog>
      <el-button class="w150 mt10" size="small" type="success" @click="submitUpload" :disabled="option == 'modify'">上传到服务器</el-button>
    </div>
    <div>
      <el-button class="w150 mt10" size="small" type="primary" @click="saveImg" :disabled="disabled">保存图片</el-button>
    </div>
  </div>
</template>
<script>
import { uploadImg, saveUrl, getImg } from '@/api/imgs'

export default {
  name: 'Upload',
  data() {
    return {
      imgInfo: {
        title: '',
        type: 'galleryImg',
        desc: '',
        theme: '',
        time: ''
      },
      option: '', // 操作方式
      size:'',
      url:'',
      exif:null,
      fileList: [],
      actionUrl: '/ajax/uploadImg', // 上传地址
      disabled: true, // 保存按钮是否可点击
      dialogVisible: false // 图片点击预览
    }
  },
  created() {
    if(this.$route.params.id&&this.$route.params.id!=':id'){
      this.option = 'modify'
      this.disabled = false
      this.getImginfo();
    }
  },
  methods: {
    // 获取图片详情
    getImginfo() {
      getImg({
        gid:this.$route.params.id,
        option:this.option
      }).then(res=>{
        console.log(res.imgInfo.title)
        this.imgInfo.title = res.imgInfo.title;
        this.imgInfo.desc = res.imgInfo.desc;
        this.imgInfo.theme = res.imgInfo.theme;
        this.size = res.imgInfo.size;
        this.exif = res.imgInfo.exif;
        this.imgInfo.type = res.imgInfo.type;
        //图片
        this.url = res.imgInfo.url;
        this.fileList.push({"url": this.url})
      })
    },
    // 保存本地数据库
    saveImg() {
      let parmas = {
        title:this.imgInfo.title,
        desc:this.imgInfo.desc,
        exif:JSON.stringify(this.exif),
        theme:this.imgInfo.theme,
        size:this.size,
        url:this.url,
        option:this.option,
        type:this.imgInfo.type
      };
      if(this.option == 'modify'){
          parmas = Object.assign(parmas,{gid:this.$route.params.id})
      }
      saveUrl(parmas).then(res=>{
        this.$message({
          message: res.res_msg,
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.push('/gallery/list');
        }, 1500);
      });
    },
    // 手动上传七牛
    submitUpload() {
      this.$refs.upload.submit()
    },
    beforeRemove(file, fileList) {
      this.$message({
        message: '目前暂不可删除照片',
        type: 'warning'
      });
      return false;
    },
    handlePreview(file) {
      console.log(file)
      this.dialogVisible = true;
    },
    // 上传七牛成功
    handleSuccess(res, file, fileList) {
      console.dir(res)
      this.exif = res.exif;
      this.size = res.size;
      this.url = res.backUrl;
      this.disabled = false;
    },
    handleErr(err, file, fileList) {
      console.dir(err);
      console.dir(file);
      console.dir(fileList);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
