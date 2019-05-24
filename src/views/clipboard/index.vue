<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="document" @click="handleCopy(inputData,$event)" v-if="menuManager_btn_user">
          copy (menuManager_btn_user)
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="document" v-if="menuManager_btn_position">
          copy (menuManager_btn_position)
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import { mapGetters } from 'vuex'

export default {
  name: 'ClipboardDemo',
  directives: {
    clipboard
  },
  data() {
    return {
      activeName: 'directly',
      inputData: 'https://github.com/PanJiaChen/vue-element-admin',
      menuManager_btn_position: false,
      menuManager_btn_user: false
    }
  },
  created(){
    this.menuManager_btn_user = this.permission_btns['manager:user:view']
    this.menuManager_btn_position = this.permission_btns['manager:position:view']
  },
  computed: {
    ...mapGetters([
      'permission_btns'
    ])
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
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

