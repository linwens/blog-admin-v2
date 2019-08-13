<template>
  <div class="article-container m15">
    <aside class="mkd-tips mb10 fs12">
      <h3 class="mt5 mb5">markdown语法提示</h3>
      <p><b>标题：</b>#、##、###.....</p>
      <p><b>段落：</b> 在文本前加 > ；也可以通过 > 的叠加实现段落的嵌套，如：（>,>>,>>>,...）</p>
      <p><b>列表：</b>无序列表（*、+、-）；有序列表（1、2、3等数字，不用在意数字正确性，mkd会自动按先后排序）</p>
      <p><b>代码块：</b>前后包裹 ```并换行 ；三个不能多也不能少，一定要换行</p>
      <p><b>插入图片：</b>![图片Alt](图片路径 图片title)</p>
      <div><b>文本内超链接：</b></br>
          &nbsp;&nbsp;&nbsp;如：我常去的网站[Google][1],[baidu][2]....</br>
          &nbsp;&nbsp;&nbsp;然后再在文章的最后添加
          &nbsp;&nbsp;&nbsp;[1]:http://www.google.com "Google",([]后面是引号，请注意)</br>
          &nbsp;&nbsp;&nbsp;[2]:http://www.baidu.com "Baidu"
      </div>
      <p><b>自动连接：</b>用尖括号包裹一个url字符串，如：&lthttp://example.com/>，就会生成一个内容为'http://example.com/'的a标签</p>
      <div><b>技巧：</b></br>
          &nbsp;&nbsp;&nbsp;1、新窗口打开超链接就直接写HTML标签;链接统一字体颜色：#20A0FF;
          &nbsp;&nbsp;&nbsp;2、需要自定义样式的就直接写HTML标签;
      </div>
      <p>更多<a href="https://segmentfault.com/markdown" target="_blank">markdown</a></p>
    </aside>
    <div class="mb10">
      <el-input v-model="articleForm.title" placeholder="请输入标题" class="input-with-select">
        <el-select slot="prepend" v-model="articleForm.type" placeholder="请选择" class="w100">
          <el-option label="原创" value="1" />
          <el-option label="笔记" value="2" />
          <el-option label="翻译" value="3" />
        </el-select>
      </el-input>
    </div>
    <div class="mb10" style="display:flex;">
      <div class="mr10">
        <el-date-picker
          v-model="articleForm.time"
          type="datetime"
          value-format="timestamp"
          placeholder="选择发布时间"
        />
      </div>
      <div>
        <tree-select
          :value.sync="articleForm.tags"
          :options="tagsData"
          multiple
        />
      </div>
    </div>
    <div class="mb10">
      <el-input
        v-model="articleForm.brief"
        type="textarea"
        placeholder="请输入简介"
        maxlength="300"
        show-word-limit
      />
    </div>
    <div class="editor-container mb10">
      <markdown-editor v-model="articleForm.text" height="600px" />
    </div>
    <div class="btns">
      <el-button type="primary" @click="postArticle('publish')">发布按钮</el-button>
      <el-button type="warning" @click="postArticle('save')">暂存按钮</el-button>
    </div>
  </div>
</template>
<script>
import { getDetail, postArticle } from '@/api/article'
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
      inputVisible: false,
      inputValue: '',
      option: '', // 操作类型
      // 文章form
      articleForm: {
        time: '', // 发布时间
        type: '1', // 文章类型
        tags: [], // 标签
        title: '', // 文章标题
        text: '', // 文章正文
        brief: '' // 文章简介
      }
    }
  },
  methods: {
    //文章发布
    postArticle(type){//传的字段用于区分保存还是发布
      let tagsObj = {};
      for(var i = 1;i<=this.tags.length;i++){//拼成json传参
          tagsObj = Object.assign(tagsObj,{
              ['tag'+i]:this.tags[i-1]
          })
      }
      let parmas = null;
      if(this.option == 'modify'){
          parmas = Object.assign({},{type: this.articleForm.type, title:this.articleForm.title, text:this.articleForm.text, brief:this.articleForm.brief, tags:JSON.stringify(tagsObj), option:this.option, aid:this.$route.params.id, operate:type})
      }else{
          parmas = Object.assign({},{type: this.articleForm.type, title:this.articleForm.title, text:this.articleForm.text, brief:this.articleForm.brief, tags:JSON.stringify(tagsObj), option:this.option, operate:type})
      }
      postArticle(parmas).then(res=>{
          console.log(res)
          setTimeout(()=>{
              this.$router.push('/article/list');
          }, 1500);
      })
    },
    //获取已有文章详情
    getDetail(){
      getDetail({
        aid:this.$route.params.id,
        option:this.option
      }).then(res=>{
        console.log(res)
        for (let key in res.articleDetail) {
          if (key === 'time') {
            this.articleForm[key] = res.articleDetail[key] * 1000;
          } else {
            this.articleForm[key] = res.articleDetail[key]
          }
        }
        // this.articleForm.title=data.articleDetail.title;
        // this.articleForm.text=data.articleDetail.text;
        // this.articleForm.brief=data.articleDetail.brief;
        // this.tags=data.articleDetail.tags?data.articleDetail.tags:[];
      });
    }
  },
  mounted () {
    if(this.$route.params.id&&this.$route.params.id!=':id'){
      this.option = 'modify'
      this.getDetail();
    }
  }
}
</script>
<style lang="scss">
  .article-container{
    .mkd-tips{
      background: #ccc;
      margin: 10px;
      padding-left: 20px;
      h3{
        font-size: 20px
      }
      p{
        height: 20px;
        line-height: 1.6;
        margin: 0;
      }
      b{
        font-weight: bold;
      }
    }
  }
  .vue-treeselect__control{
    height: 40px!important;
  }
  .vue-treeselect__placeholder {
    line-height: 38px!important;
    font-size: 14px;
  }
  .vue-treeselect__multi-value {
    vertical-align: unset;
  }
</style>
