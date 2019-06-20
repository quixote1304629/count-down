基本用法

```vue
<template>
  <div class="demo-count">
    <count-down
      :sign="'No.5667'"
      :now="1560404661500"
      :start="1560404666500"
      :end="1560404669500"
      :remindBeforeStart="[3000, 2000]"
      :remindProcessing="[3000, 2000]"
      @start="countDownStart"
      @end="countDownEnd"
      @remindBeforeStart="remindBeforeStart($event, 'remindBeforeStart')"
      @remindProcessing="remindProcessing($event, 'remindProcessing')"
    >
    </count-down>
  </div>
</template>
<script>
export default {
  name: 'DemoCountDown',
  components: {},
  data() {
    return {}
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
</style>
```