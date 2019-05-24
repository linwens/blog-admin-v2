<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-good">
            <svg-icon icon-class="good" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              已完成的需求
            </div>
            <count-to :start-val="0" :end-val="50" :duration="2" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-ing">
            <svg-icon icon-class="ing" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              进行中的需求
            </div>
            <count-to :start-val="0" :end-val="10" :duration="2" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-photos">
            <svg-icon icon-class="photos" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              摄影作品
            </div>
            <count-to :start-val="0" :end-val="100" :duration="2" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="24">
        <el-card shadow="always" class="m-drag">
          <!-- 4、事件备忘录(三列展示：灵光一现~pre、就是干~doing、你好棒棒~done，拖入拖出实现增删)Vue.Draggable, ui模仿teambition,    npm install vuedraggable sortablejs --save -->
          <h2>需求池</h2>
          <el-row :gutter="20">
            <el-col v-for="item in needsPool" :key="item.tabKey" :span="8">
              <el-card shadow="never" :body-style="{backgroundColor:'#eee'}">
                <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link">
                    {{ item.tabName }}<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>{{ item.desc }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <draggable v-model="item.dragItemlist" :options="{group:'demand'}" class="m-dragZone" @start="drag=true" @end="drag=false">
                  <div v-for="element in item.dragItemlist" :key="element.id" class="u-dragItem">
                    <i class="el-icon-close" @click="delIdea(item,element.id)" />
                    <el-input
                      v-model="element.name"
                      type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="请输入内容"
                    >{{ element.name }}
                    </el-input>
                  </div>
                  <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addIdea(item)">添加点子</el-button>
                </draggable>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from '@/components/VueCount'
import draggable from 'vuedraggable'

export default {
  name: 'Dashboard',
  components: {
    CountTo,
    draggable
  },
  data() {
    return {
      needsPool: [
        {
          tabKey: 1,
          tabName: '灵光一现',
          desc: '想到的需求',
          dragItemlist: [
            {
              name: 'vuejs原理了解下',
              id: '1'
            },
            {
              name: 'react搞起？',
              id: '2'
            }
          ]
        },
        {
          tabKey: 2,
          tabName: '就是干',
          desc: '正在努力实现的需求',
          dragItemlist: [
            {
              name: 'vue后台系统',
              id: '5'
            },
            {
              name: 'express个人博客',
              id: '6'
            }
          ]
        },
        {
          tabKey: 3,
          tabName: '你好棒棒',
          desc: '完成并上线的需求',
          dragItemlist: [
            {
              name: 'react-native DEMO',
              id: '7'
            },
            {
              name: '个人博客',
              id: '8'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    addIdea(item) {
      // 增加点子
      const curPoolIndex = this.needsPool.findIndex((val) => {
        return val.tabKey === item.tabKey
      })
      const curList = this.needsPool[curPoolIndex].dragItemlist
      const len = curList.length
      curList.push([{
        name: '',
        id: len
      }])
    },
    delIdea(item, id) {
      // 删除点子
      // 找到信息所在栏
      const curPoolIndex = this.needsPool.findIndex((val) => {
        return val.tabKey === item.tabKey
      })
      const curList = this.needsPool[curPoolIndex].dragItemlist
      // 找到具体信息
      const curEleIndex = curList.findIndex((val) => {
        return val.id === id
      })
      curList.splice(curEleIndex, 1)
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-good {
        background: #40c9c6;
      }
      .icon-ing {
        background: #36a3f7;
      }
      .icon-photos {
        background: #f4516c;
      }
    }
    .icon-good {
      color: #40c9c6;
    }
    .icon-ing {
      color: #36a3f7;
    }
    .icon-photos {
      color: #f4516c;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.m-drag{
  min-height: 300px;
  border: none;
  h2{
    font-size: 20px;
    margin-bottom: 20px;
  }
  .m-dragZone{
    width: 100%;
    min-height: 100px;
    background-color: #eee;
  }
  .u-dragItem{
    position: relative;
    box-sizing: border-box;
    min-height: 60px;
    padding: 20px 10px;
    margin: 10px auto;
    font-size: 14px;
    color: #909399;
    background-color: #fff;
    border-radius: 2px;
    &:hover{
      .el-icon-close{
        display: block;
      }
    };
    .el-icon-close{
      position: absolute;
      top: 5px;
      right: 5px;
      display: none;
      cursor: pointer;
    }
    .el-textarea__inner{
      border: none;
      resize: none;
    }
  }
}
</style>
