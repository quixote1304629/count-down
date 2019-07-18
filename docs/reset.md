异步重置用法

```vue
<template>
  <div class="demo-count">
    <count-down
      ref="countDown"
      :sign="'No.5667'"
      :now="theTime.now"
      :start="theTime.start"
      :end="theTime.end"
      @start="countDownStart"
      @end="countDownEnd"
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
        now: 0,
        start: 0,
        end: 0,
      }
    }
  },
  methods: {
    countDownStart(val) {
      console.log('reset: countDownStart', val)
    },
    countDownEnd(val) {
      console.log('reset: countDownEnd', val)
    },
    // 重置定时器
    resetCountDown(){
      this.fetchTimes().then(res => {
        this.theTime = {...res}
        this.$refs.countDown.reset()
      })
     
    },
    fetchTimes(){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({now: 1563435862000, start: 1563435864000, end: 1563435867000})
        }, 500)
      })
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