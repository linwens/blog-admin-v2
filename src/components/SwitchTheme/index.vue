<template>
  <div class="m-theme-radio">
    <svg-icon icon-class="theme" style="font-size:20px;" />
    <el-radio-group v-model="theme">
      <el-radio :label="''">默认主题</el-radio>
      <el-radio :label="'dark-theme'">dark主题</el-radio>
      <el-radio :label="'light-theme'">light主题</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
/**
 * 有几种主题就要全部引入，然后通过给body增加class类名切换主题色；
 * 如果不涉及主题切换，直接在main.js里设置自定义主题的路径
 **/
import '@/assets/theme/dark/index.css'
import '@/assets/theme/light/index.css'

export default {
  name: 'SwitchTheme',
  data() {
    return {
      theme: '',
      themeArr: ['dark-theme', 'light-theme']
    }
  },
  watch: {
    theme(nv, ov) {
      this.switchClass(document.body, nv)
    }
  },
  methods: {
    switchClass(element, className) {
      if (!element) {
        return
      }
      let classString = element.className
      const curClass = classString.split(' ').filter(el => {
        return !this.themeArr.includes(el)
      })
      classString = curClass.join(' ')
      const nameIndex = classString.indexOf(className)
      if (nameIndex === -1) {
        classString += '' + className
      } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
      }
      element.className = classString
    }
  }
}
</script>
<style lang="scss">
  .m-theme-radio{
    position: absolute;
    right:201px;
    top: 0;
    .el-radio__label{
        padding-left: 3px!important;
    }
    .el-radio{
        margin-right: 8px!important;
    }
  }
</style>
