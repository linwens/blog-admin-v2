<template>
  <div>
    <slot name="img"></slot>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs'

export default {
  name: 'Viewer',
  props: {
    dom: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  data(){
    return {}
  },
  mounted(){
    this.initView()
  },
  methods: {
    asyncImg(url) {
      return new Promise(function(resolve, reject) {
        let img = new Image()
        img.onload = function(){
          resolve(img)
        }
        img.error = function(){
          reject(new Error('Could not load image at ' + url));
        }
        img.src = url;
      })
    },
    async initView(){
      // 动态生成一个包含原图链接的img
      let domImg;
      try{
        domImg = await this.asyncImg(this.url);
      }catch(err){
        alert(err)
      }
      let parentNode = document.getElementById(this.dom).parentNode;
      // 盖到原图的上面
      domImg.style.cssText += `position:absolute;width:100px;height:50px;top:50%;left:50%;margin-top: -25px;margin-left: -50px;opacity:0;`
      parentNode.appendChild(domImg)
      const _this = this;
      const viewer = new Viewer( domImg, {
        inline: false,
        viewed() {
          viewer.zoomTo(1);
        }
      });
    }
  }
}
</script>
<style lang="scss">
</style>
