<template>
  <span ref="countUpDom" />
</template>
<script>
import { CountUp } from 'countup.js'

export default {
  name: 'CountUp',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.initCountUp()
  },
  methods: {
    initCountUp() {
      console.log(this.$refs.countUpDom)
      const countup = new CountUp(this.$refs.countUpDom, this.endVal, {
        startVal: this.startVal,
        duration: this.duration
      })
      if (!countup.error) {
        countup.start()
      } else {
        console.error(countup.error)
      }
    }
  }
}
</script>
<style>

</style>
