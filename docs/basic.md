基本用法

```vue
<template>
  <div class="demo-count">
    <count-down
      ref="countDown"
      :sign="'No.5667'"
      :now="theTime.now"
      :start="theTime.start"
      :end="theTime.end"
      :remindBeforeStart="[3000, 2000]"
      :remindProcessing="[3000, 2000]"
      @start="countDownStart"
      @end="countDownEnd"
      @remindBeforeStart="remindBeforeStart($event, 'remindBeforeStart')"
      @remindProcessing="remindProcessing($event, 'remindProcessing')"
    >
    </count-down>
    <button class="btn-reset" @click="resetCountDown">修改当前时间+重置组件</button>
  </div>
</template>
<script>
export default {
  name: 'DemoCountDown',
  components: {},
  data() {
    return {
      theTime: {
        now: 1560404661500,
        start: 1560404666500,
        end: 1560404669500,
      }
    }
  },
  methods: {
    countDownStart(val) {
      console.log('countDownStart', val)
    },
    countDownEnd(val) {
      console.log('countDownEnd', val)
    },
    // 开始前提醒
    remindBeforeStart(index, label) {
      console.log(`开始前提醒:${index},${label}`)
    },
    // 进行中提醒
    remindProcessing(index, label) {
      console.log(`进行中提醒:${index},${label}`)
    },
    // 重置定时器
    resetCountDown(){
      // this.theTime.now = 1560404655500
      this.theTime.end = 1560404672500
      this.$refs.countDown.reset()
    }
  },
  created() {}
}
</script>

<style scoped>
.demo-count {
  padding: 20px 10px;

  /* background-color: #6495fe; */
}
.btn-reset {
  margin-top: 20px;
}
</style>
```